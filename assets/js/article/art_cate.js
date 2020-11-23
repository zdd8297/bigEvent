$(function(){
    let layer = layui.layer
    let form = layui.form

    initArtList()
    // 获取文章分类的列表
    function initArtList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success: function(res){
                // console.log(res);
                let htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }

    let indexAdd = null
    // 为添加类别绑定点击事件
    $("#btnAddCate").on('click',function(){
        indexAdd = layer.open({
            type: 1
            ,area:['500px','260px']
            ,title:'添加文章分类'
            ,content: $('#dialog-add').html()// 获取html结构
        })
    })
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtList()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })



    // 通过代理的形式，为btn-edit按钮绑定点击事件
    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
                        type: 1,
                        area: ['500px', '260px'],
                        title: '修改文章分类',
                        content: $('#dialog-edit').html()
                    })

        let id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                    form.val('form-edit', res.data)
            }
        })
    })
    // 代理绑定submit监听事件，【编辑】分类数据
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
              method: 'POST',
              url: '/my/article/updatecate',
              data: $(this).serialize(),
              success: function(res) {
                if (res.status !== 0) {
                  return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                initArtList()
                layer.close(indexEdit)
              }
        })
    })


    
    // 代理绑定submit监听事件，【删除】分类数据
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
          $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('删除分类失败！')
              }
              layer.msg('删除分类成功！')
              initArtList()
              layer.close(index)
            }
          })
        })
    })






})