
var bfs;
var outlines = [];
var zones = [];
var pointone_x = [];
var pointone_y = [];

function setup(){
	createCanvas(1000, 1000);
	noStroke();
	noLoop();
	getPoly();
	getZone();
	// getShape();
}

function preload(){
	bfs = loadJSON("Dissolve3_103.json");
}

function getPoly(){      // this function needs to be under setup()
	for (var i=0 ; i < bfs.features.length; i++){
		console.log(bfs.features[i]);

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
}

// function getShape(i){
// 	beginShape();
// 	// console.log(outlines[1][0].length);
// 	for (var j = 0; j < outlines[i][0].length; j++){
// 		var point_x = map(outlines[i][0][j][0], 980000, 1000000, 0, 1000);
// 		var point_y = map(outlines[i][0][j][1], 190000, 210000, 0, 1000);
// 		vertex(point_x, height - point_y);
// 	}
// 	endShape();
// }

function getZone(){
	for (var i = 0; i < bfs.features.length; i++){
		var zone = bfs.features[i].properties.MAX_PFIRM1;
		// console.log(zone);
		append(zones, zone);
	}
}


function draw(){
	// console.log(bfs.features.length);
	// console.log(outlines.length);
	// console.log(zones.length);

	background(255);
	// margin(20);

	var nozone_index = 0;
	var zone_index = 0;

	// DRAW BUILDING FOOTPRINTS
	for (var i = 0; i < outlines.length; i++){
		var off_1x;
		var off_1y;

		// DETERMINE POLYGON SIZE
		var area_original = bfs.features[i].properties.Shape_Area;
		var area = map(area_original, 0, 30000, 0, 10);
		var zone_rownum = 17;
		var nozone_rownum = 50;
		
		if (zones[i] == 1){
			// var off_1x = off_1x + area
			fill("red");
			zone_index = zone_index + 1;
			// console.log(zone_index);
			var row = zone_index % zone_rownum;
			var column = (zone_index - row)/zone_rownum;
		
			off_1x = - map(pointone_x[i], 980000, 1000000, 0, 1000) + 250 + row * 5;
			off_1y = - map(pointone_y[i], 190000, 210000, 0, 1000) + column * 5;
			// console.log(off_1y);
		

		} else {
			fill("black");
			nozone_index = nozone_index + 1;
			// console.log("nozone_index" + nozone_index);
			var row = nozone_index % nozone_rownum;
			var column = (nozone_index - row)/nozone_rownum;
			off_1x = - map(pointone_x[i], 980000, 1000000, 0, 1000) + row * 5;
			off_1y = - map(pointone_y[i], 190000, 210000, 0, 1000) + column * 5;
		};
		// console.log("index is " + row, column);
		// console.log("offset by "+ point_x, point_y);
		
		beginShape();
		// console.log(outlines[1][0].length);
		for (var j = 0; j < outlines[i][0].length; j++){
			var point_x = map(outlines[i][0][j][0], 980000, 1000000, 0, 1000);
			var point_y = map(outlines[i][0][j][1], 190000, 210000, 0, 1000);
			vertex(point_x + off_1x, point_y + off_1y);
		}
		endShape();
	
	}


}


