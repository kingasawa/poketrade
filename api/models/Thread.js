/**
 * Thread.js
 *
 * @description :: Quản lý các bài viết thông qua chủ đề ( thread ).
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    thumbnail: {
      type: 'string'
    },
    position: {
      type: 'integer',
      enum: [1,2,3,4,5,6,7,8,9],
      defaultsTo: 1
    },
    status: {
      type: 'boolean'
    },
    posts: {
      collection: 'post',
      via: 'allthread',
      dominant: true
    }
  }
};
