$(function(){

    // 切换至注册切换
   $("#to_reg").on('click',function(){
        $(".reg").show()
        $(".login").hide()
   })
   // 切换至登录界面
   $("#to_log").on('click',function(){
        $(".reg").hide()
        $(".login").show()
    })

    // layui.use(['form', 'jquery', 'layer'], function () {    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()方法自定义校验规则
    form.verify({
        //密码校验
        pwd:[/^[\S]{6,12}$/,'密码必须是6到12位，且不能出现空格'],
        //校验两次密码是否一致
        repwd:function(val){
            //通过形参拿到的是确认密码框的内容
            //还需拿到密码框的内容
            //对这两个值进行判断
            let pwd=$(".reg [name=password]").val()
            if(pwd !== val){
                return "密码不一致！"
            }
        }
    })

    //监听【注册】表单的提交事件
    $("#form_reg").on('submit',function(e){
        // console.log("123");
        e.preventDefault();
        // 发起AJAX请求
        let data = {
            username:$("#form_reg [name=username]").val(),
            password:$("#form_reg [name=password]").val()
        }
        $.post('/api/reguser', data, function(res){
            if(res.status !== 0){
                return layer.msg('注册失败，'+res.message)
            }
            layer.msg(res.message, function(){
                $("#to_log").click(); // 模拟点击切换至登录
                $("#form_reg")[0].reset() // 表单的清空
            })
        })
    })

    // 监听【登录】表单的提交事件
    $("#form_login").on('submit',function(e){
        // console.log("123");
        e.preventDefault();
        // 发起AJAX请求
        $.ajax({
            url:'/api/login',
            method:'POST',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !==0){
                    return layer.msg('登陆失败，'+res.message)
                }
                layer.msg(res.message)
                // 把服务器返回的TOKEN储存在本地缓存
                localStorage.setItem("token",res.token)
                // 跳转至主页
                location.href="/index.html"
            }
        })
    })
    // })
})