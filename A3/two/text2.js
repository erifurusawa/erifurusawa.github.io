var headlines = [];
var abstract = [];
var section = [];
var tags = [];
var captions = [];
var dates = [];


function preload(){
	var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
	var apikey = "6d8e84bfab87407d959c058906b9ab79";
	url += "?api-key=" + apikey;
	nytResponse = loadJSON(url);
}

function setup() {
	createCanvas(1000, 3000);
	background(255);
	textSize(20);
	textWidth(9);
	textAlign(LEFT);
	noLoop();
	textFont("Georgia");
	extractElements();
}


function draw(){
	var lineheight = 14;
	var margin = 70;

	push();
	fill(0);
	textStyle(BOLD);
	textAlign(LEFT);
	text("Less than 3 hours ago", margin, 40);

	fill(120);
	textStyle(NORMAL);
	textAlign(CENTER);
	text("Less than 12 hours ago", (width + margin)/ 2, 40);

	fill (200);
	textStyle(NORMAL);
	textAlign(RIGHT);
	text("More than 12 hours ago", width, 40);

	pop();

	line(margin, 70, width, 70);

	translate(margin, margin);

	var y = String(year());
	var m = String(month());
	var d = day();
	var h = hour();
	var mi = minute();

	if (m.length == 1){
		var mo = "0" + m;
	} else {
		var mo = m;
	};

	if (d.length == 1){
		var da = "0" + d;
	} else {
		var da = d;
	};

	if (h.length == 1){
		var ho = "0" + h;
	} else {
		var ho = h;
	};

	if (mi.length == 1){
		var min = "0" + mi;
	} else {
		var min = mi;
	};

	
	for (var i = 0; i < headlines.length; i++){
		// var ho = 2;
		var now = y + "-" + mo + "-" + da + " " + ho + ":" + min;
		var threeHour = y +  "-" + mo + "-" + da + " " + (ho - 3) + ":" + min;

		if (ho - 3 < 0){
			tH = y +  "-" + mo + "-" + (da - 1) + " " + (24 + ho  - 3) +  ":" + min;
		} else{
			tH = threeHour;
		};

		var halfDay = y +  "-" + mo + "-" + da + " " + (ho - 12) + ":" + min;

		if (ho - 12 < 0){
			hD = y +  "-" + mo + "-" + (da - 1) + " " + (24 + ho  - 12) +  ":" + min;
		} else{
			hD = halfDay;
		};

		if (tH < dates[i]){
			fill(0);
			textStyle(BOLD);
		} else if (tH > dates[i] && dates[i] > halfDay){
			fill(120);
			textStyle(NORMAL);
		} else {
			fill (200);
			textStyle(NORMAL);
		};

		var line2 = headlines[i];
		// text(line, 0, (3 * i + 1) *lineheight);
		text(line2, 0,  (3 * i + 2) *lineheight);
		// text(abstract[i], 0,  (4 * i + 3) *lineheight);
		// console.log
	}	
}

function extractElements(){
	console.log(nytResponse);
	// var n = nytResponse.results.length;
	// append(headlines, "the number of results is: " + n + ".");

	for (var i = 0; i < nytResponse.results.length; i++){
		var h = nytResponse.results[i].title;
		var s = nytResponse.results[i].section;
		var a = nytResponse.results[i].abstract;
		var t = nytResponse.results[i].des_facet;
		var d1 = nytResponse.results[i].published_date;
		var d2 = d1.substring(0,10) + " " + d1.substring(11, 19);
		// console.log(d1);
		// console.log(d1.substring(11, 13));

		append(headlines, h);
		append(section, s);
		append(abstract, a);
		append(tags, t);
		append(dates, d2);
	};
}



// var uniqueTags = [];
// function makeGraph(){
// 	for (var i = 0; i < nytResponse.results.length; i++){
// 		console.log(uniqueTags.includes(tags[i]));
// 		// if (uniqueTags.includes(tags[i])){
// 		// 	console.log(tags[i]);
// 		// 	append(uniqueTags, tags[i]);
// 		// }
// 	}
// 	console.log(uniqueTags);
// }


















