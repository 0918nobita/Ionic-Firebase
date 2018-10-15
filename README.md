# Ionic-Firebase

技術同人誌「IonicとFirebaseでゼロからはじめるアプリ開発」を読みながら作成したプログラム

## ionic-board プロジェクトについて

セキュリティ上の理由から、Firebase の認証情報を格納している ``ionic-board/src/config.ts`` は git の管理対象から外してあります。そのため ionic-board プロジェクトで起動するためにはそれを手動で作成する必要があります。

```ts
export const firebaseConfig = {
  apiKey: 'xxxxxxxxxxxxxxxxxxxxx',
  authDomain: 'xxxxxxxxxxxxxxxxxxxxx',
  databaseURL: 'xxxxxxxxxxxxxxxxxxxxx',
  projectId: 'xxxxxxxxxxxxxxxxxxxxx',
  storageBucket: 'xxxxxxxxxxxxxxxxxxxxx',
  messagingSenderId: 'xxxxxxxxxxxxxxxxxxxxx'
};
```

Firebase Console から入手したそれぞれの文字列を、伏せている部分に当てはめてください。

### 開発用サーバーの起動

```bash
$ cd ionic-board
$ npx ionic serve
```
