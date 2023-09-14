# 服务端接口

## 导航
[[toc]]

::: tip 开放接口地址
OpenAPI地址：`https://oapi.injs.jsxww.cn`

注意不支持http转跳https。
:::


## 返回码说明
| code (Integer) | msg (String)                                    | 备注                    |
| -------------- | ----------------------------------------------- | --------------------- |
| 40003          | invalid openid                                  | 无效的 openid            |
| 40013          | invalid appid                                   | 无效的 appid             |
| 40125          | invalid appsecret                               | 无效的 appsecret         |
| 41001          | invalid appsecret                               | 缺少 access_token 参数    |
| 41002          | missing appid                                   | 缺少 appid 参数           |
| 41003          | missing refresh_token                           | 缺少 refresh_token 参数   |
| 41004          | missing appsecret                               | 缺少appsecret 参数        |
| 41005          | missing signature                               | 缺少 signature 参数 (签名)  |
| 41006          | missing timestamp                               | 缺少 timestamp 参数 (时间戳) |
| 41007          | missing app_token                               | 缺少 app_token 参数       |
| 41008          | missing ticket                                  | 缺少 ticket 参数          |
| 41009          | missing openid                                  | 缺少 openid 参数          |
| 41010          | missing eventCode                               | 缺少eventCode参数         |
| 41011          | missing tag                                     | 缺少tag参数               |
| 41012          | missing pushType                                | 缺少pushType参数          |
| 41013          | missing articleId                               | 缺少articleId参数         |
| 41014          | missing pushTime                                | 缺少pushTime参数          |
| 42001          | access_token expired                            | access_token 超时       |
| 42002          | no permission                                   | 无权限                   |
| 42003          | too_long_page_size                              | 分页体量过大                |
| 42004          | no_compliant_integral_rule                      | 不符合积分规则               |
| 42005          | missing_number                                  | 没有扣减的积分参数             |
| 42006          | not_integer                                     | 不是整数                  |
| 42007          | not_number                                      | 不是数字                  |
| 42008          | less_then_zero                                  | 小于0                   |
| 42009          | too_long_size                                   | 单次体量过大                |
| 42009          | no pushType                                     | 错误的pushType参数         |
| 50001          | user have not pass the real-name authentication | 用户未通过实名认证             |
| 50005          | user is unsubscribed                            | 用户未授权                 |
| 63002          | invalid signature                               | 无效的签名                 |
| 82026          | service disabled                                |  服务不可用                |

## 获取 access_token

开放应用获取开放平台的 access_token

参数说明：

| 参数        | 类型     | 描述                                             |
| --------- | ------ | ---------------------------------------------- |
| appid     | String | AppId                                          |
| timestamp | Long   | 时间戳 (13位)                                      |
| signature | String | 签名 (签名规则: md5(appid + appsecret + timestamp) ) |

::: tip 调用

- 请求路径：`/auth/access_token?appid=${appid}&timestamp=${timestamp}&signature=${signature}`
- 请求方法：GET
- 传参方式：Query
  :::

```json
//返回结果
{
  "code": 0,
  "msg": "success",
  "data": {
    "access_token": "b4c82a29c53d4a35a1ff7a2ee27cfeb0",
    //access_token
    "expires_in": 7200
    //access_token过期时间(s)
  },
  "ok": true
}
```

## 校验ticket

开放应用校验获取到的 openid 是否有效。

参数说明：

| 参数           | 类型     | 描述                                             |
| ------------ | ------ | ---------------------------------------------- |
| access_token | String | 访问令牌                                           |
| openid       | String | OpenId                                         |
| ticket       | String | 校验票据                                           |
| timestamp    | Long   | 时间戳 (13位)                                      |
| signature    | String | 签名 (签名规则: md5(appid + appsecret + timestamp) ) |

::: tip 调用

- 请求路径：`/auth/openid/validate?access_token=${access_token}&openid=${openid}&ticket=
  ${ticket}&timestamp=${timestamp}&signature=${signature}`
- 请求方法：GET
- 传参方式：Query
  :::

返回结果：

```json
// 校验成功
{
  "code": 0,
  "msg": "success",
  "data": null,
  "ok": true
}

// 校验失败
{
  "code": -1,
  "msg": "failed",
  "data": null,
  "ok": false
}
```

## 获取所有善媒号的列表

输出给in嘉善开放平台应用调用的获取所有善媒号的地址接口

参数说明：

| 参数        | 类型     | 描述                                             |
| --------- | ------ | ---------------------------------------------- |
| appId     | String | AppId                                          |
| timestamp | Long   | 时间戳（13位）                                       |
| signature | String | 签名 (签名规则: md5(appid + appsecret + timestamp) ) |

::: tip 调用

- 请求路径：`/open/smhandarticle/list/all/smh`
- 请求方法：GET
- 传参方式：Query
  :::

```json
//返回结果
{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "id": "5591446982964936704",
      "categoryName": "政府",
      "list": []
    },
    {
      "id": "5713636053758271630",
      "categoryName": "aa",
      //善媒号分类名
      "list": [
        //善媒号列表
        {
          "id": "1425995812029132802",
          //善媒号id
          "nickname": "jtest",
          //善媒号名
          "avatarUrl": "/avatars/02c7e1d119094384a88064198136b658.png",
          "smh": false,
          "dataScope": null
        }
      ]
    },
    {
      "id": "5583395293674381312",
      "categoryName": "企业",
      "list": [
        {
          "id": "1402804427521265665",
          "nickname": "捡破烂的熊\"",
          "avatarUrl": "/avatars/b4c0f75d536042f6b625f000af28f1dd.png",
          "smh": false,
          "dataScope": null
        },
        {
          "id": "1404677774897102849",
          "nickname": "亲爱的",
          "avatarUrl": "/avatars/c8cc89a2effc4a08aa99db04665fb63b.png",
          "smh": false,
          "dataScope": null
        },
        {
          "id": "1376343712677761025",
          "nickname": "嘉善传媒中心",
          "avatarUrl": "/avatars/310147decad84915a060c30a9bcf03fd.png",
          "smh": false,
          "dataScope": null
        }
      ]
    }
  ],
  "ok": true
}
```

## 获取所有栏目的列表

输出给in嘉善开放平台应用调用的获取所有栏目的地址接口

参数说明：

| 参数        | 类型     | 描述                                             |
| --------- | ------ | ---------------------------------------------- |
| appId     | String | AppId                                          |
| timestamp | Long   | 时间戳（13位）                                       |
| signature | String | 签名 (签名规则: md5(appid + appsecret + timestamp) ) |

::: tip 调用

- 请求路径：`/open/smhandarticle/list/all/category`
- 请求方法：GET
- 传参方式：Query
  :::

