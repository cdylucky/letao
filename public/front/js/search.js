/**
 * Created by Administrator on 2018/1/16.
 */

$(function() {

  //获取localStorage中存放的搜索历史记录，并返回一个数组
  function getHistory() {
    var history = localStorage.getItem('lt_search_history');
    var arr = JSON.parse(history) || [];
    return arr;
  };

  function render() {
    var arr = getHistory();
    //组装数据和模板进行动态渲染
    $('.lt_history').html(template('tpl',{arr:arr}));
  };


  //1:查询历史记录进行渲染：：
  render()

  //2:清空历史记录：：
  $('.btn_empty').on('click',function() {
    //删除localStorage中的数据
    mui.confirm('您是否要清空所有的历史记录？','温馨提示',['取消','确认'],function(e) {
      if(e.index == 1) {
        localStorage.removeItem('lt_search_history');
        render();
      }
    })
  });

  //3:删除历史记录：：
  $('.lt_history').on('click','.btn_delete',function() {
    //删除当前x对应的下标的历史记录,将删除过的数据再存放回去，重新渲染页面
    var arr = getHistory();
    var index = $(this).data('index');
    arr.splice(index,1);
    localStorage.setItem('lt_search_history',JSON.stringify(arr));
    render();
  });

  //4:添加历史记录：：
  //(1) 给按钮注册点击事件
  $('.search_btn').on('click',function() {
    //(2)获取输入框中的值
    var key =  $('.search_text').val().trim();
    if(!key) {
      mui.toast('请输入搜索关键字');
      return;
    }
    $('.search_text').val('');
    //(3)获取搜索的历史记录
    var arr = getHistory();
    //(4)把key存到arr的最前面
    //(4.1)判读是否记录是否已经存在，如果存在将之前的记录删除
    var index = arr.indexOf(key);
    if(index!= -1) {
      arr.splice(index,1);
    }
    //(4.2)判读数据的长度 ,不能大于10条
    if(arr.length >= 10) {
      arr.pop();
    }
    //(4.3)添加历史记录
    arr.unshift(key);
    localStorage.setItem('lt_search_history',JSON.stringify(arr));
    //(5)重新渲染
    render();
    //(6)跳转到商品详情页
    location.href = 'searchList.html?key='+key;
  })


})