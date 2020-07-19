var fs = require('fs');

var multipart = require('connect-multiparty');

const { constants } = require('../__utils__');

var multipartMiddleware = multipart();
module.exports = {
  extend: 'apostrophe-custom-pages',
  label: 'Aboutme Module',
  afterConstruct: function (self) {
     self.addDispatchRoutes();
  },
  construct: function (self, options) {
   require("../../middleware")(self, options);
   self.route('put', 'uploadimg', multipartMiddleware, function (req, res) {
      var url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'profile-path') + '/about-me';
      const fs = require('fs');
      const fileObj = req.files;
      const filePath = fileObj.file.path;
      if (process.env.IMG_UPLOAD_DOMAIN == 'aws' && fileObj && fileObj.file.type.split('/')[0] === 'image') {
        var AWS = require('aws-sdk');
        const BUCKET = process.env.AWS_BUCKET+'/profile';
        const REGION = process.env.AWS_REGION;
        const ACCESS_KEY = process.env.AWS_ACCESS_KEY;
        const SECRET_KEY = process.env.AWS_SECRET_KEY;
        return new Promise((resolve, reject) => {
          const removeAllSpecialCharacters = /[^a-zA-Z0-9-. ]/g;
          const originalname = fileObj.file.originalFilename.replace(removeAllSpecialCharacters, '').trim();
          AWS.config.update({
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_KEY,
            region: REGION
          })
          var s3 = new AWS.S3()
          s3.upload({
            Bucket: BUCKET,
            Body: fs.readFileSync(filePath),
            Key: `${new Date().getTime()}__${originalname}`,
            ACL: 'public-read-write'
          })
            .promise()
            .then(response => {
              console.log('-- ', response)
              // var imageurl = s3.getSignedUrl('getObject', {
              //   Bucket: BUCKET,
              //   Key: originalname
              // });
              let imageurl = response.Location;
              self.middleware.put(req, res, url, { photo_url: imageurl }).then((data) => {
                console.log("response data....", data);
                const image_data = {
                  imageurl
                }
                return res.send(image_data);
              }).catch((error) => {
                 console.log("error......", error);
              });

            })
            .catch(err => {
              console.log('failed:', err)
            })
        });
      }
      else if (process.env.IMG_UPLOAD_DOMAIN == 'azure' && fileObj && fileObj.file.type.split('/')[0] === 'image') {
         const AZURE_BLOB_STORAGE = process.env.AZURE_BLOB;
        const azureStorage = require('azure-storage');
        const fs = require('fs');
        var blobService = azureStorage.createBlobService();
        return new Promise((resolve, reject) => {
          const removeAllSpecialCharacters = /[^a-zA-Z0-9-. ]/g;
          const fileObj = req.files;
          const filePath = fileObj.file.path;
          var options = {
            contentSettings: {
              contentType: fileObj.mimetype
            }
          };
          const fileName = `${new Date().getTime()}img${fileObj.file.originalFilename}`;
          fs.createReadStream(filePath).pipe(blobService.createWriteStreamToBlockBlob(AZURE_BLOB_STORAGE, fileName, options, function (error) {
            if (error) {
              return reject(error);
            }
            const fullDomainImage = `${process.env.AZURE_DOMAIN_PATH}${fileName}`;
            self.middleware.put(req, res, url, { photo_url: fullDomainImage }).then((data) => {
              console.log("response data....", data);
              const image_data = {
                imageurl: fullDomainImage
              };
              return res.send(image_data);
            }).catch((error) => {
              // console.log("error......", error);
            });

          }));
        });
      }
      else if (fileObj && fileObj.file.type.split('/')[0] === 'image') {
        const fs = require('fs');
        return new Promise((resolve, reject) => {
          const fileObj = req.files;
          const filePath = fileObj.file.path;
          var fileContent = fs.readFileSync(filePath, {
            encoding: 'base64'
          });
          var dir = './uploads';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          // The absolute path of the new file with its name
          const fileName = `${dir}/${new Date().getTime()}img${fileObj.file.originalFilename}`;
          // // Save with a buffer as content from a base64 image
          fs.writeFile(fileName, new Buffer(fileContent, "base64"), (err) => {
            if (err) throw err;
            self.middleware.put(req, res, url, { photo_url: fileName }).then((data) => {
              const image_data = {
                imageurl: fileName
              };
              return res.send(image_data);
            }).catch((error) => {
              // console.log("error......", error);
            });

          });
        });
      }
    });

    // update profile - start
    self.route('put', 'about-me-update-profile', function(req, res) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'profile-path') + '/about-me';
      self.middleware.put(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });
    // update profile - end

    require('../../middleware')(self, options);
    self.addDispatchRoutes = function () {
      self.dispatch('/', self.middleware.checkAuth, self.personalDetailsView);
      self.dispatch('/edit', self.middleware.checkAuth, self.personalDetails);
      self.dispatch('/aboutme/my-background', self.middleware.checkAuth, self.myBackgroundView);
      self.dispatch('/aboutme/my-background/edit', self.middleware.checkAuth, self.myBackground);
      self.dispatch('/aboutme/my-needs', self.middleware.checkAuth, self.myNeedsView);
      self.dispatch('/aboutme/my-needs/edit', self.middleware.checkAuth, self.myNeeds);
    };

    self.personalDetails = function (req, callback) {
      let uri = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'profile-path') + "/about-me";
      self.middleware.get(req, uri)
        .then(data => {
          // console.log(data.data)
          let slug_parts = req.slug.split('/')
          slug_parts.pop();
          const parent_route = slug_parts.join('/');
          return self.sendPage(req, self.renderer('personal-details', {
            module_root: req.slug.split('/')[1],
            about_me: data.data,
            slug: req.slug,
            ethnicity_values: constants.profileEthnicities,
            gender_values: constants.profileGender,
            marital_values: constants.profileMaritalStatus,
            parent_route
          }));
        })
        .catch(e => {
          console.log('--> exceptioned ', e);
          return req.res.redirect('/');
        })
    };

    self.personalDetailsView = function (req, callback) {
      let uri = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'profile-path') + "/about-me";
      self.middleware.get(req, uri)
        .then(data => {
          //const responseStatus = !Object.values(data.data).some(v => v);
         // console.log("=== response =====", responseStatus);
          return self.sendPage(req, self.renderer('personal-details-view', {
            module_root: req.slug.split('/')[1],
            about_me: data.data,
            slug: req.slug
          }));
        })
        .catch(e => {
          console.log('--> exceptioned ', e);
          return req.res.redirect('/');
        })
    };

    self.myBackground = function (req, callback) {
      let uri = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'profile-path') + "/about-me?type=background";
      self.middleware.get(req, uri)
        .then(data => {
          // console.log(data.data)
          let slug_parts = req.slug.split('/')
          slug_parts.pop();
          const parent_route = slug_parts.join('/');
          return self.sendPage(req, self.renderer('my-background', {
            module_root: req.slug.split('/')[1],
            bg_data: data.data,
            slug: req.slug,
            parent_route,
          }));
        })
        .catch(e => {
          console.log('--> exceptioned ', e);
          return req.res.redirect('/');
        })
    };

    self.myBackgroundView = function (req, callback) {
      let uri = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'profile-path') + "/about-me?type=background";
      self.middleware.get(req, uri)
        .then(data => {
          // console.log(data.data)
          return self.sendPage(req, self.renderer('my-background-view', {
            module_root: req.slug.split('/')[1],
            bg_data: data.data,
            slug: req.slug
          }));
        })
        .catch(e => {
          console.log('--> exceptioned ', e);
          return req.res.redirect('/');
        })
    };

    self.myNeeds = function (req, callback) {
      let uri = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'profile-path') + "/about-me?type=needs";
      self.middleware.get(req, uri)
        .then(data => {
          console.log(data.data)
          let slug_parts = req.slug.split('/')
          slug_parts.pop();
          const parent_route = slug_parts.join('/');
          return self.sendPage(req, self.renderer('my-needs', {
            module_root: req.slug.split('/')[1],
            needs: data.data,
            slug: req.slug,
            parent_route,
          }));
        })
        .catch(e => {
          console.log('--> exceptioned ', e);
          return req.res.redirect('/');
        })
    };

    self.myNeedsView = function (req, callback) {
      let uri = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'profile-path') + "/about-me?type=needs";
      self.middleware.get(req, uri)
        .then(data => {
          // console.log(data.data)
          return self.sendPage(req, self.renderer('my-needs-view', {
            module_root: req.slug.split('/')[1],
            needs: data.data,
            slug: req.slug
          }));
        })
        .catch(e => {
          console.log('--> exceptioned ', e);
          return req.res.redirect('/');
        })
    };

  }
}
