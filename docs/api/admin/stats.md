# 统计数据

统计数据接口用于获取评论统计、域名列表等数据看板相关信息。

所有接口都需要在请求头中携带 Bearer Token。

```http
Authorization: Bearer <token>
```

## 1.1 获取评论统计数据（数据看板）

```
GET /admin/stats/comments
```

用于管理后台「数据看板」展示评论整体统计、按域名统计以及最近 30 天评论趋势。

- 方法：`GET`
- 路径：`/admin/stats/comments`
- 鉴权：需要（Bearer Token）

**成功响应**

- 状态码：`200`

```json
{
	"summary": {
		"total": 123,
		"approved": 100,
		"pending": 20,
		"rejected": 3
	},
	"domains": [
		{
			"domain": "example.com",
			"total": 80,
			"approved": 70,
			"pending": 8,
			"rejected": 2
		},
		{
			"domain": "blog.example.com",
			"total": 30,
			"approved": 20,
			"pending": 9,
			"rejected": 1
		}
	],
	"last7Days": [
		{
			"date": "2026-01-15",
			"total": 10
		},
		{
			"date": "2026-01-16",
			"total": 12
		}
	]
}
```

字段说明：

| 字段名               | 类型                | 说明                                  |
| -------------------- | ------------------- | ------------------------------------- |
| `summary`            | object              | 评论整体汇总统计                      |
| `summary.total`      | number              | 评论总数                              |
| `summary.approved`   | number              | 已通过评论数                          |
| `summary.pending`    | number              | 待审核评论数                          |
| `summary.rejected`   | number              | 已拒绝评论数                          |
| `domains`            | Array\<DomainStat\> | 按域名聚合的评论统计列表              |
| `domains[].domain`   | string              | 解析后的域名（如 `example.com`）      |
| `domains[].total`    | number              | 该域名下评论总数                      |
| `domains[].approved` | number              | 该域名下已通过评论数                  |
| `domains[].pending`  | number              | 该域名下待审核评论数                  |
| `domains[].rejected` | number              | 该域名下已拒绝评论数                  |
| `last7Days`          | Array\<DailyStat\>  | 最近 30 天的每日评论数（按自然日聚合） |
| `last7Days[].date`   | string (YYYY-MM-DD) | 日期，UTC 时间格式化后的自然日        |
| `last7Days[].total`  | number              | 当日评论总数                          |

**错误响应**

- 状态码：`500`

```json
{
	"message": "获取统计数据失败"
}
```

## 1.2 获取域名列表

```
GET /admin/stats/domains
```

用于管理后台获取所有已产生评论或访问记录的域名列表，用于域名筛选下拉框等场景。

- 方法：`GET`
- 路径：`/admin/stats/domains`
- 鉴权：需要（Bearer Token）

**成功响应**

- 状态码：`200`

```json
{
  "domains": [
    "blog.example.com",
    "example.com",
    "www.example.com"
  ]
}
```

字段说明：

| 字段名     | 类型            | 说明                   |
| ---------- | --------------- | ---------------------- |
| `domains`  | Array\<string\> | 域名列表，按字母排序 |

说明：

- 域名从评论数据和访问统计数据中提取
- 域名自动去重并按字母顺序排序

**错误响应**

- 状态码：`500`

```json
{
  "message": "获取域名列表失败"
}
```
