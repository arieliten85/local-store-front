## PROMPT PARA AGENTE EN IDE

Copiar y ejecutar la siguiente especificación para implementar las features en la app Simple Sushi.

---

## CONTEXTO

Vas a implementar dos features en la app de Simple Sushi:

1. **"Personalizá tu tabla a tu gusto"** — sección nueva con un modal de 3 pasos: el cliente elige piezas totales (16/32/48), hasta 6 sabores, y cantidad por sabor.
2. **Botón flotante de WhatsApp** — solo para consultas generales, separado del flujo de pedido.

Ya auditamos el repo juntos. Estas conclusiones están confirmadas y no hace falta re-auditarlas:

- Estado del pedido: `useState` local en `OrderBuilderForm`, sin Context ni Zustand.
- Modales: `<dialog>` nativo + Tailwind responsive, mismo componente para mobile/desktop (patrón de `order-step-date-dialog.tsx`).
- Selección: radios "peer" y steppers ± con botones nativos. No hay componente genérico de multi-select — se compone a mano.
- Lógica de negocio pura en `src/features/order/lib/*`: `computeOrderTotals` (order-totals.ts), `formatOrderSummary` (format-order-summary.ts), `buildOrderMessage` + `buildWhatsAppHref` (build-order-message.ts).
- `orderWhatsAppNumber` vive en `src/config/order.config.ts`.
- `DAILY_PIECE_LIMIT` / `soldOutDates` en `src/config/capacity.ts`; `canAddSize` (en order-totals.ts) ya valida el límite sumando piezas — no hace falta tocarlo.
- Sin analytics instalado — no agregar.
- Catálogo de sabores (`src/content/catalog.content.ts`) no tiene `id`, solo `name`, `ingredients`, `image`.
- El flujo completo del pedido es: selección de tamaño/sabores → `openDateStep()` → fecha → franja → dirección → datos del cliente → pago → confirmación → WhatsApp. Todo vive en un único `OrderState`, manejado dentro de `OrderBuilderForm` (Client Component).
- Árbol de componentes: `page.tsx` (Server) → `OrderBuilder` (Server, sección) → `OrderBuilderForm` (Client). La nueva `CustomOrderSection` es hermana de `OrderBuilder` dentro de `page.tsx`.
- No hay `forwardRef`/`useImperativeHandle` en el repo hoy (solo `useRef` para `<dialog>` y scroll de carousel) — no hay patrón equivalente previo para este caso, así que introducirlo acá es válido y necesario, no redundante.

---

## DECISIÓN DE ARQUITECTURA (definitiva, no la reabras)

El modal de "Personalizá tu tabla" **no crea un flujo paralelo**. Genera un `OrderLineItem` con una composición de sabores personalizada y lo inyecta en el `OrderState` de `OrderBuilderForm` a través de un **ref imperativo**, y de ahí el pedido sigue el wizard existente sin modificarlo (fecha → dirección → cliente → pago → WhatsApp).

**Cómo se conecta (opción B, con ajuste):**

- `OrderBuilderForm` se convierte en `forwardRef`, y expone vía `useImperativeHandle` **un único método público**: `addCustomOrderItem(item: OrderLineItem)`.
- Ese método hace `setOrder(...)` agregando el item **y** llama a `openDateStep()` internamente, en la misma función — no se expone `openDateStep` como método separado.
- El ref se crea en `page.tsx` (Server Component) y se pasa como prop hacia abajo: a `OrderBuilder` (que solo lo reenvía) hasta `OrderBuilderForm`, y también a `CustomOrderSection` (hermana de `OrderBuilder`). Pasar un ref a través de un Server Component intermedio hacia un Client Component hijo funciona sin problema.
- `custom-order-modal.tsx` vive dentro de `custom-order-section.tsx`, **no** dentro de `OrderBuilderForm` — así la sección queda separada del reservador fijo, y `OrderBuilderForm` gana la mínima superficie nueva necesaria (el ref), sin tocar su lógica interna de tamaños fijos.

**Extensión de tipos (retrocompatible — los combos fijos siguen funcionando igual):**

