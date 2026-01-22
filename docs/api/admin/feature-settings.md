# 功能设置相关

管理点赞功能开关的接口。

## 获取功能设置

```
GET /admin/settings/feature
```

获取当前的功能开关配置。

- 方法：`GET`
- 路径：`/admin/settings/feature`
- 鉴权：需要 Bearer Token

**成功响应**

- 状态码：`200`

```json
{
  "enableCommentLike": true,
  "enableArticleLike": true
}
```

字段说明：

| 字段名             | 类型    | 说明                   |
| ------------------ | ------- | ---------------------- |
| `enableCommentLike` | boolean | 是否启用评论点赞功能 |
| `enableArticleLike` | boolean | 是否启用文章点赞功能 |

## 更新功能设置

```
PUT /admin/settings/feature
```

更新功能开关配置。

- 方法：`PUT`
- 路径：`/admin/settings/feature`
- 鉴权：需要 Bearer Token

**请求头**

| 名称           | 必填 | 示例               |
| -------------- | ---- | ------------------ |
| `Content-Type` | 是   | `application/json` |
| `Authorization` | 是   | `Bearer <token>` |

**请求体**

```json
{
  "enableCommentLike": true,
  "enableArticleLike": true
}
```

字段说明：

| 字段名             | 类型    | 必填 | 说明                   |
| ------------------ | ------- | ---- | ---------------------- |
| `enableCommentLike` | boolean | 否   | 是否启用评论点赞功能 |
| `enableArticleLike` | boolean | 否   | 是否启用文章点赞功能 |

**成功响应**

- 状态码：`200`

```json
{
  "message": "Saved successfully"
}
```

**错误响应**

- 状态码：`401`

```json
{
  "message": "Unauthorized"
}
```

- 状态码：`500`

```json
{
  "message": "Failed to save feature settings"
}
```
