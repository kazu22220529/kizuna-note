# 日の出キッカーズ

サッカーチームのスケジュール、出欠、通知、試合結果、写真を一つの画面から管理するNext.jsアプリです。
スマートフォンでは下部ナビゲーション、PCでは左サイドバーで操作できるレスポンシブ構成です。

## 主な機能

- ログイン・新規登録画面
- ホームダッシュボード
- スケジュール・イベント登録
- 出欠回答と回答の変更
- お知らせの確認・投稿
- 試合結果の確認
- 写真アルバム
- メンバー一覧と招待コード
- 通知設定
- PWA対応

## 技術構成

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- localStorageによるブラウザ保存
- Web App Manifest / Service Worker

## セットアップ

```powershell
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

本番確認:

```powershell
npm run build
npm run start
```

## 初期ログイン

デモのため、メールアドレスとパスワード欄に空でない値を入れればログインできます。

```text
メールアドレス: yamada@example.com
パスワード: password
```

ログイン状態、イベント、通知、出欠、アルバム、通知設定はブラウザのlocalStorageに保存されます。

## 詳しい解説

プログラム初心者向けの解説は [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md) を参照してください。
