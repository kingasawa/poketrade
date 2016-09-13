/**
 * Post.js
 *
 * @description :: Khai báo table Post.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    tag: {
      type: 'array'
    },
    thumbnail: {
      type: 'string',
      defaultsTo: 'no-thumb.jpg'
    },
    description: {
      type: 'longtext'
    },
    content: {
      type: 'longtext',
      required:true
    },
    view: {
      type: 'integer',
      defaultsTo: 0
    },
    rate: {
      type: 'integer'
    },
    status: {
      type: 'integer',
      enum: [0,1],
      defaultsTo:1
    },
    owner: {
      model: 'user'
    },
    threads: {
      collection: 'thread',
      via : 'posts'
    }
  }
};

