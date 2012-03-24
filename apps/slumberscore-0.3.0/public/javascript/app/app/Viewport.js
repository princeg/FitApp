SlumberScore.Viewport = Ext.extend(Ext.Panel, {
  fullscreen: true,
  layout: 'card',
  cls: 'ss-main',

  initComponent: function() {
    SlumberScore.Viewport.superclass.initComponent.apply(this, arguments);
  }
});
