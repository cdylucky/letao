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



  //获取地址栏的参数
  function getSearchObj() {
    var search = location.search;
    search = decodeURI(search);
    search = search.slice(1);
    //分隔字符串
    var arr = search.split('&');
    //把数据变成字符串
    var obj = {};
    for(var i = 0; i < arr.length; i++) {
      var key = arr[i].split('=')[0];
      var value = arr[i].split('=')[1];
      obj[key] = value;
    }
    return obj;
  }

  //获取地址栏的参数
  function getSearch(key){
    return getSearchObj()[key];
  }
