Ext.regApplication({
  name: 'SlumberScore',

  launch: function() {
    this.viewport = new SlumberScore.Viewport();
    
    // Hack to get singleton Ext.Msg MessageBox to resize properly
    // http://www.sencha.com/forum/archive/index.php/t-116076.html
    Ext.Msg.add({ maxHeight: 1000 });
    Ext.Msg.on('beforeshow', function() {
      Ext.Msg.doLayout();
    });

    // Global, modal loading mask for blocking during long requests
    this.loadingMask = new Ext.LoadMask(Ext.getBody(), { msg: 'Please wait...' });
    Ext.Msg.cls = 'ss-messagebox';
    
    Ext.dispatch({ controller: 'scores', action: 'main' });
  }
});