```
export type CustomFlavorLine = {
  flavorId: string;
  quantity: number;
};

export type OrderLineItem = {
  sizeId: OrderSize["id"];
  quantity: number;
  customFlavors?: CustomFlavorLine[]; // presente solo en items personalizados
};
```

Cuando `customFlavors` está presente: `quantity` se fija en `1` (representa "una tabla personalizada"), y el precio/piezas se calculan sumando `customFlavors` contra `flavorSalePrices`, no con `size.price`/`size.pieceCount`.

---

## REGLAS DEL REPO A RESPETAR

- Leé `CLAUDE.md` (raíz y, si existe, el del área frontend) antes de tocar código, y las convenciones de los skills disponibles en el proyecto.
- Seguí las convenciones de nombres, estructura de carpetas y estilo ya establecidas. No inventes patrones nuevos salvo donde ya se confirmó que no hay uno equivalente (el ref imperativo del punto anterior).
- No rompas tipos existentes — todos los cambios deben ser retrocompatibles con el combo fijo actual.
- No agregues librerías nuevas (modal, state management, forms) salvo que ya estén en `package.json`.
- Mantené la separación: precios/datos de negocio en `config/`, copy en `content/`, lógica en `features/*/lib/`, UI en `features/*/components/` o `components/sections/`.
- Antes de escribir código, confirmá/creá la rama de trabajo: `feature/custom-order-tabla-personalizada` (desde la rama base habitual del repo).
- Corré `bun run lint`, `bun run typecheck` y `bun run build` al final y resolvé cualquier error.
- Si en algún paso encontrás algo en el repo que no coincide con lo descripto acá (nombres de archivo distintos, algo en `CLAUDE.md` que contradiga el enfoque del ref, etc.), **parate y avisá antes de seguir** — no lo resuelvas por tu cuenta ni inventes una estructura paralela.

---

## PLAN DE IMPLEMENTACIÓN — EN ESTE ORDEN

### Cambios de tipos (retrocompatibles)

**1.** `src/content/content.types.ts` — agregar `id: string` al tipo de producto/sabor (`ProductItem`).

**2.** `src/content/catalog.content.ts` — agregar `id` kebab-slug a los 8 sabores: `newyork-philly`, `salmon-cocido`, `tuna`, `pollo-y-verdeo`, `zanahoria`, `pepino`, `remolacha`, `huevo`.

**3.** `src/features/order/model/order.types.ts` — agregar `CustomFlavorLine` y `customFlavors?: CustomFlavorLine[]` a `OrderLineItem`, según la especificación de arriba.

### Config nueva

**4.** `src/config/pricing.ts` (nuevo) — exportar `flavorSalePrices: Record<string, number>` con estos precios confirmados:

```
export const flavorSalePrices: Record<string, number> = {
  "newyork-philly": 2000,
  "salmon-cocido": 2200,
  "tuna": 2200,
  "pollo-y-verdeo": 1500,
  "zanahoria": 1000,
  "pepino": 1000,
  "remolacha": 1100,
  "huevo": 1000,
};
```

### Lógica pura extendida

**5.** `src/features/order/lib/order-totals.ts` — en el loop de `computeOrderTotals`: si `item.customFlavors` existe, sumar piezas (`sum of quantity`) y precio (`sum of quantity * flavorSalePrices[flavorId]`) en vez de `size.pieceCount`/`size.price`. Si no existe, la lógica actual queda intacta.

**6.** `src/features/order/lib/format-order-summary.ts` — cuando el item tiene `customFlavors`, generar una línea de resumen agregada (ej: `"32 piezas personalizadas"` + total), en vez de `size.label`. Reusar `computeOrderTotals` ya extendido.

**7.** `src/features/order/lib/build-order-message.ts` — cuando el item tiene `customFlavors`, listar cada sabor elegido con su cantidad (buscando `name` por `id` en `catalogContent`), manteniendo el mismo formato visual (emojis, negritas, secciones) del resto del mensaje. El total final sigue viniendo de `computeOrderTotals`.

