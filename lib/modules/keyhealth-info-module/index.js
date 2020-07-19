module.exports = {
   extend: 'apostrophe-custom-pages',
   label: 'Keyhealth Info Module',
   afterConstruct: function (self) {
      self.addDispatchRoutes();
   },
   construct: function (self, options) {
      require("../../middleware")(self, options);
      self.route("put", "key-health-info", function (req, res) { 
         var url =
         self.apos.PHRMODULE.getOption(req, "phr-module") +
         self.apos.PATH.getOption(req, "profile-path") +
         "/key-health-info";
         self.middleware
         .put(req, res, url, req.body)
         .then((data) => {
            if (!(data && data.message)) {
               req.session.auth_token = data.data.auth_token;
               req.session.reload(function () {});
               req.flash("info", "Welcome to PHR");
            }
            return res.send(data);
         })
         .catch((error) => {
            console.log("---- error -------", error);
            return res.status(error.statusCode).send(error.error);
         });
      });
      self.route('delete', 'key-health-info/:id', function(req, res) {
         if(req.query.hospital_number && req.query.hospital_name){
            var queryparameter = 'hospital_name='+req.query.hospital_name+'&hospital_name_value='+req.query.hospital_name_value+'&hospital_number='+req.query.hospital_number+'&hospital_number_value='+req.query.hospital_number_value;
         }else{
            var queryparameter = 'name='+req.query.name+'&value='+req.query.value;

         }
         const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'profile-path') + '/key-health-info/' + req.params.id+'?'+queryparameter;
         self.middleware.delete(req, res, url, req.body)
           .then((data) => {
             return res.send(data);
           })
           .catch((error) => {
              console.log("error===", error);
             return res.status(error.statusCode).send(error.error);
           });
       });
       self.route("put", "key-health-info", function (req, res) { 
         var url =
         self.apos.PHRMODULE.getOption(req, "phr-module") +
         self.apos.PATH.getOption(req, "profile-path") +
         "/key-health-info";
         self.middleware
         .put(req, res, url, req.body)
         .then((data) => {
            if (!(data && data.message)) {
               req.session.auth_token = data.data.auth_token;
               req.session.reload(function () {});
               req.flash("info", "Welcome to PHR");
            }
            return res.send(data);
         })
         .catch((error) => {
            console.log("---- error -------", error);
            return res.status(error.statusCode).send(error.error);
         });
      });
      self.addDispatchRoutes = function () {
         self.dispatch('/',self.middleware.checkAuth, self.statusview);
         self.dispatch('/edit', self.middleware.checkAuth, self.statusadd);
         self.dispatch('/future-care/edit', self.middleware.checkAuth, self.futureadd);
         self.dispatch('/future-care/', self.middleware.checkAuth, self.futureview);
      };
      self.statusadd = function (req, callback) {
         var url =
         self.apos.PHRMODULE.getOption(req, "phr-module") +
         self.apos.PATH.getOption(req, "profile-path") +
         "/key-health-info";
         const slug_splits = req.slug.split("/");
         slug_splits.pop(); // /add is removed
         const view_page_route = slug_splits.join("/");

         var languagesArray = [
          "Afar",
          "Abkhazian",
          "Afrikaans",
          "Akan",
          "Albanian",
          "Amharic",
          "Arabic",
          "Aragonese",
          "Armenian",
          "Assamese",
          "Avaric",
          "Avestan",
          "Aymara",
          "Azerbaijan",
          "Bashkir",
          "Bambara",
          "Basque",
          "Belarusian",
          "Bengali",
          "Bihari",
          "Bislama",
          "Tibetan",
          "Bosnian",
          "Breton",
          "Bulgarian",
          "Burmese",
          "Catalan; Valencian",
          "Czech",
          "Chamorro",
          "Chechen",
          "Chinese",
          "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic",
          "Chuvash",
          "Cornish",
          "Corsican",
          "Cree",
          "Welsh",
          "Danish",
          "German",
          "Divehi; Dhivehi; Maldivian",
          "Dutch; Flemish",
          "Dzongkha",
          "Greek, Modern (1453-)",
          "English",
          "Esperanto",
          "Estonian",
          "Ewe",
          "Faroese",
          "Persian",
          "Fijian",
          "Finnish",
          "French",
          "Western Frisian",
          "Fulah",
          "Georgian",
          "Gaelic; Scottish Gaelic",
          "Irish",
          "Galician",
          "Manx",
          "Guarani",
          "Gujarati",
          "Haitian; Haitian Creole",
          "Hausa",
          "Hebrew",
          "Herero",
          "Hindi",
          "Hiri Motu",
          "Croatian",
          "Hungarian",
          "Igbo",
          "Icelandic",
          "Ido",
          "Sichuan Yi",
          "Inuktitut",
          "Interlingue",
          "Interlingua (International Auxiliary Language Association)",
          "Indonesian",
          "Inupiaq",
          "Italian",
          "Javanese",
          "Japanese",
          "Kalaallisut; Greenlandic",
          "Kannada",
          "Kashmiri",
          "Kanuri",
          "Kazakh",
          "Central Khmer",
          "Kikuyu; Gikuyu",
          "Kinyarwanda",
          "Kirghiz; Kyrgyz",
          "Komi",
          "Kongo",
          "Korean",
          "Kuanyama; Kwanyama",
          "Kurdish",
          "Lao",
          "Latin",
          "Latvain",
          "Limburgan; Limburger; Limburgish",
          "Lingala",
          "Lithuanian",
          "Luxembourgish; Letzeburgesch",
          "Luba-Katanga",
          "Ganda",
          "Macedonian",
          "Marshallese",
          "Malayalam",
          "Maori",
          "Marathi",
          "Malay",
          "Malagasy",
          "Maltese",
          "Moldavian",
          "Mongolian",
          "Nauru",
          "Navajo; Navaho",
          "Ndebele, South; South Ndebele",
          "Ndebele, North; North Ndebele",
          "Ndonga",
          "Nepali",
          "Norwegian Nynorsk; Nynorsk, Norwegian",
          "Bokmål, Norwegian; Norwegian Bokmål",
          "Norwegian",
          "Chichewa; Chewa; Nyanja",
          "Occitan (post1500); Provençal",
          "Ojibwa",
          "Oriya",
          "Oromo",
          "Ossetian; Ossetic",
          "Panjabi; Punjabi",
          "Pali",
          "Polish",
          "Portuguese",
          "Pushto",
          "Quechua",
          "Romansh",
          "Romanian",
          "Rundi",
          "Russian",
          "Sango",
          "Sanskrit",
          "Serbian",
          "Sinhala; Sinhalese",
          "Slovak",
          "Slovenian",
          "Northern Sami",
          "Samoan",
          "Shona",
          "Sindhi",
          "Somali",
          "Sotho, Southern",
          "Spanish; Castilian",
          "Sardinian",
          "Swati",
          "Sundanese",
          "Swahili",
          "Swedish",
          "Tahitian",
          "Tamil",
          "Tatar",
          "Telugu",
          "Tajik",
          "Tagalog",
          "Thai",
          "Tigrinya",
          "Tonga (Tonga Islands)",
          "Tswana",
          "Tsonga",
          "Turkmen",
          "Turkish",
          "Twi",
          "Uighur; Uyghur",
          "Ukrainian",
          "Urdu",
          "Uzbek",
          "Venda",
          "Vietnamese",
          "Volapük",
          "Walloon",
          "Wolof",
          "Xhosa",
          "Yiddish",
          "Yoruba",
          "Zhuang; Chuang",
          "Zulu"
       ];
       self.middleware
         .get(req, url)
         .then((data) => {
          const hospitalInfo = [];  
          if((data.data && data.data.hospital_number) || (data.data && data.data.hospital_name)){
            var hospitalNumber = data.data.hospital_number;
            var hospitalName = data.data.hospital_name;
            var hospitalData = [];
            //Detect if array has only null values in it
            Array.prototype.isNull = function (){
              return this.join().replace(/,/g,'').length === 0;
            };
            hospitalName.isNull(); // true
            hospitalNumber.isNull(); // true
            if(hospitalNumber && hospitalName.isNull()){
              hospitalData = hospitalNumber;
            }else if(hospitalName && hospitalNumber.isNull()){
              hospitalData = hospitalName;
            }else{
              if((hospitalName.isNull() == false && hospitalNumber.isNull() == false) && hospitalName.length >= hospitalNumber.length){
                hospitalData = hospitalName;
              }else if((hospitalName.isNull() == false && hospitalNumber.isNull() == false) && hospitalNumber.length >= hospitalName.length){
                hospitalData = hospitalNumber;
              }
            }
            i = 0;
            for (i = 0; i < hospitalData.length; i++) {             
              var name = "";
              var number = "";
              if(hospitalNumber && hospitalName.isNull()){
                 name = "";
                 number =  hospitalNumber[i];
                }else if(hospitalName && hospitalNumber.isNull()){
                 name = hospitalData[i];
                 number = "";
              }else{
                 name = hospitalData[i];
                 number = hospitalNumber[i];
              }
              const hospital = {
                hospital_name: name,
                hospital_number: number
              }
              hospitalInfo.push(hospital)
              }
          }
           return self.sendPage(
             req,
             self.renderer("key-health-status", {
               data: data.data,
               slug: req.slug,
               module_root: req.slug.split('/')[1],
               parent_route: view_page_route,
               languages: languagesArray,
               hospital_details : hospitalInfo,
             })
           );
         })
         .catch((error) => {
          return req.res.redirect("/");
         });
         
      };

      self.statusview = function (req, callback) {
         var url =
         self.apos.PHRMODULE.getOption(req, "phr-module") +
         self.apos.PATH.getOption(req, "profile-path") +
         "/key-health-info";
         const slug_splits = req.slug.split("/");
         slug_splits.pop(); // /add is removed
         const view_page_route = slug_splits.join("/");
       self.middleware
         .get(req, url)
         .then((data) => {
           return self.sendPage(
             req,
             self.renderer("key-health-status-view", {
               data: data.data,
               slug: req.slug,
               module_root: req.slug.split('/')[1],
               parent_route: view_page_route,
             })
           );
         })
         .catch((error) => {
          return req.res.redirect("/");
         });
      };
      self.futureadd = function (req, callback) {
        var url =
        self.apos.PHRMODULE.getOption(req, "phr-module") +
        self.apos.PATH.getOption(req, "profile-path") +
        "/key-health-info?type=future_care";
        const slug_splits = req.slug.split("/");
        slug_splits.pop(); // /add is removed
        const view_page_route = slug_splits.join("/");
      self.middleware
        .get(req, url)
        .then((data) => {
          return self.sendPage(
            req,
            self.renderer("key-health-future", {
              data: data.data,
              slug: req.slug,
              module_root: req.slug.split('/')[1],
              parent_route: view_page_route,
            })
          );
        })
        .catch((error) => {
          return req.res.redirect("/");
        });
        //  return self.sendPage(req, self.renderer('key-health-future', {
        //    module_root: req.slug.split('/')[1]
        //  }));
      };
      self.futureview = function (req, callback) {
         var url =
         self.apos.PHRMODULE.getOption(req, "phr-module") +
         self.apos.PATH.getOption(req, "profile-path") +
         "/key-health-info?type=future_care";

         const slug_splits = req.slug.split("/");
         slug_splits.pop(); // /add is removed
         const view_page_route = slug_splits.join("/");
       self.middleware
         .get(req, url)
         .then((data) => {
           return self.sendPage(
             req,
             self.renderer("key-health-future-view", {
               data: data.data,
               slug: req.slug,
               module_root: req.slug.split('/')[1],
               parent_route: view_page_route,
             })
           );
         })
         .catch((error) => {
           return req.res.redirect("/");
         });
      };
   }
 }
