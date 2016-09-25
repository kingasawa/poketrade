$(function() {
  var socket = io.sails.connect();
  socket.get('/socket');

  //USER MANAGEMENT
  // Khi submit script này sẽ chuyển data sang dạng socket và gửi đến server
  // UserController sẽ xử lý phần tiếp theo
  $('#login').submit(function (e) {
    console.log('gọi hàm submit');
    e.preventDefault();
    var data = $('#login').serialize();
    socket.get('/user/login?' + data);
  });
  // Khi client nhận thông báo login-success từ server sẽ chuyển user sang trang home
  socket.on('user/login-success', function() {
    window.location = '/trangchu';
  });

  $('#register').submit(function (r) {
    console.log('gọi hàm submit');
    r.preventDefault();
    var data = $('#register').serialize();
    socket.get('/user/register?' + data);
  });
  socket.on('user/registered', function() {
    $('#regModal p').text("Đăng ký thành công, hãy đăng nhập");
    $('#regModal').modal();
  });
  socket.on('user/exists', function() {
    $('#regModal p').text("Đã có người đăng ký tài khoản này");
    $('#regModal').modal();
  });
  //END USER MANAGEMENT

  //THREAD MANAGEMENT
  $('#create-thread').submit(function (t) {
    console.log('submit thread');
    t.preventDefault();
    var data = $('#create-thread').serialize();
    socket.get('/thread/create?' + data);
  });

  socket.on('thread/create',function() {
    location.reload();
  });

  $('#edit-thread').submit(function (t) {
    console.log('Submit Edit Thread');
    t.preventDefault();
    var data = $('#edit-thread').serialize();
    socket.get('/thread/edit?' + data);
  });

  socket.on('edit-success/thread',function(){
    $('#edit-thread-alert').addClass('alert alert-success')
      .append('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
              '<strong>Cập nhật :</strong> Bạn đã cập nhật chủ đề thành công');
  });

  //End THREAD MANAGEMENT

  //SLIDER MANAGEMENT
  $('#list_slider .item').first().addClass("active");



  // $('#create-post').submit(function (t) {
  //   sails.sockets.join('/thread/create?' + data);
  // });


  socket.on('post/create',function() {
    alert("Viết bài thành công")
  });
  //END POST MANAGEMENT

  // x-editable
  $.fn.editable.defaults.mode = 'inline';
  user_id = $(".user-info [static-userdata=id]").text();
  $('.user-info [userdata]').each(function(i,element){
    var keyToUpdate = $(element).attr('userdata');
    var title = ($(element).attr('title')) ? $(element).attr('title') : 'Vui lòng nhập để sửa thông tin';

    $(element).editable({
      type: 'text',
      url: '/user/' + user_id,
      pk: '',
      params: function(params) {
        var updateText = params['value'];
        delete params['pk'];
        delete params['name'];
        delete params['value'];

        params[keyToUpdate] = updateText;

        return params;
      }, title: title, ajaxOptions: {
        type: 'put'
      }
    });

  });

  // Xóa multi ID
  $("#removeid").click(function(event){
    event.preventDefault();
    var searchIDs = $("table input[type=checkbox]:checked").map(function() {
        return this.value;
      }).get().join();
    console.log("admin/userdel?id="+searchIDs);
    socket.get("/admin/userdel?id="+searchIDs)
  });

  //Get Link iTunes API
  $("#form-getlink").submit(function (g) {
    event.preventDefault(g);
    var getData = $("#form-getlink input[type=text]").val();
    console.log(getData);
    $.get("https://itunes.apple.com/lookup?id="+getData, function(data) {
      $("#main").html(data);
    })
  })

});

// Image Upload with preview
function showMyImage(fileInput) {
  var files = fileInput.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
    if (!file.type.match(imageType)) {
      continue;
    }
    var img=document.getElementById("thumb");
    img.file = file;
    var reader = new FileReader();
    reader.onload = (function(aImg) {
      return function(e) {
        aImg.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(file);
  }
}
