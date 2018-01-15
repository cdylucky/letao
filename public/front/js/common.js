/**
 * Created by Administrator on 2018/1/14.
 */



  //初始化区域滚动效果
  mui('.mui-scroll-wrapper').scroll({
    indicators: false // 关闭滚动条
  });

  //设置自动轮播

  mui('.mui-slider').slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
