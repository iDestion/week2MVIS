let svg = d3.select("body").append("svg").attr("width", 500).attr("height", 500);

let sandwiches = [
    { name: "Thesis", price: 7.95, size: "large" },
    { name: "Dissertation", price: 8.95, size: "large" },
    { name: "Highlander", price: 6.50, size: "small" },
    { name: "Just Tuna", price: 6.50, size: "small" },
    { name: "So-La", price: 7.95, size: "large" },
    { name: "Special", price: 12.50, size: "small" }
];

for(let i=0; i<sandwiches.length; i++){

    svg.append("circle")
        .attr("cx", i * 85 + 45)
        .attr("cy", i * 85 + 45)
        .attr("r", d =>{
            if(sandwiches[i].size === "large") return 40;
            else return  20;
        })
        .attr("fill", d =>{
            if(sandwiches[i].price > 7) return "blueviolet";
            else return "orange"
        })
        .attr("stroke", "black")
        .attr("stroke-width", 3);
}

