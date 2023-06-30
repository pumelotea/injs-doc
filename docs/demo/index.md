# Demo

## 导航
[[toc]]

## Go后端实现

```go
package main

import (
   "bytes"
   "crypto/md5"
   "encoding/hex"
   "fmt"
   "io"
   "net/http"
   "time"
)

func main() {

   http.HandleFunc("/access_token", getAccessToken)
   http.ListenAndServe(":8000", nil)
}

var appId = "1111"
var appSecret = "2222"

func getAccessToken(w http.ResponseWriter, r *http.Request) {
   w.Header().Set("Access-Control-Allow-Origin", "*")
   timestamp := time.Now().UnixMilli()
   h := md5.New()
   h.Write([]byte(fmt.Sprintf("%s%s%d", appId, appSecret, timestamp)))
   s := hex.EncodeToString(h.Sum(nil))
   fmt.Println(s)

   result := Get(fmt.Sprintf("https://oapi.injs.jsxww.cn/auth/access_token?appid=%s&timestamp=%d&signature=%s", appId, timestamp, s))
   w.Write([]byte(result))
}

func Get(url string) string {
   // 超时时间：5秒
   client := &http.Client{Timeout: 5 * time.Second}
   resp, err := client.Get(url)
   if err != nil {
      panic(err)
   }
   defer resp.Body.Close()
   var buffer [512]byte
   result := bytes.NewBuffer(nil)
   for {
      n, err := resp.Body.Read(buffer[0:])
      result.Write(buffer[0:n])
      if err != nil && err == io.EOF {
         break
      } else if err != nil {
         panic(err)
      }
   }

   return result.String()
}

```

## Java后端实现

```java
import cn.hutool.http.HttpStatus;
import org.apache.commons.codec.digest.DigestUtils;

import java.util.HashMap;
import java.util.Map;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;

public class InJs {

    public static final String API_URL = "https://oapi.injs.jsxww.cn/auth/access_token";
    public static final String APP_ID = "";
    public static final String APP_SECRET = "";

    public static void main(String[] args) {
        showResult();
    }


    private void showResult() {
        HttpRequest request = HttpRequest.get(API_URL).form(getParams()).timeout(3000);
        HttpResponse resp = request.execute();
        if (resp.getStatus() == HttpStatus.HTTP_OK) {
            System.out.println(resp.body());
        } else {
            System.out.println("request fail");
        }
    }

    private Map<String, Object> getParams() {
        String timestamp = String.valueOf(System.currentTimeMillis());
        String s = APP_ID + APP_SECRET + timestamp;
        String signature = DigestUtils.md5Hex(s);
        Map<String, Object> params = new HashMap<>();
        params.put("appid", APP_ID);
        params.put("timestamp", timestamp);
        params.put("signature", signature);
        return params;
    }
}
```

## PHP后端实现

```php
<?php
header('Content-Type:text/html;charset=utf-8');
$ch = curl_init();

$appid='';
$appsecret='';

 function getMillisecond() {
    list($t1, $t2) = explode(' ', microtime());
    return (float)sprintf('%.0f',(floatval($t1)+floatval($t2))*1000);
}
$timestamp=getMillisecond();


$signature=md5($appid.$appsecret.$timestamp);

$mtimestamp = sprintf("%.3f", microtime(true)); // 带毫秒的时间戳
$ts = $mtimestamp * 1000;
		
//签名 (签名规则: md5(appid + appsecret + timestamp) )
$url = "https://oapi.injs.jsxww.cn/auth/access_token?appid=$appid&timestamp=$ts&signature=$signature";
//$file_contents = file_get_contents($url);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_TIMEOUT, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); //不验证证书下同
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); //

$data = curl_exec($ch);

$error = curl_error($ch);

curl_close($ch);

echo  $data;
```

## 前端Vue的例子

