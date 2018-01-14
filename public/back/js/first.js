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
            render();
          }

        })
      }
    })
  };

  render();

  //功能2：添加分类：
  $('.btn_add').on('click',function() {

    $('#addModal').modal('show');
  })

  //表单验证
  var $form = $('form');
  $form.bootstrapValidator({
    //指定校验是的图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // //配置校验规则，name属性
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message : '请输入一级分类的名称'
          }
        }
      }
    }
  });

  //表单验证通过，进行ajax请求
  $form.on('success.form.bv',function(e) {
    //阻止浏览器默认行为
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $form.serialize(),
      success: function(info){
        console.log(info);
        if(info.success){
          //关闭模态框
          $('#addModal').modal('hide');
          //重新渲染页面
          page = 1;
          render();
          //表单重置
          $form.data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })
})