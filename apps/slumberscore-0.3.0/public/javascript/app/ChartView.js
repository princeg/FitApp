// View for the chart of your zQ scores
SlumberScore.views.Chart = Ext.extend(Ext.Panel, {
  scroll: false,
  cls: 'ss-scores-card',
  chartRange: 120,
  chartResolution: 7,
  
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top', 
    title: 'Slumber Score',
    componentCls: 'ss-toolbar',
    titleCls: 'ss-toolbar-title'
  }, {
    xtype: 'toolbar',
    dock: 'top',
    title: 'Sleep Score'
  }],

  initComponent: function() {
    var yAxis = new Array(this.chartResolution),
      chartScale = this.chartRange / (this.chartResolution - 1),
      i;
    
    for(i = 0, count = yAxis.length; i < count; i++) {
      yAxis[i] = {value: this.chartRange - chartScale * i};
    }
    
    this.yAxis = new Ext.Component({
      cls: 'ss-chart-yaxis',
      tpl: '<tpl for="."><span>{value}</span></tpl>',
      data: yAxis
    });

    this.yAxisLines = new Ext.Component({
      cls: 'ss-chart-yaxis-lines',
      tpl: '<tpl for="."><div class="ss-chart-yaxis-line"></div></tpl>',
      data: yAxis
    });
    
    this.plot = new Ext.DataView({
      maxItems: this.chartResolution,
      itemSelector: '.ss-chart-point',
      scroll: false,
      itemId: 'chart',
      flex: 10,
      cls: 'ss-chart-plot',
      refreshPlot: true,
      
      // Template is a hack which allows us to limit the number of
      // dots on the chart, currently cannot limit this on the server
      // side
      tpl: new Ext.XTemplate(
        '<tpl for=".">',
          '<tpl if="xindex < ' + (this.chartResolution + 1) + '">',
            '<div class="ss-chart-point">{value}</div>',
          '</tpl>',
        '</tpl>'
      ),
      
      store: new Ext.data.Store({
        model: 'Score',
        // 1 "week" worth of data
        pageSize: this.chartResolution,

        // only want the name == zq items
        filterOnLoad: true,
        filters: [{ property: 'name', value: 'zq' }],

        sortOnLoad: true,
        sorters: [{ property: 'timestamp', direction: 'ASC' }],

        // We are using JSON-P so we can do the request client-side w/o being
        // stopped by X-Domain XHR request restriction. It is also possible
        // (albeit a bit more complex) to do this with CORS.
        proxy: {
          url: SlumberScore.mHealthAPI + 'v2/health/data/number?accept=jsonp&oauth_token=' + SlumberScore.access_token,
          type: 'scripttag',
          reader: {
            type: 'json'
          }
        },
      }),
      
      listeners: {
        scope: this,
        load: this._refreshPlot,
        refresh: this._refreshPlot
      }
    });
    
    // Little hack to replot the points after the chart has been resized
    var me = this;
    this.plot.afterComponentLayout = function() {
      me._layoutChart(this);
      if(this.refreshPlot) me._refreshPlot(this);
    };
    
    Ext.apply(this, {      
      items: [{
        xtype: 'panel',
        cls: 'ss-chart',
        flex: 1,

        layout: {
          type: 'hbox',
          align: 'stretch'
        },

        items: [this.yAxis, this.yAxisLines, {
          xtype: 'container',
          flex: 1,
          layout: {
            type: 'vbox',
            align: 'stretch'
          },

          items: [this.plot]
        }]
      }, {
        xtype: 'container',
        cls: 'ss-legend',
        
        layout: {
          type: 'hbox',
          align: 'top',
          pack: 'justify'
        },
        
        items: [{
          html: '<div class="ss-score"><div class="ss-chart-point"></div>Your ZQ Score</div>'
        }]
      }]
    });
    
    SlumberScore.views.Chart.superclass.initComponent.apply(this, arguments);
  },
  
  // Lay out the lines and values on the chart
  _layoutChart: function(dataview) {
    var yAxisLines = this.yAxisLines.el.query('.ss-chart-yaxis-line'),
        yAxisPoints = this.yAxis.el.query('span'),
        totalHeight = dataview.getHeight(),
        totalWidth = dataview.getWidth(),
        i, count, point;

    if (!totalHeight) {
      return;
    }
    
    this.yAxisLines.setWidth(totalWidth);
    this.yAxisLines.setHeight(totalHeight);
    
    for (i = 0, count = yAxisLines.length; i < count; i++) {
      point = Ext.get(yAxisPoints[i]);
    }
  },
  
  // Sets the position of the points on the chart
  _refreshPlot: function(dataview, allow_timeout) {
    var store = dataview.store,
        points = store.getRange().slice(0, dataview.maxItems),
        count = points.length,
        totalHeight = dataview.getHeight(),
        totalWidth = dataview.getWidth(),
        xScale = totalWidth / count,
        yScale = totalHeight / this.chartRange,
        self = this,
        i, pointSize, node, x, y;

    if (!totalHeight) return true;
    
    if (dataview.getNode(points[0])) pointSize = Ext.get(dataview.getNode(points[0])).getHeight();
    
    for (i = 0; i < count; i++) {
      point = points[i];
      node = Ext.get(dataview.getNode(point));
      
      x = i * xScale;
      y = totalHeight - (point.getScore() * yScale) - pointSize / 2;
      
      node.setTopLeft(y, x);
    }
    
    // FIXME: This hack fixes a timing issue on iOS, would love to remove        
    if (allow_timeout != false && points.length > 0) setTimeout(function() { self.refreshPlot(dataview, false); }, 500);
  }
});

Ext.reg('chart', SlumberScore.views.Chart);
