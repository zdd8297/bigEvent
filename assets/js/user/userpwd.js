$(function(){
    let form = layui.form
    let layer = layui.layer

    form.verify({
        //密码校验
        pwd:[/^[\S]{6,12}$/,'密码必须是6到12位，且不能出现空格'],
        samePwd: function(val){
            if( val === $("[name=oldPwd]").val() ){
                return "新旧密码不能相同！"
            }
        },
        rePwd : function(val){
            if ( val !== $('[name= newPwd]').val()){
                return "两次密码不一致！"
            }
        }
    })

    $(".layui-form").on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url:"/my/updatepwd",
            data:$(this).serialize(),
            success: function(res){
                if(res.status !==0 ){
                    return layer.msg(res.message)
                }
                // 重置表单
                $(".layui-form")[0].reset()
                layer.msg("更新密码成功！即将退出登录", function(){
                    localStorage.removeItem("token");
                    window.parent.location.href="/login.html"
                })
            }
        })
    })

})