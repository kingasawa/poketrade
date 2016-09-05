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
  }
};

