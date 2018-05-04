
var bfs1;
var pos = 0;



// var bldgs_sorted = [];

function setup(){
	createCanvas(1920, 5000);
	noStroke();
	frameRate(100);
}

function preload(){
	bettari = loadImage("Sketches/bettari.png");
	comp = loadImage("Sketches/comp.png");
	elev_value = loadImage("Sketches/elev_value.jpeg");
	gis = loadImage("Sketches/gis.png");
	mapping = loadImage("Sketches/mapping.png");
	sandy_arti = loadImage("Sketches/sandy_arti.png");
	bysize = loadImage("Sketches/bysize.png");
	armelle = loadImage("Sketches/armelle.png")
}

function draw(){
	textFont("Georgia");

	var col_base = color(255);
	background(col_base);
	translate(100, 100);
	var tbwidth = 300;
	var tbheight = 400;
	var parstart = 600;

	// console.log(mouseX, mouseY);


	// 1
	fill(0);
	var title = ("THE MAKING OF \"FALSE PREDICTIONS\"")
	textSize(20);
	text(title, parstart,50);

	translate(0, -200);
	textSize(16);
	var text1 = ("I had been studying the topic of flooding for my thesis, \
and I wanted to dissect the topic from a data visualization perspective. \
Most flood-related studies have one thing in common: they involve flood maps. \
While flood maps are useful for identifying where the flood-prone areas are, \
it is difficult to detect any other patterns that are not geographic. \n\n\
Furthermore, the accuracy of flood maps has been called into question by \
researchers and practitioners alike. \n\
Therefore, my goals were to challenge myself to come up with how flooding \
could be visualized in a non-cartographic format, and in a way that tests \
the accuracy of flood maps.");
	// var t = ("why?")
	// image(comp, 0, 200, comp.width/2, comp.height/2);
	text(text1, parstart, 500, tbwidth, tbheight);

	var text2 = ('My main inspiration came from Armelle Caron\'s \"Les Villes Rangees\" project,\
 which took all the blocks from a city and rearranged them by grouping together\
 blocks with similar shapes and sizes, creating a both orderly and organic pattern. \
 I decided to apply this concept but use parcels instead, because flooding affects buildings, not blocks.');
	image(armelle, 0, 950, armelle.width/4, armelle.height/4);
	var caption = ("Source: Armelle Caron")
	text(text2, parstart, 950, tbwidth, tbheight);
	textSize(10);
	text(caption, 35, 1150);

	var text3 = ("The first challenge was formatting the data. \
The datasets I used were the Sandy Inundation Zone data (one polygon for each inundated surface),\
 PLUTO data (lot level shapefile), and building footprint data. Since I needed them to be available at \
 the building level, I used GIS to bake the attributes from the first two datasets onto each of the building footprint polygons. \
 I then converted the shapefiles to json using an online formatter (ogre2ogre), which I could then import into p5.\
 In order to understand the data better, I conducted additional data analysis in R.");

	textSize(16);
	text(text3, parstart, 1220, tbwidth, tbheight);
	image(elev_value, 30, 1220, elev_value.width/2, elev_value.height/2);

	var text4 = ("This image is from my GIS screen when I was deciding which attributes to use for my visualization.");
	text(text4, parstart, 1750, tbwidth, tbheight);
	image(gis, 30, 1750, gis.width/6, gis.height/6);

	var text5 = ("Another challenge was the slow processing time due to the large number \
of polygons. I initially tried to use all building footprints in Manhattan, \
but after realizing that it took a very long time to import, I decided to focus \
on a subset of the data.");
	text(text5, parstart, 1900, tbwidth, tbheight);

	var text6 = ("Several design decisions influenced the final outcome. \
I experimented with different ways to order the building footprints and to use \
color add more information. The image below is a snapshot of the work in progress. \
It is lined by size and colored by assessed property value. Although I liked how this \
looked, the concentration of larger parcels at the bottom made them overlap and it was \
difficult to distinguish between different parcels, so this was abandoned.");

	text(text6, parstart, 2220, tbwidth, tbheight);
	image(bysize, 60, 2200, bysize.width/3, bysize.height/3);

	var text7 = ("This image shows the building footprints divided into those in \
flood zones and those outside flood zones. In the end, I decided to line the two \
groups of parcels in two rectangles with the same width, so the viewer would be \
able to easily compare the number of parcels in each group.");
	text(text7, parstart, 2600, tbwidth, tbheight);
	image(bettari, 60, 2600, bettari.width/3, bettari.height/3);

	var text8 = ("I used this format to compare between sandy-defined flood zones \
and artificially-defined flood zones.");
	text(text8, parstart, 3000, tbwidth, tbheight);
	image(sandy_arti, 20, 2970, sandy_arti.width/4, sandy_arti.height/4);

	var text9 = ("After determining how to order the building footprints, I decided \
that the visualization would be more accessible with a map next to it,\
 showing how the parcels would be organized on the map.");
	text(text9, parstart, 3300, tbwidth, tbheight);
	image(mapping, 50, 3150, mapping.width/4, mapping.height/4);

	var text10 = ("This gave me the idea for how to lay out all the graphics. \
Instead of having the user scroll through all the visuals, I used the left side \
of the screen for the map and the right side for the building parcel rectangles. \
The user would scroll down the right half of the screen, and the map would remain \
in place but its contents would change based on what was happening on the right half \
of the screen. For colors, I used the color palette by akula kreative.");
	text(text10, parstart, 3650, tbwidth, tbheight);
	image(comp, 10, 3650, comp.width/4, comp.height/4);

	var text11 = ("One of the limitations of this project was that it lacked a strong, \
consistent narrative. This is partly due to the fact that I started with experimenting \
with aesthetics (exploring new ways to show a flood map), and had difficulty building \
a story based on the design. \nOne breakthrough was showing the difference in buildings \
in the flood zones and the ones that were actually flooded by Sandy.\
The next steps would be to find ways in which this visualization would support other stories.");

	text(text11, parstart, 4000, tbwidth, tbheight);

}





