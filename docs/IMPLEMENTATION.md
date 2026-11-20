# 実装ガイド（プログラム初心者向け）

## このアプリは何をしているか

日の出キッカーズのチーム情報を、スマートフォンやPCのブラウザで見るための画面です。
サーバーやデータベースは使わず、ブラウザに保存できるローカルストレージを使っています。
そのため、デモとしてすぐ動かせます。

## 画面の流れ

1. `src/app/page.tsx` が最初に表示されます。
2. `AppProvider` がログイン状態やチームデータを管理します。
3. `AppRoot` がログイン画面かメイン画面を選びます。
4. メイン画面では、タブの状態によってホーム・スケジュール・お知らせ・アルバム・メニューを切り替えます。

## ディレクトリ構成

```text
src/
  app/                 ページ全体と共通スタイル
  components/
    auth/              ログイン・新規登録
    home/              ホーム画面
    schedule/          カレンダー・予定
    attendance/        出欠確認
    notifications/     お知らせ
    album/             写真アルバム
    menu/              メニュー・設定
    shell/             ナビゲーション
    app-state.tsx      アプリ全体の状態管理
    app-root.tsx       画面の切り替え
  lib/
    data.ts            サンプルデータ
    types.ts           TypeScriptの型
    storage.ts         localStorage保存処理
    format.ts          日付などの変換処理
public/
  manifest.webmanifest PWAの設定
  sw.js                オフライン対応
  icons/               PWAアイコン
```

## ReactとTypeScriptの基本

TypeScriptは、データに「文字列」「数値」などの型を持たせることで、入力ミスを減らします。
例えば `src/lib/types.ts` の `AttendanceStatus` は、出欠を次の3種類だけに限定しています。

```ts
type AttendanceStatus = "attending" | "absent" | "undecided";
```

つまり、出欠状態にそれ以外の文字を入れるとTypeScriptがエラーとして教えてくれます。

Reactでは、画面を変える値を `useState` とコンテキストで管理します。
このアプリでは `src/components/app-state.tsx` の `AppProvider` が、タブ・イベント・通知・出欠・設定をまとめています。

## 状態管理の流れ

画面から `useApp()` を呼ぶと、共通のデータや操作関数を受け取れます。

```ts
const { tab, setTab } = useApp();
```

ボタンを押すと `setTab("schedule")` のように状態が変わり、`AppRoot` が表示する画面を切り替えます。

新しいデータは、次のような流れで保存されます。

1. ユーザーがボタンやフォームを操作する
2. コンポーネントが `AppProvider` の関数を呼ぶ
3. `setEvents`などで画面の状態を更新する
4. `useEffect` が変更を検出する
5. `savePersisted` がlocalStorageへ保存する

ブラウザを再読み込みしても、保存データを `loadPersisted` で読み戻します。

## レスポンシブ対応

Tailwind CSSの `lg:` は、画面幅が広いときだけスタイルを適用する指定です。

```tsx
<div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
```

スマートフォンでは `pb-20` を使って下部ナビゲーションの高さを確保し、PCでは `lg:pb-6` に変更します。
ナビゲーションは `src/components/shell/navigation.tsx` にあります。

- `lg:hidden` の下部ナビゲーションはスマートフォン向け
- `lg:flex` のサイドバーはPC向け

## Tailwind CSSとFigmaデザイン

チームカラーは赤（`#8B1A1A`）を基準にしています。
値が複数の画面で使われるため、共通定義は `src/lib/constants.ts` に置いています。

カードは角丸・薄い境界線・白背景・控えめな影を基本にし、スマホでは余白を狭め、PCでは広げます。

## PWA対応

PWAは、スマートフォンのホーム画面からアプリ風に起動できる仕組みです。

- `public/manifest.webmanifest`：アプリ名、アイコン、スタンドアロン表示を設定
- `public/icons/`：192px、512px、Apple用アイコン
- `public/sw.js`：画面やアイコンをキャッシュし、オフライン時に表示
- `src/components/pwa-register.tsx`：本番環境でService Workerを登録

Service Workerは開発中では登録しません。開発時の古いキャッシュによる混乱を防ぐためです。
本番ビルドでは登録されます。

## デモの範囲

現在のログインは実在のアカウント確認を行わないデモです。
メールアドレスとパスワードが空でなければログインできる仕様になっています。
サンプルデータも `src/lib/data.ts` に定義されています。

本番運用では、次の部分をサーバーや外部サービスへ置き換える必要があります。

- 本物の認証
- チーム・メンバー・予定のデータベース
- 写真のアップロード
- プッシュ通知
- 複数端末間のデータ同期

## よく使うコマンド

```powershell
npm run dev       # 開発サーバーを起動
npm run build     # 本番用にビルド
npm run start     # ビルド済みアプリを起動
npm run lint      # コードチェック
```

## データを初期状態に戻す方法

ブラウザの開発者ツールでApplication > Local Storageを開き、`hinode-kickers-v1` を削除して再読み込みします。
アプリはサンプルデータから再スタートします。
