- ヘーダーをレスポンシブ対応にする
  > リンクをハンバーガーメニューにする
- prisma adapter を 入れないと google provider が使えない [prisma-adapter](https://zenn.dev/ohtasoji/articles/439eea63f1828c)
- あと sign up は普通に prisma 側だったから, nodeemaier を使ってメール登録ができる [shin code のやつ](https://www.youtube.com/watch?v=ERo_JwWohoQ) [海外のやつ](https://www.youtube.com/watch?v=g6sTypMUx48)
  > 海外のほうが詳しいと思うけど説明はshincodeのやつ見よう
- あと loading とか 404 とか https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming ここらへん

# ここはMarkdownを書く本命のところ関係

## 考えている概要

> dynalist のようなヘッダーとエクスプローラでファイルやディレクトリを簡単にドラッグでそろえれる、<br>
> そして telescope のようなファイル検索で簡単に検索できるようにする<br>
> あとはもちろん自分の書いたものを公開できるようにする。<br>
> であとは user をちゃんとしているのでユーザー名とかアイコンとかを自分で設定できて、<br>
> 自分のファイルを共有できるようにする<br>
> そこで vscode の liveshare のような感じでほかのカーソルが見えたりなど、<br>
> すべての機能を統合させて使いやすくする。<br>

## 実装したい機能の説明

- header
  - ほぼdynalistと同じでいいと思う
- explorer
  - これも自分の作ったやつを参考にしてあとはデザインをきれいにして、<br>
    ドラッグアンドドロップでソートできるようにする。<br>
  - そこで telescope のようなファイル検索を実装して、<br>
    いちいちエクスプローラーで見つけなくてもよくする。(最悪これは自分がつけたい程度だからいらないかも)
- file share
  - 自分のファイルを共有できるようにする,
    vscode の liveshare をイメージして、<br>
    余裕があったらフォルダごともやりたい (多分考えているロジックじゃできない, それようのpage作るしかないかも)
- user

  - 自分のユーザー名とアイコンを自分で設定できるようにする
  - ダークテーマとかtelescope のキーマッピングとか
  - postgressql で json で保存する

- markdown
  - これは [stackedit](https://stackedit.io/app#) のような感じに contenteditable で編集して、
    それを保存してみたいな？

TODO: とりあえず write と preview を作成してあとでいろいろと追加する

**explorer とかではなく、 workspace を作れば全部解決,<br>
file share とかは workspace 全体で設定すればいい,**

docuemnt,direcotyrとかではなく、全てdocuemntというふうにして、childrenがいるかどうかでiconを変更して、
そうしたほうがその括りに対しても説明がつけれるからそうしよう。
