/**
 * Created by Administrator on 2018/1/13.
 */

$(function() {

  var page = 1;//页码
  var pageSize = 5; //每页的条数

  render();

  //ajax请求动态渲染数据和分页
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

})