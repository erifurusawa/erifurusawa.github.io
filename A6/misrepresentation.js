function setup(){
	createCanvas(1400, 3000);
	cover = loadImage("graphics/cover.jpg");
	basic = loadImage("graphics/basic.jpeg");
	roomtype = loadImage("graphics/roomtype.jpeg");
	plot1 = loadImage("graphics/plot1.jpeg");
	plot2 = loadImage("graphics/plot2.jpeg");
}

function draw(){
	background(255);
	var h1 = 0
	image(cover, 0, h1, 990, 660);

	var h2 = h1 + 680;
	image(basic, 0, h2, basic.width/1.5, basic.height/1.5);

	var h3 = h2 + basic.height/1.5 + 100;
	image(roomtype, 0, h3, roomtype.width/1.2, roomtype.height/1.2);

	var h4 = h3 + roomtype.height/1.2 + 100;
	image(plot1, 0, h4, plot1.width/1.6, plot1.height/1.6);

	var h5 = h4 + plot1.height/1.6 + 100;
	image(plot2, 0, h5, plot2.width/1.6, plot2.height/1.6);

	fill(0);
	textFont("Arial");
	push();
	textSize(20);
	var text1 = ("82% of Airbnb hosts in New York City\nlist only one location!");
	text(text1,  roomtype.width/1.2 + 20, h2 + 50);
	pop();
	textSize(14);

	var text2 = ("82% sounds like a good, persuasive statistic.\nThe bar chart\
 on the left shows the number of hosts grouped by how many Airbnb listings\
 they have. It indeed seems like hosts with only one listing is the majority.\
		\n\nHowever, this graph obscures the fact that some locations are entire apartments\
	that host a large number of people.");
	text(text2,  roomtype.width/1.2 + 20, h2 + 100, 360, 300);
	var text3 = ("This chart is more revealing; of the hosts that list only one location,\
 more than half list entire homes or apartments. \nThis suggests that they are displacing\
 tenants who would have been permanent residents in these homes, and decide to host short-term\
 stays instead. \n\nBut there's more. \nDoesn't that tiny 'Entire home/apt' category\
 under hosts with 4 or more listings seem suspicious?");
	text(text3, roomtype.width/1.2 + 20, h3 + 50, 360, 300);
	var text4 = ("It turns out that this category was a whole can of worms; there are hosts who list\
	a whooping 990 locations!\n\nHang on, there's something wrong with this plot as well..."); 
	text(text4, plot1.width/1.6 + 10, h4 + 50, 200, 300);
	var text5 = ("That's better.\nHosts with more than 3 listings are generally clustered in the under-100 listings group,\
but there are a number of horrendous outliers.\n\nNew York City, maybe you should see this.");
	text(text5, plot1.width/1.6 + 10, h5 + 50, 200, 300);
	var text6 = ("Source: Get the Data, at http://insideairbnb.com/get-the-data.html");
	textSize(10);
	text(text6, plot1.width/1.6 + 10, h5 + 400, 200, 300);

}