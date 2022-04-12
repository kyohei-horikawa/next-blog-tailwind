---
title: "Rails7 + postgresql"
date: "2022/04/12 12:32:25"
tags: ["Rials","postgresql"]
summary: ""
---

# はじめに

環境

```bash
❯❯❯ ruby -v
ruby 3.0.2p107 (2021-07-07 revision 0db68f0233) [arm64-darwin20]

❯❯❯ rails -v
Rails 7.0.2.3

❯❯❯ postgres --version
postgres (PostgreSQL) 14.2
```

# 手順

## 手順１
postgresqlをインストール．


```bash
brew install postgresql
```

postgresqlを起動.

```bash
brew services start postgresql
```

## 手順２

rails app の作成

```bash
rails new my-app -d postgresql
cd my-app
```

dbの作成．

```bash
rails db:create
```

サーバーの起動

```bash
rails s
```


## 手順３

ブログ機能の追加

```bash
rails g scaffold Blog title:string content:text
rails db:create db:migrate
rail s
```

```bash
http://127.0.0.1:3000/blogs
```

にアクセス．

postgresを起動してないとアクセスできないので注意．

## 手順４

herokuにデプロイ．


```bash
git add -A
git commit -m 'initial commit'
```

githubでリポジトリを作成．

```bash
git remote add origin git@github.com:kyohei-horikawa/sandbox.git
git push -u origin main
```
