
var bfs1;
var bfs2;
var bfs3;
var bfs;

var bldgs ={}; // includes all features
var bldgs_grouped = {};
var bldgs_sorted = {};

var outlines = [];

var pointone_x = [];
var pointone_y = [];
var cd = [];
var zone07 = [];
var zone15 = [];
var sandy = [];
var yearbuilt = [];
var elev = [];
var area = [];
var assess = [];

var mapto = 500;
var mapto2 = 200;
var d = 4.5;


var pos = 0;
var state = 101;


// var bldgs_sorted = [];

function setup(){
	createCanvas(1920, 5000);
	noStroke();
	// noLoop();
	loadData();
	sortProperties();
	// frameRate(20);
	frameRate(100);
}

function preload(){
	bfs1 = loadJSON("BFs_Grp1.json");
	// bfs2 = loadJSON("BFs_Grp2.json");
	// bfs3 = loadJSON("BFs_Grp3.json");
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
	sortable.sort(function(a,b){
		return a[1][sortedBy] - b[1][sortedBy]
	})
	return sortable;
	// console.log(sortable);
}


function loadData(){      
	// this function needs to be under setup()
	// code attributes into one object called bldgs, then create
	// new object sorted by cd called bldgs_sorted
	bfs = bfs1;
	// console.log(bfs.features.length)
	for (var i=0 ; i < bfs.features.length; i++){
		// console.log(bfs.features[i]);
		append(assess, bfs.features[i].properties.MAX_Assess);
		append(cd, bfs.features[i].properties.MAX_CD);
		append(zone07, bfs.features[i].properties.MAX_FIRM07);
		append(zone15, bfs.features[i].properties.MAX_PFIRM1);
		append(sandy, bfs.features[i].properties.MAX_Sandy);
		append(yearbuilt, bfs.features[i].properties.MAX_YearBu);
		append(elev, bfs.features[i].properties.MEAN_groun);
		append(area, bfs.features[i].properties.Shape_Area);
		
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

	for (var i = 0; i < bfs.features.length; i++){
		
		bldgs[i] = [i, outlines[i], pointone_x[i], pointone_y[i], 
		assess[i], cd[i], zone07[i], zone15[i], sandy[i], yearbuilt[i], elev[i], area[i]]

		if (cd[i] in bldgs_grouped) {
			bldgs_grouped[cd[i]].push(bldgs[i])
		} else {
			bldgs_grouped[cd[i]] = [bldgs[i]]
		}
	}


	//sort bldgs object //////////////////////////////////////////////
	for (var key in bldgs_grouped){
		console.log(key);
		if (key in bldgs_sorted){ 
			bldgs_sorted[key] = sortProperties(bldgs_grouped[key], 9)  // sort by year
		} else {
			bldgs_sorted[key] = sortProperties(bldgs_grouped[key],9)
		}
	}
	return(bldgs_sorted);
	// console.log(bldgs_sorted[101].length)
	// var bldgs_101 = bldgs_sorted[101];

}



function drawGeo(cd, state){
	var bldgs_cd = bldgs_sorted[cd];
	var col_mid = color(88, 87, 75);
	var col_low = color(178, 177, 165);
	var col_high = color(236, 0, 140);
	var state = state || 0;


	// DRAW BUILDING FOOTPRINTS
	for (var i = 0; i < bldgs_sorted[cd].length; i++){
		var assessed = bldgs_cd[i][1][4];
		var zone = bldgs_cd[i][1][6];
		var sd = bldgs_cd[i][1][8];	
		// DETERMINE COLOR
		push();

		if (state == 1) { // color by flood zone 07
			if (zone == 1) {
				fill ("red")
			} else {
				fill ("black")
			} 
		} else {
			if (assessed < 1495800){           // 1495800 is the median 
				fill(col_low);
			} else if (assessed < 47393100){     // 47393100 is the top 5% 
				fill (col_mid);
			} else {
				fill (col_high);
			}
		}
	
		

		beginShape();
		// console.log(outlines[1][0].length);
		for (var j = 0; j < bldgs_cd[i][1][1][0].length; j++){
			var point_x = map(bldgs_cd[i][1][1][0][j][0], 980000, 1000000, 0, mapto);
			var point_y = map(bldgs_cd[i][1][1][0][j][1], 190000, 210000, 0, mapto);
			vertex(point_x + 150, 1500 - point_y - 1000);

			// // store location as the last element of  bldgs_sorted object
			// var coords = [point_x, 1500 - point_y];
			// if (bldgs_sorted[cd][i][1].length == 12){ // no vertex yet
			// 	bldgs_sorted[cd][i][1][12] = [coords];
			// } else {
			// 	bldgs_sorted[cd][i][1][12].push(coords);
			// }
		}
		endShape(CLOSE);

		pop();
		// console.log(bldgs_sorted[cd]);
	}
	// console.log(bldgs_sorted[101][0][1]);

}

function drawGeo_flood(cd){
	var bldgs_cd = bldgs_sorted[cd];
	

	// DRAW BUILDING FOOTPRINTS
	for (var i = 0; i < bldgs_sorted[cd].length; i++){
		var zone = bldgs_cd[i][1][6];
		var sd = bldgs_cd[i][1][8]		// DETERMINE COLOR
		push();

		if (zone == 1){ 
			fill("red");
		} else {
			fill("black");
		};
	
		beginShape();
		// console.log(outlines[1][0].length);
		for (var j = 0; j < bldgs_cd[i][1][1][0].length; j++){
			var point_x = map(bldgs_cd[i][1][1][0][j][0], 980000, 1000000, 0, mapto);
			var point_y = map(bldgs_cd[i][1][1][0][j][1], 190000, 210000, 0, mapto);
			vertex(point_x + 150, 1500 - point_y - 1000);

			// // store location as the last element of  bldgs_sorted object
			// var coords = [point_x, 1500 - point_y];
			// if (bldgs_sorted[cd][i][1].length == 12){ // no vertex yet
			// 	bldgs_sorted[cd][i][1][12] = [coords];
			// } else {
			// 	bldgs_sorted[cd][i][1][12].push(coords);
			// }
		}
		endShape(CLOSE);

		pop();
		// console.log(bldgs_sorted[cd]);
	}
	// console.log(bldgs_sorted[101][0][1]);

}

	
function simple (cd){        // divide by 07, line by built year
	var nozone_index = 0;
	var zone_index = 0;
	var bldgs_cd = bldgs_sorted[cd];

	var col_mid = color(88, 87, 75);
	var col_low = color(178, 177, 165);
	var col_high = color(236, 0, 140);
	//DRAW BUILDING FOOTPRINTS
	for (var i = 0; i < bldgs_cd.length; i++){
		var off_1x;
		var off_1y;

		// DETERMINE POLYGON SIZE
		var area_original = bldgs_cd[i][1][11];
		var area = map(area_original, 0, 30000, 0, 10);
		var zone_rownum = 35;
		var nozone_rownum = 35;
		var zone = bldgs_cd[i][1][6];
		var sd = bldgs_cd[i][1][8]
		var firstx = bldgs_cd[i][1][2];
		var firsty = bldgs_cd[i][1][3];
		var year = bldgs_cd[i][1][9];
		var assessed = bldgs_cd[i][1][4];

		// console.log(zone + sd);

		// define color //////////////////////////////////////////////////
		if (assessed < 1495800){           // 1495800 is the median 
			fill(col_low);
		} else if (assessed < 47393100){     // 47393100 is the top 5% 
			fill (col_mid);
		} else {
			fill (col_high);
		}
		// define position ///////////////////////////////////////////////


		zone_index = zone_index + 1;
		// console.log(zone_index);
		var row = zone_index % zone_rownum;
		var column = (zone_index - row)/zone_rownum;
	
		off_1x = - map(firstx, 980000, 1000000, 0, mapto) + 170 + row * d;
		off_1y = - map(firsty, 190000, 210000, 0, mapto) + column * d;
	

		
		beginShape();
		
		for (var j = 0; j < bldgs_cd[i][1][1][0].length; j++){
			// console.log(bldgs[outlines[i]].length);
			// var point_x = map(outlines[i][0][j][0], 980000, 1000000, 0, 1000);
			var point_x = map(bldgs_cd[i][1][1][0][j][0], 980000, 1000000, 0, mapto);
			var point_y = map(bldgs_cd[i][1][1][0][j][1], 190000, 210000, 0, mapto);
			vertex(point_x + off_1x, point_y + off_1y + 100);
			// // store location as the last element of  bldgs_sorted object
			// var coords07 = [point_x + off_1x, point_y + off_1y];

			// if (bldgs_sorted[cd][i][1].length == 13){ // no vertex yet
			// 	bldgs_sorted[cd][i][1][13] = [coords07];
			// } else {
			// 	bldgs_sorted[cd][i][1][13].push(coords07);

			// }
			// console.log(bldgs_cd[i][1][13]);
		}
		endShape(CLOSE);	
	}
}	

function lineup07(cd, state){        // divide by 07, line by built year
	var nozone_index = 0;
	var zone_index = 0;
	var bldgs_cd = bldgs_sorted[cd];

	var col_mid = color(88, 87, 75);
	var col_low = color(178, 177, 165);
	var col_high = color(236, 0, 140);
	var state = state || 1;
	//DRAW BUILDING FOOTPRINTS
	for (var i = 0; i < bldgs_cd.length; i++){
		var off_1x;
		var off_1y;

		// DETERMINE POLYGON SIZE
		var area_original = bldgs_cd[i][1][11];
		var area = map(area_original, 0, 30000, 0, 10);
		var zone_rownum = 35;
		var nozone_rownum = 35;
		var zone = bldgs_cd[i][1][6];
		var sd = bldgs_cd[i][1][8]
		var firstx = bldgs_cd[i][1][2];
		var firsty = bldgs_cd[i][1][3];
		var year = bldgs_cd[i][1][9];
		var assessed = bldgs_cd[i][1][4];

		// console.log(zone + sd);

		// define color //////////////////////////////////////////////////
		if (state == 1){  // color by flood zone 07
			if (zone == 1) {
				fill ("red")
			} else {
				fill ("black")
			}
		} else if (assessed < 1495800){           // 1495800 is the median 
			fill(col_low);
		} else if (assessed < 47393100){     // 47393100 is the top 5% 
			fill (col_mid);
		} else {
			fill (col_high);
		}
		
		// define position ///////////////////////////////////////////////
		if (zone == 1){

			zone_index = zone_index + 1;
			// console.log(zone_index);
			var row = zone_index % zone_rownum;
			var column = (zone_index - row)/zone_rownum;
		
			off_1x = - map(firstx, 980000, 1000000, 0, mapto) + 170 + row * d;
			off_1y = - map(firsty, 190000, 210000, 0, mapto) + column * d;
			// console.log(off_1y);

		} else {

			nozone_index = nozone_index + 1;
			// console.log("nozone_index" + nozone_index);
			var row = nozone_index % nozone_rownum;
			var column = (nozone_index - row)/nozone_rownum;
			off_1x = - map(firstx, 980000, 1000000, 0, mapto) + row *  d;
			off_1y = - map(firsty, 190000, 210000, 0, mapto) + column * d;
			// console.log(dist);
		};
		
		beginShape();
		
		for (var j = 0; j < bldgs_cd[i][1][1][0].length; j++){
			// console.log(bldgs[outlines[i]].length);
			// var point_x = map(outlines[i][0][j][0], 980000, 1000000, 0, 1000);
			var point_x = map(bldgs_cd[i][1][1][0][j][0], 980000, 1000000, 0, mapto);
			var point_y = map(bldgs_cd[i][1][1][0][j][1], 190000, 210000, 0, mapto);
			vertex(point_x + off_1x, point_y + off_1y + 100);
			// // store location as the last element of  bldgs_sorted object
			// var coords07 = [point_x + off_1x, point_y + off_1y];

			// if (bldgs_sorted[cd][i][1].length == 13){ // no vertex yet
			// 	bldgs_sorted[cd][i][1][13] = [coords07];
			// } else {
			// 	bldgs_sorted[cd][i][1][13].push(coords07);

			// }
			// console.log(bldgs_cd[i][1][13]);
		}
		endShape(CLOSE);	
	}
}	
// console.log(bldgs_sorted[cd]);

function lineupsandy(cd){        // divide by sandy, line by built year
	var nozone_index = 0;
	var zone_index = 0;
	var bldgs_cd = bldgs_sorted[cd];

	// console.log(bfs.length);

	//DRAW BUILDING FOOTPRINTS
	for (var i = 0; i < bldgs_cd.length; i++){
		var off_1x;
		var off_1y;

		// DETERMINE POLYGON SIZE
		var area_original = bldgs_cd[i][1][11];
		var area = map(area_original, 0, 30000, 0, 10);
		var zone_rownum = 35;
		var nozone_rownum = 35;
		var zone = bldgs_cd[i][1][6];
		var sd = bldgs_cd[i][1][8]
		var firstx = bldgs_cd[i][1][2];
		var firsty = bldgs_cd[i][1][3];
		var year = bldgs_cd[i][1][9];
		var assessed = bldgs_cd[i][1][4];

		// console.log(bldgs_cd[i][1]);

		// define color //////////////////////////////////////////////////
		if (zone != 1 && sd == 1) {
			fill ("blue")
		} else if (assessed < 1495800){
			fill("white");
		} else if (assessed < 47393100){
			fill ("grey");
		} else {
			fill ("red");
		}

		// define position ///////////////////////////////////////////////
		if (sd == 1){

			zone_index = zone_index + 1;
			// console.log(zone_index);
			var row = zone_index % zone_rownum;
			var column = (zone_index - row)/zone_rownum;
		
			off_1x = - map(firstx, 980000, 1000000, 0, mapto) + 170 + row * d;
			off_1y = - map(firsty, 190000, 210000, 0, mapto) + column * d;
			// console.log(off_1y);

		} else {

			nozone_index = nozone_index + 1;
			// console.log("nozone_index" + nozone_index);
			var row = nozone_index % nozone_rownum;
			var column = (nozone_index - row)/nozone_rownum;
			off_1x = - map(firstx, 980000, 1000000, 0, mapto) + row *  d;
			off_1y = - map(firsty, 190000, 210000, 0, mapto) + column * d;
			// console.log(dist);
		};
		
		beginShape();
		
		for (var j = 0; j < bldgs_cd[i][1][1][0].length; j++){
			// console.log(bldgs[outlines[i]].length);
			// var point_x = map(outlines[i][0][j][0], 980000, 1000000, 0, 1000);
			var point_x = map(bldgs_cd[i][1][1][0][j][0], 980000, 1000000, 0, mapto);
			var point_y = map(bldgs_cd[i][1][1][0][j][1], 190000, 210000, 0, mapto);
			vertex(point_x + off_1x, point_y + off_1y + 100);



			// // store location as the last element of  bldgs_sorted object
			// var coords07 = [point_x + off_1x, point_y + off_1y];

			// if (bldgs_sorted[cd][i][1].length == 14){ // no vertex yet
			// 	bldgs_sorted[cd][i][1][14] = [coords07];
			// } else {
			// 	bldgs_sorted[cd][i][1][14].push(coords07);
			// }
			// console.log(bldgs_cd[i][1][13]);
		
		}
		endShape(CLOSE);
	}
	// console.log(bldgs_sorted[cd]);
}	

// function mouseWheel (event){
// 	// print (event.delta);
// 	pos += event.delta;
// 	return false;

// }


function draw(){

	var col_base = color(255);
	background(col_base);

	push();
	// 1
	translate(400, -40);
	drawGeo(101, 0);

	// 2
	translate(0, 600);
	drawGeo(101);
	push();
	translate(300,50);
	simple(101);
	pop();
	// translate(450, 0);

	// 3
	translate(0, 500);
	drawGeo(101,1);
	push();
	translate(450, 100);
	lineup07(101, 1);
	pop();

	// 4

	translate(0, 600);
	drawGeo(101,1);
	push();
	translate(450, 100);
	lineup07(101, 1);
	translate(400, 0);
	lineupsandy(101);
	pop();

	// 5

	translate(0, 600);
	drawGeo(101,1);
	push();
	translate(450, 100);
	lineup07(101, 1);
	translate(400, 0);
	lineupsandy(101);
	pop();
	
	push();
	fill(0);
	text("how to read it", 50, -pos);
	pop();

}





