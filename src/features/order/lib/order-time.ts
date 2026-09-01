import type { DeliveryDate, DeliverySlot } from "../model/order.types";

export const SERVICE_START_HOUR = 20;
export const SERVICE_END_HOUR = 23;

export type OrderMode = "reserve";

const WEEKDAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const MONTHS_SHORT = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const MONTHS_LONG = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/**
 * Reservation-only model. Always returns "reserve" — there is no same-day
 * ordering mode anymore.
 */
export function getOrderMode(day: number): OrderMode {
  void day;
  return "reserve";
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  const result = startOfDay(date);
  result.setDate(result.getDate() + days);
  return result;
}

function toId(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `date-${year}-${month}-${day}`;
}

/**
 * "YYYY-MM-DD" for a date, matching the keys used in `soldOutDates`.
 */
function toKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shortLabel(date: Date): string {
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}

function fullLabel(date: Date): string {
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} de ${MONTHS_LONG[date.getMonth()]}`;
}

function toDeliveryDate(
  date: Date,
  soldOut: boolean,
  soldOutNote: string,
): DeliveryDate {
  return {
    id: toId(date),
    label: shortLabel(date),
    fullLabel: fullLabel(date),
    status: soldOut ? "soldOut" : "available",
    note: soldOut ? soldOutNote : undefined,
  };
}

/**
 * Returns the next Friday and Saturday available for reservation.
 *
 * Rule (rotating weekend):
 * - If today is Sunday through Thursday, offer this same week's Friday/Saturday.
 * - If today is Friday or Saturday, the current weekend is already in
 *   preparation/delivery, so offer next week's Friday/Saturday.
 *
 * The `soldOutDates` list (YYYY-MM-DD) marks dates that have reached their
 * daily piece cap; those come back forcing `status: "soldOut"`.
 */
export function computeOrderDates(
  now: Date,
  soldOutDates: readonly string[] = [],
  soldOutNote = "Agotado",
): DeliveryDate[] {
  const base = startOfDay(now);
  const day = base.getDay();

  // If today is already Friday or Saturday, start the search from next Sunday
  // so we land on next week's weekend. Otherwise search from today.
  const origin = day >= 5 ? addDays(base, 7 - day) : base;

  const friday = addDays(origin, (5 - origin.getDay() + 7) % 7);
  const saturday = addDays(origin, (6 - origin.getDay() + 7) % 7);

  const soldOut = new Set(soldOutDates);
  return [
    toDeliveryDate(friday, soldOut.has(toKey(friday)), soldOutNote),
    toDeliveryDate(saturday, soldOut.has(toKey(saturday)), soldOutNote),
  ];
}

type SlotDef = {
  startHour: number;
  label: string;
  fullLabel: string;
};

export const SLOT_DEFS: SlotDef[] = [
  { startHour: 20, label: "20-21h", fullLabel: "20:00 — 21:00" },
  { startHour: 21, label: "21-22h", fullLabel: "21:00 — 22:00" },
  { startHour: 22, label: "22-23h", fullLabel: "22:00 — 23:00" },
];

/**
 * Reservation offers every delivery slot; there is no per-slot cap yet, so the
 * client picks freely. This keeps the shape stable for future per-slot limits.
 */
export function computeOrderSlots(now: Date, mode: OrderMode): DeliverySlot[] {
  void now;
  void mode;

  return SLOT_DEFS.map((def) => ({
    id: `slot-${def.startHour}-${def.startHour + 1}`,
    label: def.label,
    fullLabel: def.fullLabel,
    status: "available" as const,
    note: undefined,
  }));
}
