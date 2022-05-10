---
title: "Rails7+richtext"
date: "2022/04/14 13:54:25"
tags: ["Rails"]
summary: ""
---


```:bash
rails action_text:install
bundle install
rails db:migrate
```

action_text用のdbをmigrateする．

```:bash
rails active_storage:install
rails g scaffold user name portrait:attachment
rails db:migrate
```

```ruby:app/views/users/_form.html.erb
<div class="my-5">
    <%= form.label :name %>
    <%= form.rich_text_area :name ,class: "block shadow rounded-md border border-gray-200 outline-none px-3 py-2 mt-2 w-full"%> #この１行を追加
</div>
```

```ruby:app/models/user.rb
class User < ApplicationRecord
  has_one_attached :portrait
  has_rich_text :name #この１行を追加
end
```
c