```json
//返回结果
{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "id": "6289470084438458383",
      //栏目id
      "parentId": "0",
      "layer": 1,
      //栏目层级
      "name": "哈哈",
      //栏目名
      "code": "",
      "desc": "",
      "sort": 0,
      "children": []
    },
    {
      "id": "6295242417405075481",
      "parentId": "0",
      "layer": 1,
      "name": "游戏",
      "code": "",
      "desc": "",
      "sort": 1,
      "children": [
        {
          "id": "6645709687175348251",
          "parentId": "6295242417405075481",
          "layer": 2,
          "name": "123456789",
          "code": "1",
          "desc": "",
          "sort": 1,
          "children": []
        },
        {
          "id": "6645709687175348252",
          "parentId": "6295242417405075481",
          "layer": 2,
          "name": "1234567891",
          "code": "1",
          "desc": "",
          "sort": 2,
          "children": []
        }
      ]
    },
    {
      "id": "5817476268348563456",
      "parentId": "0",
      "layer": 1,
      "name": "时政",
      "code": "",
      "desc": "",
      "sort": 2,
      "children": [
        {
          "id": "5817476268348563457",
          "parentId": "5817476268348563456",
          "layer": 2,
          "name": "时政推荐",
          "code": "",
          "desc": "",
          "sort": 0,
          "children": []
        }
      ]
    },
    {
      "id": "5817476268348563470",
      "parentId": "0",
      "layer": 1,
      "name": "看看嘉善",
      "code": "",
      "desc": "",
      "sort": 3,
      "children": []
    },
    {
      "id": "5817476268348563458",
      "parentId": "0",
      "layer": 1,
      "name": "政务中心",
      "code": "",
      "desc": "",
      "sort": 4,
      "children": [
        {
          "id": "5817476268348563459",
          "parentId": "5817476268348563458",
          "layer": 2,
          "name": "县长专栏",
          "code": "",
          "desc": "",
          "sort": 0,
          "children": [
            {
              "id": "5817476268348563460",
              "parentId": "5817476268348563459",
              "layer": 3,
              "name": "县长",
              "code": "",
              "desc": "",
              "sort": 0,
              "children": []
            },
            {
              "id": "5817476268348563461",
              "parentId": "5817476268348563459",
              "layer": 3,
              "name": "书记",
              "code": "",
              "desc": "",
              "sort": 1,
              "children": []
            }
          ]
        },
        {
          "id": "5817476268348563462",
          "parentId": "5817476268348563458",
          "layer": 2,
          "name": "央媒看嘉善",
          "code": "",
          "desc": "",
          "sort": 0,
          "children": [
            {
              "id": "5817476268348563463",
              "parentId": "5817476268348563462",
              "layer": 3,
              "name": "中央电视台",
              "code": "",
              "desc": "",
              "sort": 0,
              "children": []
            },
            {
              "id": "5817476268348563464",
              "parentId": "5817476268348563462",
              "layer": 3,
              "name": "人民日报",
              "code": "",
              "desc": "",
              "sort": 0,
              "children": []
            },
            {
              "id": "5817476268348563465",
              "parentId": "5817476268348563462",
              "layer": 3,
              "name": "新华社",
              "code": "",
              "desc": "",
              "sort": 0,
              "children": []
            },
            {
              "id": "5817476268348563466",
              "parentId": "5817476268348563462",
              "layer": 3,
              "name": "浙江日报",
              "code": "",
              "desc": "",
              "sort": 0,
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": "5817476268348563471",
      "parentId": "0",
      "layer": 1,
      "name": "社会",
      "code": "",
      "desc": "",
      "sort": 5,
      "children": []
    },
    {
      "id": "1",
      "parentId": "0",
      "layer": 1,
      "name": "科技",
      "code": "KJ",
      "desc": "科技",
      "sort": 6,
      "children": [
        {
          "id": "5816859304886419474",
          "parentId": "1",
          "layer": 2,
          "name": "二级测试",
          "code": "",
          "desc": "",
          "sort": 0,
          "children": []
        }
      ]
    },
    {
      "id": "5713636053758271532",
      "parentId": "0",
      "layer": 1,
      "name": "AAC",
      "code": "AA",
      "desc": "AA",
      "sort": 7,
      "children": [
        {
          "id": "5834756914645278751",
          "parentId": "5713636053758271532",
          "layer": 2,
          "name": "1",
          "code": "",
          "desc": "",
          "sort": 0,
          "children": [
            {
              "id": "5834756914645278752",
              "parentId": "5834756914645278751",
              "layer": 3,
              "name": "121",
              "code": "",
              "desc": "",
              "sort": 0,
              "children": []
            }
          ]
        },
        {
          "id": "5834756914645278753",
          "parentId": "5713636053758271532",
          "layer": 2,
          "name": "2",
          "code": "",
          "desc": "",
          "sort": 0,
          "children": [
            {
              "id": "5834756914645278754",
              "parentId": "5834756914645278753",
              "layer": 3,
              "name": "加班",
              "code": "",
              "desc": "",
              "sort": 0,
              "children": []
            }
          ]
        },
        {
          "id": "5834756914645278755",
          "parentId": "5713636053758271532",
          "layer": 2,
          "name": "3",
          "code": "",
          "desc": "",
          "sort": 0,
          "children": [
            {
              "id": "5834756914645278756",
              "parentId": "5834756914645278755",
              "layer": 3,
              "name": "41",
              "code": "",
              "desc": "",
              "sort": 0,
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": "5690233601595883602",
      "parentId": "0",
      "layer": 1,
      "name": "我的类目",
      "code": "myList",
      "desc": "我的类目",
      "sort": 8,
      "children": []
    },
    {
      "id": "1399277703923281921",
      "parentId": "0",
      "layer": 1,
      "name": "测试",
      "code": "TE",
      "desc": "测试",
      "sort": 9,
      "children": []
    },
    {
      "id": "6",
      "parentId": "0",
      "layer": 1,
      "name": "军事",
      "code": "JS",
      "desc": "军事",
      "sort": 10,
      "children": []
    },
    {
      "id": "5817476268348563467",
      "parentId": "0",
      "layer": 1,
      "name": "台庆作品",
      "code": "",
      "desc": "",
      "sort": 11,
      "children": [
        {
          "id": "5817476268348563468",
          "parentId": "5817476268348563467",
          "layer": 2,
          "name": "获奖征文",
          "code": "",
          "desc": "",
          "sort": 0,
          "children": []
        },
        {
          "id": "5817476268348563469",
          "parentId": "5817476268348563467",
          "layer": 2,
          "name": "获奖照片",
          "code": "",
          "desc": "",
          "sort": 1,
          "children": []
        }
      ]
    },
    {
      "id": "3",
      "parentId": "0",
      "layer": 1,
      "name": "体育",
      "code": "TY",
      "desc": "体育",
      "sort": 12,
      "children": []
    },
    {
      "id": "10",
      "parentId": "0",
      "layer": 1,
      "name": "三农",
      "code": "SN",
      "desc": "三农",
      "sort": 13,
      "children": []
    },
    {
      "id": "11",
      "parentId": "0",
      "layer": 1,
      "name": "软件",
      "code": "RJ",
      "desc": "软件",
      "sort": 14,
      "children": []
    },
    {
      "id": "12",
      "parentId": "0",
      "layer": 1,
      "name": "手机",
      "code": "SJ",
      "desc": "手机",
      "sort": 15,
      "children": []
    },
    {
      "id": "13",
      "parentId": "0",
      "layer": 1,
      "name": "漫画",
      "code": "MH",
      "desc": "漫画",
      "sort": 16,
      "children": []
    },
    {
      "id": "1382585839283867649",
      "parentId": "0",
      "layer": 1,
      "name": "游戏",
      "code": "YX",
      "desc": "游戏",
      "sort": 17,
      "children": [
        {
          "id": "6295242417405075470",
          "parentId": "1382585839283867649",
          "layer": 2,
          "name": "游戏",
          "code": "",
          "desc": "",
          "sort": 1,
          "children": [
            {
              "id": "6295242417405075502",
              "parentId": "6295242417405075470",
              "layer": 3,
              "name": "游戏",
              "code": "",
              "desc": "",
              "sort": 0,
              "children": []
            }
          ]
        }
      ]
    }
  ],
  "ok": true
}
```

## 获取善媒号的栏目的列表

输出给in嘉善开放平台应用调用的获取所有善媒号的栏目的地址接口

参数说明：

| 参数        | 类型     | 描述                                                   |
| --------- | ------ | ---------------------------------------------------- |
| appId     | String | AppId                                                |
| timestamp | Long   | 时间戳（13位）                                             |
| signature | String | 签名 (签名规则: md5(appid + appsecret + timestamp+smhId) ) |
| smhId     | String | 善媒号id                                                |

::: tip 调用

- 请求路径：`/open/smhandarticle/list/smh/category`
- 请求方法：GET
- 传参方式：Query
  :::

```json
//返回结果
{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "id": "5520667055797952546",
      //善媒号栏目id
      "createBy": "1376343712677761025",
      "createTime": "2021-06-24 15:20:57",
      "updateBy": "1376343712677761025",
      "updateTime": "2021-09-03 15:30:40",
      "categoryName": "归谷科技",
      //善媒号栏目名
      "categoryDes": "牛逼就对了",
      //善媒号栏目描述
      "subjectId": "1376343712677761025",
      //善媒号id
      "iconUrl": [
        "/images/cf623180381c4646b4571190a877e061.png"
      ],
      "isHome": "1",
      "sort": 2
    },
    {
      "id": "5502128877436682241",
      "createBy": "1376343712677761025",
      "createTime": "2021-06-16 09:26:23",
      "updateBy": "1376343712677761025",
      "updateTime": "2021-09-03 15:30:40",
      "categoryName": "品质新城",
      "categoryDes": "品质新城",
      "subjectId": "1376343712677761025",
      "iconUrl": [
        "/images/210c682890824fd1a5e61320bb764278.png"
      ],
      "isHome": "1",
      "sort": 3
    },
    {
      "id": "5731502980270915595",
      "createBy": "1376343712677761025",
      "createTime": "2021-09-01 15:52:01",
      "updateBy": "1376343712677761025",
      "updateTime": "2021-09-14 14:47:59",
      "categoryName": "阿三发射点发阿松阿松",
      "categoryDes": "a说法萨芬士大夫案说法阿萨发生发阿萨发生发案说法阿斯顿发生发生发生法撒旦发生发萨芬a说法萨芬士大夫案说法阿萨发生发阿萨发",
      "subjectId": "1376343712677761025",
      "iconUrl": [
        "/images/768f8b91193a478f98c4ca3fb6f23ab1.jpg"
      ],
      "isHome": "1",
      "sort": 6
    },
    {
      "id": "5731502980270915594",
      "createBy": "1376343712677761025",
      "createTime": "2021-09-01 15:51:15",
      "updateBy": "1376343712677761025",
      "updateTime": "2021-09-14 14:48:25",
      "categoryName": "大师史蒂芬·",
      "categoryDes": "啊发",
      "subjectId": "1376343712677761025",
      "iconUrl": [
        "/images/64b52f9ef1874eedbd157138608a1ae0.jpg"
      ],
      "isHome": "1",
      "sort": 7
    },
    {
      "id": "5731502980270915593",
      "createBy": "1376343712677761025",
      "createTime": "2021-09-01 15:51:02",
      "updateBy": "1376343712677761025",
      "updateTime": "2021-09-14 14:48:42",
      "categoryName": "阿松大发",
      "categoryDes": "案说法",
      "subjectId": "1376343712677761025",
      "iconUrl": [
        "/images/5dace8240a1948189d4599c4cad9d2b9.jpg"
      ],
      "isHome": "1",
      "sort": 8
    },
    {
      "id": "5731502980270915588",
      "createBy": "1376343712677761025",
      "createTime": "2021-09-01 15:49:58",
      "updateBy": "1376343712677761025",
      "updateTime": "2021-09-14 14:48:36",
      "categoryName": "啊",
      "categoryDes": "阿萨",
      "subjectId": "1376343712677761025",
      "iconUrl": [
        "/images/2fd0b1692e1540fda73dd04788e64982.jpg"
      ],
      "isHome": "1",
      "sort": 13
    },
    {
      "id": "5731502980270915584",
      "createBy": "1376343712677761025",
      "createTime": "2021-09-01 15:47:54",
      "updateBy": "1376343712677761025",
      "updateTime": "2021-09-14 14:48:51",
      "categoryName": "1223",
      "categoryDes": "123",
      "subjectId": "1376343712677761025",
      "iconUrl": [
        "/images/ca6e3bcc78784e48b0acc00d44c65ca2.jpg"
      ],
      "isHome": "1",
      "sort": 17
    },
    {
      "id": "5731271601792737366",
      "createBy": "1376343712677761025",
      "createTime": "2021-09-01 15:32:42",
      "updateBy": "1376343712677761025",
      "updateTime": "2021-09-14 14:48:30",
      "categoryName": "大帅",
      "categoryDes": "啦啦啦",
      "subjectId": "1376343712677761025",
      "iconUrl": [
        "/images/410403a12e404908a5bf1e287a1e1fed.jpg"
      ],
      "isHome": "1",
      "sort": 19
    }
  ],
  "ok": true
}
```

## 获取文章的列表

输出给in嘉善开放平台应用调用的获取文章的列表地址接口

参数说明：

| 参数            | 类型     | 描述                                                                                                                            |
| ------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| appId         | String | AppId                                                                                                                         |
| timestamp     | Long   | 时间戳（13位）                                                                                                                      |
| signature     | String | 签名(签名规则（md5(appid + appsecret + timestamp+shmId+categoryId+smhCategoryId+recommend+title+pageSize+pageNo)非必传项不传时，则拼接时项为空字符串）) |
| smhId         | String | 善媒号id                                                                                                                         |
| categoryId    | String | 栏目id                                                                                                                          |
| smhCategoryId | String | 善媒号栏目id                                                                                                                       |
| recommend     | String | 是否推荐(0/否，1/是)                                                                                                                 |
| title         | String | 文章标题                                                                                                                          |
| pageSize      | String | 每页包含条数                                                                                                                        |
| pageNo        | String | 页码                                                                                                                            |

