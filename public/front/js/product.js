/**
 * Created by Administrator on 2018/1/16.
 */

$(function() {
  //获取地址栏参数进行渲染
  var productId = getSearch('productId');
  console.log(productId);

  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data:{id:productId},
    success:function(info){
      console.log(info);
      $('.mui-scroll').html(template('tpl',info));

      //重新初始化轮播图组件
      mui('.mui-slider').slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      //重新初始化数字框
      mui(".mui-numbox").numbox();
    }
  })
})