### UI — modal, sección, ref, FAB

**8.** `src/features/custom-order/components/custom-order-modal.tsx` (nuevo) — `<dialog>` responsive, patrón de `order-step-date-dialog.tsx`. 3 pasos:

- **Paso 1 (piezas):** radios "peer" (16/32/48), auto-avanza al elegir.
- **Paso 2 (sabores, máx. 6):** checkboxes "peer" agrupados por categoría (Premium/Medio/Básico). Contador "X/6 sabores elegidos". Al llegar a 6, deshabilitar (no ocultar) el resto. Botón "Continuar" habilitado con ≥1 sabor.
- **Paso 3 (cantidad por sabor):** stepper ± por sabor elegido. Contador en vivo "Te quedan N piezas por asignar" (warning si no da exacto, success si sí). Botón **"Repartir parejo"**: divide `totalPieces / cantidadDeSaboresElegidos`, redondeando y asignando el resto al primer sabor de la lista. Precio total en vivo con `flavorSalePrices`. Botón de confirmar deshabilitado hasta que `sum(quantities) === totalPieces`.
- Al confirmar: arma el `OrderLineItem` (`sizeId` del paso 1, `quantity: 1`, `customFlavors` del paso 3).

**9.** `src/components/sections/custom-order-section.tsx` (nuevo) — sección separada con copy comercial de "3 simples pasos" + botón que abre el modal. Recibe el `formRef` como prop y, al confirmarse el modal, llama `formRef.current.addCustomOrderItem(item)`.

**10.** `src/components/sections/order-builder.tsx` — reenviar el ref recibido (Server Component, solo lo pasa) hacia `OrderBuilderForm`.

**11.** `src/features/order/components/order-builder-form.tsx` — convertir a `forwardRef`; `useImperativeHandle` exponiendo únicamente `addCustomOrderItem(item)`, que hace `setOrder(...)` agregando el item y llama `openDateStep()` en la misma función.

**12.** Confirmar que `OrderBuilder` y `CustomOrderSection` queden como hermanos en `page.tsx`, ambos recibiendo el mismo ref.

**13.** `src/app/page.tsx` — crear el ref, pasarlo a `<OrderBuilder>` y a `<CustomOrderSection>`, e insertar la sección nueva en una ubicación razonable (después del reservador, sin ir antes del hero).

**14.** `src/components/whatsapp-fab.tsx` (nuevo) — fixed bottom-right, respetando safe-area en mobile. Usa `orderWhatsAppNumber` + `buildWhatsAppHref` con mensaje fijo genérico (ej: `"Hola! Tengo una consulta sobre los pedidos de sushi"`). Montar en `layout.tsx` para que aparezca en toda la página.

### Verificación final

**15.** Correr `bun run lint`, `bun run typecheck`, `bun run build`. Prueba manual:

- Tabla personalizada mixta (varios sabores): total de piezas/precio y mensaje de WhatsApp correctos.
- Tabla de un solo sabor (ej: 16 piezas de Tuna): funciona igual.
- Combo fijo (flujo actual): sigue funcionando exactamente igual, sin regresiones.
- `DAILY_PIECE_LIMIT`: bloquea correctamente si un pedido personalizado + otros del día superan el límite.
- Botón flotante de WhatsApp: funciona en mobile y desktop.

---

## QUÉ NO HACER

- No dupliques el wizard de fecha/dirección/cliente/pago para el flujo personalizado.
- No agregues librerías nuevas de modal, forms o state management.
- No cambies el comportamiento ni el precio de los combos fijos existentes.
- No implementes analytics/tracking.
- No inventes límites de piezas por franja horaria (no existen hoy, no es parte de esta tarea).
- No expongas `openDateStep` como método separado del ref — solo `addCustomOrderItem`.

---

## RAMA DE TRABAJO

`feature/custom-order-tabla-personalizada` (desde la rama base habitual del repo).

---

## ENTREGABLE

Cuando termines los 15 pasos, dame un resumen de qué archivos creaste/modificaste, y el resultado de lint/typecheck/build.
