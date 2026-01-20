# 前端配置

**这里仅提供一套开箱即用的方案，如果是个人开发者可以根据 API 文档自行编写前端评论组件。**

## 评论组件初始化

在初始化 `CWDComments` 实例时，可以传入以下配置参数：

```html
<script src="https://cwd-comments.zishu.me/cwd-comments.js"></script>
<div id="comments"></div>
<script>
	const comments = new CWDComments({
		el: '#comments',
		apiBaseUrl: 'https://your-api.example.com',
		postSlug: window.location.origin + window.location.pathname,
	});
	comments.mount();
</script>
```

### 参数说明

| 参数         | 类型                    | 必填 | 默认值                                                           | 说明                      |
| ------------ | ----------------------- | ---- | ---------------------------------------------------------------- | ------------------------- |
| `el`         | `string \| HTMLElement` | 是   | -                                                                | 挂载元素选择器或 DOM 元素 |
| `apiBaseUrl` | `string`                | 是   | -                                                                | API 基础地址              |
| `postSlug`   | `string`                | 是   | 当前页面 URL `window.location.origin + window.location.pathname` | 文章唯一标识符            |
| `theme`      | `'light' \| 'dark'`     | 否   | `'light'`                                                        | 主题模式                  |
| `pageSize`   | `number`                | 否   | `20`                                                             | 每页显示评论数            |

## 实例方法

| 方法                   | 说明                           |
| ---------------------- | ------------------------------ |
| `mount()`              | 挂载组件到 DOM                 |
| `unmount()`            | 卸载组件                       |
| `updateConfig(config)` | 更新配置（支持动态切换主题等） |
| `getConfig()`          | 获取当前配置                   |

## 使用示例

```javascript
// 动态切换主题
comments.updateConfig({ theme: 'dark' });

// 切换文章
comments.updateConfig({ postSlug: 'another-post' });
```
