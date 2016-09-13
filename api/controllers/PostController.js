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
          return res.json(result);
        })
      });
  }
};

