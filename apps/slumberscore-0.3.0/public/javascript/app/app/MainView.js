SlumberScore.views.Main = Ext.extend(Ext.TabPanel, {
  fullscreen: true,
  sortable: false,
  cls: 'ss-main',
  
  tabBar: {
    dock: 'bottom'
  },
  
  defaults: {
    // Tabs are in a hbox layout w/in a docked tabBar, this sets up
    // our tabs to be evenly distributed instead of packed.
    tab: { flex: 1 },
    cls: 'ss-card',        
  },
  
  items: [{
    xtype: 'chart',
    title: 'My Zs',
    iconCls: 'myzs',
    controller: 'scores',
    action: 'chart'
  }, {
    title: 'mHealth',
    iconCls: 'mhealth',
    redirect: 'http://' + SlumberScore.mHealth + '/mobile/myhealth?referer=' + encodeURIComponent(window.location.origin)
  }]  
});

Ext.reg('main', SlumberScore.views.Main);
