var width = 800,
    height = 800,
    radius = 12;
var nodes = [];
var links = [];

var fill = d3.scale.category20();

var force = d3.layout.force().gravity(0.2).distance(50).charge(-1000).linkDistance(200).size([width, height]);

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

d3.json(filename, function (error, json) {
    if (error) return console.error(error);
    
    for (i = 0; i < json.links.length; i++) {
        var sourceIndex = json.nodes.findIndex(function (element, index, array) {
            if (element.identifier == json.links[i].source) {
                return true;
            }
        });

        var targetIndex = json.nodes.findIndex(function (element, index, array) {
            if (element.identifier == json.links[i].target) {
                return true;
            }
        });
        
        json.links[i].source = sourceIndex;
        json.links[i].target = targetIndex;
    }
    
    for (i = 0; i < json.links.length; i++) {
        found = false;
        for (j = 0; j < links.length; j++) {
            if (json.links[i].source == links[j].target && json.links[i].target == links[j].source) {
                found = true;
            }
        }
        if (found == false) {
            links.push(json.links[i]);
        }
    }
    
    nodes = json.nodes;
    
    update();
});
 
 function update(){
    force.linkStrength(function(link) {
         return 1 - (link.value / 5);
    });
    
    force.linkDistance(function(link) {
         return link.value * 45;
    });
    
    force.nodes(nodes)
        .links(links)
        .on("tick", tick)
        .start();
    
     var link = svg.selectAll(".link")
        .data(links)
       .enter()
        .append("line")
        .attr("class", "link");

     var gnodes = svg.selectAll("g.node")
        .data(nodes)
       .enter()
        .append("g")
        .classed("gnode", true)
        .call(force.drag);
     
     var node = gnodes.append("circle")
        .attr("class", "circle")
        .attr("r", function(d){
                    return (radius + parseInt(d.cardinality)) - .75;
         })
        .style("fill", function(d) { 
                return fill(d.group); 
        })
        .style("stroke", function(d) { 
            return d3.rgb(fill(d.group)).darker(); 
        });
          
     var label = gnodes.append("text")
      .attr("class", "nodetext")
      .attr("dx", -4)
      .attr("dy", ".35em")
      .text(function(d) { 
        return d.name 
      });
      
      var tooltips = gnodes
        .append("svg:title")
        .text(function(d) { return d.label; });
     
    function tick() {
        /*gnodes.attr("cx", function (d) {
            return d.x = Math.max(radius, Math.min(width - radius, d.x));
        }).attr("cy", function (d) {
            return d.y = Math.max(radius, Math.min(height - radius, d.y));
        });*/
        gnodes.attr("transform", function(d) { 
            return 'translate(' + [Math.max(radius, Math.min(width - radius, d.x)), Math.max(radius, Math.min(height - radius, d.y))] + ')'; 
         });
        link.attr("x1", function (d) {
            return d.source.x;
        }).attr("y1", function (d) {
            return d.source.y;
        }).attr("x2", function (d) {
            return d.target.x;
        }).attr("y2", function (d) {
            return d.target.y;
        });
    }
    
    // Toggle children on click.
    /*function click(d) {
        if (d3.event.defaultPrevented) return; // ignore drag
            if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update();
    }*/
};

