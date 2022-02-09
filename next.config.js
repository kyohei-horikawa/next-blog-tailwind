const withLinaria = require("next-linaria");

module.exports = withLinaria({
  linaria: {
    /**
     * https://vercel.com/docs/build-step#caching
     * で記載されているディレクトリにビルド結果をキャッシュさせる
     */
    cacheDirectory: "./.next/cache/.linaria-cache",
  },
});
