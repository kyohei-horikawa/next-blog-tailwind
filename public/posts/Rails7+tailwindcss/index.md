---
title: "Rails7+tailwindcss"
date: "2022/04/14 13:00:00"
tags: ["Rails","Tialwindcss"]
summary: ""
---


```:bash
rails new myapp -d postgresql --css tailwind
```

これで，データベースはpostgresql,cssにtailwindcssを使用する準備ができた．

```:bash
rails db:create
```

データベースを作成．

```:bash
foreman start -f Procfile.dev
```

で，サーバーを起動して，http://127.0.0.1:3000 を確認．

```:bash
rails g scaffold Post title:string content:string
```

scaffold(足場，雛形)を作成．

```:bash
rails db:migrate
```

Post用のデータベースを準備．

http://127.0.0.1:3000/posts を確認．

tailwindを用いたpostページが確認できる．


```ruby:app/views/posts/index.html.erb
<div class="w-full">
  <% if notice.present? %>
    <p class="py-2 px-3 bg-green-50 mb-5 text-green-500 font-medium rounded-lg inline-block" id="notice"><%= notice %></p>
  <% end %>

  <div class="flex justify-between items-center">
    <h1 class="font-bold text-4xl">Posts</h1>
    <%= link_to 'New post', new_post_path, class: "rounded-lg py-3 px-5 bg-blue-600 text-white block font-medium" %>
  </div>

  <div id="posts" class="min-w-full">
    <%= render @posts %>
  </div>
</div>
```

htmlタグには，```class=""```の形で，erbには，```class: ""```の形でクラス指定していることがわかる．

これらのプロパティはhttps://nerdcave.com/tailwind-cheat-sheet で確認できる．
