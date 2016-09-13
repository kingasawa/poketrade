/**
 * SliderController
 *
 * @description :: Server-side logic for managing sliders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: (req,res) => {
    Slider.find(function (err, sliders) {
      res.view('admin/sliders',{sliders})
    })
  },

  create: (req,res) => {
    // if (!req.isSocket) {return res.badRequest();}

    let params = req.allParams();
    console.log(params);
    req.file('thumbnail')
      .upload({dirname:'../../assets/images/slider/'},function (err, uploadedFiles) {
        if (err) return res.serverError(err);
        let [filesFound] = uploadedFiles;
        var fileName = filesFound.fd.split("/assets");
        console.log("upload xong");

        Slider.create({
          title:params.title,
          description:params.description,
          linkto:params.linkto,
          sort:params.sort,
          thumbnail:fileName[1]
        }).exec(function(err,result) {
          if (err) { return res.serverError(err); }
          // console.log(result);
          return res.json(result);
        })
      });
  }
};
