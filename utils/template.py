import subprocess
import datetime
import sys
import glob

files = glob.glob("./public/posts/*/*.md")
now = datetime.datetime.today().strftime('%Y/%m/%d %H:%M:%S')

if len(sys.argv) == 1:
    print('ファイル名を入力してください．')
    slug = input()
else:
    slug = sys.argv[1]

file_path = './public/posts/' + slug + '/index.md'

if file_path in files:
    print('既に存在しています．')
    sys.exit()

subprocess.run(['mkdir', '-p', './public/posts/' + slug])

with open(file_path, 'w') as f:
    template = f'''---
title: "{slug}"
date: "{now}"
tags: ["タグ1","タグ2"]
summary: ""
---

'''
    f.write(template)

subprocess.run(['code', file_path])
