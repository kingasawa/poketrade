/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': 'HomepageController.index',
  '/trangchu': 'HomepageController.index',

  '/register': 'LoginController.register',
  '/logout': 'UserController.logout',

  '/admin': 'AdminController.index', //trang chủ admin

  //PHẦN BÀI VIẾT
  '/admin/post': 'PostController.index', //trang quản lý bài viết
  '/post/action/edit/:id': 'PostController.postid', //trang xem bài viết chi tiết , admin sửa được
  '/post/action/create': 'AdminController.postcreate', //trang viết nội dung bài viết mới thành viên sử dụng đc
  '/post/view/:id': 'PostController.view', //xem bài viết chi tiết , thành viên xem được , không sửa được

  '/admin/thread': 'ThreadController.index',
  '/admin/thread/edit/:id': 'ThreadController.threadid',

  '/admin/user': 'UserController.allusers',
  '/admin/user/:id': 'AdminController.userid',
  '/view/user/:id':'UserController.userid',

  '/admin/slider': 'SliderController.index',


  '/upload': {
    view: 'upload/index'
  },

  '/get': {
    view: 'common/result'
  }

  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

};
