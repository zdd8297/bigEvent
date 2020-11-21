$(function(){
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname:function(val){
            if ( val.length > 6){
                return "昵称长度必须在1~6个字符之间！"
            }
        }
    })

    initUserInfo()

    // 初始化功能（获取用户信息）
    function initUserInfo(){
        $.ajax({
            method:"GET",
            url:"/my/userinfo",
            success: function(res){
                if( res.status !== 0){
                    return layer.msg(res.message+"失败！")
                }
                // console.log("hahaha"+res);
                // 调用 form.val() 快速为表单赋值
                form.val("formUserInfo",res.data)
            }
        })
    }

    // 重置功能
    $("#btnReset").on('click',function(e){
        // 阻止表单的自动重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单 提交修改 事件
    $(".layui-form").on('submit',function(e){

        e.preventDefault()

        $.ajax({
            method:"POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success: function(res){
                if ( res.status !== 0 ){
                    return layer.msg("更新失败！")
                }
                layer.msg(res.message)
                // 调用父页面（index.html）getUserinfo方法，重新刷新用户信息
                window.parent.getUserinfo()
            }
        })
    })


})