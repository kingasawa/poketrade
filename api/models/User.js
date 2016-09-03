/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var md5 = require('md5');

module.exports = {

  attributes: {
    username: {
      type: 'string',
      unique: true,
      required: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true
    },

    name: {
      type: 'string',
      required: true
    },
    avatar: {
      type: 'string'
    }

  },

  // Check Login
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      password = md5(password);
      sails.log('Thông tin đăng nhập {username, password}', {username, password});
      User.findOne({username, password}).exec(function (err, res) {
        sails.log('thành công', res);
        if (err)
          reject(err);

        if (typeof res == 'undefined'){
          reject("đăng nhập thất bại");
        }

        resolve(res);
      })


    })

  },

  beforeCreate: function (attrs, cb) {
    attrs.password = md5(attrs.password);
    return cb();
  }
};

