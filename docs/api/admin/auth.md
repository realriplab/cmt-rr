# 身份认证相关

管理员登录接口用于获取后续调用其他管理员接口所需的临时 Token。

除登录接口外，所有管理员接口都需要在请求头中携带 Bearer Token。

```http
Authorization: Bearer <token>
```

Token 通过登录接口获取，有效期为 24 小时。

## 1.1 管理员登录

```
POST /admin/login
```

管理员登录，获取后续调用其他管理员接口所需的临时 Token。

- 方法：`POST`
- 路径：`/admin/login`
- 鉴权：不需要

**请求头**

| 名称           | 必填 | 示例               |
| -------------- | ---- | ------------------ |
| `Content-Type` | 是   | `application/json` |

**请求体**

```json
{
	"name": "admin@example.com",
	"password": "your_password"
}
```

字段说明：

| 字段名     | 类型   | 必填 | 说明           |
| ---------- | ------ | ---- | -------------- |
| `name`     | string | 是   | 管理员登录名   |
| `password` | string | 是   | 管理员登录密码 |

管理员登录名和密码由后端环境变量控制，字段为：

- `ADMIN_NAME`
- `ADMIN_PASSWORD`

**成功响应**

- 状态码：`200`

```json
{
	"data": {
		"key": "f6e1e0e3-3c9b-4a24-9e88-3b1f709f1e4a"
	}
}
```

前端需要将 `data.key` 作为 Token 存储（例如 LocalStorage），并在后续请求中通过 `Authorization: Bearer <key>` 携带。

**错误与风控**

- 登录失败（用户名或密码错误）：
  - 状态码：`401`

  ```json
  {
  	"message": "Invalid username or password",
  	"failedAttempts": 3
  }
  ```

- 登录失败次数过多导致 IP 被封禁：
  - 状态码：`403`

  ```json
  {
  	"message": "IP is blocked due to multiple failed login attempts"
  }
  ```

- 内部错误：
  - 状态码：`500`

  ```json
  {
  	"message": "错误信息"
  }
  ```