::: tip 调用

- 请求路径：`/open/smhandarticle/list/article`
- 请求方法：GET
- 传参方式：Query
- Query字段解释：

| 中文描述           | 变量名           | 是否必传   | 格式     | 备注  |
| ------------ | ------------- | ------ | ------ | --- |
| appId        | appId         | √      | string |     |
| 13位时间戳       | timestamp     | √      | Long   |     |
| 签名           | signature     | √      | string |     |
| 善媒号id        | shmId         | ×      | string |     |
| 栏目id         | categoryId    | ×      | string |     |
| 善媒号栏目id      | smhCategoryId | ×      | string |     |
| 是否推荐(0/否，1是) | recommend     | ×      | string |     |
| 文章标题         | title         |      × | string |     |
| 每条包含条数       | pageSize      | √      | string |     |
| 页码           | pageNo        | √      | string |     |

:::

```json
//返回结果
{
  "code": 0,
  "msg": "success",
  "data": {
    "records": [
      {
        "id": "6642749698794152307",
        //文章id
        "createBy": "1376343712677761025",
        "createTime": "2022-07-06 13:51:35",
        "updateBy": "1376343712677761025",
        "updateTime": "2022-07-08 13:53:55",
        "origin": "SYS",
        "type": "ARTICLE",
        "componentKey": "common-card-txt-1",
        "title": "efafawewf",
        //文章标题
        "originalContent": "6642749698794152306-20220706135121.original.txt",
        "content": "6642749698794152306-20220706135121.txt",
        "overview": "",
        "coverUrl": [],
        //封面图
        "isAllowLike": "1",
        //是否允许点赞
        "isAllowComment": "1",
        //是否允许评论
        "isShowReadCount": "1",
        //是否显示阅读数量
        "isShowCommentCount": "1",
        //是否显示评论数量
        "isShowLikeCount": "1",
        //是否显示点赞数量
        "isShowAd": "1",
        //是否显示广告
        "commentCount": 0,
        //评论数量
        "likeCount": 0,
        //点赞数量
        "readCount": 2,
        //阅读数量
        "fakeReadCount": 53,
        //虚拟阅读数量
        "status": "1",
        "source": "",
        "authorId": "1376343712677761025",
        "creationTime": "2022-07-06 13:51:35",
        "publishTime": "2022-07-06 13:50:55",
        //发布时间
        "isPublishDelay": "0",
        "publishDelayTime": null,
        "orderNo": 206,
        "author": "嘉善传媒中心",
        //作者
        "editor": null,
        "lastEditor": null,
        "isRecommend": null,
        "link": null,
        "comments": null,
        "smh": true
      },
      {
        "id": "6642749698794152186",
        "createBy": "1376343712677761025",
        "createTime": "2022-07-06 10:02:42",
        "updateBy": "1376343712677761025",
        "updateTime": "2022-07-06 10:26:39",
        "origin": "SYS",
        "type": "ARTICLE",
        "componentKey": "common-card-txt-1",
        "title": "fawefwa1",
        "originalContent": "6642749698794152185-20220706100241.original.txt",
        "content": "6642749698794152185-20220706100241.txt",
        "overview": "",
        "coverUrl": [],
        "isAllowLike": "1",
        "isAllowComment": "1",
        "isShowReadCount": "1",
        "isShowCommentCount": "1",
        "isShowLikeCount": "1",
        "isShowAd": "1",
        "commentCount": 0,
        "likeCount": 0,
        "readCount": 0,
        "fakeReadCount": 0,
        "status": "3",
        "source": "",
        "authorId": "1376343712677761025",
        "creationTime": "2022-07-06 10:02:42",
        "publishTime": "2022-07-06 10:02:30",
        "isPublishDelay": "0",
        "publishDelayTime": null,
        "orderNo": 1,
        "author": "嘉善传媒中心",
        "editor": null,
        "lastEditor": null,
        "isRecommend": null,
        "link": null,
        "comments": null,
        "smh": true
      },
      {
        "id": "6642749698794152180",
        "createBy": "1376343712677761025",
        "createTime": "2022-07-06 10:02:29",
        "updateBy": "1376343712677761025",
        "updateTime": "2022-07-06 10:26:24",
        "origin": "SYS",
        "type": "ARTICLE",
        "componentKey": "common-card-txt-1",
        "title": "sdfe",
        "originalContent": "6642749698794152179-20220706100229.original.txt",
        "content": "6642749698794152179-20220706100229.txt",
        "overview": "",
        "coverUrl": [],
        "isAllowLike": "1",
        "isAllowComment": "1",
        "isShowReadCount": "1",
        "isShowCommentCount": "1",
        "isShowLikeCount": "1",
        "isShowAd": "1",
        "commentCount": 0,
        "likeCount": 0,
        "readCount": 0,
        "fakeReadCount": 0,
        "status": "2",
        "source": "",
        "authorId": "1376343712677761025",
        "creationTime": "2022-07-06 10:02:29",
        "publishTime": "2022-07-06 10:02:11",
        "isPublishDelay": "0",
        "publishDelayTime": null,
        "orderNo": 1,
        "author": "嘉善传媒中心",
        "editor": null,
        "lastEditor": null,
        "isRecommend": null,
        "link": null,
        "comments": null,
        "smh": true
      },
      {
        "id": "6642749698794151936",
        "createBy": "1376343712677761025",
        "createTime": "2022-07-05 14:39:13",
        "updateBy": "1376343712677761025",
        "updateTime": "2022-07-08 13:34:40",
        "origin": "SYS",
        "type": "VIDEO",
        "componentKey": "common-card-txt-img-3",
        "title": "测试文章视频s",
        "originalContent": null,
        "content": null,
        "overview": "",
        "coverUrl": [],
        "isAllowLike": "1",
        "isAllowComment": "1",
        "isShowReadCount": "1",
        "isShowCommentCount": "1",
        "isShowLikeCount": "1",
        "isShowAd": "1",
        "commentCount": 0,
        "likeCount": 0,
        "readCount": 11,
        "fakeReadCount": 158,
        "status": "1",
        "source": "",
        "authorId": "1376343712677761025",
        "creationTime": "2022-07-05 14:39:13",
        "publishTime": "2022-07-05 14:38:56",
        "isPublishDelay": "0",
        "publishDelayTime": null,
        "orderNo": 202,
        "author": "嘉善传媒中心",
        "editor": null,
        "lastEditor": null,
        "isRecommend": null,
        "link": null,
        "comments": null,
        "smh": true
      },
      {
        "id": "6568077156867653645",
        "createBy": "1376343712677761025",
        "createTime": "2022-06-10 16:54:09",
        "updateBy": "1376343712677761025",
        "updateTime": "2022-07-06 10:16:18",
        "origin": "SYS",
        "type": "ARTICLE",
        "componentKey": "common-card-txt-1",
        "title": "小in说天气A",
        "originalContent": "6568077156867653645-20220610165846.original.txt",
        "content": "6568077156867653645-20220610165846.txt",
        "overview": "",
        "coverUrl": [],
        "isAllowLike": "1",
        "isAllowComment": "1",
        "isShowReadCount": "1",
        "isShowCommentCount": "1",
        "isShowLikeCount": "1",
        "isShowAd": "1",
        "commentCount": 0,
        "likeCount": 0,
        "readCount": 2,
        "fakeReadCount": 23,
        "status": "1",
        "source": "",
        "authorId": "1376343712677761025",
        "creationTime": "2022-06-10 16:54:09",
        "publishTime": "2022-06-08 16:53:53",
        "isPublishDelay": "0",
        "publishDelayTime": null,
        "orderNo": 199,
        "author": "嘉善传媒中心",
        "editor": null,
        "lastEditor": null,
        "isRecommend": null,
        "link": null,
        "comments": null,
        "smh": true
      },
      {
        "id": "6568077156867653639",
        "createBy": "1376343712677761025",
        "createTime": "2022-06-10 16:52:54",
        "updateBy": "1376343712677761025",
        "updateTime": "2022-07-06 10:09:11",
        "origin": "SYS",
        "type": "ARTICLE",
        "componentKey": "common-card-txt-1",
        "title": "小in说天气B",
        "originalContent": "6568077156867653639-20220610165943.original.txt",
        "content": "6568077156867653639-20220610165943.txt",
        "overview": "",
        "coverUrl": [],
        "isAllowLike": "1",
        "isAllowComment": "1",
        "isShowReadCount": "1",
        "isShowCommentCount": "1",
        "isShowLikeCount": "1",
        "isShowAd": "1",
        "commentCount": 0,
        "likeCount": 0,
        "readCount": 1,
        "fakeReadCount": 20,
        "status": "1",
        "source": "",
        "authorId": "1376343712677761025",
        "creationTime": "2022-06-10 16:52:54",
        "publishTime": "2022-06-10 16:52:06",
        "isPublishDelay": "0",
        "publishDelayTime": null,
        "orderNo": 198,
        "author": "嘉善传媒中心",
        "editor": null,
        "lastEditor": null,
        "isRecommend": null,
        "link": null,
        "comments": null,
        "smh": true
      },
      {
        "id": "6568077156867653633",
        "createBy": "1376343712677761025",
        "createTime": "2022-06-10 16:51:21",
        "updateBy": "1376343712677761025",
        "updateTime": "2022-07-06 10:27:27",
        "origin": "SYS",
        "type": "ARTICLE",
        "componentKey": "common-card-txt-1",
        "title": "小in说天气C",
        "originalContent": "6568077156867653633-20220610165918.original.txt",
        "content": "6568077156867653633-20220610165918.txt",
        "overview": "",
        "coverUrl": [],
        "isAllowLike": "1",
        "isAllowComment": "1",
        "isShowReadCount": "1",
        "isShowCommentCount": "1",
        "isShowLikeCount": "1",
        "isShowAd": "1",
        "commentCount": 0,
        "likeCount": 0,
        "readCount": 0,
        "fakeReadCount": 0,
        "status": "1",
        "source": "",
        "authorId": "1376343712677761025",
        "creationTime": "2022-06-10 16:51:21",
        "publishTime": "2022-06-09 16:40:42",
        "isPublishDelay": "0",
        "publishDelayTime": null,
        "orderNo": 196,
        "author": "嘉善传媒中心",
        "editor": null,
        "lastEditor": null,
        "isRecommend": null,
        "link": null,
        "comments": null,
        "smh": true
      },
      {
        "id": "6541686025942712326",
        "createBy": "1376343712677761025",
        "createTime": "2022-06-02 10:16:20",
        "updateBy": "1376343712677761025",
        "updateTime": "2022-07-06 10:09:11",
        "origin": "SYS",
        "type": "ARTICLE",
        "componentKey": "common-card-txt-img-1",
        "title": "滚动播报",
        "originalContent": "6541686025942712326-20220602101907.original.txt",
        "content": "6541686025942712326-20220602101907.txt",
        "overview": "",
        "coverUrl": [
          "/images/e5405a2ca5ef43dea700c6511e379531.png"
        ],
        "isAllowLike": "1",
        "isAllowComment": "1",
        "isShowReadCount": "1",
        "isShowCommentCount": "1",
        "isShowLikeCount": "1",
        "isShowAd": "1",
        "commentCount": 0,
        "likeCount": 0,
        "readCount": 1,
        "fakeReadCount": 11,
        "status": "1",
        "source": "",
        "authorId": "1376343712677761025",
        "creationTime": "2022-06-02 10:16:20",
        "publishTime": "2022-06-02 10:15:04",
        "isPublishDelay": "0",
        "publishDelayTime": null,
        "orderNo": 184,
        "author": "嘉善传媒中心",
        "editor": null,
        "lastEditor": null,
        "isRecommend": null,
        "link": null,
        "comments": null,
        "smh": true
      },
      {
        "id": "6497463255956627459",
        "createBy": "1376343712677761025",
        "createTime": "2022-05-18 08:52:53",
        "updateBy": "1376343712677761025",
        "updateTime": "2022-07-06 10:01:58",
        "origin": "SYS",
        "type": "ARTICLE",
        "componentKey": "common-card-txt-1",
        "title": "1212",
        "originalContent": "6497463255956627458-20220518085252.original.txt",
        "content": "6497463255956627458-20220518085252.txt",
        "overview": "",
        "coverUrl": [],
        "isAllowLike": "1",
        "isAllowComment": "1",
        "isShowReadCount": "1",
        "isShowCommentCount": "1",
        "isShowLikeCount": "1",
        "isShowAd": "1",
        "commentCount": 0,
        "likeCount": 0,
        "readCount": 0,
        "fakeReadCount": 0,
        "status": "1",
        "source": "",
        "authorId": "1376343712677761025",
        "creationTime": "2022-05-18 08:52:53",
        "publishTime": "2022-05-18 08:50:36",
        "isPublishDelay": "0",
        "publishDelayTime": null,
        "orderNo": 187,
        "author": "嘉善传媒中心",
        "editor": null,
        "lastEditor": null,
        "isRecommend": null,
        "link": null,
        "comments": null,
        "smh": true
      },
      {
        "id": "6494166198542041089",
        "createBy": "1376343712677761025",
        "createTime": "2022-05-16 14:19:43",
        "updateBy": "1376343712677761025",
        "updateTime": "2022-05-16 14:24:44",
        "origin": "SYS",
        "type": "ARTICLE",
        "componentKey": "common-card-txt-img-3",
        "title": "图片带跳转链接",
        "originalContent": "6494166198542041089-20220516142443.original.txt",
        "content": "6494166198542041089-20220516142443.txt",
        "overview": "",
        "coverUrl": [
          "/net-disk-smh/5889e3fc59dd45ddb190c6b47f135dba.jpeg"
        ],
        "isAllowLike": "1",
        "isAllowComment": "1",
        "isShowReadCount": "1",
        "isShowCommentCount": "1",
        "isShowLikeCount": "1",
        "isShowAd": "1",
        "commentCount": 0,
        "likeCount": 0,
        "readCount": 31,
        "fakeReadCount": 821,
        "status": "1",
        "source": "",
        "authorId": "1376343712677761025",
        "creationTime": "2022-05-16 14:19:43",
        "publishTime": "2022-05-16 14:17:53",
        "isPublishDelay": "0",
        "publishDelayTime": null,
        "orderNo": 186,
        "author": "嘉善传媒中心",
        "editor": null,
        "lastEditor": null,
        "isRecommend": null,
        "link": null,
        "comments": null,
        "smh": true
      }
    ],
    "total": 1640,
    "size": 10,
    "current": 1,
    "orders": [],
    "optimizeCountSql": true,
    "hitCount": false,
    "countId": null,
    "maxLimit": null,
    "searchCount": true,
    "pages": 164
  },
  "ok": true
}
```

