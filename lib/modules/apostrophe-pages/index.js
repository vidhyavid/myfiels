// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu

module.exports = {
  types: [
    {
      name: 'home',
      label: 'Home'
    },
    {
      name: 'auth-module',
      label: 'Auth Module'
    },
    {
      name: 'home-module',
      label: 'Home Module'
    },
    {
      name:'goal-module',
      label:'Goal Module'
    },
    {
      name: 'current-health-module',
      label: 'Current Health Module'
    },
    {
      name: 'lifestyle-module',
      label: 'Lifestyle Module'
    },
    {
      name: 'health-history-module',
      label: 'Health History Module'
    },
    {
      name: 'aboutme-module',
      label: 'Aboutme Module'
    },
    {
      name: 'problem-module',
      label: 'Problem Module'
    },
    {
      name: 'keyhealth-info-module',
      label: 'Keyhealth Info Module'
    },
    {
      name: 'vc-module',
      label: 'vc Module'
    },
    {
      name:'skin-Setting',
      label:'Skin Setting'
    },
    {
      name:'mood-module',
      label:'Mood Module'
    },
    {
      name:'alcohol-module',
      label:'Alcohol Module'
    }

    // Add more page types here, but make sure you create a corresponding
    // template in lib/modules/apostrophe-pages/views/pages!
  ]
};
