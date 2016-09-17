/**
 * Slider.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    thumbnail: {
      type: 'string',
      required: true
    },
    linkto: {
      type: 'string',
      defaultsTo: '#'
    },
    sort: {
      type: 'integer',
      defaultsTo: 1
    },
    status: {
      type: 'integer',
      enum: [0,1],
      defaultsTo:1
    }
  }
};

