# JSSDK

## 导航

[[toc]]

## SDK下载地址

```
https://oss.injs.jsxww.cn/jssdk/injs.umd_1.1.0.js
```

jssdk是in嘉善app提供的H5接入开发工具包，其中包含了提供的一系列方法。通过这些方法可以调用in嘉善app的一些开放能力，jssdk默认是挂载在全局变量injs上。

## 获取屏幕顶部安全区域高度 - getSafeAreaTop

获取屏幕顶部安全区域高度

```javascript
injs.getSafeAreaTop().then(res => {
  //业务逻辑
}).catch(err => {
  //错误处理
})
```

正确数据

```json
{
  "code": 0,
  "msg": "success",
  "data": 47
}
```

## 获取屏幕底部安全区域高度- getSafeAreaBottom

获取屏幕底部安全区域高度

```javascript
injs.getSafeAreaBottom().then(res => {
  //业务逻辑
}).catch(err => {
  //错误处理
})
```

正确数据

```json
{
  "code": 0,
  "msg": "success",
  "data": 34
}
```

## 设置应用访问token - setAppAccessToken

设置应用访问token

```javascript
injs.setAppAccessToken(string)
```

## 获取OpenId- getOpenId

获取OpenId

```javascript
injs.getOpenId().then(res => {
  //业务逻辑
}).catch(err => {
  //错误处理
})
```

正确数据

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "openid": "be0315f4672e4c05a288c49f85fefe00",
    "ticket": "123123123123123123"
  }
}
```

## 获取用户信息- getUserInfo

获取用户信息

```javascript
injs.getUserInfo().then(res => {
  //业务逻辑
}).catch(err => {
  //错误处理
})
```

正确数据

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "14336323147829123123",
    "gender": "1",
    "idNumber": "1111111",
    "birth": "",
    "des": "",
    "province": "",
    "avatarUrl": "https://oss.injs.jsxww.cn:11443/avatars/e8272cdbccd1491583baa867845f5245.png",
    "remark": "",
    "city": "",
    "username": "",
    "language": "zh_CN",
    "nickname": "嘻嘻",
    "country": "",
    "status": 1,
    "phoneNumber": "********"
  }
}
```

## 获取用户身份信息 - getUserIdentityInfo

获取用户身份信息

```javascript
injs.getUserInfo().then(res => {
  //业务逻辑
  //
}).catch(err => {
  //错误处理
})
```

