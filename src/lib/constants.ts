import type { AttendanceStatus, EventType } from "@/lib/types";

/** チームカラー。画面の赤い部分はすべてこの色です。 */
export const BRAND = "#8B1A1A";

/**
 * サンプルデータの「今日」。
 * カレンダーが 2024年5月 なので、成績カードの「次の試合まで5日」と揃えています。
 */
export const DEMO_TODAY = "2024-05-14";

export const CALENDAR_YEAR = 2024;
export const CALENDAR_MONTH = 5;

export const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;

export const EVENT_META: Record<
  EventType,
  { label: string; color: string; bg: string }
> = {
  practice: { label: "練習", color: "#16A34A", bg: "#F0FDF4" },
  match: { label: "試合", color: "#EA580C", bg: "#FFF7ED" },
  meeting: { label: "会議", color: "#2563EB", bg: "#EFF6FF" },
};

export const ATTENDANCE_OPTIONS: {
  value: AttendanceStatus;
  label: string;
  icon: string;
  color: string;
  bg: string;
}[] = [
  { value: "attending", label: "参加します", icon: "⭕", color: "#16A34A", bg: "#F0FDF4" },
  { value: "absent", label: "欠席します", icon: "✕", color: BRAND, bg: "#FEF2F2" },
  { value: "undecided", label: "未定", icon: "△", color: "#9CA3AF", bg: "#F9FAFB" },
];

export function attendanceLabel(status: AttendanceStatus): string {
  if (status === "attending") return "参加";
  if (status === "absent") return "欠席";
  return "未定";
}

export function attendanceColor(status: AttendanceStatus): string {
  if (status === "attending") return "#16A34A";
  if (status === "absent") return BRAND;
  return "#9CA3AF";
}

export function attendanceBg(status: AttendanceStatus): string {
  if (status === "attending") return "#F0FDF4";
  if (status === "absent") return "#FEF2F2";
  return "#F9FAFB";
}
