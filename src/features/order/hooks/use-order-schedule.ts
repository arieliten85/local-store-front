"use client";

import { useMemo, useState } from "react";
import { soldOutDates } from "@/config/capacity";
import {
  computeOrderDates,
  computeOrderSlots,
  getOrderMode,
  type OrderMode,
} from "../lib/order-time";
import type { DeliveryDate, DeliverySlot } from "../model/order.types";

export type OrderSchedule = {
  mode: OrderMode;
  // now is kept stable for the component's lifetime
  now: Date;
  dates: DeliveryDate[];
  slots: DeliverySlot[];
};

export function useOrderSchedule(soldOutNote?: string): OrderSchedule {
  // Snapshot the clock once per mount so the schedule stays stable while the
  // user fills the form. Deliberately not live-updating mid-session.
  const [now] = useState(() => new Date());

  return useMemo<OrderSchedule>(() => {
    const mode = getOrderMode(now.getDay());
    return {
      mode,
      now,
      dates: computeOrderDates(now, soldOutDates, soldOutNote),
      slots: computeOrderSlots(now, mode),
    };
  }, [now, soldOutNote]);
}
