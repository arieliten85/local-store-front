/**
 * Daily piece capacity.
 *
 * There is no backend or live stock counting. The only control is this manual
 * list: when the person in charge lets us know a day is full (300 pieces
 * reached), add that date (format "YYYY-MM-DD") here and redeploy.
 */
export const soldOutDates: string[] = ["2026-09-05"];

export const DAILY_PIECE_LIMIT = 300000;
