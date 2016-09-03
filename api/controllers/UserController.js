/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: (req, res) => {
    //Kiểm tra xem data gửi đến từ client (main.js xử lý) có đúng là socket không?
    if (!req.isSocket) {return res.badRequest();}

    let params = req.allParams();
    User.login(params.username, params.password).then((result) => {
      req.session.user_id = result.id; // Store id vào sess user_id
      req.session.user = result; // store hết user data vào object user trong session

      let session_id = req.signedCookies['sails.sid'];

      sails.sockets.join(req, 'logged'); // Đưa user vừa đăng nhập vào room Logged
      sails.sockets.join(req, session_id); // Đưa user vừa đăng nhập vào room của chính bản thân user
      sails.sockets.broadcast(session_id, 'user/login-success', { message: "đăng nhập thành công", all_session_data: req.session});

      delete result.password;
      res.json(200, {result});

    }).catch((err) => {
      res.json(500, {"message": err})
    });
  },

  // Xóa toàn bộ session của user khi logout
  logout: (req, res) => {
    req.session.destroy(function() {
      res.redirect('/trangchu');
    });
  },
  register: (req, res) => {
    //Kiểm tra xem data gửi đến từ client (main.js xử lý) có đúng là socket không?
    if (!req.isSocket) {return res.badRequest();}

    let params = req.allParams();
    sails.log('all params', params);
    User.create({username:params.username,password: params.password,name: params.name}).exec(function() {
      sails.sockets.join(req, params.username);
      sails.sockets.broadcast(params.username,'user/registered');
      return res.ok();
    })
  }
};

