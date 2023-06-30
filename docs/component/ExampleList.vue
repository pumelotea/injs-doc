<template>
  <div class="example-box">
    <div class="title-text">
      对接案例 100+
    </div>
    <div class="example-list">
      <div class="example-item" v-for="e in list">
        {{e}}
      </div>
    </div>

    <div>
      <a class="start-btn VPButton medium brand" href="/quick/index.html">开始接入</a>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      list: [
        '嘉善天气','交通治堵','食堂订餐','天目智慧传播引导工具','云点互动','善豆子','智慧社科之家','2023龙虾节消费券','魏塘街道2023年文旅消费券','2023嘉善发布请你吃龙虾','嘉善县十大最受欢迎品牌口味龙虾店','2023嘉善万人万步小程序跳转',
          '2023龙虾圣手投票','2023村BA竞猜','2023龙虾金牌夜宵投票','2023村BA18支球队投票','2023村BA18个明星球员投票','六一儿童节拼图游戏','2023网红打卡地报名',
          '2023嘉善中高考咨询平台','水务食堂订餐','2023母亲节征集','2023小主播in嘉善APP投票','2023民法典有奖竞答','2023五一本地游','2023五一抽奖','2023职工歌手大赛','2023一本书',
          '2023年嘉善县青年职工歌手大赛','嘉善县全民消防安全知识竞赛活动','2023最美社工投票','2023_315答题抽奖','2023三八妇女节征集抽奖','2023地嘉人善投票','2023宠粉日','2023一起寻找的“梅”好时光投票',
          '2023“春天随手拍”活动','嘉善“好年货”由你选','2022阳了互助平台','2022最美嘉善人展播','······'
      ]
    }
  }
}
</script>

<style>
.example-box{
  display: flex;
  align-items: center;
  margin: auto;
  margin-top: 30px;
  flex-direction: column;
  height: 100%;
  padding: calc(var(--vp-nav-height)) 64px 64px;
  box-sizing: border-box;
  position: relative;

}


.example-box::after{
  content: ' ';
  position: absolute;
  inset: 0;
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
  opacity: 0.25;
  pointer-events: none;
  z-index: -1;
}

.title-text{
  width: 100%;
  font-size: 30px;
  margin-bottom: 30px;
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  text-align: center;
}
.example-list{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.example-item{
  border: 1px solid #97a0fc;
  width: fit-content;
  padding: 10px 20px;
  border-radius: 10px;
  color: #97a0fc;
}

.start-btn{
  margin-top: 100px;
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
  display: inline-block;
  text-align: center;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-radius: 100px;
  padding: 10px 100px;
  line-height: 38px;
  font-size: 20px;
}
</style>