# 更新部署

重新拉取 GitHub 项目代码

## 接口更新

```
cd cwd-api
npm install
npm run deploy
```

重新部署到 Cloudflare Workers.

## 后台更新

```
cd cwd-admin
npm install
npm run build
```

将打包后的代码更新到你托管的地方（例如 Cloudflare Pages、GitHub Pages、Netlify 等）。  

## 评论端更新

使用最新的 `cwd.js` ，你可以托管到任何地方，不受限制。

如果你不想自己托管，请使用官方的链接：`https://cwd.zishu.me/cwd.js`

不需要手动更新，每次评论端加载时会自动检查更新。
