define(['d3'], function (d3) {

  var createBarGraph = function (label, data, levels, color, highlighter) {
    
    var resizer = data.length;
    var width;
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
        if(resizer < 51){
          width = 980 - margin.left - margin.right;
        }else if(resizer >50 && resizer <151){
        //width = 1320 - margin.left - margin.right,
          width = 2600 - margin.left - margin.right;
        }else{
          width = 20000 - margin.left - margin.right;
        }
    var height = 200 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1, 1);
    
    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    var div = document.createElement('div');
    div.className = 'bar2'; 
    var svg = d3.select(div)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      for(var i = 0; i < data.length; i++)
        data[i].index = i; 
      
      x.domain(data.map(function(d) { return d.label; }));
      y.domain([0, d3.max(data, function(d) { return d.level_1; })]);
      
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .style("font-size","12px")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 1)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(label);

      var node = svg.selectAll(".bars")
          .data(data)
          .enter().append("svg:a") // Append legend elements
          //.attr("xlink:href", function(d) { return d.link; })  
          .append("g");


      var doBars = function(){
        var i = 1;
        var retColor=[];
        for(; i < levels+1;i++){
          node.append("rect")
            .attr("class", "bars")
            .style("fill", function() { return color[i-1]; })
            .attr("x", function(d) { return x(d.label); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d["level_"+i]); })
            .attr("height", function(d) { return height - y(d["level_"+i]); });
            //mouse events 
           /* .on("mouseout", function(d) {
                var j = 0;
                var target = d.label;
                d3.selectAll("rect").each( function(d, i){
               /* if(d.label == target){
                  d3.select(this).style('fill',color[j++]);
                }
              });  
            })
            .on("mouseover", function(d) {
              var target = d.label;
              d3.selectAll("rect").each( function(d, i){
                if(d.label == target){
                  d3.select(this).style('fill',highlighter);
                }
              });

            });*/
        }

        node.append("text")
          .attr("class", "bar_text")
          .attr("x", function(d) { return x(d.label); })
          .style("font-size","12px")
          //.attr("transform", "rotate(-45)")
          .attr("y", function(d) { return y(d["level_"+(i-1)]); })
          .text(function(d) { return d["level_"+(i-1)];});
      
      };    
      
      doBars();
      
      d3.select("input").on("change", change);
      
     function change() {

        // Copy-on-write since tweens are evaluated after a delay.
        
        var x0 = x.domain(data.sort(this.checked
            ? function(a, b) { return b["level_"+levels] - a["level_"+levels]; }
            : function(a, b) { return a.index - b.index; })
            .map(function(d) { return d.label; }))
            .copy();

        var transition = svg.transition().duration(1),
            delay = function(d, i) { return i * 1; };

        
        for(var j = 1; j < levels+1; j++){    
          transition.selectAll(".bars")
              .delay(delay)
              .attr("x", function(d) { return x0(d.label); });
        }

        transition.selectAll(".bar_text")
              .delay(delay)
              .attr("x", function(d) { return x0(d.label); });


        transition.select(".x.axis")
            .call(xAxis)
          .selectAll("g")
            .delay(delay);
      }
      return div;
  };

  return {
    createBarGraph: createBarGraph
  };

});
  