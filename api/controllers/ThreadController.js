/**
 * Cat_articleController
 *
 * @description :: Server-side logic for managing cat_articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: (req,res) => {
    Thread.find(function (err, threads) {
      res.view('admin/threads',{threads})
    })
  },

  create: (req,res) => {
    if (!req.isSocket) {return res.badRequest();}

    let params = req.allParams();
    Thread.create(params).exec(function(err,result) {
      if (err) { return res.serverError(err); }
      console.log(result);
      sails.sockets.blast('thread/create',result);
      return res.ok();
    })
  }

  // edit: (req,res) => {
  //
  // },
  //
  // view: (req,res) => {
  //
  // }

};

