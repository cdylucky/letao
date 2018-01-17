/**
 * Created by Administrator on 2018/1/16.
 */

$(function() {


  //console.log(getSearch('key'));

  function render() {

    var param = {};
    param.proName = $('.search_text').val();
    param.page = 1;
    param.pageSize = 100;
    //判断当地是否要传入price或num的参数进行排序
    var $sort = $('.lt_sort a.now');
    if($sort.length > 0) {
      var type = $sort.data('type');
      var value = $sort.find('span').hasClass('fa-angle-up')? 1:2;
      param[type] = value;
    }
    //添加加载效果
    $(".lt_product").html('<div class="loading"></div>');

    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: param,
      success:function(info){
        console.log(info);
        setTimeout(function() {
          $('.lt_product').html(template('tpl',info));
        },1000);

      }
    })
  }


  //1、页面加载一加载获取地址栏的搜索数据

  //获取地址栏的参数，进行渲染
  var key = getSearch('key');
  //把参数设置给输入框
  $('.search_text').val(key);
  //渲染
  render();

  //2、点击搜索按钮时，获取搜索框的内容
  $('.search_btn').on('click',function() {
    //移除now,将所有的箭头都设置向下
    $('.lt_sort>a').removeClass('now');
    $('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
    render();
  });

  //3、点击价格和库存进行排序
  $('.lt_sort>a[data-type]').on('click',function() {
    //给当前的a标签添加now类
    var $this = $(this);
    if($this.hasClass('now')) {
      //有now，修改span的上下箭头
      $this.find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    }else {
      $this.addClass('now').siblings().removeClass('now');
    }

    render();
  })
})