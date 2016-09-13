/**
 * HomepageController
 *
 * @description :: Server-side logic for managing homepages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req,res) => {
    let sampleDate = (new Date()).toString();
    let data = {
      currentDate: sampleDate,
      textAdmin: 'Khánh Trần',
      textDesc: '',
      textVersion: '1.0.1'
    };

    // Slider.find(function (err, sliders) {
    //   console.log("sliders",sliders);
    //   Post.find(function (err,posts) {
    //     console.log("posts",posts);
    //     return res.view("homepage",{sliders,posts})
    //   });
    // });



    let findSliderDone = new Promise((resolve, reject) => {
      Slider.find().exec((err, sliders) => {
          if (err) {
            reject(err)
          }
          resolve(sliders);
        }
      )
    });
    let findPostDone = new Promise((resolve, reject) => {
      Post.find().exec((err, posts) => {
          if (err) {
            reject(err)
          }
          resolve(posts);
        }
      )
    });
      async function concurrent() {
      var [sliders] = await Promise.all([findSliderDone]);
      var [posts] = await Promise.all([findPostDone]);
        console.log("data send",sliders,posts);
        return res.view("homepage", {sliders,posts})
      }
    concurrent()
  }
};

