# 评论数据导入导出

数据导入导出接口用于从其他评论系统迁移数据或备份当前评论数据。

所有接口都需要在请求头中携带 Bearer Token。

```http
Authorization: Bearer <token>
```

## 1.1 导出所有评论数据

```
GET /admin/comments/export
```

导出所有评论数据，返回格式为 JSON，字段与数据库结构一致。

- 方法：`GET`
- 路径：`/admin/comments/export`
- 鉴权：需要（Bearer Token）

**成功响应**

- 状态码：`200`

```json
[
	{
		"id": 1,
		"pub_date": "2026-01-13 10:00:00",
		"post_slug": "/blog/hello-world",
		"author": "张三",
		"email": "zhangsan@example.com",
		"url": "https://zhangsan.me",
		"ip_address": "127.0.0.1",
		"device": "Desktop",
		"os": "Windows 10",
		"browser": "Chrome 90",
		"user_agent": "Mozilla/5.0 ...",
		"content_text": "很棒的文章！",
		"content_html": "很棒的文章！",
		"parent_id": null,
		"status": "approved"
	}
]
```

**错误响应**

- 导出失败：
  - 状态码：`500`

  ```json
  {
  	"message": "导出失败"
  }
  ```

## 1.2 导入评论数据

```
POST /admin/comments/import
```

导入评论数据，支持 JSON 格式，可以是单个对象或数组。

- 方法：`POST`
- 路径：`/admin/comments/import`
- 鉴权：需要（Bearer Token）

**请求体**

```json
[
	{
		"id": 5,
		"pub_date": "2026-01-20T04:36:57.636Z",
		"post_slug": "",
		"author": "1024605422",
		"email": "1024605422@qq.com",
		"url": null,
		"ip_address": "15.235.156.27",
		"device": "Desktop",
		"os": "Windows 10",
		"browser": "Chrome 143.0.0.0",
		"user_agent": "Mozilla/5.0 ...",
		"content_text": "试一下",
		"content_html": "试一下",
		"parent_id": null,
		"status": "approved"
	}
]
```

字段说明：与导出格式一致。如果不提供 `id`，则会自动生成。

**成功响应**

- 状态码：`200`

```json
{
	"message": "成功导入 1 条评论"
}
```

**错误响应**

- 导入数据为空：
  - 状态码：`400`

  ```json
  {
  	"message": "导入数据为空"
  }
  ```

- 导入失败：
  - 状态码：`500`

  ```json
  {
  	"message": "导入失败"
  }
  ```
