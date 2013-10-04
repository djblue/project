define(['jquery', 'backbone', '../collections/courses', '../collections/subjects', 'views/barChart', 'views/pieChart'], 

function ($, Backbone, courses, subjects, barChart, pieChart) {

var barData = [];

var fdata = function(num){
  for(var i = 0; i < num; i++){
      var temp = Math.floor(Math.random()*890);
      barData.push(  {label: i,    level_1:temp, level_2:(Math.floor(Math.random()*temp)), link: ""});
  }

}

fdata(850);
  // var popalert = function(){alert("WORK!")}
function popalert(){
  alert("WORK!");
}

var pieData = [
    {legendLabel: "CSE", magnitude: 10, link: ""},
    {legendLabel: "MAT", magnitude: 20, link: ""},
    {legendLabel: "1", magnitude: 20, link: ""},
    {legendLabel: "2", magnitude: 20, link: ""},
    {legendLabel: "3", magnitude: 20, link: ""},
    {legendLabel: "4", magnitude: 20, link: ""}
    
];
  
var color = ["#707070","#990033","#8EF13C"];

var color1 = ["#043C6B","#006363","#007241","#439400","#659A00","#83A000","#A6A400","#A69800","#A68A00","#A67B00","#FFCE40","#A65F00","#A64D00","#A62F00","#A60400","#95002B","#84004D","#68006C","#45036F","#320571","#1F0772","#080B74","#06276F"];

var color2 = ["#3F8FD2","#33CCCC","#36D792","#8EF13C","#B6F63E","#D8FA3F","#FFFD40","#FFEF40","#FFDF40","#FFCE40","#FFC040","#FFAD40","#FF9840","#FF7640","#FF4540","#F23D70","#E5399E","#CD35D3","#9A3FD5","#8144D6","#6949D7","#4E51D8","#4573D5"];


var data_functions = {
  //clear color for barChart Leves
  color_clear : function(){color = ["#707070"]},
  //add a color
  color_add : function(newColor){
    color.push(newColor);
  },
  //to easy debug color table
  print_color : function(){
    var temp="";
    for(var i = 0; i < color.length; i++){
      temp += color[i]+" ";
    }
    return temp;
  },

  //draw or redraw piechart and barchart;
  drawCharts : function(){
    pieChart.
    drawPie("Pie1", pieData, "#pie", color1, 10, 100, 5, 1);
    console.log(pieData);
    console.log("done with graph");

  },

  clearFormElement : function (){
    //document.getElementById('bar').value = "";
    document.getElementById('bar').innerHTML = "";
    document.getElementById('pie').innerHTML = "";
  },

  updateData : function(newData){
    //document.getElementById('bar').innerHTML = "";
    //document.getElementById('pie').innerHTML = "";
    
    //barData = [];3, 36
    data_functions.drawBar(newData, 2, 5);
    //data_functions.drawCharts();
  },

  drawBar : function(newData,levels,id){
    barData = [];
    for(var i = 0; i < newData.length;i++){
      if(levels == 1){
        barData.push(  {label: i+1, level_1:newData[i].total, link: ""});
      }else if(levels == 2){
        var temp= 0;
        for(var key in newData[i].questions){
          if(courses.get(key).get('subject_id') == id){
            temp+= newData[i].questions[key];
          }
        }
        barData.push(  {label: i+1, level_1:newData[i].total, level_2:temp, link: ""});
      }else{
        var temp = 0;
        var temp2 = 0;
        for(var key in newData[i].questions){
          if(courses.get(key).get('subject_id') == courses.get(id).get('subject_id')){
            temp+= newData[i].questions[key];
          }
        }
        if(newData[i].questions[id] > 0){
          temp2 = newData[i].questions[id];
        }
        barData.push(  {label: i+1, level_1:newData[i].total, level_2:temp,level_3:temp2, link: ""});  
      }
    }

    
    $('body').attr('class','bar').append(
      barChart.   // div id, right label, data, level, colors, highlight
      createBarGraph("Questions", barData, levels, color, "#034769"));
  }
   
};




/*
var testA = courses.where({"subject_id": "0"});
console.log(testA[0].attributes);

console.log(subjects.get(0).get('prefix'));
*/


//console.log(subjects.get("0").get('title'));

//console.log(subjects.toJSON().length);

return {
        color: color,
        barData: barData,
        pieData: pieData,
        color1: color1,
        color2: color2,

        //return popAlert
        popAlert:popalert,
        data_functions:data_functions
    };

});
