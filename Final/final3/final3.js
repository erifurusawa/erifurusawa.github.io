
var bfs;
var bldgs = {};
var outlines = [];

var pointone_x = [];
var pointone_y = [];
var address = [];
var yearbuilt = [];
var elev = [];
var area = [];
var zones = [];

// var bldgs_sorted = [];

function setup(){
	createCanvas(1000, 1000);
	noStroke();
	noLoop();
	loadData();
	sortProperties();
	// getShape();
}

function preload(){
	bfs = loadJSON("Dissolve3_103.json");
	// load other JSONs here
}

function sortProperties(obj, sortedBy){
	var sortedBy = sortedBy || 1;
	var sortable = [];
	for (var key in obj){
		if (obj.hasOwnProperty(key)){
			sortable.push([key, obj[key]])
		}
	}
	// console.log(sortable);
	sortable.sort(function(a,b){
		return a[1][sortedBy] - b[1][sortedBy]
	})
	return sortable;
	// console.log(sortable);
}



function loadData(){      // this function needs to be under setup()
	// code attributes into one object
	for (var i=0 ; i < bfs.features.length; i++){
		// console.log(bfs.features[i]);
		append(address, bfs.features[i].properties.FIRST_Addr);
		append(yearbuilt, bfs.features[i].properties.MIN_YearBu);
		append(elev, bfs.features[i].properties.MIN_ground);
		append(area, bfs.features[i].properties.Shape_Area);
		append(zones, bfs.features[i].properties.MAX_PFIRM1);
		// console.log(bfs.features[i].properties.MAX_PFIRM1);

		var allcoords = bfs.features[i].geometry.coordinates;
		var outlinegroups = [];
		for (var j = 0; j< allcoords.length; j++){
			var vertexes = allcoords[j];
			// console.log(vertexes);
			append(outlinegroups, vertexes);

		}
		append(outlines, outlinegroups);
		// console.log(outlinegroups[0][0][0]);
		append(pointone_x, outlinegroups[0][0][0]);
		append(pointone_y, outlinegroups[0][0][1]);

	}

	// make variables elements of the bldgs object_////////////////////
	for (var i = 0; i < bfs.features.length; i++){
		bldgs[[i]] = [i, outlines[i], pointone_x[i], pointone_y[i],
		address[i], yearbuilt[i], elev[i],area[i], zones[i]]
	}
	
	//sort bldgs object //////////////////////////////////////////////
	bldgs_sorted = sortProperties(bldgs, 7); 
	// console.log(bldgs_sorted);
}


function draw(){
	console.log(bldgs[1]);

	background(255);
	// margin(20);

	var nozone_index = 0;
	var zone_index = 0;
	// console.log(bfs.length);

	//DRAW BUILDING FOOTPRINTS
	for (var i = 0; i < bfs.features.length; i++){
		var off_1x;
		var off_1y;

		// DETERMINE POLYGON SIZE
		var area_original = bldgs_sorted[i][1][7];
		var area = map(area_original, 0, 30000, 0, 10);
		var zone_rownum = 17;
		var nozone_rownum = 50;
		var zone = bldgs_sorted[i][1][8];
		var firstx = bldgs_sorted[i][1][2];
		var firsty = bldgs_sorted[i][1][3];
		var year = bldgs_sorted[i][1][5];

		// console.log(year);

		// define color //////////////////////////////////////////////////
		if (year < 1900){
			fill("black");
		} else if (year < 1980){
			fill ("grey");
		} else {
			fill ("red");
		}

		// define position ///////////////////////////////////////////////
		if (zone == 1){

			zone_index = zone_index + 1;
			// console.log(zone_index);
			var row = zone_index % zone_rownum;
			var column = (zone_index - row)/zone_rownum;
		
			off_1x = - map(firstx, 980000, 1000000, 0, 1000) + 250 + row * 5;
			off_1y = - map(firsty, 190000, 210000, 0, 1000) + column * 5;
			// console.log(off_1y);
		

		} else {
	
			nozone_index = nozone_index + 1;
			// console.log("nozone_index" + nozone_index);
			var row = nozone_index % nozone_rownum;
			var column = (nozone_index - row)/nozone_rownum;
			off_1x = - map(firstx, 980000, 1000000, 0, 1000) + row * 5;
			off_1y = - map(firsty, 190000, 210000, 0, 1000) + column * 5;
		};
		
		// console.log("offset by "+ point_x, point_y);
		// console.log(bldgs[[i]][1][0].length);
		beginShape();
		
		for (var j = 0; j < bldgs_sorted[i][1][1][0].length; j++){
			// console.log(bldgs[outlines[i]].length);
			// var point_x = map(outlines[i][0][j][0], 980000, 1000000, 0, 1000);
			var point_x = map(bldgs_sorted[i][1][1][0][j][0], 980000, 1000000, 0, 1000);
			var point_y = map(bldgs_sorted[i][1][1][0][j][1], 190000, 210000, 0, 1000);
			vertex(point_x + off_1x, point_y + off_1y);
			// console.log(point_x + off_1x, point_y + off_1y);
		}
		endShape();

	
	}


}


