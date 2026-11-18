import { DEMO_TODAY, WEEKDAYS } from "@/lib/constants";

/** "2024-05-18" を "5月18日（土）" にする */
export function formatJapaneseDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return `${date.getMonth() + 1}月${date.getDate()}日（${WEEKDAYS[date.getDay()]}）`;
}

/** 2つの日付が何日離れているか（dateText の方が未来ならプラス） */
export function daysUntil(isoDate: string, from = DEMO_TODAY): number {
  const start = new Date(`${from}T00:00:00`).getTime();
  const end = new Date(`${isoDate}T00:00:00`).getTime();
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

export function weekdayOf(isoDate: string): string {
  return WEEKDAYS[new Date(`${isoDate}T00:00:00`).getDay()];
}
