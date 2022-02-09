import datetime
import sys
import glob

files = glob.glob("./posts/*.md")
now = datetime.datetime.today().strftime('%Y/%m/%d %H:%M:%S')

if len(sys.argv) == 1:
    print('ファイル名を入力してください．')
    file_name = input()
else:
    file_name = sys.argv[1]

file_path = './posts/' + file_name + '.md'

if file_path in files:
    print('既に存在しています．')
    sys.exit()

with open(file_path, 'w') as f:
    template = f'''---
title: "{file_name}"
date: "{now}"
tags: ["タグ1","タグ２"]
---
'''
    f.write(template)