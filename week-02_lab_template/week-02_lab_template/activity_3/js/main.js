let svg = d3.select("body").append("svg")
    .attr("height", 550)
    .attr("width", 700);

let i = 0;

d3.csv("data/cities.csv", (row) => {

    if(row.eu === "false"){
        return null;
    }

    row.population = +row.population;
    row.x = +row.x;
    row.y = +row.y;
    row.eu = (row.eu === "true");

    //Drawing circles in svg element
    svg.append("circle")
        .attr("cx", row.x)
        .attr("cy", row.y)
        .attr("r", d=>  {
            if (row.population < 1000000) return 4;
            else return 8;
        })
        .attr("fill", "blueviolet");

    svg.append("text")
        .attr("class", "city-label")
        .attr("x", row.x)
        .attr("y", row.y)
        .attr("fill", "orange")
        .attr("opacity", d=>{
           if(row.population<1000000) return 0;
           else return 1;
        }).text(row.city);

    return row;
}).then(function(data){
   console.log(data);
   d3.select("body").append("p").text(data.length);
});