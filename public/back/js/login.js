/**
 * Created by Administrator on 2018/1/11.
 */

$(function() {

  //登录验证
  ///要求用户名不能为空
  //要求密码不能为空，并且长度是6-12
  //表单校验插件，在表单提交的时候做校验，
  // 如果校验失败了，会阻止表单的提交。如果校验成功了，它就会让表单继续提交。
  var $form = $('form')

  //初始化表单验证插件
  $form.bootstrapValidator({
    //指定校验是的图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验规则，name属性
    fields: {
      //校验用户名
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },

          callback: {
            message: "用户名不存在"
          }
        }

      },
      //校验密码
      password: {
        validators: {
          notEmpty: {
            message: '用户密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message:'密码不能要6-12位'
          },
          callback: {
            message:'密码错误'
          }
        }
      }
    }
  });


  //需要给表单注册一个校验成功的事件。success.form.bv
  $form.on('success.form.bv',function(e) {
    //阻止表单提交
    e.preventDefault();

    //发送ajax请求
    $.ajax({
      type:'post',
      url : '/employee/employeeLogin',
      data: $form.serialize(),
      success: function(info) {
        //console.log(info);
        // $form.data("bootstrapValidator") 用于获取插件实例，通过这个实例可以调用方法
        if(info.error == 1000) {
          $form.data('bootstrapValidator').updateStatus('username', 'INVALID','callback');
        }
        if(info.error == 1001) {
          $form.data('bootstrapValidator').updateStatus('password', 'INVALID','callback');
        }
        if(info.success) {
          location.href = "index.html";
        }
      }
    })
  });

  //给重置注册点击事件
  $('[type="reset"]').on('click',function() {
    $form.data('bootstrapValidator').resetForm();
  })
});