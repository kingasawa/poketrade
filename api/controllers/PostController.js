/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: (req,res) => {
    Post.find(function (err, posts) {
      res.view('admin/posts',{posts})
    })
  },

  create: (req,res) => {
    // if (!req.isSocket) {return res.badRequest();}

    let params = req.allParams();
    console.log(params);
    req.file('thumbnail')
      .upload({dirname:'../../assets/images/'},function (err, uploadedFiles) {
        if (err) return res.serverError(err);
        let [filesFound] = uploadedFiles;
        var fileName = filesFound.fd.split("/assets");
        console.log("upload hinh xong");

        Post.create({
          title:params.title,
          description:params.description,
          content:params.content,
          owner:params.owner,
          status:params.status,
          thumbnail:fileName[1]
        }).exec(function(err,result) {
          if (err) { return res.serverError(err); }
          // console.log(result);
          return res.redirect('admin/post');
        })
      });
  },

  postid: (req,res) => {
    let postId = req.params.id;

    Thread.find(function (err, allthreads) {

      Post.findOne({id:postId}).exec(function(err,findPost){
        if (err){return res.serverError(err)}
        if (!findPost) {
          return res.notFound('Không tìm thấy bài viết , thử lại với ID khác')
        }
        console.log('found post',findPost);
        console.log('threads',allthreads);
        return res.view('admin/post_edit',{allthreads,findPost});

      });

    })
  },

  edit: (req,res)=> {
    if (!req.isSocket) {return res.badRequest();}

    let params = req.allParams();
    sails.sockets.join(req,params.title);
    Post.update({id:params.id},params).exec(function(err,result){
      if (err) {return res.serverError(err)}
      sails.sockets.broadcast(params.title,'edit-success/post',result)
    });
  },

  view: (req,res) => {
    let postId = req.params.id;

    Post.findOne({id: postId}).exec(function (err,viewPost) {
      if (err) {
        return res.serverError(err)
      }
      if (!viewPost) {
        return res.notFound('Không tìm thấy bài viết , thử lại với ID khác')
      }
      return res.view('viewpost', {viewPost});
    });
  }

};

