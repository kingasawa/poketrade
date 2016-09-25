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
      sails.sockets.blast('thread/create',result);
      return res.ok();
    })
  },

  threadid: (req,res) => {
    let threadId = req.params.id;

    Thread.findOne({id:threadId}).exec(function(err,findThread){
      if (err){return res.serverError(err)}
      if (!findThread) {
        return res.notFound('Không tìm thấy chủ đề , thử lại với ID khác')
      }
      return res.view('admin/thread_edit',{findThread});

    });
  },

  edit: (req,res)=> {
    if (!req.isSocket) {return res.badRequest();}

    let params = req.allParams();
    sails.sockets.join(req,params.name);
    Thread.update({id:params.id},params).exec(function(err,result){
      if (err) {return res.serverError(err)}
      sails.sockets.broadcast(params.name,'edit-success/thread',result)
    });
  }

};

