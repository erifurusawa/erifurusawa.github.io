var headlines = [];
var abstract = [];
var section = [];
var tags = [];
var captions = [];

function preload(){
	var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
	var apikey = "6d8e84bfab87407d959c058906b9ab79";
	url += "?api-key=" + apikey;
	nytResponse = loadJSON(url);
}

function setup() {
	createCanvas(3000, 3000);
	background(255);
	// textSize(12);
	textWidth(9);
	textAlign(LEFT);
	noLoop();

	extractElements();
}

function draw(){
	var lineheight = 10;
	var margin = 40;
	translate(margin, margin);

	for (var i = 0; i < headlines.length; i++){

		if (section[i] == "U.S."){
			fill("orange");
		} else{
			fill("gray");
		};

		var tHeight = map(abstract[i].length, 0, 100, 20, 20);
		textSize(tHeight);

		// console.log(tags[i].length);
		// var line = captions[i];
		var line2 = section[i];
		// text(line, 0, (3 * i + 1) *lineheight);
		text(line2, 0,  (3 * i + 2) *lineheight);
		// text(abstract[i], 0,  (4 * i + 3) *lineheight);
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

		append(headlines, h);
		append(section, s);
		append(abstract, a);
		append(tags, t);

	};
	// console.log(tags.length);
}

var uniqueTags = [];
function makeGraph(){
	for (var i = 0; i < nytResponse.results.length; i++){
		console.log(uniqueTags.includes(tags[i]));
		// if (uniqueTags.includes(tags[i])){
		// 	console.log(tags[i]);
		// 	append(uniqueTags, tags[i]);
		// }
	}
	console.log(uniqueTags);
}


















