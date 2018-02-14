
var headlines = [];
var abstract = [];
var section = [];
var tags = [];
var captions = [];
var lines = [];

function preload(){
	var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
	var apikey = "6d8e84bfab87407d959c058906b9ab79";
	url += "?api-key=" + apikey;
	// url += '?' + $.param({               //why doesn't this version work?
	// 	'api-key': "6d8e84bfab87407d959c058906b9ab79"
	// });
	// $.ajax({
	// 	url: url,
	// 	method: 'GET',
	// }).done(function(result) {
	// 	console.log(result);
	// }).fail(function(err) {
	// 	throw err;
	// });
	nytResponse = loadJSON(url);
}

function setup() {
	createCanvas(1000, 1500);
	background(255);
	// textSize(12);
	// textWidth(9);
	textFont("Georgia");
	noLoop();

	extractElements();
}

function draw(){
	var lineheight = 14;
	var margin = 200;

	push();
	fill("red");
	var lineheight = 26;
	textAlign(LEFT);
	textSize(20);
	text("WHAT THE HEADLINE SAYS", margin, margin - 20);
	// console.log("why?");
	textAlign(RIGHT);
	text("WHAT THE PHOTO SAYS", width - margin , margin - 20);
	pop();

	// push();
	var lineheight = 14;
	translate(margin, margin);

	for (var i = 0; i < headlines.length; i++){
		var words_headlines = split(headlines[i], " ");
		var words_captions = split(headlines[i], " ");
		console.log(words_headlines);
		
		// var tHeight = map(abstract[i].length, 0, 100, 10, 10);
		// textSize(tHeight);

		// console.log(tags[i].length);
		// draw headlines, if it shares a word with the captions, color it red

		textAlign(LEFT);
		var line2 = headlines[i];
		text(line2, 0, i * lineheight);

		textAlign(RIGHT);
		var line3 = captions[i];
		text(line3, width - margin * 2, i*lineheight);

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

		var c = nytResponse.results[i].multimedia;
		console.log(c.length);
		var capGroup = [];

		if (c.length != 0){
			for (var j = 0; j < c.length; j++){
				cap = c[j]["caption"];
				if (cap == ""){
					cap = "(no caption)";
				}
				append(capGroup, cap);
			}
		} else {
			append(capGroup, "null");
		}

		append(headlines, h);
		append(section, s);
		append(abstract, a);
		append(tags, t);
		append(captions, capGroup[0]);
		// // console.log(captions);
	};
	// console.log(captions);
}

// function breakString(){
// 	for (var i = 0; i < nytResponse.results.length; i++){
// 		var line = captions[i].split(" ");
// 		console.log
// 	}
// }