## 获取文章详情

输出给in嘉善开放平台应用调用的获取所有文章详情的地址接口

参数说明：

| 参数        | 类型     | 描述                                                     |
| --------- | ------ | ------------------------------------------------------ |
| appId     | String | AppId                                                  |
| timestamp | Long   | 时间戳（13位）                                               |
| signature | String | 签名(签名规则（md5(appid + appsecret + timestamp+articleId））） |
| articleId | String | 文章id                                                   |

::: tip 调用

- 请求路径：`/open/smhandarticle/get/article/detail`
- 请求方法：GET
- 传参方式：Query
- Query字段解释：

| 中文描述     | 变量名       | 是否必传 | 格式     | 备注  |
| ------ | --------- | ---- | ------ | --- |
| appId  | appId     | √    | string |     |
| 13位时间戳 | timestamp | √    | Long   |     |
| 签名     | signature | √    | string |     |
| 文章id   | articleId | √    | string |     |

:::

```json
//返回结果
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "5841420126908407814",
    //文章id
    "type": "ARTICLE",
    "componentKey": "common-card-txt-img-2",
    "title": "一体化示范区开发者大会召开！",
    //标题
    "originalContent": "<p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 1px; text-indent: 2em; line-height: 1.75em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"color: #595959; font-size: 16px; font-family: arial, helvetica, sans-serif;\">长三角生态绿色一体化发展示范区开发者大会今天在江苏省吴江区举行。大会为期一天，以“跨域一体、创新共进”为主题。两省一市政府及相关部门领导，长三角地区相关毗邻区域负责人，开发者联盟成员单位代表，高科技企业、规划设计公司、金融机构、高端智库、高校和研究院所等的负责人近200余人齐聚一堂，共同聚焦示范区创新与绿色发展。</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 1px; text-indent: 2em; line-height: 1.75em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"color: #595959; font-size: 16px; font-family: arial, helvetica, sans-serif;\">嘉兴市委常委、嘉善县委书记洪湖鹏，嘉善县委副书记、县长徐鸣阳，嘉善县委常委、嘉善示范区党工委副书记、管委会专职副主任陈天荣等应邀参加。</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 1px; text-indent: 2em; line-height: 1.75em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"color: #595959; font-size: 16px; font-family: arial, helvetica, sans-serif;\">&nbsp;</span></p><p style=\"text-align:justify;text-indent: 0em; margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><img style=\"box-sizing:border-box;width: 900px; padding-bottom: 7px;\" src=\"http://injs.jsgbds.com/Uploads/Images/20210923/MidTongLan/2021092321444157150.jpg\" data-ratio=\"0.6666666666666666\" data-w=\"1080\"/></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">洪湖鹏在大会上做主旨发言。他以“共享新机遇 &nbsp;共创新未来 携手奋进长三角一体化新征程”为题，从“战略叠加、蓄能成势”“产业兴旺、活力迸发”“改革先行、整体智治”“生态优美、宜游低碳”“优质普惠、包容开放”五个方面推荐嘉善。洪湖鹏表示，嘉善地处长三角中心位置，是擘画宏图的超级风口，是动能澎湃的创新高地，是营商环境的先锋典范，是诗意栖居的梦里水乡，是温度满满的共富家园。</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><img class=\"\" style=\"box-sizing:border-box;margin-right: 0px; margin-left: 0px; padding: 0px; outline: 0px; overflow-wrap: break-word !important; height: auto !important; width: 677px !important; visibility: visible !important;\" src=\"http://injs.jsgbds.com/Uploads/Images/20210923/MidTongLan/2021092321444217511.jpg\" alt=\"图片\" data-ratio=\"0.6537037037037037\" data-src=\"https://mmbiz.qpic.cn/mmbiz_jpg/6LTjOicOJt5uweZDWGBaxYzicygFL85PBr5QoU0qnhMIaL688UYsQTwVUzaNUotu2HtW28zT0CxTP0iax0nfyWyAg/640?wx_fmt=jpeg\" data-type=\"jpeg\" data-w=\"1080\" data-fail=\"0\"/></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">会上，洪湖鹏向开发者联盟成员单位和广大优秀企业发出诚挚邀请，邀请他们来嘉善设立研发中心、导入重点实验室、建设科研机构，携手嘉善打造湖区创新高地，期待他们在谋划新项目、新投资时，优先考虑嘉善，把更多教育、医疗、文化等优质资源落户到嘉善，共同打造更加美丽的“梦里水乡”、优质共享的幸福之城。</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">洪湖鹏表示，嘉善将竭尽所能，提供最优服务，创造最好条件，与大家共同分享国家战略带来的巨大红利，共同书写一体化示范区浓墨重彩的美好未来！</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><img class=\"\" style=\"box-sizing:border-box;margin-right: 0px; margin-left: 0px; padding: 0px; outline: 0px; overflow-wrap: break-word !important; height: auto !important; width: 677px !important; visibility: visible !important;\" src=\"http://injs.jsgbds.com/Uploads/Images/20210923/MidTongLan/2021092321444270382.jpg\" alt=\"图片\" data-ratio=\"0.6666666666666666\" data-src=\"https://mmbiz.qpic.cn/mmbiz_jpg/6LTjOicOJt5uweZDWGBaxYzicygFL85PBrAgCFuLmjOUD6fxuf2Kt9B9bMBISHW0rI4L0lgX3owOXVkntqtXlxbA/640?wx_fmt=jpeg\" data-type=\"jpeg\" data-w=\"1080\" data-fail=\"0\"/></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;会上，示范区执委会、两区一县政府以及各类市场主体共签订具有突出跨域功能和一体化特征的9项合作协议。其中，2个项目涉及水乡客厅，分别为水乡客厅项目开发建设合作项目和水乡客厅银企战略合作项目；2个项目落户嘉善，分别为数字显示新材料项目和碳化硅基板项目。</span></p><p style=\"font-family: -apple-system, BlinkMacSystemFont, &#39;Segoe UI&#39;, Roboto, &#39;Helvetica Neue&#39;, Arial, &#39;Noto Sans&#39;, sans-serif, &#39;Apple Color Emoji&#39;, &#39;Segoe UI Emoji&#39;, &#39;Segoe UI Symbol&#39;, &#39;Noto Color Emoji&#39;; font-size: medium;\">&nbsp;</p><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-id=\"98769\" data-tools=\"135编辑器\"><section style=\"margin: 10px 5px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px 0px -36px -2px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box; border: 2px solid #707070; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 1em; outline: 0px; max-width: 100%; box-sizing: border-box; line-height: 1.75em; letter-spacing: 1.5px; font-size: 14px; overflow-wrap: break-word !important;\" data-autoskip=\"1\"><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; letter-spacing: 1px; text-indent: 0em; line-height: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\"><strong style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #c00000; box-sizing: border-box !important; overflow-wrap: break-word !important;\">水乡客厅项目开发建设合作协议</span></strong></p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; letter-spacing: 1px; text-indent: 0em; line-height: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; letter-spacing: 1px; text-indent: 2em; line-height: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; text-indent: 2em; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">“水乡客厅”选址在江浙沪交界处，主要围绕“一心三园、三区三道”的总体空间结构来建设，是示范区“核心中的核心”，也是长三角一体化“五共”（共商、共建、共治、共享、共赢）制度创新试验田和“五个一”（一张蓝图管全域、一个平台管实施、一个主体管开发、一套标准管品质、一体化制度管治理）共建模式的集中实践地。未来将打造成一体化示范区生态绿色发展的功能样板，实现跨区域产居人文生态一体化发展，塑造世界级水乡人居文明典范。</span></p></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-end; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: -31px -2px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px 0px 0px 19px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: -6px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background-color: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-role=\"paragraph\"><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;</p></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-id=\"98769\" data-tools=\"135编辑器\"><section style=\"margin: 10px 5px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px 0px -36px -2px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box; border: 2px solid #707070; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 1em; outline: 0px; max-width: 100%; box-sizing: border-box; line-height: 1.75em; letter-spacing: 1.5px; font-size: 14px; overflow-wrap: break-word !important;\" data-autoskip=\"1\"><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\"><strong style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #c00000; box-sizing: border-box !important; overflow-wrap: break-word !important;\">水乡客厅银企战略合作协议</span></strong></p><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\">&nbsp;</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; text-indent: 2em; line-height: 2em; letter-spacing: 1px; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #595959; font-size: 16px; box-sizing: border-box !important; overflow-wrap: break-word !important;\">水乡客厅公司前期与多家金融机构进行多次交流，对一体化示范区建设的融资可行性和政策支撑进行多层面的探讨。由水乡客厅公司和国家开发银行、交通银行、农业银行、中国银行、浦发银行、工商银行等金融机构共同签订战略合作协议，就一体化示范区重大、重点建设项目开展投融资合作，助推水乡客厅内重大项目顺利落地。</span></p></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-end; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: -31px -2px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px 0px 0px 19px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: -6px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background-color: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-role=\"paragraph\"><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;</p></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-id=\"98769\" data-tools=\"135编辑器\"><section style=\"margin: 10px 5px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px 0px -36px -2px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box; border: 2px solid #707070; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 1em; outline: 0px; max-width: 100%; box-sizing: border-box; line-height: 1.75em; letter-spacing: 1.5px; font-size: 14px; overflow-wrap: break-word !important;\" data-autoskip=\"1\"><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\"><strong style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #c00000; box-sizing: border-box !important; overflow-wrap: break-word !important;\">数字显示新材料项目</span></strong></p><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\">&nbsp;</p><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; letter-spacing: 1px; text-indent: 2em; line-height: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; text-indent: 2em;\">该项目的投资方为美国纳斯达克上市企业，计划在嘉善县西塘镇投资建设第三代数字显示新材料生产线项目，项目总投资超3亿美元，分两期建设。一期租赁</span><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; text-indent: 2em;\">嘉兴综合保税区B区</span><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; text-indent: 2em; letter-spacing: 1.5px;\">2万平方米厂房，用于生产第三代数字显示新材料生产线项目，预计年产值10亿元。二期将购地自建厂房，建设导电和纳米薄膜生产基地，预计产值可达20亿元。</span></span></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-end; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: -31px -2px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px 0px 0px 19px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: -6px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background-color: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-role=\"paragraph\"><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;</p></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-id=\"98769\" data-tools=\"135编辑器\"><section style=\"margin: 10px 5px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px 0px -36px -2px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box; border: 2px solid #707070; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 1em; outline: 0px; max-width: 100%; box-sizing: border-box; line-height: 1.75em; letter-spacing: 1.5px; font-size: 14px; overflow-wrap: break-word !important;\" data-autoskip=\"1\"><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\"><strong style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #c00000; box-sizing: border-box !important; overflow-wrap: break-word !important;\">碳化硅基板项目</span></strong></p><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\">&nbsp;</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">该项目由大革智能科技有限公司母公司RevoDeve Co.,Ltd.全球控股公司投资，计划在位于魏塘街道内的中新嘉善现代产业园建设11条6英寸碳化硅基板生产线，年产40万片6英寸碳化硅基板。项目计划总投资2亿美元，达产后年产值约28亿元，年税收</span><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #595959; font-size: 16px; box-sizing: border-box !important; overflow-wrap: break-word !important;\">达1.4亿元。</span></p></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-end; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: -31px -2px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px 0px 0px 19px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: -6px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background-color: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section></section></section><p style=\"font-family: -apple-system, BlinkMacSystemFont, &#39;Segoe UI&#39;, Roboto, &#39;Helvetica Neue&#39;, Arial, &#39;Noto Sans&#39;, sans-serif, &#39;Apple Color Emoji&#39;, &#39;Segoe UI Emoji&#39;, &#39;Segoe UI Symbol&#39;, &#39;Noto Color Emoji&#39;; font-size: medium;\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><img class=\"\" style=\"box-sizing:border-box;margin-right: 0px; margin-left: 0px; padding: 0px; outline: 0px; overflow-wrap: break-word !important; height: auto !important; width: 677px !important; visibility: visible !important;\" src=\"http://injs.jsgbds.com/Uploads/Images/20210923/MidTongLan/2021092321444328453.jpg\" alt=\"图片\" data-ratio=\"0.6666666666666666\" data-src=\"https://mmbiz.qpic.cn/mmbiz_jpg/6LTjOicOJt5uweZDWGBaxYzicygFL85PBrAsUXgPtnpV1yobZyH2sMvNqia7RKbciavHluibj4HRicg7JRJBOPv1cIBA/640?wx_fmt=jpeg\" data-type=\"jpeg\" data-w=\"1080\" data-fail=\"0\"/></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; text-indent: 2em; line-height: 2em; letter-spacing: 1px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; text-indent: 2em; line-height: 2em; letter-spacing: 1px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">大会还为一体化示范区的3个重点项目揭牌，其中，浙江大学长三角智慧绿洲项目位于嘉善县祥符荡科创绿谷西北角组团。</span></p><p style=\"font-family: -apple-system, BlinkMacSystemFont, &#39;Segoe UI&#39;, Roboto, &#39;Helvetica Neue&#39;, Arial, &#39;Noto Sans&#39;, sans-serif, &#39;Apple Color Emoji&#39;, &#39;Segoe UI Emoji&#39;, &#39;Segoe UI Symbol&#39;, &#39;Noto Color Emoji&#39;; font-size: medium;\">&nbsp;</p><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-id=\"98769\" data-tools=\"135编辑器\"><section style=\"margin: 10px 5px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px 0px -36px -2px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box; border: 2px solid #707070; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 1em; outline: 0px; max-width: 100%; box-sizing: border-box; line-height: 1.75em; letter-spacing: 1.5px; font-size: 14px; overflow-wrap: break-word !important;\" data-autoskip=\"1\"><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\"><strong style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #c00000; box-sizing: border-box !important; overflow-wrap: break-word !important;\">浙江大学长三角智慧绿洲项目</span></strong></p><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\">&nbsp;</p><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; text-indent: 2em; line-height: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">该项目通过采取校地合作共建模式，打造科技研发、产业转化、人才培养、决策咨询四大平台，引进共建工程师学院分院、未来学院等载体，加快推动国内外一流科技创新和教育资源落户一体化示范区，依托长三角研究型大学联盟高校等多个成熟研发平台，协同开展创新研究、突破重大前沿理论、攻克关键技术难题，力争在人才培养、科学研究与社会服务等方面形成跨区域、多学科融合的创新机制，形成一批可复制、可推广的示范引领性原创技术，加快科技创新成果的高效转化和产业化，服务长三角区域高质量发展。</span></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-end; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: -31px -2px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px 0px 0px 19px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: -6px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background-color: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section></section></section><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">一体化示范区开发者大会是深化一体化示范区业界共治模式、展现一体化示范区建设的开放生态的平台。2020年8月26日，长三角生态绿色一体化发展示范区开发者联盟（以下简称“联盟”）在一体化示范区开发者大会上成立以来，联盟12家创始成员及13家第一批入盟成员，发挥在各自领域的头部优势，在空间规划、工程建设、生态环保、产业带动、专家智库等方面持续为一体化示范区导入优质资源，展示了市场主体以务实举措积极参与一体化示范区建设的阶段性成效。截至目前，开发者联盟成员共41家，其中大会前夕新吸纳16家，包括与嘉善合作的浙江大学、位于嘉善的富通集团有限公司。</span></p><p style=\"font-family: -apple-system, BlinkMacSystemFont, &#39;Segoe UI&#39;, Roboto, &#39;Helvetica Neue&#39;, Arial, &#39;Noto Sans&#39;, sans-serif, &#39;Apple Color Emoji&#39;, &#39;Segoe UI Emoji&#39;, &#39;Segoe UI Symbol&#39;, &#39;Noto Color Emoji&#39;; font-size: medium;\">&nbsp;</p><p style=\"text-align:justify;font-size: 16.6667px; font-family: &#39;Microsoft YaHei&#39;; margin-top: 0px; margin-bottom: 0px; padding: 0px;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; color: #7f7f7f;\">编辑 | 郁郁</span></p><p style=\"text-align:justify;font-size: 16.6667px; font-family: &#39;Microsoft YaHei&#39;; margin-top: 0px; margin-bottom: 0px; padding: 0px;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; color: #7f7f7f;\">责审 | 冯建萍</span></p><p style=\"text-align:justify;font-size: 16.6667px; font-family: &#39;Microsoft YaHei&#39;; margin-top: 0px; margin-bottom: 0px; padding: 0px;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; color: #7f7f7f;\">嘉善传媒新媒体部</span></p><!--!doctype-->",
    "content": "<p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 1px; text-indent: 2em; line-height: 1.75em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"color: #595959; font-size: 16px; font-family: arial, helvetica, sans-serif;\">长三角生态绿色一体化发展示范区开发者大会今天在江苏省吴江区举行。大会为期一天，以“跨域一体、创新共进”为主题。两省一市政府及相关部门领导，长三角地区相关毗邻区域负责人，开发者联盟成员单位代表，高科技企业、规划设计公司、金融机构、高端智库、高校和研究院所等的负责人近200余人齐聚一堂，共同聚焦示范区创新与绿色发展。</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 1px; text-indent: 2em; line-height: 1.75em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"color: #595959; font-size: 16px; font-family: arial, helvetica, sans-serif;\">嘉兴市委常委、嘉善县委书记洪湖鹏，嘉善县委副书记、县长徐鸣阳，嘉善县委常委、嘉善示范区党工委副书记、管委会专职副主任陈天荣等应邀参加。</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 1px; text-indent: 2em; line-height: 1.75em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"color: #595959; font-size: 16px; font-family: arial, helvetica, sans-serif;\">&nbsp;</span></p><p style=\"text-align:justify;text-indent: 0em; margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><img style=\"box-sizing:border-box;width: 900px; padding-bottom: 7px;\" src=\"http://injs.jsgbds.com/Uploads/Images/20210923/MidTongLan/2021092321444157150.jpg\" data-ratio=\"0.6666666666666666\" data-w=\"1080\"/></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">洪湖鹏在大会上做主旨发言。他以“共享新机遇 &nbsp;共创新未来 携手奋进长三角一体化新征程”为题，从“战略叠加、蓄能成势”“产业兴旺、活力迸发”“改革先行、整体智治”“生态优美、宜游低碳”“优质普惠、包容开放”五个方面推荐嘉善。洪湖鹏表示，嘉善地处长三角中心位置，是擘画宏图的超级风口，是动能澎湃的创新高地，是营商环境的先锋典范，是诗意栖居的梦里水乡，是温度满满的共富家园。</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><img class=\"\" style=\"box-sizing:border-box;margin-right: 0px; margin-left: 0px; padding: 0px; outline: 0px; overflow-wrap: break-word !important; height: auto !important; width: 677px !important; visibility: visible !important;\" src=\"http://injs.jsgbds.com/Uploads/Images/20210923/MidTongLan/2021092321444217511.jpg\" alt=\"图片\" data-ratio=\"0.6537037037037037\" data-src=\"https://mmbiz.qpic.cn/mmbiz_jpg/6LTjOicOJt5uweZDWGBaxYzicygFL85PBr5QoU0qnhMIaL688UYsQTwVUzaNUotu2HtW28zT0CxTP0iax0nfyWyAg/640?wx_fmt=jpeg\" data-type=\"jpeg\" data-w=\"1080\" data-fail=\"0\"/></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">会上，洪湖鹏向开发者联盟成员单位和广大优秀企业发出诚挚邀请，邀请他们来嘉善设立研发中心、导入重点实验室、建设科研机构，携手嘉善打造湖区创新高地，期待他们在谋划新项目、新投资时，优先考虑嘉善，把更多教育、医疗、文化等优质资源落户到嘉善，共同打造更加美丽的“梦里水乡”、优质共享的幸福之城。</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">洪湖鹏表示，嘉善将竭尽所能，提供最优服务，创造最好条件，与大家共同分享国家战略带来的巨大红利，共同书写一体化示范区浓墨重彩的美好未来！</span></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><img class=\"\" style=\"box-sizing:border-box;margin-right: 0px; margin-left: 0px; padding: 0px; outline: 0px; overflow-wrap: break-word !important; height: auto !important; width: 677px !important; visibility: visible !important;\" src=\"http://injs.jsgbds.com/Uploads/Images/20210923/MidTongLan/2021092321444270382.jpg\" alt=\"图片\" data-ratio=\"0.6666666666666666\" data-src=\"https://mmbiz.qpic.cn/mmbiz_jpg/6LTjOicOJt5uweZDWGBaxYzicygFL85PBrAgCFuLmjOUD6fxuf2Kt9B9bMBISHW0rI4L0lgX3owOXVkntqtXlxbA/640?wx_fmt=jpeg\" data-type=\"jpeg\" data-w=\"1080\" data-fail=\"0\"/></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;会上，示范区执委会、两区一县政府以及各类市场主体共签订具有突出跨域功能和一体化特征的9项合作协议。其中，2个项目涉及水乡客厅，分别为水乡客厅项目开发建设合作项目和水乡客厅银企战略合作项目；2个项目落户嘉善，分别为数字显示新材料项目和碳化硅基板项目。</span></p><p style=\"font-family: -apple-system, BlinkMacSystemFont, &#39;Segoe UI&#39;, Roboto, &#39;Helvetica Neue&#39;, Arial, &#39;Noto Sans&#39;, sans-serif, &#39;Apple Color Emoji&#39;, &#39;Segoe UI Emoji&#39;, &#39;Segoe UI Symbol&#39;, &#39;Noto Color Emoji&#39;; font-size: medium;\">&nbsp;</p><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-id=\"98769\" data-tools=\"135编辑器\"><section style=\"margin: 10px 5px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px 0px -36px -2px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box; border: 2px solid #707070; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 1em; outline: 0px; max-width: 100%; box-sizing: border-box; line-height: 1.75em; letter-spacing: 1.5px; font-size: 14px; overflow-wrap: break-word !important;\" data-autoskip=\"1\"><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; letter-spacing: 1px; text-indent: 0em; line-height: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\"><strong style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #c00000; box-sizing: border-box !important; overflow-wrap: break-word !important;\">水乡客厅项目开发建设合作协议</span></strong></p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; letter-spacing: 1px; text-indent: 0em; line-height: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; letter-spacing: 1px; text-indent: 2em; line-height: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; text-indent: 2em; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">“水乡客厅”选址在江浙沪交界处，主要围绕“一心三园、三区三道”的总体空间结构来建设，是示范区“核心中的核心”，也是长三角一体化“五共”（共商、共建、共治、共享、共赢）制度创新试验田和“五个一”（一张蓝图管全域、一个平台管实施、一个主体管开发、一套标准管品质、一体化制度管治理）共建模式的集中实践地。未来将打造成一体化示范区生态绿色发展的功能样板，实现跨区域产居人文生态一体化发展，塑造世界级水乡人居文明典范。</span></p></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-end; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: -31px -2px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px 0px 0px 19px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: -6px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background-color: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-role=\"paragraph\"><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;</p></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-id=\"98769\" data-tools=\"135编辑器\"><section style=\"margin: 10px 5px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px 0px -36px -2px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box; border: 2px solid #707070; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 1em; outline: 0px; max-width: 100%; box-sizing: border-box; line-height: 1.75em; letter-spacing: 1.5px; font-size: 14px; overflow-wrap: break-word !important;\" data-autoskip=\"1\"><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\"><strong style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #c00000; box-sizing: border-box !important; overflow-wrap: break-word !important;\">水乡客厅银企战略合作协议</span></strong></p><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\">&nbsp;</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; text-indent: 2em; line-height: 2em; letter-spacing: 1px; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #595959; font-size: 16px; box-sizing: border-box !important; overflow-wrap: break-word !important;\">水乡客厅公司前期与多家金融机构进行多次交流，对一体化示范区建设的融资可行性和政策支撑进行多层面的探讨。由水乡客厅公司和国家开发银行、交通银行、农业银行、中国银行、浦发银行、工商银行等金融机构共同签订战略合作协议，就一体化示范区重大、重点建设项目开展投融资合作，助推水乡客厅内重大项目顺利落地。</span></p></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-end; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: -31px -2px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px 0px 0px 19px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: -6px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background-color: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-role=\"paragraph\"><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;</p></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-id=\"98769\" data-tools=\"135编辑器\"><section style=\"margin: 10px 5px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px 0px -36px -2px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box; border: 2px solid #707070; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 1em; outline: 0px; max-width: 100%; box-sizing: border-box; line-height: 1.75em; letter-spacing: 1.5px; font-size: 14px; overflow-wrap: break-word !important;\" data-autoskip=\"1\"><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\"><strong style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #c00000; box-sizing: border-box !important; overflow-wrap: break-word !important;\">数字显示新材料项目</span></strong></p><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\">&nbsp;</p><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; letter-spacing: 1px; text-indent: 2em; line-height: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; text-indent: 2em;\">该项目的投资方为美国纳斯达克上市企业，计划在嘉善县西塘镇投资建设第三代数字显示新材料生产线项目，项目总投资超3亿美元，分两期建设。一期租赁</span><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; text-indent: 2em;\">嘉兴综合保税区B区</span><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; text-indent: 2em; letter-spacing: 1.5px;\">2万平方米厂房，用于生产第三代数字显示新材料生产线项目，预计年产值10亿元。二期将购地自建厂房，建设导电和纳米薄膜生产基地，预计产值可达20亿元。</span></span></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-end; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: -31px -2px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px 0px 0px 19px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: -6px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background-color: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-role=\"paragraph\"><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; box-sizing: border-box !important; overflow-wrap: break-word !important;\">&nbsp;</p></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-id=\"98769\" data-tools=\"135编辑器\"><section style=\"margin: 10px 5px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px 0px -36px -2px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box; border: 2px solid #707070; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 1em; outline: 0px; max-width: 100%; box-sizing: border-box; line-height: 1.75em; letter-spacing: 1.5px; font-size: 14px; overflow-wrap: break-word !important;\" data-autoskip=\"1\"><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\"><strong style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #c00000; box-sizing: border-box !important; overflow-wrap: break-word !important;\">碳化硅基板项目</span></strong></p><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\">&nbsp;</p><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">该项目由大革智能科技有限公司母公司RevoDeve Co.,Ltd.全球控股公司投资，计划在位于魏塘街道内的中新嘉善现代产业园建设11条6英寸碳化硅基板生产线，年产40万片6英寸碳化硅基板。项目计划总投资2亿美元，达产后年产值约28亿元，年税收</span><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #595959; font-size: 16px; box-sizing: border-box !important; overflow-wrap: break-word !important;\">达1.4亿元。</span></p></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-end; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: -31px -2px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px 0px 0px 19px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: -6px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background-color: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section></section></section><p style=\"font-family: -apple-system, BlinkMacSystemFont, &#39;Segoe UI&#39;, Roboto, &#39;Helvetica Neue&#39;, Arial, &#39;Noto Sans&#39;, sans-serif, &#39;Apple Color Emoji&#39;, &#39;Segoe UI Emoji&#39;, &#39;Segoe UI Symbol&#39;, &#39;Noto Color Emoji&#39;; font-size: medium;\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><img class=\"\" style=\"box-sizing:border-box;margin-right: 0px; margin-left: 0px; padding: 0px; outline: 0px; overflow-wrap: break-word !important; height: auto !important; width: 677px !important; visibility: visible !important;\" src=\"http://injs.jsgbds.com/Uploads/Images/20210923/MidTongLan/2021092321444328453.jpg\" alt=\"图片\" data-ratio=\"0.6666666666666666\" data-src=\"https://mmbiz.qpic.cn/mmbiz_jpg/6LTjOicOJt5uweZDWGBaxYzicygFL85PBrAsUXgPtnpV1yobZyH2sMvNqia7RKbciavHluibj4HRicg7JRJBOPv1cIBA/640?wx_fmt=jpeg\" data-type=\"jpeg\" data-w=\"1080\" data-fail=\"0\"/></p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; text-indent: 2em; line-height: 2em; letter-spacing: 1px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; text-indent: 2em; line-height: 2em; letter-spacing: 1px; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">大会还为一体化示范区的3个重点项目揭牌，其中，浙江大学长三角智慧绿洲项目位于嘉善县祥符荡科创绿谷西北角组团。</span></p><p style=\"font-family: -apple-system, BlinkMacSystemFont, &#39;Segoe UI&#39;, Roboto, &#39;Helvetica Neue&#39;, Arial, &#39;Noto Sans&#39;, sans-serif, &#39;Apple Color Emoji&#39;, &#39;Segoe UI Emoji&#39;, &#39;Segoe UI Symbol&#39;, &#39;Noto Color Emoji&#39;; font-size: medium;\">&nbsp;</p><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; box-sizing: border-box !important; overflow-wrap: break-word !important;\" data-id=\"98769\" data-tools=\"135编辑器\"><section style=\"margin: 10px 5px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: 0px 0px -36px -2px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: 0px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box; border: 2px solid #707070; overflow-wrap: break-word !important;\"><section style=\"margin: 0px; padding: 1em; outline: 0px; max-width: 100%; box-sizing: border-box; line-height: 1.75em; letter-spacing: 1.5px; font-size: 14px; overflow-wrap: break-word !important;\" data-autoskip=\"1\"><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\"><strong style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #c00000; box-sizing: border-box !important; overflow-wrap: break-word !important;\">浙江大学长三角智慧绿洲项目</span></strong></p><p style=\"text-align:center;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; line-height: 2em; letter-spacing: 1px; text-indent: 0em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"center\">&nbsp;</p><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; text-indent: 2em; line-height: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">该项目通过采取校地合作共建模式，打造科技研发、产业转化、人才培养、决策咨询四大平台，引进共建工程师学院分院、未来学院等载体，加快推动国内外一流科技创新和教育资源落户一体化示范区，依托长三角研究型大学联盟高校等多个成熟研发平台，协同开展创新研究、突破重大前沿理论、攻克关键技术难题，力争在人才培养、科学研究与社会服务等方面形成跨区域、多学科融合的创新机制，形成一批可复制、可推广的示范引领性原创技术，加快科技创新成果的高效转化和产业化，服务长三角区域高质量发展。</span></section></section></section><section style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; display: flex; justify-content: flex-end; align-items: flex-start; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"margin: -31px -2px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;\"><section style=\"box-sizing:border-box;margin: 0px 0px 0px 19px; padding: 0px; outline: 0px; max-width: 100%; width: 6px; height: 30px; background: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section><section style=\"box-sizing:border-box;margin: -6px 0px 0px; padding: 0px; outline: 0px; max-width: 100%; width: 25px; height: 12px; background-color: #cf1512; overflow: hidden; overflow-wrap: break-word !important;\"></section></section></section></section></section><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\">&nbsp;</p><p style=\"text-align:justify;margin-top: 0px; margin-bottom: 0px; padding: 0px; outline: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, BlinkMacSystemFont, &#39;Helvetica Neue&#39;, &#39;PingFang SC&#39;, &#39;Hiragino Sans GB&#39;, &#39;Microsoft YaHei UI&#39;, &#39;Microsoft YaHei&#39;, Arial, sans-serif; font-size: 17px; line-height: 2em; letter-spacing: 1px; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; outline: 0px; max-width: 100%; font-size: 16px; color: #595959; box-sizing: border-box !important; overflow-wrap: break-word !important;\">一体化示范区开发者大会是深化一体化示范区业界共治模式、展现一体化示范区建设的开放生态的平台。2020年8月26日，长三角生态绿色一体化发展示范区开发者联盟（以下简称“联盟”）在一体化示范区开发者大会上成立以来，联盟12家创始成员及13家第一批入盟成员，发挥在各自领域的头部优势，在空间规划、工程建设、生态环保、产业带动、专家智库等方面持续为一体化示范区导入优质资源，展示了市场主体以务实举措积极参与一体化示范区建设的阶段性成效。截至目前，开发者联盟成员共41家，其中大会前夕新吸纳16家，包括与嘉善合作的浙江大学、位于嘉善的富通集团有限公司。</span></p><p style=\"font-family: -apple-system, BlinkMacSystemFont, &#39;Segoe UI&#39;, Roboto, &#39;Helvetica Neue&#39;, Arial, &#39;Noto Sans&#39;, sans-serif, &#39;Apple Color Emoji&#39;, &#39;Segoe UI Emoji&#39;, &#39;Segoe UI Symbol&#39;, &#39;Noto Color Emoji&#39;; font-size: medium;\">&nbsp;</p><p style=\"text-align:justify;font-size: 16.6667px; font-family: &#39;Microsoft YaHei&#39;; margin-top: 0px; margin-bottom: 0px; padding: 0px;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; color: #7f7f7f;\">编辑 | 郁郁</span></p><p style=\"text-align:justify;font-size: 16.6667px; font-family: &#39;Microsoft YaHei&#39;; margin-top: 0px; margin-bottom: 0px; padding: 0px;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; color: #7f7f7f;\">责审 | 冯建萍</span></p><p style=\"text-align:justify;font-size: 16.6667px; font-family: &#39;Microsoft YaHei&#39;; margin-top: 0px; margin-bottom: 0px; padding: 0px;\" align=\"justify\"><span style=\"margin: 0px; padding: 0px; color: #7f7f7f;\">嘉善传媒新媒体部</span></p><!--!doctype-->",
    "overview": "长三角生态绿色一体化发展示范区开发者大会今天在江苏省吴江区举行。大会为期一天，以&ldquo;跨域一体、创新共进&rdquo;为主题。两省一市政府及相关部门领导，长三角地区相关毗邻区域负责人，开发者联盟成员单位代表，高科技企业、规划设计公司",
    "coverUrl": [
      "/images/676a1ae6b34b43d09c8839594e2d52db.png"
    ],
    //封面
    "isAllowLike": "1",
    "isAllowComment": "1",
    "isShowReadCount": "1",
    "isShowCommentCount": "1",
    "isShowLikeCount": "1",
    "isShowAd": "1",
    "commentCount": 0,
    "likeCount": 1,
    "readCount": 45,
    "status": "1",
    "publishUserId": null,
    "publishTime": "2021-10-08 17:01:24",
    "isPublishDelay": "0",
    "publishDelayTime": null,
    "labelNames": [],
    "category": null,
    "categorySMH": null,
    "json": "[{\"title\":\"一体化示范区开发者大会召开！\",\"imgList\":[\"/images/676a1ae6b34b43d09c8839594e2d52db.png\"],\"overview\":\"长三角生态绿色一体化发展示范区开发者大会今天在江苏省吴江区举行。大会为期一天，以&ldquo;跨域一体、创新共进&rdquo;为主题。两省一市政府及相关部门领导，长三角地区相关毗邻区域负责人，开发者联盟成员单位代表，高科技企业、规划设计公司\"}]",
    "topic": null,
    "editor": null,
    "link": null,
    "source": "",
    "angleName": null,
    "angleColor": null,
    "keywords": null
  },
  "ok": true
}
```

## 开放应用调用积分规则

输出给in嘉善开放平台应用调用的调用积分规则的地址接口

参数说明：

| 参数        | 类型     | 描述                                                            |
| --------- | ------ | ------------------------------------------------------------- |
| appId     | String | AppId                                                         |
| timestamp | Long   | 时间戳（13位）                                                      |
| signature | String | 签名(签名规则（md5(appid + appsecret + timestamp+eventCode+openId））） |
| eventCode | String | 规则编码                                                          |
| openId    | String | OpenId                                                        |

::: tip 调用

- 请求路径：`/open/integral/invoke`
- 请求方法：POST
- 传参方式：JSON
- JSON字段解释：

| 中文描述   | 变量名       | 是否必传 | 格式     | 备注  |
|--------| --------- | ---- | ------ | --- |
| appId  | appId     | √    | string |     |
| 13位时间戳 | timestamp | √    | Long   |     |
| 签名     | signature | √    | string |     |
| 规则编码   | eventCode | √    | string |     |
| openId | openId    | √    | string |     |

:::

返回结果

```json
{
  "code": 0,
  //返回code
  "msg": "success",
  "data": "1552492483256053762",
  //返回的日志id
  "ok": true
}
```

## 开放应用积分扣减

输出给in嘉善开放平台应用调用的任意积分数的扣减接口

参数说明：

| 参数        | 类型     | 描述                                                          |
| --------- | ------ | ----------------------------------------------------------- |
| appId     | String | AppId                                                       |
| timestamp | Long   | 时间戳（13位）                                                    |
| signature | String | 签名(签名规则（md5(appid + appsecret + timestamp+ number+openId））） |
| number    | String | 扣除的积分数                                                      |
| openId    | String | OpenId                                                      |

::: tip 调用

- 请求路径：`/open/integral/any/calc`
- 请求方法：POST
- 传参类型：JSON
- JSON字段解释：

| 域名     | 变量名       | 是否必传 | 格式     | 备注  |
| ------ | --------- | ---- | ------ | --- |
| appId  | appId     | √    | string |     |
| 13位时间戳 | timestamp | √    | Long   |     |
| 签名     | signature | √    | string |     |
| 扣除的积分数 | number    | √    | string |     |
| openId | openId    | √    | string |     |

:::

返回结果

```json
{
  "code": 0,
  //返回结果
  "msg": "success",
  "data": "1552492824286523394",
  //返回的日志id
  "ok": true
}
```

## 开放应用积分充值

输出给in嘉善开放平台应用调用的任意积分数的充值接口

参数说明：

| 参数        | 类型     | 描述                                                          |
| --------- | ------ |-------------------------------------------------------------|
| appId     | String | AppId                                                       |
| timestamp | Long   | 时间戳（13位）                                                    |
| signature | String | 签名(签名规则（md5(appid + appsecret + timestamp+ number+openId））） |
| number    | String | 充值的积分数                                                      |
| openId    | String | OpenId                                                      |
| eventId    | String | 第三方订单id                                                     |
| remark    | String | 备注，会记录到用户的积分流水中                                             |

::: tip 调用

- 请求路径：`/open/integral/any/add`
- 请求方法：POST
- 传参类型：JSON
- JSON字段解释：

| 域名      | 变量名       | 是否必传 | 格式     | 备注  |
|---------| --------- | --- | ------ | --- |
| appId   | appId     | √   | string |     |
| 13位时间戳  | timestamp | √   | Long   |     |
| 签名      | signature | √   | string |     |
| 充值的积分数  | number    | √   | string |     |
| openId  | openId    | √   | string |     |
| 第三方订单id | eventId    |     | string |     |
| 备注      | remark    | √   | string |     |

:::

返回结果

```json
{
  "code": 0,
  //返回结果
  "msg": "success",
  "data": "1552492824286523394",
  //返回的日志id
  "ok": true
}
```

## 开放应用积分流水查询

输出给in嘉善开放平台应用调用的查询开放应用积分流水的地址接口

参数说明：

| 参数        | 类型     | 描述                                                     |
| --------- | ------ | ------------------------------------------------------ |
| appId     | String | AppId                                                  |
| timestamp | Long   | 时间戳（13位）                                               |
| signature | String | 签名(签名规则（md5(appid + appsecret + timestamp+ recordId））） |
| recordId  | String | 日志id                                                   |

::: tip 调用

- 请求路径：`/open/Integral/search`
- 请求方法：GET
- 传参方式：Query
- Query字段解释：

| 域名     | 变量名       | 是否必传 | 格式     | 备注  |
| ------ | --------- | ---- | ------ | --- |
| appId  | appId     | √    | string |     |
| 13位时间戳 | timestamp | √    | Long   |     |
| 签名     | signature | √    | string |     |
| 日志id   | recordId  | √    | string |     |

:::

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "1550649648045686785",
    "createBy": null,
    "createTime": null,
    "updateBy": null,
    "updateTime": null,
    "userId": "1453903698637434882",
    "type": "+",
    //规则类型
    "origin": "OPEN_APP",
    "eventCode": "1",
    //规则编码
    "eventId": "1550369754673418242",
    "eventTime": "2022-07-23 09:11:00",
    //规则调用时间
    "integralCount": 5,
    "remark": "数据能力测试-->每日10次，每次5分",
    "status": "2"
    //状态（0/失败，1/成功，2/待处理）
  },
  "ok": true
}
```

## 开放应用用户积分总数查询

输出给in嘉善开放平台应用调用的查询用户积分总数的地址接口

| 参数        | 类型     | 描述                                                   |
| --------- | ------ | ---------------------------------------------------- |
| appId     | String | AppId                                                |
| timestamp | Long   | 时间戳（13位）                                             |
| signature | String | 签名(签名规则（md5(appid + appsecret + timestamp+ openId））） |
| openId    | String | OpenId                                               |

::: tip 调用

- 请求路径：`/open/Integral/searchIntegralCount`
- 请求方法：GET
- 传参方式：Query
- Query字段解释：

| 域名     | 变量名       | 是否必传 | 格式     | 备注  |
| ------ | --------- | ---- | ------ | --- |
| appId  | appId     | √    | string |     |
| 13位时间戳 | timestamp | √    | Long   |     |
| 签名     | signature | √    | string |     |
| openId | openId    | √    | string |     |

:::

返回结果

```json
{
  "code": 0,
  //返回code
  "msg": "success",
  "data": "1",
  //用户积分总数
  "ok": true
}
```

## 开放应用标签同步

输出给in嘉善开放平台应用同步标签到本系统中的地址接口

支持批量同步，单次同步数据上限为1000条

| 参数          | 类型       | 描述                                           |
| ----------- | -------- | -------------------------------------------- |
| appId       | String   | AppId                                        |
| timestamp   | Long     | 时间戳（13位）                                     |
| signature   | String   | 签名(签名规则（md5(appid + appsecret + timestamp））） |
| datas       | Object[] | 需批量同步的标签数据                                   |
| labelId     | String   | 标签Id（标签唯一标识）                                 |
| labelName   | String   | 标签名称                                         |
| phoneNumber | String   | 手机号                                          |
| isDelete    | Integer  | 是否删除标识，0：否；1：是                               |

`_post`/open/article/label/sync

入参：在body中以JSON格式

| 域名         | 变量名       | 是否必传 | 格式       | 备注  |
| ---------- | --------- | ---- | -------- | --- |
| appId      | appId     | √    | string   |     |
| 13位时间戳     | timestamp | √    | Long     |     |
| 签名         | signature | √    | string   |     |
| 需批量同步的标签数据 | datas     | √    | Object[] |     |

datas对象

| 域名             | 变量名         | 是否必传 | 格式      | 备注  |
| -------------- | ----------- | ---- | ------- | --- |
| 标签Id（标签唯一标识）   | labelId     | √    | string  |     |
| 标签名称           | labelName   | √    | String  |     |
| 手机号            | phoneNumber | √    | string  |     |
| 是否删除标识，0：否；1：是 | isDelete    | √    | Integer |     |

入参示例：

```json
{
  "appId": "123456",
  "signature": "4e85a8db6a7bb0cb1386a319ad868a9b",
  "timestamp": 1681179211745,
  "datas": [
    {
      "labelId": "2023041101",
      "labelName": "娱乐",
      "phoneNumber": "18267876566",
      "isDelete": 0
    },
    {
      "labelId": "2023041102",
      "labelName": "生活",
      "phoneNumber": "18267876566",
      "isDelete": 1
    }
  ]
}

```

返回结果：

```json
//处理失败 or 部分处理失败
{
  "code": -1,
  "msg": "传入2条数据,处理成功1条数据,处理失败1条数据",
  "data": [
    {
      "labelId": "2023041101",
      "labelName": "娱乐2",
      "phoneNumber": "18267876566",
      "isDelete": null,
      "errMsg": "缺少参数值"
    }
  ],
  "ok": false
}

//处理成功
{
  "code": 0,
  "msg": "传入2条数据,处理成功2条数据",
  "data": [],
  "ok": true
}
```

## 开放应用文章推送指定标签用户

输出给in嘉善开放平台应用文章推送指定标签用户的地址接口

| 参数        | 类型     | 描述                                                                   |
| --------- | ------ | -------------------------------------------------------------------- |
| appId     | String | AppId                                                                |
| timestamp | Long   | 时间戳（13位）                                                             |
| signature | String | 签名(签名规则（md5(appid + appsecret + timestamp+articleId+pushType+tag+））） |
| articleId | String | 文章id                                                                 |
| pushType  | String | 推送类型1实时 2定时                                                          |
| tag       | String | 标签名称                                                                 |
| pushTime  | Date   | 推送时间                                                                 |

`_post`/open/article/push/push

入参：在body中以JSON格式

| 域名     | 变量名       | 是否必传  | 格式     | 备注                  |
| ------ | --------- | ----- | ------ | ------------------- |
| appId  | appId     | √     | string |                     |
| 13位时间戳 | timestamp | √     | Long   |                     |
| 签名     | signature | √     | string |                     |
| 文章id   | articleId |     √ | string |                     |
| 推送类型   | pushType  |     √ | string | 1实时 2定时             |
| 标签名称   | tag       |     √ | string |                     |
| 推送时间   | pushTime  | √     | Date   | yyyy-MM-dd HH:mm:ss |

入参示例：

```json
{
  "appId": "xcnmFdIAuqDZvEkq",
  "timestamp": 1681431046854,
  "signature": "8cc94d1978d2666025760cd3ff820c63",
  "articleId": "5841420126908407814",
  "pushType": "2",
  "tag": "娱乐",
  "pushTime": "2023-04-14 08:40:46"
}


```

返回结果：

```json
//处理失败 or 部分处理失败
{
  "code": 63002,
  "msg": "invalid signature",
  "data": null,
  "ok": false
}


//处理成功
{
  "code": 0,
  "msg": "success",
  "data": "1646677395604480001",
  "ok": true
}
```


## 开放应用事件推送

输出给in嘉善开放平台应用事件推送功能

开放应用配置推送地址

出参：在body中以JSON格式

| 域名   | 变量名         | 是否必传 | 格式     | 备注               |
| ---- | ----------- | ---- | ------ | ---------------- |
| 手机号  | phoneNumber | √    | string | MD5加密            |
| 事件编码 | eventCode   | √    | string | READ_ARTICLE文章阅读 |
| 事件事件 | eventTime   | √    | date   |                  |
| 内容   | data        | √    | Object |                  |

READ_ARTICLE文章阅读Data结构

| 域名   | 变量名       | 格式     | 备注  |
| ---- | --------- | ------ | --- |
| 文章id | articleId | string |     |

## 获取会员信息

通过in嘉善开放平台获取用户信息

| 参数     | 类型     | 描述                                 |
| ------ | ------ | ---------------------------------- |
| appId  | String | AppId                              |
| openid | String | openid                             |
| sign   | String | 签名签名规则：md5(openid+appId+appsecret) |

GET: `/open/user/info`

入参：

| 域名     | 变量名    | 是否必传 | 格式     | 备注                               |
| ------ | ------ | ---- | ------ | -------------------------------- |
| appId  | appId  | √    | string |                                  |
| 签名     | sign   | √    | string | 签名规则：md5(openid+appId+appsecret) |
| openid | openid | √    | string |                                  |

入参示例

GET：`/open/user/info?openid=${openid}&appId=${appId}&sign=${sign}`

返回结果：

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "avatar_url": "/avatars/6a40956214698239ax1122.png",
        "user_id": "1431435394021916673",
        "phone": "18357310001",
        "user_name": "用户562011",
        "openid": "e930898410d74c7fba141e2a1cdec7cd",
        "integral": 0
    },
    "ok": true
}
```