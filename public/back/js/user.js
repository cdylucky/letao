/**
 * Created by Administrator on 2018/1/13.
 */

$(function() {

  var page = 1;//页码
  var pageSize = 5; //每页的条数

  render();

  //ajax请求动态渲染数据和分页:
  function render() {

    //ajax请求动态渲染数据
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data:{
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info);
        //组装数据和模板
        var str = template('tpl',info);
        $('tbody').html(str);

        //分页渲染
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function(a, b, c,p) {
            console.log(page);
            page = p;
            render(page);
          }
        });
      }

    });
  }


  //用户启用禁用的功能:
  $('tbody').on('click','.btn',function() {
    $('#userModal').modal('show');

    //获取用户id
    var id = $(this).parent().data('id');
    var isDelete = $(this).hasClass('btn-danger')? 0:1;

    //给btn_confirm注册点击事件，通过ajax请求更新数据
    $('.btn_confirm').off().on('click',function() {
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id:id,
          isDelete: isDelete
        },
        success:function(info){
          console.log(info);
          if(info.success) {
            //重新渲染当前页
            render();
            //关闭模态框
            $('#userModal').modal('hide');
          }
        }
      });
    })

  })

})