// JSON data returned from the mHealth API looks like:
// {"source":"myzeo","name":"zq","type":"number","unit":null,"value":89,"timestamp":"2011-12-01T10:00:00Z"}
Ext.regModel("Score", {
  fields: ['source', 'name', 'type', 'unit', 'value', 'timestamp'],
    
  // Return this Score's timestamp as a date object
  date: function() {
    return new Date(this.data.timestamp * 1000);
  },

  getScore: function() {
    return this.data.value;
  },
  
  getName: function() {
    return this.data.name;
  }
});
