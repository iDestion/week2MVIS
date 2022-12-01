let svg = d3.select("div#drawarea").append("svg")
    .attr("height", 500)
    .attr("width", 600);
let infoarea = d3.select("div#infoarea");
let i = 0;
let tableCreated = false;
let selected;

d3.csv("data/buildings.csv").then(function(data){
    //Sorting data before rendering through a for each, but after loading
    //Not in callback to ensure all data is loaded and sorted before render
    data = data.sort(function(a,b){return d3.descending(a.height_m, b.height_m)});

    //Add rectangles for bar chart to svg
    data.forEach(row => {
        svg.append("rect")
            .attr("x", 250)
            .attr("y", i * 50 + 10)
            .attr("width", row.height_px)
            .attr("height", 40)
            .attr("fill", "blueviolet")

            //The selected building (displayed on the right) is now a different color rectangle
            //to show which building is being detailed at the right. This resets when a different
            //building is selected.
            .on("click", function(event, d){
                d3.select(selected).attr("fill", "blueviolet");
                selected = this;
                //Seperate function to generate table with information and image.
                d3.select(this).attr("fill", "#461e6b");
                generateTable(row);
            })

            //Add hover effect by changing fill when mousing over or mousing out of the bar
            .on("mouseover", function(event, d){
                d3.select(this).attr("fill", "#8f00ff");
                if(selected === this){
                    d3.select(this).attr("fill", "#461e6b");
                }
            })
            .on("mouseout", function(event, d){
                d3.select(this).attr("fill", "blueviolet");
                if(selected === this){
                    d3.select(this).attr("fill", "#461e6b");
                }
            });

        //Add building lables to svg
        svg.append("text")
            .attr("class", "building-label")
            .attr("x", 10)
            .attr("y", i * 50 + 35)
            .attr("height", 40)
            .attr("width", 100)
            .attr("fill", "black")
            .text(row.building);

        //Add height labels in the bars
        svg.append("text")
            .attr("class", "height-label")
            .attr("x", 240 + parseInt(row.height_px))
            .attr("y", i * 50 + 35)
            .attr("text-anchor", "end")
            .attr("fill", "white")
            .text(row.height_m + "m");


        //Initial table generation for the first building, only once.
        if(!tableCreated){
            generateTable(row);
            tableCreated = true;
        };

        i++;
    });
});

function generateTable(row){
    //Empty the html for the info area. At this point a bit drastic, but functional for this excercise.
    //After emptying, the image is added back, as well as the table which details the selected building.
    infoarea.html("");
    infoarea.append("img")
        .attr("src", "img/" + row.image);
    infoarea.append("h3").text(row.building);

    let table = infoarea.append("table").attr("class", "table infotable");

    //Add all elements in the object row to a table, to display them
    //Added code to make the element name start with uppercase for readability
    //Excluded both height in px and image link
    for(element in row){
        if(element !== "height_px" && element !== "image") {
            //Temprow contains the current row of the table that is being populated.
            temprow = table.append("tbody").append("tr");
            temprow.append("td")
                .style("text-align", "left")
                .text(element.charAt(0).toUpperCase() + element.slice(1));
            temprow.append("td")
                .style("text-align", "right")
                .text(row[element]);
        }
    }
}

