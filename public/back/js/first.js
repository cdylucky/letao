/**
 * Created by Administrator on 2018/1/13.
 */

$(function() {

  var page = 1; //记录页码
  var pageSize = 5; //每页的数据个数

  //渲染分页数据：
  var render = function() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info);
        //组装数据和模板渲染数据
        $('tbody').html(template('tmp_cate',info));

        //分页渲染
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total/ info.size),
          onPageClicked: function(a,b,c,p) {
            console.log(p);
            //修改当前页，重新渲染
            page = p;
            render(page);
          }

        })
      }
    })
  };

  render();
})