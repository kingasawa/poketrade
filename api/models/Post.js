/**
 * Post.js
 *
 * @description :: Quản lý các bài viết.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      minLength: 8,
      required: true
    },
    tag: {
      type: 'array'
    },
    thumbnail: {
      type: 'string',
      required: true
    },
    description: {
      type: 'longtext',
      required: true
    },
    content: {
      type: 'longtext',
      required:true,
      minLength:20,
      maxLength:1000
    },
    view: {
      type: 'integer'
    },
    rate: {
      type: 'integer'
    },
    status: {
      type: 'boolean'
    },
    owner: {
      model: 'user'
    },
    allthread: {
      collection: 'thread',
      via : 'posts'
    }
  }
};

