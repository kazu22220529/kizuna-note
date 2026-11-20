/** 画面の下（スマホ）や左（パソコン）に並ぶタブの名前 */
export type Tab = "home" | "schedule" | "notifications" | "album" | "menu";

/** メニューから開く、タブとは別の画面 */
export type SubScreen =
  | "attendance"
  | "results"
  | "post"
  | "members"
  | "invite"
  | "settings"
  | "help";

export type EventType = "practice" | "match" | "meeting";

export interface TeamEvent {
  id: string;
  type: EventType;
  title: string;
  /** "2024-05-18" のような日付 */
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  notes?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  important: boolean;
}

export type AttendanceStatus = "attending" | "absent" | "undecided";

export interface AttendanceRecord {
  status: AttendanceStatus;
  comment: string;
  submitted: boolean;
}

export interface Member {
  id: string;
  name: string;
  childName: string;
  avatar: string;
}

export interface MatchResult {
  id: string;
  date: string;
  opponent: string;
  venue: string;
  myScore: number;
  theirScore: number;
  scorers: { name: string; time: string }[];
  memo: string;
}

export type PhotoCategory = "練習" | "試合" | "イベント";

export interface Photo {
  id: string;
  url: string;
  caption: string;
  category: PhotoCategory;
}

export interface NotificationSettings {
  schedule: boolean;
  notice: boolean;
  result: boolean;
}
