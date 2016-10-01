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

    let findSliderDone = new Promise((resolve, reject) => {
      Slider.find().exec((err, sliders) => {
          if (err) {reject(err)}
          resolve(sliders);
        })
    });
    let findPostDone = new Promise((resolve, reject) => {
      Post.find().exec((err, posts) => {
          if (err) {reject(err)}
          resolve(posts);
        })
    });
    (async () => {
      var [sliders,posts] = await Promise.all([findSliderDone,findPostDone]);
      return res.view("homepage", {sliders,posts})
      })
    ()
  }
};

// xai cai settings cua tui di nhin dep hon
