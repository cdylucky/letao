/**
 * Created by Administrator on 2018/1/13.
 */

$(function(){

  var page = 1; //记录页码
  var pageSize = 5;//每页的数据条数

  //1.渲染数据与分页：
  var render = function() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info){
        console.log(info);
        $('tbody').html(template('tmp1',info));

        //分页渲染
        $('#paginator').bootstrapPaginator( {
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total/info.size),
          onPageClicked: function(a,b,c,p) {
            page = p;
            render(page);
          }
        })

      }
    })
  };

  render();


})