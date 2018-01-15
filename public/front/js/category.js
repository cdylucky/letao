/**
 * Created by Administrator on 2018/1/14.
 */

$(function() {

  //动态加载一级分类导航的内容
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    success: function(info) {
      console.log(info);
      $('.first-cate').html(template('tpl_one',info));
      //一进来就渲染第一个一级分类对应的二级分类内容
      render(info.rows[0].id);
    }
  })

  //根据一级分类id渲染二级分类
  function render(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: { id: id},
      success: function(info) {
        console.log(info);
        //结合模板与数据进行渲染
        $('.second-cate').html(template('tpl_two',info));
      }
    })
  };


  //给所有的一级分类注册点击事件
  $('.first-cate').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active');
    //获取当前li存放的一级分类id
    var id = $(this).data('id');
    render(id);
  })
})