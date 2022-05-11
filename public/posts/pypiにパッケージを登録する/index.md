---
title: "pypiにパッケージを登録する"
date: "2022/05/11 03:51:57"
tags: ["Python","pypi"]
summary: ""
---

# はじめに

Rubyでは，```bundle```を使うことで，cliコマンドを作成し，自分のマシンにgemとして，インストールすることが容易にできた．

また，https://rubygems.org/
に登録することで，他人への配布も容易である．

今回は，このシステムのpyhton版を調べた結果を共有する．


# gem VS pypi

|                  | gem                   | pypi (Python Package Index ) |
| ---------------- | --------------------- | ---------------------------- |
| 言語             | Ruby                  | Python                       |
| ホスティング先   | https://rubygems.org/ | https://pypi.org/            |
| インストール方法 | gem install <gem名>   | pip3 install <パッケージ名>  |


比較すると，ほとんど同じということがわかる．

# pypiにユーザー登録をする

pypiには，テスト版が存在し，初めにこちらで動作を確認するのがいい．


- https://test.pypi.org/
- https://pypi.org/


二つとも登録する．

# pypircの作成

登録した情報をもとに，

```~/.pypirc```を作成する．これは，pypiにアップロードする際の，アカウント情報を記憶しておくファイルである．

```:~/.pypirc
[distutils]
index-servers =
  pypi
  testpypi

[pypi]
repository: https://upload.pypi.org/legacy/
username: username
password: password

[testpypi]
repository: https://test.pypi.org/legacy/
username: kyohei3430
password: password
```

# 実際にやってみる

```~/MyWork/```をルートとして，作業する，(これは自分の設定．合わせる必要はない．)

まずは，githubでリポジトリを作る．

ここで，

- README.mdを追加
- Python用のgitignoreを追加
- MITライセンスを追加

することを忘れずに．


```myapp```という名前でリポジトリを作ったとする．

```bash:bash
git clone git@github.com:kyohei-horikawa/myapp.git
cd myapp
mkdir myapp
```

```bash:bash
~/m/myapp (main=)
❯❯❯ tree -a -L 1
.
├── .git
├── .gitignore
├── LICENSE
├── README.md
└── myapp

2 directories, 3 files
```

myappの中にもう一つmyappを作る．

```bash:bash
touch setup.py
touch myapp/__init__.py
touch myapp/myapp.py
```

必要なファイルを作っておく．
それぞれ，編集していく．


```python:myapp/__init__.py
__VERSION__ = '0.0.1'
```

```python:myapp/myapp.py
def main():
  print('Hello from myapp!')
```

```python:setup.py
# coding: utf-8

from setuptools import setup, find_packages
from myapp import __VERSION__


with open('README.md') as f:
    readme = f.read()

with open('LICENSE') as f:
    license_txt = f.read()

setup(
    name='myapp',
    version=__VERSION__,
    description='my first app for pypi',
    entry_points={
        "console_scripts": [
            "myapp = myapp.myapp:main"
        ]
    },
    long_description=readme,
    author='Kyohei Horikawa',
    author_email='kyohei3430@gmail.com',
    url='https://github.com/kyohei-horikawa/myapp',
    license=license_txt,
    packages=find_packages(exclude=('sample',))
)
```

必要なところを編集していく．

ここで重要になるのが，```entry_points```の部分である．こうすることで，myappと打つとcliコマンドのように，```myapp/myapp.py```のmain
が呼び出される．左辺を変えるとコマンド名を変えることも可能．パッケージ名と同じである必要はない．


これでひとまず準備完了です．

# ローカルにインストール

```bash:bash
python3 setup.py sdist
pip3 install dist/myapp-0.0.1.tar.gz
```

```bash:bash
Successfully installed myapp-0.0.1
```

インストール成功．

```bash:bash
~/m/myapp (main ☡=)
❯❯❯ myapp
Hello from myapp!
```

コマンドラインアプリケーションとして，インストールできたことが確認できた．

# pypiにアップロード

いよいよpypiにアップロード．ここで問題がある．

パッケージ名被りである．myappでは被っているので，一意な名前をつける．

```python:setup.py
setup(
    name='kyohei',
)

```

```bash:bash
rm -rf dist/ myapp.egg-info/
```

プロジェクト名を変えたので，
先ほどのフォルダをクリーンアップ．


```bash:bash
pip3 install twine wheel
python3 setup.py sdist bdist_wheel
python3 -m twine upload -r testpypi dist/* --verbose
```

これで，テスト用のpypiにアップロードできた．
https://test.pypi.org/project/kyohei/

```bash:bash
pip install -i https://test.pypi.org/simple/ kyohei
```

誰でもインストールできる状態に．

先ほど，コマンド名は```myapp```にしていたので，

```bash:bash
myapp
```

で起動し確認．


同様の手順で，本番用pypiにもアップロードできるはず．


# 実際にパッケージを作ってみた

ここまでやって，正直bundleの方が楽だと感じた．
そこで，この一連の作業をcliアプリにして，pypiにアップした．

まずは，完成品から．

- https://pypi.org/project/PyBundleCli/0.0.5/
- https://github.com/kyohei-horikawa/PyBundleCli

```bash:bash
pip3 install PyBundleCli
pybundle init
pybundle config set git_account 'kyohei-horikawa'
pybundle new hello
cd hello
```

ローカルに作るなら，

```bash:bash
python3 setup.py sdist
pip3 install dist/
```

だいぶ便利に使えるようになった．

- requirements.txtの扱いを考える



# local install, uploadもコマンドにする

面倒なことはパソコンにやらせよう．

```bash:bash
git clone git@github.com:kyohei-horikawa/pypi.git
```

https://github.com/kyohei-horikawa/pypi

```python:pypi.py
import fire
import subprocess
import os
from pathlib import Path


class Cli:
    def get_new_path(self):
        paths = list(Path('./dist').glob(r'*.tar.gz'))
        paths.sort(key=os.path.getmtime)
        return paths[-1]

    def local(self):
        subprocess.call(['python3', 'setup.py', 'sdist'])
        subprocess.call(['pip3', 'install', self.get_new_path()])

    def upload(self, to):
        subprocess.call(['python3', 'setup.py', 'sdist', 'bdist_wheel'])
        subprocess.call(['python3', '-m', 'twine', 'upload', '-r', to, self.get_new_path(), '--verbose'])


def main():
    fire.Fire(Cli)
```

```dist/*.tar.gz```をソートして，最新のものを取得して，先程のコマンドをラップ．

これだけ．
