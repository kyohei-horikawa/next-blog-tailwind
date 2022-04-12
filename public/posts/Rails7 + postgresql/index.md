---
title: "Rails7 + postgresql"
date: "2022/04/12 12:32:25"
tags: ["Rials","postgresql"]
summary: ""
---

# はじめに

環境

```:bash
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


```:bash
brew install postgresql
```

postgresqlを起動.

```:bash
brew services start postgresql
```

## 手順２

rails app の作成

```:bash
rails new my-app -d postgresql
cd my-app
```

dbの作成．

```:bash
rails db:create
```

サーバーの起動

```:bash
rails s
```


## 手順３

ブログ機能の追加

```:bash
rails g scaffold Blog title:string content:text
rails db:create db:migrate
rail s
```

```:bash
http://127.0.0.1:3000/blogs
```

にアクセス．

postgresを起動してないとアクセスできないので注意．

## 手順４

herokuにデプロイ．


```:bash
git add -A
git commit -m 'initial commit'
```

githubでリポジトリを作成．

```:bash
git remote add origin git@github.com:kyohei-horikawa/sandbox.git
git push -u origin main
```

```:bash
heroku create
git push heroku main
```

エラー

```:bash
Enumerating objects: 112, done.
Counting objects: 100% (112/112), done.
Delta compression using up to 8 threads
Compressing objects: 100% (96/96), done.
Writing objects: 100% (112/112), 27.17 KiB | 3.02 MiB/s, done.
Total 112 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Building on the Heroku-20 stack
remote: -----> Determining which buildpack to use for this app
remote: -----> Ruby app detected
remote: -----> Installing bundler 2.3.10
remote: -----> Removing BUNDLED WITH version in the Gemfile.lock
remote: -----> Compiling Ruby/Rails
remote: -----> Using Ruby version: ruby-3.0.2
remote: -----> Installing dependencies using bundler 2.3.10
remote:        Running: BUNDLE_WITHOUT='development:test' BUNDLE_PATH=vendor/bundle BUNDLE_BIN=vendor/bundle/bin BUNDLE_DEPLOYMENT=1 bundle install -j4
remote:        Your bundle only supports platforms ["arm64-darwin-20"] but your local platform
remote:        is x86_64-linux. Add the current platform to the lockfile with
remote:        `bundle lock --add-platform x86_64-linux` and try again.
remote:        Bundler Output: Your bundle only supports platforms ["arm64-darwin-20"] but your local platform
remote:        is x86_64-linux. Add the current platform to the lockfile with
remote:        `bundle lock --add-platform x86_64-linux` and try again.
remote:
remote:  !
remote:  !     Failed to install gems via Bundler.
remote:  !
remote:  !     Push rejected, failed to compile Ruby app.
remote:
remote:  !     Push failed
remote: Verifying deploy...
remote:
remote: !	Push rejected to fierce-headland-39155.
remote:
To https://git.heroku.com/fierce-headland-39155.git
 ! [remote rejected] main -> main (pre-receive hook declined)
error: failed to push some refs to 'https://git.heroku.com/fierce-headland-39155.git'
```

エラー文の通りに実行

```:bash
bundle lock --add-platform x86_64-linux
```

```:bash
git add .
git commit 'fix gamefile lock'
git push
git push heroku main
heroku run:detached rails db:migrate
```

まだ，エラー

```ruby:config/routes.rb
  root  'blogs#index'  #この1行を追加
```

