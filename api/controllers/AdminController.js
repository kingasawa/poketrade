/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req,res) => {


    let data = {

      userName: 'Khanh Admin',
      testVariable: 'this is test value'
    };
    return res.view('admin/index', data)
  },
  userid: (req,res) => {
    let params = req.allParams();

    // if (req.session.user.id && req.session.user.id == params.id) {
    //   var edit = 'ok'
    // } else {
    //   var edit = 'no'
    // }
    User.findOne({'id':params.id}).exec(function(err,userdata){

      res.view('admin/user-info',{userdata,edit});

    })
  }
};

