$(function(){
    // layui.use模块化开发（代码繁琐一点）
    // layui.use(['form', 'jquery', 'layer'], function () {   

        // 从layui中获取form对象
        var form = layui.form
        var layer = layui.layer

        // 获取用户基本信息
        getUserinfo()

        // 退出功能
        $("#logout").on('click',function(){
            layer.confirm('确定退出吗？',{ icon:3 ,title:"提示"},function(index){
                // 1. 清空本地token
                localStorage.removeItem('token')
                // 2. 界面跳转至login界面
                location.href= "/login.html"
                // 关闭confirm提示框
                layer.close(index)
            })
        })


    // })
})


// 获取用户信息写在入口函数之外，定义在window下
function getUserinfo(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        // // headers是请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token') ||''
        // },
        success:function(res){
            console.log(res);
            if(res.status !== 0){
                $("#welcome").html('昵称或用户名获取失败')
                $(".layui-nav-img").hide()
                return layer.msg(res.message+'获取用户信息失败')
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        // // 无论成功失败，都执行complete回调
        // complete: function(res){
        // }
    })
}

// 渲染用户头像
function renderAvatar(user){
    let name = user.nickname || user.username
    $("#welcome").html('欢迎&nbsp;&nbsp;'+name)
    if (user.user_pic !== null){
        // 渲染图片头像
        $(".layui-nav-img").attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像
        $(".layui-nav-img").hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}