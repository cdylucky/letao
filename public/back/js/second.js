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
        //console.log(info);
        $('tbody').html(template('tmp1',info));

        //分页渲染
        $('#paginator').bootstrapPaginator( {
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total/info.size),
          onPageClicked: function(a,b,c,p) {
            page = p;
            render();
          }
        })

      }
    })
  };

  render();

  //2.添加分类，显示模态框，发送ajax请求
  $('.btn_add').on('click',function() {
    $('#addModal').modal('show');

    $.ajax({
      type: 'get',
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 1000
      },
      success: function(info){
        //console.log(info);
        //渲染一级分类选项
        $('.dropdown-menu').html(template('cates',info));
      }
    })
  });

  //3.下拉列表选中功能
  $('.dropdown-menu').on('click','a',function() {
    console.log(111);
    //修给button按钮中的文字
    $('.dropdown-text').text($(this).text());
    //获取分类id
    var id = $(this).data('id');
    //加获取id赋值给隐藏域
    $('#categoryId').val(id);

    //手动把categoryId设置为VALID状态
    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");

  });

  //4. 初始化文件上传功能
  $("#fileupload").fileupload({

    dataType:"json",
    //文件上传成功时，会执行的回调函数
    //e：事件对象
    //通过data.result可以获取到一个对象，这个对象的picAddr属性就是图片的地址
    done: function(e,data) {
      var result = data.result.picAddr;
      $(".img_box img").attr("src", result);
      //修改隐藏value值
      $('#brandLogo').val(result);

      //手动把brandLogo设置为VALID状态
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

  //5.表单校验功能：
  var $form = $("form");
  $form.bootstrapValidator({
    //配置不做校验的内容，给空数组，目的是让隐藏的和禁用的都做校验
    excluded:[],
    //指定校验值的图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //校验表单
    fields: {

      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },

      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类的名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传品牌图片'
          }
        }
      },
    }
  });


  // 6. 给表单注册校验成功事件
  $form.on('success.form.bv',function(e){
    //阻止浏览器默认行为
    e.preventDefault();
    //通过ajax请求，添加新数据
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $form.serialize(),
      success: function(info){
        console.log(info);
        if(info.success) {
          //重新渲染页面
          page = 1;
          render(page);
          //关闭模态框
          $('#addModal').modal('hide');
          //重置表单
          $form.data('bootstrapValidator').resetForm(true);

          //将选择一级分类按钮内的文字和显示图片的src修改成默认值
          $(".dropdown-text").text('请选择一级分类');
          $('.img_box img').attr('src','images/none.png');

        }
      }
    })
  })


})