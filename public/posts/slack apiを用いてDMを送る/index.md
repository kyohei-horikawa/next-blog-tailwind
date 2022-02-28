---
title: "slack apiを用いてDMを送る"
date: "2022/02/28 16:17:10"
tags: ["Python","Slack"]
summary: ""
---


# はじめに
[元qiita記事](https://qiita.com/kyohei-horikawa/items/db33945f6a50ed4f61ae)


slackはUIがよく変更されるので，最新の情報があまりなかった．
そのため，自分用にメモを残す．
2021/2/5 の情報です．

## 追記

slackerはもうアップデートがなされないということで，[Python Slack SDK](https://github.com/slackapi/python-slack-sdk)を用いた方法も記載する．

```:terminal
pip install slack_sdk
```

# 手順1 ワークスペースにAppを追加する．
https://api.slack.com/apps/
にアクセスし，ログインする．

![スクリーンショット 2021-02-05 2.18.24.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/636794/dcbbd305-1cca-d95c-7f0f-b2da2669ec1a.png)

![スクリーンショット 2021-02-05 2.20.14.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/636794/29b2a141-6a4c-8baa-e035-3a84d55b3c75.png)

Create New APP から

- Appの名前
- インストールしたいワークスペースを選択.


# 手順2 Permissionsの追加.

Permissionsを選択
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/636794/34ce531e-5a10-47db-db3e-ba312029db0d.png)

BOTとして投稿するなら，BOT Token Scopes
ユーザーとして投稿するなら，User Token Scopesを選択する．

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/636794/44e59855-072b-ba63-0ae6-4259d51d34e8.png)


今回はBOTとして進めます．

![スクリーンショット 2021-02-05 2.40.30.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/636794/10db3e8f-4f8d-a351-7d2b-e3c37a3a3ad4.png)

これらのPermissionを追加してください．(不要なものが混じっているかも．．)

完了後，インストールします．
![スクリーンショット 2021-02-05 2.45.06.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/636794/cdb17284-8165-6275-b143-0b6506d11e49.png)

アクセストークンをコピーします．
![スクリーンショット 2021-02-05 2.46.35.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/636794/2cd324c2-5353-f9f2-30a5-5d866d44978f.png)


# 手順3 users_list，user_idを取得する．
はじめに使用するのは，[users.list](https://api.slack.com/methods/users.list/test)のapiです．
アクセスして，先ほどのトークンを貼り付けてください．

![スクリーンショット 2021-02-05 2.51.31.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/636794/86b600a3-b534-3d98-ebde-61d46e9f593b.png)

"ok"trueになっていたら成功です．
ずらずらとメンバーのリストが返ってきました．このままでは見づらいのでPythonを用いて加工しましょう．

環境です．

```:terminal
❯❯❯ python --version
Python 3.7.4

❯❯❯ which python
/Users/kyohei/.pyenv/shims/python
```

## slacker

```:terminal
❯❯❯ pip install slacker

❯❯❯ pip show slacker
Name: slacker
Version: 0.14.0
以下略
```

```python:getid.py
from slacker import Slacker

token = "your access token"
slacker = Slacker(token)

res = slacker.users.list()
for member in res.body['members']:
    print(member['name'])
    print(member['id'])
    print()
```
注意点として，slackerのレスポンスにアクセスするためには，bodyを経由するということです．
詳しくは[slackerのgithub](https://github.com/os/slacker)を参照してください．

## Python Slack SDK

```python:getid.py
from slack_sdk import WebClient

token = "your access token"

client = WebClient(token)
res = client.users_list()

for member in res['members']:
    print(member['name'])
    print(member['id'])
    print()

```

Python Slack SDKでは，resに対してbodyを経由しない．

これで，ワークスペース内のメンバーのuser_idが取得できました．

# 手順4 DMを送る．

DMを送るためには，相手とのDMをオープンしてあげます．

昔の記事では，[im.open](https://api.slack.com/methods/im.open)を使用する記事が多いようですが，deprecated(非推奨)のようです．

[conversations.open](https://api.slack.com/methods/conversations.open/test)のAPIを用います．アクセスしてテストしましょう．

usersの欄に先ほどpythonで取得した，user_idを入力します．
![スクリーンショット 2021-02-05 3.03.18.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/636794/72599fde-87a5-470c-0f21-d0e74a5623e6.png)


レスポンスに出てきたidがDMをするためのidとなります．
(user_idとdmのためのchannel_idを区別しておくこと)

これもpythonから取得していきます．

## slacker

```python:dm.py
from slacker import Slacker

token = "your access token"
slacker = Slacker(token)
user_id = "手順3で取得した user_id"
message = "DMです．"

# DMを開く
res = slacker.conversations.open(users=user_id)
dm_id = res.body['channel']['id']

# DMを送信する
slacker.chat.post_message(channel=dm_id, text=message)
```

## Python Slack SDK

```python:dm.py
from slack_sdk import WebClient

token = "your access token"

client = WebClient(token)
user_id = '手順3で取得した user_id'

# DMを開き，channelidを取得する．
res = client.conversations_open(users=user_id)
dm_id = res['channel']['id']

# DMを送信する
client.chat_postMessage(channel=dm_id, text='DMです')
```
これでDMが送信できます．
あとはコードを改良して，一斉送信にするなどして利用してください．
