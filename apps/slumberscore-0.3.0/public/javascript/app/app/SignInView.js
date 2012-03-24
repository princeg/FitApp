SlumberScore.views.SignIn = Ext.extend(Ext.Panel, {
  cls: 'ss-sign_in',

  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  
  items: [{
    xtype: 'container',
    html: '\
      <h2>Welcome to SlumberScore</h2>\
      <p>Track your sleep quality and quantity and share it with your friends!</p>'
  }],
  
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top', 
    title: 'Slumber Score',
    componentCls: 'ss-splash'
  }, {
    xtype: 'container',
    dock: 'bottom',
    cls: 'ss-sign_in-mhealth_connect',
    items: [{
      xtype: 'container',
      html: '\
      <p>Get started with your <strong>mHealth</strong> account</p>\
      <a class="mhealth_connect" href="' + SlumberScore.mHealthConnect + '">Tap here to connect with mHealth</a>'
    }]
  }],
});

Ext.reg('sign_in', SlumberScore.views.SignIn);
