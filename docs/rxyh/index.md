# 农信银行代理接口开发指南

## 导航
[[toc]]

为了保证农信敏感参数不外泄，in嘉善不会保存任何有关第三方应用的农信银行sdk配置参数。in嘉善以代理方式调用接口。对于代理接口的开发，有以下规则约定。对于下文中出现的“xxxxxx”部分可以自定义。

## 获取农信主页地址

输出给in嘉善开放平台代理调用的主页面获取地址接口

| 参数         | 类型     | 描述                                                          |
| ---------- | ------ | ----------------------------------------------------------- |
| appid      | String | AppId                                                       |
| injsopenid | String | in嘉善的openid                                                 |
| timestamp  | Long   | 时间戳 (13位)                                                   |
| signature  | String | 签名 (签名规则: md5(appid + injsopenid + appsecret + timestamp) ) |

`_POST` /xxxxxx/home_page

入参：在body中以JSON格式

| 域名         | 变量名        | 是否必传 | 格式     | 备注  |
| ---------- | ---------- | ---- | ------ | --- |
| appid      | appid      | √    | string |     |
| injsopenid | injsopenid | √    | string |     |
| 13位时间戳     | timestamp  | √    | string |     |
| 签名         | signature  | √    | string |     |

```json
// 返回结果
{
  "code": 0,
  //成功0 ，失败-1
  "msg": "success",
  //成功为success，失败返回错误信息。
  "data": {
    //失败data可以为null
    "url": "xxxxxx"
    // 认证的url或者主页url
  }
}
```

## 获取农信付款码地址

输出给in嘉善开放平台代理调用的付款码获取地址接口

| 参数         | 类型     | 描述                                                          |
| ---------- | ------ | ----------------------------------------------------------- |
| appid      | String | AppId                                                       |
| injsopenid | String | in嘉善的openid                                                 |
| timestamp  | Long   | 时间戳 (13位)                                                   |
| signature  | String | 签名 (签名规则: md5(appid + injsopenid + appsecret + timestamp) ) |

`_POST` /xxxxxx/pay_code_page

入参：在body中以JSON格式

| 域名         | 变量名        | 是否必传 | 格式     | 备注  |
| ---------- | ---------- | ---- | ------ | --- |
| appid      | appid      | √    | string |     |
| injsopenid | injsopenid | √    | string |     |
| 13位时间戳     | timestamp  | √    | string |     |
| 签名         | signature  | √    | string |     |

```json
// 返回结果
{
  "code": 0,
  //成功0 ，失败-1
  "msg": "success",
  //成功为success，失败返回错误信息。
  "data": {
    //失败data可以为null
    "url": "xxxxxx"
    // 付款码的url或者主页url
  }
}
```