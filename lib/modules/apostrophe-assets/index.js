// This configures the apostrophe-assets module to push a 'site.less'
// stylesheet by default, and to use jQuery 3.x

module.exports = {
  jQuery: 3,
  stylesheets: [
    {
      name: 'site'
    },
    {
      name: 'utils/bootstrap.min',
      import: {
        inline: true
      }
    },
    {
      name: 'styles',
      import: {
        inline: true
      },
    },
    // {
    //   name: 'calendar',
    //   import: {
    //     inline: true
    //   },
    // },
    {
      name: 'pignose.calendar',
      import: {
        inline: true
      },
    },
  ],
  scripts: [
    {
      name: 'site'
    },
    {
      name: 'bootstrap.min'
    },
    {
     name: 'TimePickers'
     },
     {
       name: 'calendar'
     },
     // {
     //   name: 'goalcalendar'
     // },
     {
       name: 'jquery.validate.min'
     },
     {
      name: 'additional-methods.min'
    },
     {
       name: 'common_utils'
     },
    {
    name: 'app'
   },
    {
      name:'theme_switcher'
    }


  ]
};
