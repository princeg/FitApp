Ext.regController('scores', {
  // Controls the start up sign in screen prompting the user to sign in via
  // mHealth Connect.
  sign_in: function() {
    if(!this.viewSignIn) {
      this.viewSignIn = this.render({ xtype: 'sign_in' });
    }
    
    this.application.viewport.setActiveItem(this.viewSignIn);
  },
  
  // Renders the main TabPanel view that the chart is contained within.
  main: function() {
    if(!SlumberScore.access_token) {
      return Ext.dispatch({ controller: 'scores', action: 'sign_in' });
    }
    
    if(!this.viewMain) {
      this.viewMain = this.render({ xtype: 'main' });
      
      // This sets up the TabPanel to trigger controller actions when tabs
      // change.
      this.viewMain.on({
        beforecardswitch: this._onRedirect,
        cardswitch: this._onTabChange
      });
      
      // Manually fire listener to initialize the TabPanel.
      this._onTabChange(this.application.viewport, this.viewMain.items.get(0));
    }
    
    this.application.viewport.setActiveItem(this.viewMain);
  },
      
  // Controls the main screen with the chart on it, which is rendered as a
  // card in a TabPanel -- where the alternate tab takes the user to the
  // mHealth mobile client.
  chart: function(interaction) {
    if(!SlumberScore.access_token) {
      return Ext.dispatch({ controller: 'scores', action: 'sign_in' });
    }
    
    if(!this.viewChart) {
      this.viewChart = interaction.card;
      
      // Set up listeners on the view
      this.viewChart.plot.store.on({
        load: { fn: this._onScoresLoad, scope: this }
      });
      
      // Show welcome modal window before loading scores on first sign in
      var self = this;
      if(SlumberScore.profileData.first_sign_in) {
        Ext.Msg.alert(
          'Welcome',
          '<p>Welcome to Slumber Score ' + SlumberScore.profileData.name + '!</p>',
          function() { self.viewChart.plot.store.load(); }
        );
      } else {
        this.viewChart.plot.store.load();
      }
    }
  },

  // Opens up a modal informing the user they have no Zeo data if the API call
  // returns no records.
  _onScoresLoad: function(store) {
    if(store.getCount() > 0) { return true; }
    
    Ext.Msg.alert(
      '<img src="/images/alert.png" width="20" height="18" />No Zeo Data',
      '<p>You\'ve allowed Slumber Score to read from your mHealth account, however there appears to be no Zeo data available.</p><p>Please make sure you have <a href="https://' + SlumberScore.mHealth + '/connections">connected your Zeo to mHealth</a>, and that you have recently uploaded your Zeo data.</p>'
    );
  },
  
  // Check for a redirect before the card switch animation begins
  _onRedirect: function(viewport, card) {
    if (card.redirect) window.location = card.redirect;
  },
  
  // Allows us to dispatch an action each time a tab is clicked on the main
  // tabPanel.
  _onTabChange: function(viewport, card) {
    if (card.controller && card.action) {
      Ext.dispatch({
        controller: card.controller,
        action: card.action,
        card: card
      });
    }
  }    
});
