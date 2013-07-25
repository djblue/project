define([], function () {

var barData = [
    {label:'Day1',  level_1:10,  level_2:5,  level_3:3, link: "0.html"},
    {label:'A',     level_1:5,   level_2:0,  level_3:0, link: "1.html"},
    {label:'B',     level_1:1,   level_2:0,  level_3:0, link: "2.html"},
    {label:'C',     level_1:5,   level_2:3,  level_3:2, link: "3.html"},
    {label:'D',     level_1:100, level_2:14, level_3:4, link: "4.html"},
    {label:'E',     level_1:25,  level_2:16, level_3:14, link: "5.html"},
    {label:'F',     level_1:8,   level_2:4,  level_3:2, link: "6.html"},
    {label:'B1',    level_1:1,   level_2:0,  level_3:0, link: "2.html"},
    {label:'C1',    level_1:5,   level_2:3,  level_3:2, link: "3.html"},
    {label:'D1',    level_1:100, level_2:14, level_3:4, link: "4.html"},
    {label:'E1',    level_1:25,  level_2:16, level_3:14, link: "5.html"},
    {label:'F1',    level_1:8,   level_2:4,  level_3:2, link: "6.html"},
    {label:'B2',    level_1:1,   level_2:0,  level_3:0, link: "2.html"},
    {label:'C2',    level_1:5,   level_2:3,  level_3:2, link: "3.html"},
    {label:'D2',    level_1:100, level_2:14, level_3:4, link: "4.html"},
    {label:'E2',    level_1:25,  level_2:16, level_3:14, link: "5.html"},
    {label:'F2',    level_1:8,   level_2:4,  level_3:2, link: "6.html"},
    {label:'B3',    level_1:1,   level_2:0,  level_3:0, link: "2.html"},
    {label:'C3',    level_1:5,   level_2:3,  level_3:2, link: "3.html"},
    {label:'D3',    level_1:100, level_2:14, level_3:4, link: "4.html"},
    {label:'E3',    level_1:25,  level_2:16, level_3:14, link: "5.html"},
    {label:'F3',    level_1:8,   level_2:4,  level_3:2, link: "6.html"},
    {label:'B4',    level_1:1,   level_2:0,  level_3:0, link: "2.html"},
    {label:'C4',    level_1:5,   level_2:3,  level_3:2, link: "3.html"},
    {label:'D4',    level_1:100, level_2:14, level_3:4, link: "4.html"},
    {label:'E4',    level_1:25,  level_2:16, level_3:14, link: "5.html"},
    {label:'F4',    level_1:8,   level_2:4,  level_3:2, link: "6.html"},
    {label:'B5',    level_1:1,   level_2:0,  level_3:0, link: "2.html"},
    {label:'C5',    level_1:5,   level_2:3,  level_3:2, link: "3.html"},
    {label:'D5',    level_1:100, level_2:14, level_3:4, link: "4.html"},
    {label:'E5',    level_1:25,  level_2:16, level_3:14, link: "5.html"},
    {label:'F5',    level_1:8,   level_2:4,  level_3:2, link: "6.html"}
  ];

  var pieData = [
    {legendLabel: "CSE", magnitude: 10, link: "../preview.html"},
    {legendLabel: "MAT", magnitude: 20, link: "Mat.html"},
    {legendLabel: "1", magnitude: 20, link: "1.html"},
    {legendLabel: "2", magnitude: 20, link: "2.html"},
    {legendLabel: "3", magnitude: 20, link: "3.html"},
    {legendLabel: "4", magnitude: 20, link: "4.html"}
    ];
  
var color = ["#707070", "#990033", "#00FF00"];

var color1 = ["#043C6B","#006363","#007241","#36D792" ,"#439400","#659A00","#83A000","#A6A400","#A69800","#A68A00","#A67B00","#FFCE40","#A65F00","#A64D00","#A62F00","#A60400","#95002B","#84004D","#68006C","#45036F","#320571","#1F0772","#080B74","#06276F"];

var color2 = ["#3F8FD2","#33CCCC","#36D792","#39E639","#8EF13C","#B6F63E","#D8FA3F","#FFFD40","#FFEF40","#FFDF40","#FFCE40","#FFC040","#FFAD40","#FF9840","#FF7640","#FF4540","#F23D70","#E5399E","#CD35D3","#9A3FD5","#8144D6","#6949D7","#4E51D8","#4573D5"];

return {
        color: color,
        barData: barData,
        pieData: pieData,
        color1: color1,
        color2: color2
    };

});
