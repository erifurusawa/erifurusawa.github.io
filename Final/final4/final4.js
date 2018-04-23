
var bfs;
var bfs2;
var bfs3;

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
var d = 5;

var locator;
var neighborhoods;

function setup(){
	createCanvas(1920, 5000);
	locator = createGraphics (800, 1000);
	neighborhoods = createGraphics (1000, 1000);
	noStroke();
	noLoop();
	loadData();
	appendData();
	sortProperties();
}

function preload(){
	bfs = loadJSON("BFs_Grp1.json");
	bfs2 = loadJSON("BFs_Grp2.json");
	bfs3 = loadJSON("BFs_Grp3.json");
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


function appendData(jsn){
	console.log(jsn.features.length);
	// for (var i = 0; i < jsn.features.length; i++){
		
	// 	append(assess, jsn.features[i].properties.MAX_Assess);
	// 	append(cd, jsn.features[i].properties.MAX_CD);
	// 	append(zone07, jsn.features[i].properties.MAX_FIRM07);
	// 	append(zone15, jsn.features[i].properties.MAX_PFIRM1);
	// 	append(sandy, jsn.features[i].properties.MAX_Sandy);
	// 	append(yearbuilt, jsn.features[i].properties.MAX_YearBu);
	// 	append(elev, jsn.features[i].properties.MEAN_groun);
	// 	append(area, jsn.features[i].properties.Shape_Area);

	// 	// console.log(jsn.features[i].properties.MAX_PFIRM1);

	// 	var allcoords = jsn.features[i].geometry.coordinates;
	// 	var outlinegroups = [];
	// 	for (var j = 0; j< allcoords.length; j++){
	// 		var vertexes = allcoords[j];
	// 		// console.log(vertexes);
	// 		append(outlinegroups, vertexes);

	// 	}
	// 	append(outlines, outlinegroups);
	// 	// console.log(outlinegroups[0][0][0]);
	// 	append(pointone_x, outlinegroups[0][0][0]);
	// 	append(pointone_y, outlinegroups[0][0][1]);

	// }

	// for (var i = 0; i < jsn.features.length; i++){
		
	// 	bldgs[i] = [i, outlines[i], pointone_x[i], pointone_y[i], 
	// 	assess[i], cd[i], zone07[i], zone15[i], sandy[i], yearbuilt[i], elev[i], area[i]]

	// 	if (cd[i] in bldgs_grouped) {
	// 		bldgs_grouped[cd[i]].push(bldgs[i])
	// 	} else {
	// 		bldgs_grouped[cd[i]] = [bldgs[i]]
	// 	}
	// }

	// //sort bldgs object //////////////////////////////////////////////
	// for (var key in bldgs_grouped){
		
	// 	if (key in bldgs_sorted){ 
	// 		bldgs_sorted[key] = sortProperties(bldgs_grouped[key], 9);  // sort by year
	// 	} else {
	// 		bldgs_sorted[key] = sortProperties(bldgs_grouped[key],9);
	// 	}
	// }
	console.log("ended,", jsn.features.length);
}


function loadData(){
	appendData(bfs); 
	console.log("bfs done");
	appendData(bfs2); 
	console.log("bfs2 done");
	appendData(bfs3); 
	console.log("bfs3 done");
}


// FIRST WINDOW

function drawLocator(){
	background(0);

	function drawGeo(cd){
	var bldgs_cd = bldgs_sorted[cd];
	// DRAW BUILDING FOOTPRINTS
	for (var i = 0; i < bldgs_sorted[cd].length; i++){

		// DETERMINE COLOR
		push();

		if (bldgs_cd[i][1][8] == 1){       // sandy
			fill("red");
		} else {
			fill("black");
		};
		beginShape();
		// console.log(outlines[1][0].length);
		for (var j = 0; j < bldgs_cd[i][1][1][0].length; j++){
			var point_x = map(bldgs_cd[i][1][1][0][j][0], 980000, 1000000, -30, mapto2);
			var point_y = map(bldgs_cd[i][1][1][0][j][1], 190000, 210000, -30, mapto2);
			vertex(point_x + 150, 1500 - point_y - 1000);

			// store location as the last element of  bldgs_sorted object
			var coords = [point_x, 1500 - point_y];
			if (bldgs_sorted[cd][i][1].length == 12){ // no vertex yet
				bldgs_sorted[cd][i][1][12] = [coords];
			} else {
				bldgs_sorted[cd][i][1][12].push(coords);
			}
		}
		endShape(CLOSE);

		pop();
		// console.log(bldgs_sorted[cd]);
	}
	// console.log(bldgs_sorted[101][0][1]);

	}

	drawGeo(101);
	drawGeo(102);
	drawGeo(103);
	drawGeo(104);
	drawGeo(105);
	drawGeo(106);
	// drawGeo(107);
	// drawGeo(108);
	// drawGeo(109);
	// drawGeo(110);
	// drawGeo(111);
	// drawGeo(112);

}

// SECOND WINDOW
function drawNeighborhoods(){
	var sage = color(219, 223, 195);  // sage

	// background(c);

	function lineup07(cd){        // divide by 07, line by built year
	var nozone_index = 0;
	var zone_index = 0;
	var bldgs_cd = bldgs_sorted[cd];
	//DRAW BUILDING FOOTPRINTS
	for (var i = 0; i < bldgs_cd.length; i++){
		var off_1x;
		var off_1y;

		// DETERMINE POLYGON SIZE
		var area_original = bldgs_cd[i][1][11];
		var area = map(area_original, 0, 30000, 0, 10);
		var zone_rownum = 30;
		var nozone_rownum = 30;
		var zone = bldgs_cd[i][1][6];
		var sd = bldgs_cd[i][1][8]
		var firstx = bldgs_cd[i][1][2];
		var firsty = bldgs_cd[i][1][3];
		var year = bldgs_cd[i][1][9];
		var assessed = bldgs_cd[i][1][4];


		// define color //////////////////////////////////////////////////
		if (assessed < 1495800){           // 1495800 is the median 
			fill("#DBDFC3");
		} else if (assessed < 47393100){     // 47393100 is the top 5% 
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
			// store location as the last element of  bldgs_sorted object
			var coords07 = [point_x + off_1x, point_y + off_1y];

			if (bldgs_sorted[cd][i][1].length == 13){ // no vertex yet
				bldgs_sorted[cd][i][1][13] = [coords07];
			} else {
				bldgs_sorted[cd][i][1][13].push(coords07);

			}
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
	for (var i = 0; i < bldgs_cd.length; i++){
		var off_1x;
		var off_1y;

		// DETERMINE POLYGON SIZE
		var area_original = bldgs_cd[i][1][11];
		var area = map(area_original, 0, 30000, 0, 10);
		var zone_rownum = 30;
		var nozone_rownum = 30;
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



			// store location as the last element of  bldgs_sorted object
			var coords07 = [point_x + off_1x, point_y + off_1y];

			if (bldgs_sorted[cd][i][1].length == 14){ // no vertex yet
				bldgs_sorted[cd][i][1][14] = [coords07];
			} else {
				bldgs_sorted[cd][i][1][14].push(coords07);
			}
			// console.log(bldgs_cd[i][1][13]);
		}
		endShape(CLOSE);
	}
	// console.log(bldgs_sorted[cd]);
	}
	lineup07(101);
	translate(400, 0);
	lineupsandy(101);
}


function draw(){
	// always use drawGeo first, then lineup07
	push();
	translate(900, 0);
	drawLocator();
	image(locator, 900, 0);
	pop();

	translate(50, 0);
	drawNeighborhoods();
	image(neighborhoods, 800,0);
	
}
// var myp5 = new p5(sketch);


