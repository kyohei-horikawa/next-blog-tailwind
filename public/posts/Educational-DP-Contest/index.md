---
title: "Educational DP Contest"
date: "2022/02/21 15:00:47"
tags: ["AtCoder","Python"]
summary: "Educational DP Contestのまとめ"
---

# はじめに

AtCoderを解いていて，dp問題というものが出てきて，よくわからなかったので練習してみることにした．

今回練習に用いたのは，[Educational DP Contest](https://atcoder.jp/contests/dp)．

その記録を残していく．

# DP問題とは

動的計画法(dynamic programming)の略であり，対象となる問題を帰納的に解く場合にくり返し出現する小さな問題例について、
解を表に記録し表を埋めていく形で計算をすすめ、冗長な計算をはぶくアルゴリズムのことをいう.[^1]

漸化式のように，以前の状態が次以降の状態の影響を与えるものだと，自分の中では理解した．

# A - Frog 1

![a](/posts/Educational-DP-Contest/a.png)

```python:a.py
import sys
input = sys.stdin.readline


def main():
    N = int(input().rstrip())
    H = list(map(int, input().rstrip().split()))
    dp = [0] * N
    dp[0] = 0
    dp[1] = abs(H[0] - H[1])

    for i in range(2, N):
        tmp1 = dp[i - 1] + abs(H[i - 1] - H[i])
        tmp2 = dp[i - 2] + abs(H[i - 2] - H[i])
        dp[i] = min(tmp1, tmp2)

    print(dp[-1])


if __name__ == "__main__":
    main()
```

## 自分なりの解説

```:テストケース
4
10 30 40 20
```

- 状態1のコストは0で確定．
- 状態2は1からしか来ることができないので，コストは20で確定．
- 状態3のコストは，
  - 1から来る場合，30．元のコスト0と合わせて，30．
  - 2から来る場合，10．元のコスト20と合わせて，30．
  - これらの最小値を取り30．
- 状態4のコストは，
  - 2から来る場合，10．元のコスト20と合わせて，30．
  - 3から来る場合，20．元のコスト30と合わせて，50．
  - これらの最小値を取り30．

# B - Frog 2

![b](/posts/Educational-DP-Contest/b.png)

```python:b.py
import sys
input = sys.stdin.readline


def main():
    N, K = map(int, input().split())
    H = list(map(int, input().split()))
    dp = [0] * N
    dp[0] = 0
    dp[1] = abs(H[0] - H[1])

    for i in range(2, N):
        j = i - 1
        res = []
        while j >= 0 and j >= i - K:
            res.append(dp[j] + abs(H[i] - H[j]))
            j -= 1
        dp[i] = min(res)

    print(dp[-1])


if __name__ == "__main__":
    main()
```

## 自分なりの解説

A問題と異なる点は，
- Aでは，ジャンプの幅が1or2
- Bでは，1~kの間
という点．

今回の制約は,

$$
2 \leq N \leq 10^5
$$
$$
1 \leq K \leq 100
$$
なので，すべてのNについて100回計算しても，計算量は$10^7$程度．

制限時間は，2secなので余裕で間に合う．[^2]

# C - Vacation

![b](/posts/Educational-DP-Contest/c_1.png)

```python:c.py
import sys
input = sys.stdin.readline


def main():
    N = int(input())
    ABC = []
    for _ in range(N):
        ABC.append(list(map(int, input().split())))

    dp = [[0, 0, 0] for _ in range(N)]
    dp[0][0] = ABC[0][0]
    dp[0][1] = ABC[0][1]
    dp[0][2] = ABC[0][2]

    for i in range(1, N):
        for j in range(3):
            if j == 0:
                dp[i][j] = max(dp[i - 1][1], dp[i - 1][2]) + ABC[i][j]
            elif j == 1:
                dp[i][j] = max(dp[i - 1][2], dp[i - 1][0]) + ABC[i][j]
            elif j == 2:
                dp[i][j] = max(dp[i - 1][0], dp[i - 1][1]) + ABC[i][j]
    print(max(dp[-1]))


if __name__ == "__main__":
    main()
```

## 自分なりの解説

![b](/posts/Educational-DP-Contest/c_2.png)

A,B,Cのどの行動をしたのかを記録するためにdpを2次元配列にする．

連続して同じ行動を取れないので，前のstateの違う行動からノードを伸ばす．


[^1]: [動的計画法 フリー百科事典『ウィキペディア（Wikipedia）』](https://ja.wikipedia.org/wiki/%E5%8B%95%E7%9A%84%E8%A8%88%E7%94%BB%E6%B3%95)
[^2]: [計算量のはなし Hello Wor.log](https://cppx.hatenablog.com/entry/2017/08/06/104144)
