var headlines = [];
var abstract = [];
var section = [];
var tags = [];
var captions = [];
var dates = [];
var input, button;


function preload(){
	var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
	var apikey = "6d8e84bfab87407d959c058906b9ab79";
	url += "?api-key=" + apikey;
	nytResponse = loadJSON(url);
}

function setup() {
	createCanvas(1500, 3000);
	// background(255);
	textSize(20);
	// textWidth(9);
	textAlign(LEFT);
	noLoop();
	textFont("Georgia");
	extractElements();

	input = createInput();
	input.position(20, 35);

	button = createButton('Search');
	button.position(input.x, 65);
	button.mousePressed(draw);

}


function draw(){
	var lineheight = 14;
	var margin = 200;

	push();
	fill(0);
	textStyle(BOLD);
	textAlign(LEFT);
	text("Less than 3 hours ago", margin, 40);

	fill(120);
	textStyle(NORMAL);
	textAlign(CENTER);
	text("Less than 12 hours ago", (1000 + margin)/ 2, 40);

	fill (200);
	textStyle(NORMAL);
	textAlign(RIGHT);
	text("More than 12 hours ago", 1000, 40);

	pop();

	line(margin, 70, width, 70);

	// translate(margin, margin);

	var y = String(year());
	var m = String(month());
	var d = String(day());
	var h = hour();
	var mi = minute();

	if (m.length == 1){
		var mo = "0" + m;
	} else {
		var mo = m;
	};

	if (d.length == 1){
		var da = "0" + d;
		var yda = "0" + (d-1);
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
	console.log(da);
	// 
	for (var i = 0; i < headlines.length; i++){
		// var ho = 2;
		var now = y + "-" + mo + "-" + da + " " + ho + ":" + min;
		// console.log(now);
		var threeHour = y +  "-" + mo + "-" + da + " " + (ho - 3) + ":" + min;

		if (ho - 3 < 0){
			var tH = y +  "-" + mo + "-" + (da - 1) + " " + (24 + ho  - 3) +  ":" + min;
		} else {
			var tH = threeHour;
		};
		console.log(tH);


		var hou = String(24 + ho - 12);
		var hou_early = String(ho - 12);
		// console.log(hou);
		// console.log(ho + 1);

		//determine urgency
		if (hou_early < 0){
			
			if (hou.length = 0){
				var hr = String("0" + hou);
			} else {
				var hr = hou;
			}
			var hD = y +  "-" + mo + "-" + (da - 1) + " " + hr +  ":" + min;
			console.log(hD);

		} else if (hou_early.length == 1){
				var hr = "0" + hou_early;
				var hD = y +  "-" + mo + "-" + da + " " + hr + ":" + min;
				// console.log(hD);

		} else {
				var hr = hou_early;
				var hD = y +  "-" + mo + "-" + da + " " + hr + ":" + min;
				// console.log(hD);

		};
		// console.log(hou);

		// determine lineweight
		if (tH < dates[i]){
			fill(0);
			textStyle(BOLD);
		} else if (dates[i] > hD){
			fill(120);
			textStyle(NORMAL);
		} else {
			fill (200);
			textStyle(NORMAL);
		};
		console.log(tH);
		console.log(hD);

		var line2 = String(headlines[i]);
		// make array of words in each headline
		var words = split(line2, " ");
		// console.log(words.length);
		var wordWidth = 0;
	
		for (var j = 0; j < words.length; j ++){
		push();
			var keyword = input.value();

			if (words[j] == keyword || 
				words[j].replace(/[;:,"'\']/i,"") == keyword){
				fill("orange");
			};
			text(words[j], wordWidth + margin,  (3 * i + 2) *lineheight + margin);
		pop();
		wordWidth = wordWidth + textWidth(words[j] + 1) ;
		};

		// var searchWord = input.value();
	
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










