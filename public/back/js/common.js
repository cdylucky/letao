/**
 * Created by Administrator on 2018/1/11.
 */


$(function() {
  //进度条功能：

  //在ajax请求发送之前进度条开始
  $(document).ajaxStart(function() {
    NProgress.start();
  });

  //在ajax请求结束之后进度条结束
  $(document).ajaxStop(function() {

    //因为实在本地请求，给一个延迟时间做一个假象
    setTimeout(function() {
      NProgress.done();
    },1000);

  });

  //判断用户是否登录:

  if(location.href.indexOf('login.html') == -1) {
    $.ajax({
      type:'get',
      url: '/employee/checkRootLogin',
      success:function(info) {
        console.log(info);
        if(info.error == 400) {
          location.href = "login.html";
        }
      }
    })
  }

  //二级导航显示：
  $(".second").prev().on("click", function () {
    //让a后面的second
    $(this).next().slideToggle();
  })

  //侧边栏显示与隐藏：

  $('.icon_menu').on('click',function() {
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
  });

  //退出功能：

  $('.icon_logout').on('click',function() {

    $('#logoutModal').modal('show');



  });
  // 给btn_logout注册点击事件， 避免在事件里面注册事件
  $('.btn_logout').on('click',function() {
    $.ajax({
      type:'get',
      url: '/employee/employeeLogout',
      success: function(info) {
        console.log(info);
        if(info.success) {
          location.href = 'login.html';
        }
      }
    });
  })



});


