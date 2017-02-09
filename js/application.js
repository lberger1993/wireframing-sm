$(function(){
window.App = Ember.Application.create();

App.Router.map(function() {
  this.route("dashboard", {path:"/dashboard"});
  this.route("index", { path: "/" });
  
  /* Routes for unit perf */
  this.route("unit-performance", { path: "/unit-   performance" });
  this.route("unit-performance-eff", { path: "/unit-performance-eff" });
   this.route("unit-performance-output", { path: "/unit-performance-output" });
  this.route("unit-performance-reliability", { path: "/unit-performance-reliability" });

  /* Routes for plant perf */
 this.route("plant-performance", { path: "/plant-performance" });
  this.route("plant-performance-eff", { path: "/plant-performance-eff" });
   this.route("plant-performance-output", { path: "/plant-performance-output" });
  this.route("plant-performance-reliability", { path: "/plant-performance-reliability" });
  
 /* Routes for fleet perf */
  this.route("fleet-performance", { path: "/fleet-performance" });
  this.route("fleet-performance-eff", { path: "/fleet-performance-eff" });
   this.route("fleet-performance-output", { path: "/fleet-performance-output" });
  this.route("fleet-performance-reliability", { path: "/fleet-performance-reliability" });
  
 this.route("settings", { path: "/settings" });
});

App.LoginRoute = Ember.ArrayController.extend({
  // The code below is the default behavior, so if this is all you
  // need, you do not need to provide a setupController implementation
  // at all.
content: Ember.A(CHART_DATA), 
setupController: function(controller, model) {
    controller.set('model', model);
    
  }
});

App.DashboardRoute = Ember.Route.extend({
  setupController: function(controller) {
    // Set the IndexController's `title`
    controller.set('user_name', 'customer name');
  }
});


App.ApplicationController = Ember.ArrayController.extend({
    content: Ember.A(CHART_DATA)
  });

App.BarChartComponent = Ember.Component.extend({
    tagName: 'svg',
    attributeBindings: 'width height'.w(),
    margin: {top: 20, right: 20, bottom: 30, left: 40},
    
    w: function(){
      return this.get('width') - this.get('margin.left') - this.get('margin.right');
    }.property('width'),
  
    h: function(){
      return this.get('height') - this.get('margin.top') - this.get('margin.bottom');
    }.property('height'),  
  
    transformG: function(){
      return "translate(" + this.get('margin.left') + "," + this.get('margin.top') + ")";
    }.property(),
      
    transformX: function(){
      return "translate(0,"+ this.get('h') +")";
    }.property('h'),   
  
    draw: function(){
      var formatPercent = d3.format(".0%");
      var width = this.get('w');
      var height = this.get('h');
      var data = this.get('data');
      var svg = d3.select('#'+this.get('elementId'));
      var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
      var y = d3.scale.linear().range([height, 0]);
      var xAxis = d3.svg.axis().scale(x).orient("bottom");
      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5).tickFormat(formatPercent);
      
      x.domain(data.map(function(d) { return d.letter; }));
      y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
  
      svg.select(".axis.x").call(xAxis);
      svg.select(".axis.y").call(yAxis);
  
      svg.select(".rects").selectAll("rect")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); });
    },
  
    didInsertElement: function(){
      this.draw();
    }
  });
 }); 
var CHART_DATA = [
    {  "letter":"A", "frequency":0.01492 },
    {  "letter":"B", "frequency":0.08167 },
    {  "letter":"C", "frequency":0.02780 },
    {  "letter":"D", "frequency":0.04253 },
    {  "letter":"E", "frequency":0.12702 },
    {  "letter":"F", "frequency":0.02288 },
    {  "letter":"G", "frequency":0.02022 },
    {  "letter":"H", "frequency":0.06094 },
    {  "letter":"I", "frequency":0.06973 },
    {  "letter":"J", "frequency":0.00153 },
    {  "letter":"K", "frequency":0.00747 }
  ];