```javascript
<template>
  <div class="demo-wrap"
  :style="`padding-top: ${topSafeDis}px;padding-bottom: ${bottomSafeDis}px`" >
  <div class="demo-body">
    <van-notice-bar text="当前页面的上下绿色区域为获取的安全高度"/>
    <van-cell center title="injs.getSafeAreaTop()" label="获取顶部安全高度">
      <template
      #right-icon>
      <van-button type="primary"
      @click="handleTopSafeDis">获取
    </van-button>
</template>
</van-cell>
<van-cell center title="injs.getSafeAreaBottom()" label="获取底部安全高度">
  <template
  #right-icon>
  <van-button type="primary"
  @click="handleBottomSafeDis" >获取
</van-button>
</template></van-cell>
<van-cell center title="injs.setAppAccessToken()" label="设置AppAccessToken"></van-cell>
<van-cell center title="injs.getOpenId()" label="获取OpenId">
  <template
  #right-icon>
  <van-button type="primary"
  @click="handleOpenId">获取
</van-button>
</template></van-cell>
<van-cell center title="injs.get_user_info()" label="获取用户信息">
  <template
  #right-icon>
  <van-button type="primary"
  @click="handleUserInfo">获取
</van-button>
</template></van-cell>
<van-cell center title="injs.amap_gps()" label="获取位置信息">
  <template
  #right-icon>
  <van-button type="primary"
  @click="handleGps">获取
</van-button>
</template></van-cell>
<van-cell center title="injs.scan_qr_code()" label="调用扫码能力">
  <template
  #right-icon>
  <van-button type="primary"
  @click="handleScanQrCode">获取
</van-button>
</template></van-cell>
<van-cell center title="injs.statusBarColorToDark()" label="设置状态栏文字黑白颜色（isDark:true/false）">
  <template
  #right-icon>
  <van-switch v-model="isDark"/>
</template>
</van-cell>
<van-cell center title="injs.vibrate()" label="设备振动">
  <template
  #right-icon>
  <van-button type="primary"
  @click="handleVibrate">测试
</van-button>
</template></van-cell>
<van-cell center title="injs.setStatusBarColor()" label="设置顶部安全区域颜色">
  <template
  #right-icon>
  <van-button type="primary"
  @click="handleTopColor">测试
</van-button>
</template></van-cell>
<van-cell center title="injs.setNavigationBarColor()" label="设置底部安全区域颜色">
  <template
  #right-icon>
  <van-button type="primary"
  @click="handleBottomColor" >测试
</van-button>
</template></van-cell></div></div>
</template>

<script>
  export
  default {name:'Home',data(){return{topSafeDis:0,bottomSafeDis:0,isDark:false}},watch:{isDark(){this.handleIsDark()}},methods:{showDialog(data){this.$dialog.alert({message:JSON.stringify(data)}).then(()=>{})},handleIsDark(){injs.statusBarColorToDark(this.isDark)},handleVibrate(){injs.vibrate()},asyncgetAccessToken(){letres=awaitthis.$api.getAccessToken()console.log(res.data.access_token)injs.setAppAccessToken(res.data.access_token)},handleOpenId(){injs.getOpenId().then(res=>{this.showDialog(res)}).catch(err=>{this.showDialog(err)})},handleTopSafeDis(){injs.getSafeAreaTop().then(res=>{this.showDialog(res)}).catch(err=>{this.showDialog(err)})},handleBottomSafeDis(){injs.getSafeAreaBottom().then(res=>{this.showDialog(res)}).catch(err=>{this.showDialog(err)})},handleUserInfo(){injs.getUserInfo().then(res=>{this.showDialog(res)}).catch(err=>{this.showDialog(err)})},handleGps(){injs.amapGps().then(res=>{this.showDialog(res)}).catch(err=>{this.showDialog(err)})},handleScanQrCode(){injs.scanQrCode().then(res=>{this.showDialog(res)}).catch(err=>{this.showDialog(err)//应用发布设置
  //应用正式地址 - 校验并保存
  /**
              * /tips:
              请填写正式应用的地址：域名+端口号（若无端口号可不填），形式如下：
              •  abc.app.com
              •  abc.app.com:8080
              应用必须支持 https 访问。
              请在正式应用地址的根路径下新建 xxx.txt 文件，并写入 xxx 内容，用于安全性校验。
              */})},handleTopColor(){injs.setStatusBarColor('#ff0000')},handleBottomColor(){injs.setNavigationBarColor('#ff0000')}},mounted(){this.getAccessToken()injs.statusBarColorToDark(this.isDark)},beforeCreate(){injs.getSafeAreaTop().then(res=>{this.topSafeDis=res.data}).catch(()=>{})injs.getSafeAreaBottom().then(res=>{this.bottomSafeDis=res.data}).catch(()=>{})}
}
</script>

<style scoped>
  .demo-wrap {position:absolute;left:0;right:0;top:0;bottom:0;background-color:#4cae4c;box-sizing:border-box;
}
  .demo-body {height:100%;width:100%;background-color:#f0f0f0;
}
</style>

```
