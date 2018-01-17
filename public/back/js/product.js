/**
 * Created by Administrator on 2018/1/14.
 */

$(function() {

  var page = 1; //记录页码
  var pageSize = 5; // 每页的数据条数
  var imgArr = []; //存放图片上传的结果

  //页面渲染
  var render = function() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info){
        console.log(info);
        $('tbody').html(template('tpl',info));
        //分页渲染
        $('#paginator').bootstrapPaginator( {
          bootstrapMajorVersion:3,
          currentPage: page,
          size: 'normal', // 显示空间的大小
          totalPages: Math.ceil(info.total/info.size),
          onPageClicked: function(a,b,c,p) {
            page = p;
            render();
          },
          //控制每个操作按钮的显示文字
          itemTexts: function(type,page,current) {
            console.log(type,page,current);
            switch (type) {
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'page':
                return page;
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
            }
          },
          //设置操作按钮的title属性
          tooltipTitles: function(type,page,current) {
            switch (type) {
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'page':
                return '到'+page+'页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
            }
          },
          useBootstrapTooltip : true
        })
      }

    })
  };

  render();

  //添加商品功能：

  //1.显示模态框
  $('.btn_add').on('click',function(){
    $('#addModal').modal('show');
    //2.发送ajax请求渲染二级分类信息
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page:1,
        pageSize: '1000'
      },
      success: function(info) {
        console.log(info);
        $('.dropdown-menu').html(template('tpl_second',info));
      }
    })
  });

  //3.点击选择二级分类品牌
  $('.dropdown-menu').on('click','a',function(){

    //获取二级分类id,修给隐藏域的值
    var id = $(this).data('id');
    $('#brandId').val(id);

    //修改二级分类显示的内容
    $('.dropdown-text').text($(this).text());

    //手动修改让表单通过验证
    $form.data('bootstrapValidator').updateStatus('brandId','VALID');

  });


  //4.上传图片，初始化文件上传插件
  $('#fileupload').fileupload({
    dataType:'json',
    done: function(e,data) {
      console.log(data.result);

      //控制上传的个数
      if(imgArr.length >= 3) {
        return false;
      }

      //显示上传的图片,动态创建img标签
      $('.img_box').append('<img src="'+ data.result.picAddr+'" width="100" height="100">')

      //存储图片的结果
      imgArr.push(data.result);

      //手动修给让图片通过校验
      if(imgArr.length ===3) {
        $form.data('bootstrapValidator').updateStatus('productLogo','VALID');
      }else {
        $form.data('bootstrapValidator').updateStatus('productLogo','INVALID');
      }
    }
  });

  //5.表单验证
  var $form = $('form');
  $form.bootstrapValidator( {
    //配置不做校验的内容，给空数组，目的是让隐藏的和禁用的都做校验
    excluded:[],
    //指定校验值的图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //校验规则
    fields: {
      brandId: {
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },

      proName: {
        validators:{
          notEmpty:{
            message:"商品名称不能为空"
          }
        }
      },

      proDesc: {
        validators:{
          notEmpty:{
            message:"商品描述不能为空"
          }
        }
      },
      num: {
        validators:{
          notEmpty:{
            message:"商品库存不能为空"
          },
          //正则：只能有数字组成，并且第一位不能是0
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入合法的库存"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message:'商品尺码不能为空'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入合法的尺码，比如(32-44)'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          },
          regexp: {
            regexp: /^\d*$/,
            message: '请输入合法的价格'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品价格不能为空'
          },
          regexp: {
            regexp: /^\d*$/,
            message: '请输入合法的价格'
          }
        }
      },
      productLogo: {
        validators: {
          notEmpty: {
            message: '请输入3张图片'
          }
        }
      }

    }
  });

  //6.给表单注册校验成功事件,点击按钮发送请求，添加商品
  $form.on('success.form.bv',function(e) {
    //阻止表单默认行为
    e.preventDefault();

    var param = $form.serialize();
    //将图片的地址拼接到后面
    param += '&picName1='+ imgArr[0].picName+ '&picAddr1=' + imgArr[0].picAddr;
    param += '&picName2='+ imgArr[1].picName+ '&picAddr2=' + imgArr[1].picAddr;
    param += '&picName3='+ imgArr[2].picName+ '&picAddr3=' + imgArr[2].picAddr;

    $.ajax({
      type: 'post',
      url:'/product/addProduct',
      data: param,
      success: function(info) {
        if(info.success) {
          //重新渲染页面
          page = 1;
          render();
          //关闭模态框
          $('#addModal').modal('hide');
          //表单重置
          $form.data('bootstrapValidator').resetForm(true);
          //恢复二级分类按钮和显示图片的初始状态
          $('.dropdown-text').text('请选择二级分类');
          $('.img_box img').remove();
          //imgArr清空
          imgArr = [];
        }
      }
    })
  })


})