正确数据

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "idNumber": "330xxxxxx",
    "realName": "张三"
  }
}
```

## 获取高德gps定位坐标 - amapGps

获取高德gps定位坐标

```javascript
injs.amapGps().then(res => {
  //业务逻辑
}).catch(err => {
  //错误处理
})
```

正确数据

```json
{
  "code": 0,
  "msg": "success",
  "data": "120.928420,30.829073"
}
```

## 调用二维码扫码器 - scanQrCode

调用二维码扫码器

```javascript
injs.scanQrCode().then(res => {
  //业务逻辑
}).catch(err => {
  //错误处理
})
```

正确数据

```json
{
  "code": 0,
  "msg": "success",
  "data": "qrcode content"
}
```

## 设置状态栏颜色 - setStatusBarColor

设置状态栏（屏幕顶部状态栏）颜色，目前颜色只支持HEX模式的颜色。

```javascript
injs.setStatusBarColor('#ff0000')
```

## 设置导航栏颜色 - setNavigationBarColor

设置导航栏颜色（屏幕底部导航栏），目前颜色只支持HEX模式的颜色。

```javascript
injs.setNavigationBarColor('#ff0000')
```

## 调用支付宝进行支付 - openAlipay

调用支付宝进行支付，需要传入您服务端生成的支付宝支付字符串。调用后会跳转到支付宝app进行付款操作。

```javascript
injs.openAlipay(string).then(res => {
  //业务逻辑
}).catch(err => {
  //错误处理
})
```

正确数据

```json
{
  "msg": "success",
  "code": "0",
  "data": {
    "resultStatus": "9000",
    "result": "{\"alipay_trade_app_pay_response\":{\"code\":\"10000\",\"msg\":\"Success\",\"app_id\":\"2021002150611743\",\"auth_app_id\":\"2021002150611743\",\"charset\":\"UTF-8\",\"timestamp\":\"2021-12-24 13:39:42\",\"out_trade_no\":\"1640324361258\",\"total_amount\":\"0.01\",\"trade_no\":\"2021122422001453311403743072\",\"seller_id\":\"2088141728494750\"},\"sign\":\"DzmjX8o9WAUJ5W9SYgGM4uHaswTMtNzcrwDaSpTx4jTUNR5MN5YZwhwg/QjOUu2JQVbdLsjmR6evMkfgs93GKfGrtjnIJlloDviVK1jkmiAkud36mNLWHpIIP7ef8Gb5tqCouh6dORNY4CApEpPj5Zjf51jN0p5KhoSjouKMPdMMDxyccgoP2VZhqAIPtiq6YEVZ5T5D7wbbH1wntVDd6MQoWNR7sW5ariFddFPN3rz1TBDLbELpkO0ghFRq6YKENkuLvPyd0+Oa7/1oq6uq1thaeG+tk9g6dix7jm9f3q4hZgkkunp1IXAiiOo4pteUR3hmKfeNtyHvmnjSkIVebg==\",\"sign_type\":\"RSA2\"}",
    "memo": "",
    "extendInfo": "{\"doNotExit\":true,\"isDisplayResult\":true,\"tradeNo\":\"2021122422001453311403743072\"}"
  }
}
```

失败数据

```json
{
  "msg": {
    "resultStatus": "6001",
    "result": "",
    "memo": "支付未完成。"
  },
  "code": "-1"
}
```

## 调用农商银行银行界面 - openZjnxpay

调用农商银行银行界面。

```javascript
injs.openZjnxpay().then(res => {
  //业务逻辑
}).catch(err => {
  //错误处理
})
```

正确数据

```text
暂无返回数据
```

## 调用农商银行支付码 - openZjnxcode

调用农商银行支付码。

```javascript
injs.openZjnxcode().then(res => {
  //业务逻辑
}).catch(err => {
  //错误处理
})
```

正确数据

```text
暂无返回数据
```

## 设置分享 - share

设置分享参数，显示分享按钮。

```javascript
injs.share(title, summary, link, picture)
```

正确结果

```text
会在小程序右上角显示出一个独立的分享按钮
```

外部网页跳转回in嘉善的小程序对应页面的URL scheme生成规则
::: tip UrlScheme生成规则

- 规则：`cloudjiashan://tinyapp?param=${appId}/${sign}/${link}`
- sign生成方法如下：`appId + link + appSecret`字符串的MD5值

注意：${XXX}需要替换为您真实的参数，链接地址中带#等特殊字符需要通过URLEncode转义。
:::

回跳in嘉善APP（支持微信中和普通浏览器中回跳）

- 跳转小程序页面：`https://dapp.injs.jsxww.cn/open?category=tinyapp&param=${appId}/${sign}/${link}`
- 跳转文章页面：
  `https://dapp.injs.jsxww.cn/open?category=article&type=${type}&id=${id}`
- 跳转专题页面：
  `https://dapp.injs.jsxww.cn/open?category=topic&id=${id}`
- 跳转善媒号页面：
  `https://dapp.injs.jsxww.cn/open?category=smh&id=${id}`

## 取消设置分享 - shareClose

取消分享按钮。

```javascript
injs.shareClose()
```

## 保存图片到相册 - saveImage

保存图片到相册

```javascript
injs.saveImage(imageUrl)
```

## 跳转善头条 - goShanHeadLine

跳转善头条，无返回结果

```javascript
injs.goShanHeadLine()
```

## 打开文章页面 - openArticle

打开文章页面，需要传入文章id

```javascript
injs.openArticle(id)
```