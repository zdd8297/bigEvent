  $(function(){
    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 给上传按钮绑定点击事件
    $("#btnChoseImg").on("click", function () {
      $("#file").click()
    })

    // 为文件选择框绑定change事件
    $("#file").on('change',function (e){
      // this.files === e.target.files
      // console.dir(this);
      // console.dir(this.files);
      let fileList = e.target.files
      if( fileList.length == 0 ){
        return layer.msg("请选择照片")
      }
      // 如果用户选择了文件
      let file = e.target.files[0]
      // 将文件转换为路径
      let imgURL = URL.createObjectURL(file)
      // 使用cropper里的方法 
      $image.cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    $("#btnUpload").on('click',function(){
      // cropper插件固定写法
      // 拿到用户裁剪后的图片
      var dataURL = $image.cropper      ('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      }).toDataURL('image/png')// 将 Canvas 画布上的内容，转化为 base64 格式的字符串

      // 把用户裁剪后的图片上传到服务器
      $.ajax({
        method:'POST',
        url:'/my/update/avatar',
        data:{
          avatar: dataURL
        },
        success: function (res){
            if(res.status !== 0){
              return layer.msg("更换头像失败！")
            }

            layer.msg("更换头像成功！")
            // 调用window下的 getUserInfo() 方法重新刷新信息
            // console.log(window.parent);
            window.parent.getUserinfo()
        }
      })

    })

  })
