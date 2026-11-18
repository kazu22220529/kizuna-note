import type {
  AppNotification,
  AttendanceRecord,
  MatchResult,
  Member,
  NotificationSettings,
  Photo,
  TeamEvent,
} from "@/lib/types";

export const MEMBERS: Member[] = [
  { id: "m1", name: "山田 花子", childName: "陸", avatar: "花" },
  { id: "m2", name: "田中 恵子", childName: "太郎", avatar: "恵" },
  { id: "m3", name: "鈴木 美咲", childName: "一郎", avatar: "美" },
  { id: "m4", name: "高橋 由美", childName: "大輝", avatar: "由" },
  { id: "m5", name: "中村 和子", childName: "蓮", avatar: "和" },
  { id: "m6", name: "伊藤 さゆり", childName: "颯", avatar: "さ" },
  { id: "m7", name: "佐藤 明美", childName: "朱里", avatar: "明" },
  { id: "m8", name: "渡辺 千恵", childName: "樹", avatar: "千" },
  { id: "m9", name: "小林 幸子", childName: "悠", avatar: "幸" },
  { id: "m10", name: "加藤 直子", childName: "翼", avatar: "直" },
  { id: "m11", name: "吉田 美穂", childName: "海斗", avatar: "穂" },
  { id: "m12", name: "山本 京子", childName: "葵", avatar: "京" },
  { id: "m13", name: "松本 理恵", childName: "結衣", avatar: "理" },
  { id: "m14", name: "井上 奈々", childName: "颯太", avatar: "奈" },
  { id: "m15", name: "木村 亜希", childName: "空", avatar: "亜" },
  { id: "m16", name: "林 由里子", childName: "蒼", avatar: "林" },
  { id: "m17", name: "清水 智子", childName: "陽菜", avatar: "智" },
  { id: "m18", name: "山口 麻衣", childName: "大和", avatar: "麻" },
  { id: "m19", name: "斎藤 絵美", childName: "凛", avatar: "絵" },
  { id: "m20", name: "池田 幸恵", childName: "蓮太", avatar: "池" },
];

/** イベントごとの、各保護者の出欠（サンプル） */
export const EVENT_ATTENDANCE: Record<string, Record<string, AttendanceRecord["status"]>> = {
  e1: {
    m1: "attending", m2: "attending", m3: "attending", m4: "attending", m5: "attending",
    m6: "attending", m7: "attending", m8: "attending", m9: "attending", m10: "attending",
    m11: "attending", m12: "attending", m13: "absent", m14: "absent", m15: "absent",
    m16: "undecided", m17: "undecided", m18: "undecided", m19: "undecided", m20: "undecided",
  },
  e2: {
    m1: "undecided", m2: "attending", m3: "attending", m4: "absent", m5: "attending",
    m6: "attending", m7: "undecided", m8: "attending", m9: "absent", m10: "attending",
    m11: "attending", m12: "undecided", m13: "attending", m14: "attending", m15: "absent",
    m16: "attending", m17: "attending", m18: "undecided", m19: "attending", m20: "attending",
  },
  e3: {
    m1: "undecided", m2: "attending", m3: "absent", m4: "attending", m5: "attending",
    m6: "undecided", m7: "attending", m8: "attending", m9: "attending", m10: "absent",
    m11: "undecided", m12: "attending", m13: "attending", m14: "absent", m15: "attending",
    m16: "attending", m17: "undecided", m18: "attending", m19: "attending", m20: "attending",
  },
};

export const SEED_EVENTS: TeamEvent[] = [
  { id: "e1", type: "practice", title: "練習", date: "2024-05-18", startTime: "09:00", endTime: "11:00", location: "日の出小学校 グラウンド" },
  { id: "e2", type: "practice", title: "練習", date: "2024-05-18", startTime: "14:00", endTime: "16:00", location: "日の出中学校 グラウンド" },
  { id: "e3", type: "match", title: "練習試合 vs 青空FC", date: "2024-05-19", startTime: "10:00", endTime: "12:00", location: "日の出中学校 グラウンド" },
  { id: "e4", type: "practice", title: "練習", date: "2024-05-22", startTime: "16:00", endTime: "18:00", location: "日の出小学校 グラウンド" },
  { id: "e5", type: "meeting", title: "保護者ミーティング", date: "2024-05-25", startTime: "10:00", endTime: "11:00", location: "日の出小学校 会議室" },
];

export const SEED_NOTIFICATIONS: AppNotification[] = [
  { id: "n1", title: "【重要】練習時間変更のお知らせ", body: "明日の練習は、天候の影響により時間を変更します。17:30集合でお願いします。", time: "5/17 18:30", read: false, important: true },
  { id: "n2", title: "練習試合のご案内", body: "今週日曜日に青空FCと練習試合を行います。詳細は別途ご連絡します。", time: "5/16 12:00", read: false, important: false },
  { id: "n3", title: "持ち物のご確認", body: "練習には必ず水分補給のための飲み物をご持参ください。", time: "5/15 20:00", read: true, important: false },
  { id: "n4", title: "お疲れ様でした！", body: "先日の練習、皆さん積極的に取り組んでくれました。次回も頑張りましょう！", time: "5/14 21:30", read: true, important: false },
];

export const MATCH_RESULTS: MatchResult[] = [
  {
    id: "r1",
    date: "2024年5月12日（日）",
    opponent: "青空FC",
    venue: "日の出中学校 グラウンド",
    myScore: 3,
    theirScore: 1,
    scorers: [
      { name: "田中 太郎", time: "前半 10分" },
      { name: "鈴木 一郎", time: "後半 5分" },
      { name: "山本 大輝", time: "後半 20分" },
    ],
    memo: "前半は良い攻守の切り替えができた。後半は集中力を切らさず勝利できた！",
  },
  {
    id: "r2",
    date: "2024年5月5日（日）",
    opponent: "西野SC",
    venue: "西野グラウンド",
    myScore: 1,
    theirScore: 2,
    scorers: [{ name: "田中 太郎", time: "前半 22分" }],
    memo: "守備の連携を改善する必要がある。次戦に活かそう。",
  },
];

export const SEED_PHOTOS: Photo[] = [
  { id: "p1", url: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=400&h=300&fit=crop&auto=format", caption: "試合の様子", category: "試合" },
  { id: "p2", url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop&auto=format", caption: "チーム全体写真", category: "試合" },
  { id: "p3", url: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop&auto=format", caption: "朝練の様子", category: "練習" },
  { id: "p4", url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=300&fit=crop&auto=format", caption: "ミーティング", category: "練習" },
  { id: "p5", url: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&h=300&fit=crop&auto=format", caption: "表彰式", category: "イベント" },
  { id: "p6", url: "https://images.unsplash.com/photo-1529450803116-5a1bedf5b1d2?w=400&h=300&fit=crop&auto=format", caption: "ドリブル練習", category: "練習" },
];

export const DEFAULT_SETTINGS: NotificationSettings = {
  schedule: true,
  notice: true,
  result: true,
};

export function blankAttendance(events: TeamEvent[]): Record<string, AttendanceRecord> {
  return Object.fromEntries(
    events.map((event) => [
      event.id,
      { status: "undecided" as const, comment: "", submitted: false },
    ]),
  );
}

/** 今季の勝敗。サンプル試合2件とは別に、デザインのシーズン成績を表示します。 */
export const SEASON_RECORD = [
  { label: "勝", value: 8, color: "#16A34A" },
  { label: "分", value: 2, color: "#6B7280" },
  { label: "敗", value: 2, color: "#8B1A1A" },
];
