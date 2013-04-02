// this sets the background color of the master UIView (when there are no windows/tab groups on it)
// Github Push

Ti.UI.setBackgroundColor('#000');

var mainButtonState = null;
var actionButtonState = null;	//Which action button is currently active
var temp = 1;		//Variable use to identity the current state of a button
var audio;
var mainBtn = [], btn = [];

var inside = false;

//Detect device height & width
var detectedWidth = Titanium.Platform.displayCaps.platformWidth;
var detectedHeight = Titanium.Platform.displayCaps.platformHeight;

Ti.API.info("height " + detectedHeight + "; Width " + detectedWidth);

Ti.API.info("Model " + Titanium.Platform.model);
// create base UI tab and root window
var win = Ti.UI.createWindow({  
    title:'Jellow',
    backgroundColor:'#fff',
    height: detectedHeight,
    width: detectedWidth,
    top: 0,
    left: 0
});

//Left Main Menu
var mainHolderLeft = Ti.UI.createView({
	width: 110,
	height: 'auto',
	zIndex: 1,
	left: 0
});

//Right Main Menu
var mainHolderRight = Ti.UI.createView({
	width: 110,
	height: 'auto',
	zIndex: 1,
	left: detectedWidth-110
});
	
//ScrollView
var scrollView = Ti.UI.createScrollView({ 
	width: detectedWidth,
	contentWidth: 110, 
	contentHeight: 'auto',
	top:0,
	left: 0,
	backgroundColor: '#CCC',
	showVerticalScrollIndicator:true, 
	showHorizontalScrollIndicator:true,
});

//Scrolling buttons at the center
var centerButtons = Ti.UI.createView({ 
		width: detectedWidth-220,
		height: 'auto',
		//backgroundColor: "#333",
		left:110,
		top:10 
	});


/* Main Buttons' array */
var mainButtons = [
		{ title: 'Like', path: 'images/main_buttons/smiley_like.png'},				//button: 1, 2 & 3
		{ title: 'DontLike', path: 'images/main_buttons/smiley_dont_like.png'},		//Button: 4, 5 & 6
		{ title: 'Yes', path: 'images/main_buttons/tick_yes.png'},					//Button: 7, 8 & 9
		{ title: 'No', path: 'images/main_buttons/cross_no.png'},					//Button: 10, 11 & 12
		{ title: 'More', path: 'images/main_buttons/plus_more.png'},				//Button: 13, 14 & 15
		{ title: 'Less', path: 'images/main_buttons/minus_less.png'}				//Button: 16, 17 & 18
	]

createMainButtons(mainButtons);

// Home buttons
var homeButtons =[
	{ title: 'Learning', path: 'images/home/learning.png'},		//Button: 19		
	{ title: 'Eating', path: 'images/home/eating.png'},			//Button: 20
	{ title: 'Play', path: 'images/home/playing.png'},			//Button: 21
	{ title: 'People', path: 'images/home/people.png'},			//Button: 22
	{ title: 'Other', path: 'images/home/others.png'}			//Button: 23
//	{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
]

// Learning buttons
var learningButtons =[
	{ title: 'Animals', path: 'images/learning/animals.png'},			//Button: 24
	{ title: 'Body', path: 'images/learning/body.png'},					//Button: 25
	{ title: 'Books', path: 'images/learning/books.png'},				//Button: 26
	{ title: 'Colors', path: 'images/learning/colors.png'},				//Button: 27
	{ title: 'HomeObjects', path: 'images/learning/homeobjects.png'},	//Button: 28
	{ title: 'Shapes', path: 'images/learning/shapes.png'},				//Button: 29
	{ title: 'Stationery', path: 'images/learning/stationary.png'},		//Button: 30
	{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
]

	// Animals buttons
	var animalsButtons =[
		{ title: 'Ant', path: 'images/learning/animals/ant.png'},				//Button: 31
		{ title: 'Cat', path: 'images/learning/animals/cat.png'},				//Button: 32
		{ title: 'Cockroach', path: 'images/learning/animals/cockroach.png'},	//Button: 33
		{ title: 'Dog', path: 'images/learning/animals/dog.png'},				//Button: 34
		{ title: 'Fly', path: 'images/learning/animals/fly.png'},				//Button: 35
		{ title: 'Mosquito', path: 'images/learning/animals/mosquito.png'},		//Button: 36
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Body buttons
	var bodyButtons =[
		{ title: 'Ears', path: 'images/learning/body/ears.png'},			//Button: 37
		{ title: 'Eyes', path: 'images/learning/body/eyes.png'},			//Button: 38
		{ title: 'Fingers', path: 'images/learning/body/fingers.png'},		//Button: 39
		{ title: 'Hair', path: 'images/learning/body/hair.png'},			//Button: 40
		{ title: 'Hand', path: 'images/learning/body/hands.png'},			//Button: 41
		{ title: 'Head', path: 'images/learning/body/head.png'},			//Button: 42
		{ title: 'Legs', path: 'images/learning/body/legs.png'},			//Button: 43
		{ title: 'Mouth', path: 'images/learning/body/mouth.png'},			//Button: 44
		{ title: 'Stomach', path: 'images/learning/body/stomach.png'},		//Button: 45
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Books buttons
	var booksButtons =[
		{ title: 'BedTimeStories', path: 'images/learning/books/bedtimestories.png'},	//Button: 46
		{ title: 'Comics', path: 'images/learning/books/comics.png'},					//Button: 47
		{ title: 'DrawingBook', path: 'images/learning/books/drawingbook.png'},			//Button: 48
		{ title: 'Maths', path: 'images/learning/books/maths.png'},						//Button: 49
		{ title: 'RhymesBook', path: 'images/learning/books/rhymes.png'},				//Button: 50
		{ title: 'SchoolNotebook', path: 'images/learning/books/schoolnotebook.png'},	//Button: 51
		{ title: 'Words', path: 'images/learning/books/words.png'},						//Button: 52
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Colors buttons
	var colorsButtons =[
		{ title: 'Black', path: 'images/learning/colors/black.png'},		//Button: 53
		{ title: 'Blue', path: 'images/learning/colors/blue.png'},			//Button: 54
		{ title: 'Brown', path: 'images/learning/colors/brown.png'},		//Button: 55
		{ title: 'Golden', path: 'images/learning/colors/golden.png'},		//Button: 56
		{ title: 'Green', path: 'images/learning/colors/green.png'},		//Button: 57
		{ title: 'Red', path: 'images/learning/colors/red.png'},			//Button: 58
		{ title: 'Silver', path: 'images/learning/colors/silver.png'},		//Button: 59
		{ title: 'White', path: 'images/learning/colors/white.png'},		//Button: 60
		{ title: 'Yellow', path: 'images/learning/colors/yellow.png'},		//Button: 61
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Home-Object buttons
	var homeObjectsButtons =[
		{ title: 'Chair', path: 'images/learning/homeobjects/chair.png'},		//Button: 62
		{ title: 'Door', path: 'images/learning/homeobjects/door.png'},			//Button: 63
		{ title: 'Fan', path: 'images/learning/homeobjects/fan.png'},			//Button: 64
		{ title: 'Kitchen', path: 'images/learning/homeobjects/kitchen.png'},	//Button: 65
		{ title: 'Sofa', path: 'images/learning/homeobjects/sofa.png'},			//Button: 66
		{ title: 'Table', path: 'images/learning/homeobjects/table.png'},		//Button: 67
		{ title: 'Toilet', path: 'images/learning/homeobjects/toilet.png'},		//Button: 68
		{ title: 'Window', path: 'images/learning/homeobjects/window.png'},		//Button: 69
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Shapes buttons
	var shapesButtons =[
		{ title: 'Circle', path: 'images/learning/shapes/circle.png'},			//Button: 70
		{ title: 'FreeForm', path: 'images/learning/shapes/freeform.png'},		//Button: 71
		{ title: 'Line', path: 'images/learning/shapes/line.png'},				//Button: 72
		{ title: 'Rectangle', path: 'images/learning/shapes/rectangle.png'},	//Button: 73
		{ title: 'Square', path: 'images/learning/shapes/square.png'},			//Button: 74
		{ title: 'Triangle', path: 'images/learning/shapes/triangle.png'},		//Button: 75
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Stationary buttons
	var stationaryButtons =[
		{ title: 'BlankPaper', path: 'images/learning/stationary/blankpaper.png'},		//Button: 76
		{ title: 'ColoredPaper', path: 'images/learning/stationary/coloredpaper.png'},	//Button: 77
		{ title: 'Crayons', path: 'images/learning/stationary/crayons.png'},			//Button: 78
		{ title: 'Eraser', path: 'images/learning/stationary/eraser.png'},				//Button: 79
		{ title: 'Pen', path: 'images/learning/stationary/pen.png'},					//Button: 80
		{ title: 'Pencil', path: 'images/learning/stationary/pencil.png'},				//Button: 81
		{ title: 'Pouch', path: 'images/learning/stationary/pouch.png'},				//Button: 82
		{ title: 'Scale', path: 'images/learning/stationary/scale.png'},				//Button: 83
		{ title: 'Sharpener', path: 'images/learning/stationary/sharpener.png'},			//Button: 84
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	
// Eating buttons
var eatingButtons =[
	{ title: 'AddOns', path: 'images/eating/addons.png'},			//Button: 85
	{ title: 'Beverages', path: 'images/eating/beverages.png'},		//Button: 86
	{ title: 'Breakfast', path: 'images/eating/breakfast.png'},		//Button: 87
	{ title: 'Cutlery', path: 'images/eating/cutlery.png'},			//Button: 88
	{ title: 'Dinner', path: 'images/eating/dinner.png'},			//Button: 89
	{ title: 'Fruit', path: 'images/eating/fruits.png'},			//Button: 90
	{ title: 'Lunch', path: 'images/eating/lunch.png'},				//Button: 91
	{ title: 'Snacks', path: 'images/eating/snacks.png'},			//Button: 92
	{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
]

	// Add-Ons buttons
	var addOnsButtons =[
		{ title: 'Butter', path: 'images/eating/addons/butter.png'},	//Button: 93
		{ title: 'Jam', path: 'images/eating/addons/jam.png'},			//Button: 94
		{ title: 'Masala', path: 'images/eating/addons/masala.png'},	//Button: 95
		{ title: 'Pepper', path: 'images/eating/addons/pepper.png'},	//Button: 96
		{ title: 'Pickle', path: 'images/eating/addons/pickle.png'},	//Button: 97
		{ title: 'Salt', path: 'images/eating/addons/salt.png'},		//Button: 98
		{ title: 'Sauce', path: 'images/eating/addons/sauce.png'},		//Button: 99
		{ title: 'Sugar', path: 'images/eating/addons/sugar.png'},		//Button: 100
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Beverages buttons
	var beveragesButtons =[
		{ title: 'Juice', path: 'images/eating/beverages/juice.png'},			//Button: 101
		{ title: 'Milk', path: 'images/eating/beverages/milk.png'},				//Button: 102
		{ title: 'Milkshake', path: 'images/eating/beverages/milkshake.png'},	//Button: 103
		{ title: 'Tea', path: 'images/eating/beverages/tea.png'},				//Button: 104
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Breakfast buttons
	var breakfastButtons =[
		{ title: 'Bread', path: 'images/eating/breakfast/bread.png'},				//Button: 105
		{ title: 'Cornflakes', path: 'images/eating/breakfast/cornflakes.png'},		//Button: 106
		{ title: 'Eggs', path: 'images/eating/breakfast/eggs.png'},					//Button: 107
		{ title: 'Milk', path: 'images/eating/breakfast/milk.png'},					//Button: 108
		{ title: 'Porridge', path: 'images/eating/breakfast/porridge.png'},			//Button: 109
		{ title: 'Rice', path: 'images/eating/breakfast/rice.png'},					//Button: 110
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Cutlery buttons
	var cutleryButtons =[
		{ title: 'Bowl', path: 'images/eating/cutlery/bowl.png'},		//Button: 111
		{ title: 'Fork', path: 'images/eating/cutlery/fork.png'},		//Button: 112
		{ title: 'Glass', path: 'images/eating/cutlery/glass.png'},		//Button: 113
		{ title: 'Knife', path: 'images/eating/cutlery/knife.png'},		//Button: 114
		{ title: 'Plate', path: 'images/eating/cutlery/plate.png'},		//Button: 115
		{ title: 'Spoon', path: 'images/eating/cutlery/spoon.png'},		//Button: 116
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Meal: Dinner/Lunch buttons
	var mealButtons =[
		{ title: 'Curd', path: 'images/eating/meal/curd.png'},				//Button: 117
		{ title: 'Curry', path: 'images/eating/meal/curry.png'},			//Button: 118
		{ title: 'Dal', path: 'images/eating/meal/dal.png'},				//Button: 119
		{ title: 'Khichdi', path: 'images/eating/meal/khichdi.png'},		//Button: 120
		{ title: 'NonVeg', path: 'images/eating/meal/nonveg.png'},			//Button: 121
		{ title: 'Pizza', path: 'images/eating/meal/pizza.png'},			//Button: 122
		{ title: 'Rice', path: 'images/eating/meal/rice.png'},				//Button: 123
		{ title: 'Roti', path: 'images/eating/meal/roti.png'},				//Button: 124
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Fruits buttons
	var fruitsButtons =[
		{ title: 'Apple', path: 'images/eating/fruits/apple.png'},					//Button: 125
		{ title: 'Banana', path: 'images/eating/fruits/banana.png'},				//Button: 126
		{ title: 'Grapes', path: 'images/eating/fruits/grapes.png'},				//Button: 127
		{ title: 'Guava', path: 'images/eating/fruits/guava.png'},					//Button: 128
		{ title: 'Mango', path: 'images/eating/fruits/mango.png'},					//Button: 129
		{ title: 'Orange', path: 'images/eating/fruits/orange.png'},				//Button: 130
		{ title: 'Pineapple', path: 'images/eating/fruits/pineapple.png'},			//Button: 131
		{ title: 'Pomegranate', path: 'images/eating/fruits/pomegranate.png'},		//Button: 132
		{ title: 'Watermelon', path: 'images/eating/fruits/watermelon.png'},			//Button: 133
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Fruits buttons
	var snacksButtons =[
		{ title: 'Biscuits', path: 'images/eating/snacks/biscuits.png'},			//Button: 134	
		{ title: 'Chats', path: 'images/eating/snacks/chats.png'},					//Button: 135
		{ title: 'Chocolate', path: 'images/eating/snacks/chocolate.png'},			//Button: 136
		{ title: 'IceCream', path: 'images/eating/snacks/icecream.png'},			//Button: 137
		{ title: 'NonVeg', path: 'images/eating/snacks/nonveg.png'},				//Button: 138
		{ title: 'Noodles', path: 'images/eating/snacks/noodles.png'},				//Button: 139
		{ title: 'Pasteries', path: 'images/eating/snacks/pasteries.png'},			//Button: 140
		{ title: 'Sweets', path: 'images/eating/snacks/sweets.png'},				//Button: 141
		{ title: 'Wafers', path: 'images/eating/snacks/wafers.png'},					//Button: 142
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	

// Play buttons
var playButtons =[
	{ title: 'Music', path: 'images/play/music.png'},					//Button: 143
	{ title: 'OutdoorGames', path: 'images/play/outdoorgames.png'},		//Button: 144
	{ title: 'Puzzles', path: 'images/play/puzzles.png'},				//Button: 145
	{ title: 'Toys', path: 'images/play/toys.png'},						//Button: 146
	{ title: 'TV', path: 'images/play/tv.png'},							//Button: 147
	{ title: 'VideoGames', path: 'images/play/videogames.png'},			//Button: 148
	{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
]

	// Music buttons
	var musicButtons =[
		{ title: 'ChangeMusic', path: 'images/play/music/changemusic.png'},		//Button: 149
		{ title: 'LetsDance', path: 'images/play/music/letsdance.png'},			//Button: 150
		{ title: 'VolumeUp', path: 'images/play/music/volumeup.png'},			//Button: 151
		{ title: 'VolumeDown', path: 'images/play/music/volumedown.png'},		//Button: 152
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Outdoor-Games buttons
	var outdoorGamesButtons =[
		{ title: 'Cars', path: 'images/play/outdoorgames/cars.png'},			//Button: 153
		{ title: 'Garden', path: 'images/play/outdoorgames/garden.png'},		//Button: 154
		{ title: 'Swing', path: 'images/play/outdoorgames/swing.png'},			//Button: 155
		{ title: 'Terrace', path: 'images/play/outdoorgames/terrace.png'},		//Button: 156
		{ title: 'Walk', path: 'images/play/outdoorgames/walk.png'},				//Button: 157
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]

	// Toys buttons
	var toysButtons =[
		{ title: 'Cars', path: 'images/play/toys/cars.png'},						//Button: 158
		{ title: 'ActionFigures', path: 'images/play/toys/actionfigures.png'},		//Button: 159		
		{ title: 'PlayWithMe', path: 'images/play/toys/playwithme.png'},			//Button: 160
		{ title: 'SoftToys', path: 'images/play/toys/softtoys.png'},					//Button: 161
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// TV buttons
	var tvButtons =[
		{ title: 'NextChannel', path: 'images/play/tv/nextchannel.png'},			//Button: 162
		{ title: 'PreviousChannel', path: 'images/play/tv/previouschannel.png'},	//Button: 163
		{ title: 'VolumeUp', path: 'images/play/music/volumeup.png'},				//Button: 164
		{ title: 'VolumeDown', path: 'images/play/music/volumedown.png'},			//Button: 165
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	

// People buttons
var peopleButtons =[
	{ title: 'Dad', path: 'images/people/dad.png'},				//Button: 166
	{ title: 'Mom', path: 'images/people/mom.png'},				//Button: 167
	{ title: 'Brother', path: 'images/people/brother.png'},		//Button: 168
	{ title: 'Sister', path: 'images/people/sister.png'},		//Button: 169
	{ title: 'Friends', path: 'images/people/friends.png'},		//Button: 170
	{ title: 'Teacher', path: 'images/people/teacher.png'},		//Button: 171
	{ title: 'Nurse', path: 'images/people/nurse.png'},			//Button: 172
	{ title: 'Doctor', path: 'images/people/doctor.png'},		//Button: 173
	{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
]

// Others buttons
var othersButtons =[
	{ title: 'Clothes', path: 'images/others/clothes.png'},			//Button: 174
	{ title: 'Emergency', path: 'images/others/emergency.png'},		//Button: 175
	{ title: 'Hygiene', path: 'images/others/hygiene.png'},			//Button: 176
	{ title: 'School', path: 'images/others/school.png'},			//Button: 177
	{ title: 'Sleep', path: 'images/others/sleep.png'},				//Button: 178
	{ title: 'Time', path: 'images/others/time.png'},				//Button: 179
	{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
]

	// Clothes buttons
	var clothesButtons =[
		{ title: 'ChangeFootwear', path: 'images/others/clothes/changefootwear.png'}, 		//Button: 180
		{ title: 'ChangeInnerwear', path: 'images/others/clothes/changeinnerwear.png'},		//Button: 181
		{ title: 'ChangeJeans', path: 'images/others/clothes/changejeans.png'},				//Button: 182
		{ title: 'ChangeTShirt', path: 'images/others/clothes/changetshirt.png'},			//Button: 183
		{ title: 'WearNightClothes', path: 'images/others/clothes/wearnightclothes.png'},	//Button: 184
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Emergency buttons
	var emergencyButtons =[
		{ title: 'Bandage', path: 'images/others/emergency/bandage.png'},		//Button: 185
		{ title: 'Help', path: 'images/others/emergency/help.png'},				//Button: 186
		{ title: 'Medicine', path: 'images/others/emergency/medicine.png'},		//Button: 187
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Hygiene buttons
	var hygieneButtons =[
		{ title: 'Bath', path: 'images/others/hygiene/bath.png'},				//Button: 188
		{ title: 'Brush', path: 'images/others/hygiene/brush.png'},				//Button: 189
		{ title: 'Facewash', path: 'images/others/hygiene/facewash.png'},		//Button: 190
		{ title: 'Toilet', path: 'images/others/hygiene/toilet.png'},			//Button: 191
		{ title: 'Vomit', path: 'images/others/hygiene/vomit.png'},				//Button: 192
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// School buttons
	var schoolButtons =[
		{ title: 'Bag', path: 'images/others/school/bag.png'},						//Button: 193 
		{ title: 'Books', path: 'images/others/school/books.png'},					//Button: 194
		{ title: 'Bottle', path: 'images/others/school/bottle.png'},				//Button: 195
		{ title: 'DontWantToGo', path: 'images/others/school/dontwanttogo.png'},	//Button: 196
		{ title: 'HomeWork', path: 'images/others/school/homework.png'},				//Button: 197
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Sleep buttons
	var sleepButtons =[
		{ title: 'Door', path: 'images/others/sleep/door.png'},					//Button: 198
		{ title: 'Fan', path: 'images/others/sleep/fan.png'},					//Button: 199
		{ title: 'FeelingCold', path: 'images/others/sleep/feelingcold.png'},	//Button: 200
//		{ title: 'FeelingCold', path: 'images/others/sleep/feelingcold.png'},	//Button: 201
		{ title: 'Light', path: 'images/others/sleep/light.png'},				//Button: 202
		{ title: 'Window', path: 'images/others/sleep/window.png'},				//Button: 203
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]
	
	// Time buttons
	var timeButtons =[
		{ title: 'Afternoon', path: 'images/others/time/afternoon.png'},		//Button: 204
		{ title: 'CurrentTime', path: 'images/others/time/currenttime.png'},	//Button: 205
		{ title: 'Evening', path: 'images/others/time/evening.png'},			//Button: 206
		{ title: 'Morning', path: 'images/others/time/morning.png'},			//Button: 207
		{ title: 'Night', path: 'images/others/time/night.png'},				//Button: 208
		{ title: 'Tomorrow', path: 'images/others/time/tomorrow.png'},			//Button: 209
		{ title: 'Yesterday', path: 'images/others/time/yesterday.png'},			//Button: 210
		{ title: 'goHome', path: 'images/main_buttons/home.png'}			//Button: home
	]

//Create buttons	
createButtons(homeButtons);


var whichView = null;

//Sound file handing through user click event
win.addEventListener('click', function(e){
	
	//Get which button the user clicked
	var whichView = e.source.title;
	
	if(e.source.type == 'main'){
		
		//User clicked on any of the main buttons
		switch(whichView){
			case 'Like':
				setMainBtnState(e, 1, 2);
				break;
			
			case 'Yes':
				setMainBtnState(e, 7, 8);
				break;
			
			case 'More':
				setMainBtnState(e, 13, 14);
				break;
			
			case 'DontLike':
				setMainBtnState(e, 4, 5);
				break;
			
			case 'No':
				setMainBtnState(e, 10, 11);
				break;
			
			case 'Less':
				setMainBtnState(e, 16, 17);
				break;
			
			default:
				//Catch outlier
				mainButtonState = null;
		}
		
		//Reseting button state for action buttons
		temp = 1;
		
		
		Titanium.API.info("Main");
	} else if (e.source.type == 'action'){
		//User clicked on any of the action buttons (center buttons)
		
		switch(whichView){
			case 'Learning':
				setButtonState(e, 19, learningButtons);
				actionButtonState = 19;
				break;
				
			case 'Eating':
				setButtonState(e, 20, eatingButtons);
				actionButtonState = 20;
				break;
				
			case 'Play':
				setButtonState(e, 21, playButtons);
				actionButtonState = 21;
				break;
				
			case 'People':
				setButtonState(e, 22, peopleButtons);
				actionButtonState = 22;
				break;
				
			case 'Other':			
				setButtonState(e, 23, othersButtons);
				actionButtonState = 23;
				break;
				
			case 'Animals':
				setButtonState(e, 24, animalsButtons);
				actionButtonState = 24;
				break;
				
			case 'Body':
				setButtonState(e, 25, bodyButtons);
				actionButtonState = 25;
				break;
				
			case 'Books':
				setButtonState(e, 26, booksButtons);
				actionButtonState = 26;
				break;
				
			case 'Colors':
				setButtonState(e, 27, colorsButtons);
				actionButtonState = 27;
				break;
			
			case 'HomeObjects':
				setButtonState(e, 28, homeObjectsButtons);
				actionButtonState = 28;
				break;
				
			case 'Shapes':
				setButtonState(e, 29, shapesButtons);
				actionButtonState = 29;
				break;
				
			case 'Stationery':
				setButtonState(e, 30, stationaryButtons);
				actionButtonState = 30;
				break;
				
			case 'Ant':
				setButtonState(e, 31, 1);
				actionButtonState = 31;
				break;
				
			case 'Cat':
				setButtonState(e, 32, 1);
				actionButtonState = 32;
				break;
				
			case 'Cockroach':
				setButtonState(e, 33, 1);
				actionButtonState = 33;
				break;
			
			case 'Dog':
				setButtonState(e, 34, 1);
				actionButtonState = 34;
				break;
				
			case 'Fly':
				setButtonState(e, 35, 1);
				actionButtonState = 35;
				break;
				
			case 'Mosquito':
				setButtonState(e, 36, 1);
				actionButtonState = 36;
				break;
				
			//Body Buttons
			case 'Ears':
				setButtonState(e, 37, 1);
				actionButtonState = 37;
				break;
				
			case 'Eyes':
				setButtonState(e, 38, 1);
				actionButtonState = 38;
				break;
				
			case 'Fingers':
				setButtonState(e, 39, 1);
				actionButtonState = 39;
				break;
				
			case 'Hair':
				setButtonState(e, 40, 1);
				actionButtonState = 40;
				break;
				
			case 'Hand':
				setButtonState(e, 41, 1);
				actionButtonState = 41;
				break;
				
			case 'Head':
				setButtonState(e, 42, 1);
				actionButtonState = 42;
				break;
			
			case 'Legs':
				setButtonState(e, 43, 1);
				actionButtonState = 43;
				break;
				
			case 'Mouth':
				setButtonState(e, 44, 1);
				actionButtonState = 44;
				break;
				
			case 'Stomach':
				setButtonState(e, 45, 1);
				actionButtonState = 45;
				break;
				
			//Books Buttons
			case 'BedTimeStories':
				setButtonState(e, 46, 1);
				actionButtonState = 46;
				break;
				
			case 'Comics':
				setButtonState(e, 47, 1);
				actionButtonState = 47;
				break;
				
			case 'DrawingBook':
				setButtonState(e, 48, 1);
				actionButtonState = 48;
				break;
				
			case 'Maths':
				setButtonState(e, 49, 1);
				actionButtonState = 49;
				break;
			
			case 'RhymesBook':
				setButtonState(e, 50, 1);
				actionButtonState = 50;
				break;
				
			case 'SchoolNotebook':
				setButtonState(e, 51, 1);
				actionButtonState = 51;
				break;
				
			case 'Words':
				setButtonState(e, 52, 1);
				actionButtonState = 52;
				break;
			
			//Colors
			case 'Black':
				setButtonState(e, 53, 1);
				actionButtonState = 53;
				break;
			
			case 'Blue':
				setButtonState(e, 54, 1);
				actionButtonState = 54;
				break;
			
			case 'Brown':
				setButtonState(e, 55, 1);
				actionButtonState = 55;
				break;
			
			case 'Golden':
				setButtonState(e, 56, 1);
				actionButtonState = 56;
				break;
			
			case 'Green':
				setButtonState(e, 57, 1);
				actionButtonState = 57;
				break;
			
			
			case 'Red':
				setButtonState(e, 58, 1);
				actionButtonState = 58;
				break;
			
			case 'Silver':
				setButtonState(e, 59, 1);
				actionButtonState = 59;
				break;
			
			case 'White':
				setButtonState(e, 60, 1);
				actionButtonState = 60;
				break;
			
			case 'Yellow':
				setButtonState(e, 61, 1);
				actionButtonState = 61;
				break;
			
			//Home Objects
			case 'Chair':
				setButtonState(e, 62, 1);
				actionButtonState = 62;
				break;
			
			case 'Door':
				setButtonState(e, 63, 1);
				actionButtonState = 63;
				break;
			
			case 'Fan':
				setButtonState(e, 64, 1);
				actionButtonState = 64;
				break;
			
			case 'Kitchen':
				setButtonState(e, 65, 1);
				actionButtonState = 65;
				break;
			
			case 'Sofa':
				setButtonState(e, 66, 1);
				actionButtonState = 66;
				break;
			
			case 'Table':
				setButtonState(e, 67, 1);
				actionButtonState = 67;
				break;
			
			case 'Toilet':
				setButtonState(e, 68, 1);
				actionButtonState = 68;
				break;
			
			case 'Window':
				setButtonState(e, 69, 1);
				actionButtonState = 69;
				break;
			
			//Shapes
			case 'Circle':
				setButtonState(e, 70, 1);
				actionButtonState = 70;
				break;
			
			case 'Freeform':
				setButtonState(e, 71, 1);
				actionButtonState = 71;
				break;
			
			case 'Line':
				setButtonState(e, 72, 1);
				actionButtonState = 72;
				break;
			
			case 'Rectangle':
				setButtonState(e, 73, 1);
				actionButtonState = 73;
				break;
			
			case 'Square':
				setButtonState(e, 74, 1);
				actionButtonState = 74;
				break;
			
			case 'Triangle':
				setButtonState(e, 75, 1);
				actionButtonState = 75;
				break;
				
			//Stationeries
			case 'BlankPaper':
				setButtonState(e, 76, 1);
				actionButtonState = 76;
				break;
			
			case 'ColoredPaper':
				setButtonState(e, 77, 1);
				actionButtonState = 77;
				break;
			
			case 'Crayons':
				setButtonState(e, 78, 1);
				actionButtonState = 78;
				break;
			
			case 'Eraser':
				setButtonState(e, 79, 1);
				actionButtonState = 79;
				break;
			
			case 'Pen':
				setButtonState(e, 80, 1);
				actionButtonState = 80;
				break;
			
			case 'Pencil':
				setButtonState(e, 81, 1);
				actionButtonState = 1;
				break;
			
			case 'Pouch':
				setButtonState(e, 82, 1);
				actionButtonState = 82;
				break;
			
			case 'Scale':
				setButtonState(e, 83, 1);
				actionButtonState = 3;
				break;
			
			case 'Sharpener':
				setButtonState(e, 84, 1);
				actionButtonState = 84;
				break;
			
		//Eating Buttons
			case 'AddOns':
				setButtonState(e, 85, addOnsButtons);
				actionButtonState = 85;
				break;
			
			case 'Beverages':
				setButtonState(e, 86, beveragesButtons);
				actionButtonState = 86;
				break;
			
			case 'Breakfast':
				setButtonState(e, 87, breakfastButtons);
				actionButtonState = 87;
				break;
			
			case 'Cutlery':
				setButtonState(e, 88, cutleryButtons);
				actionButtonState = 88;
				break;
			
			case 'Dinner':
				setButtonState(e, 89, mealButtons);
				actionButtonState = 89;
				break;
			
			case 'Fruit':
				setButtonState(e, 90, fruitsButtons);
				actionButtonState = 90;
				break;
			
			case 'Lunch':
				setButtonState(e, 91, mealButtons);
				actionButtonState = 91;
				break;
			
			case 'Snacks':
				setButtonState(e, 92, snacksButtons);
				actionButtonState = 92;
				break;
				
			//AddOns
			case 'Butter':
				setButtonState(e, 93, 1);
				actionButtonState = 93;
				break;
			
			case 'Jam':
				setButtonState(e, 94, 1);
				actionButtonState = 94;
				break;
			
			case 'Masala':
				setButtonState(e, 95, 1);
				actionButtonState = 95;
				break;
			
			case 'Pepper':
				setButtonState(e, 96, 1);
				actionButtonState = 96;
				break;
			
			case 'Pickle':
				setButtonState(e, 97, 1);
				actionButtonState = 97;
				break;
			
			case 'Salt':
				setButtonState(e, 98, 1);
				actionButtonState = 98;
				break;
			
			case 'Sauce':
				setButtonState(e, 99, 1);
				actionButtonState = 99;
				break;
			
			case 'Sugar':
				setButtonState(e, 100, 1);
				actionButtonState = 10;
				break;
				
			//Beverages
			case 'Juice':
				setButtonState(e, 101, 1);
				actionButtonState = 101;
				break;
			
			case 'Milk':
				setButtonState(e, 102, 1);
				actionButtonState = 102;
				break;
			
			case 'Milkshake':
				setButtonState(e, 103, 1);
				actionButtonState = 103;
				break;
			
			case 'Tea':
				setButtonState(e, 104, 1);
				actionButtonState = 104;
				break;
	
			//Breakfast
			case 'Bread':
				setButtonState(e, 105, 1);
				actionButtonState = 105;
				break;
			
			case 'Cornflakes':
				setButtonState(e, 106, 1);
				actionButtonState = 106;
				break;
			
			case 'Eggs':
				setButtonState(e, 107, 1);
				actionButtonState = 107;
				break;
			
			case 'Milk':
				setButtonState(e, 108, 1);
				actionButtonState = 108;
				break;
			
			case 'Porridge':
				setButtonState(e, 109, 1);
				actionButtonState = 109;
				break;
			
			case 'Rice':
				setButtonState(e, 110, 1);
				actionButtonState = 110;
				break;
				
			//Cutlery
			case 'Bowl':
				setButtonState(e, 111, 1);
				actionButtonState = 111;
				break;
			
			case 'Fork':
				setButtonState(e, 112, 1);
				actionButtonState = 112;
				break;
			
			case 'Glass':
				setButtonState(e, 113, 1);
				actionButtonState = 113;
				break;
			
			case 'Knife':
				setButtonState(e, 114, 1);
				actionButtonState = 114;
				break;
			
			case 'Plate':
				setButtonState(e, 115, 1);
				actionButtonState = 115;
				break;
			
			case 'Spoon':
				setButtonState(e, 116, 1);
				actionButtonState = 116;
				break;
	
			//Dinner, Lunch: Meal
			case 'Curd':
				setButtonState(e, 117, 1);
				actionButtonState = 117;
				break;
			
			case 'Curry':
				setButtonState(e, 118, 1);
				actionButtonState = 118;
				break;
			
			case 'Dal':
				setButtonState(e, 119, 1);
				actionButtonState = 119;
				break;
			
			case 'Khichdi':
				setButtonState(e, 120, 1);
				actionButtonState = 120;
				break;
			
			case 'NonVeg':
				setButtonState(e, 121, 1);
				actionButtonState = 121;
				break;
			
			case 'Pizza':
				setButtonState(e, 122, 1);
				actionButtonState = 122;
				break;
			
			case 'Rice':
				setButtonState(e, 123, 1);
				actionButtonState = 123;
				break;
			
			case 'Roti':
				setButtonState(e, 124, 1);
				actionButtonState = 124;
				break;
				
			//Fruit
			case 'Apple':
				setButtonState(e, 125, 1);
				actionButtonState = 125;
				break;
			
			case 'Banana':
				setButtonState(e, 126, 1);
				actionButtonState = 16;
				break;
			
			case 'Grapes':
				setButtonState(e, 127, 1);
				actionButtonState = 127;
				break;
			
			case 'Guava':
				setButtonState(e, 128, 1);
				actionButtonState = 128;
				break;
			
			case 'Mango':
				setButtonState(e, 129, 1);
				actionButtonState = 129;
				break;
			
			case 'Orange':
				setButtonState(e, 130, 1);
				actionButtonState = 130;
				break;
			
			case 'Pineapple':
				setButtonState(e, 131, 1);
				actionButtonState = 131;
				break;
			
			case 'Pomegranate':
				setButtonState(e, 132, 1);
				actionButtonState = 132;
				break;
			
			case 'Watermelon':
				setButtonState(e, 133, 1);
				actionButtonState = 133;
				break;
			
			//Lunch menu is same as dinner: check one set up
		
			//Fruit
			case 'Biscuits':
				setButtonState(e, 134, 1);
				actionButtonState = 134;
				break;
			
			case 'Chats':
				setButtonState(e, 135, 1);
				actionButtonState = 135;
				break;
			
			case 'Chocolate':
				setButtonState(e, 136, 1);
				actionButtonState = 136;
				break;
			
			case 'IceCream':
				setButtonState(e, 137, 1);
				actionButtonState = 137;
				break;
			
			case 'NonVeg':
				setButtonState(e, 138, 1);
				actionButtonState = 138;
				break;
			
			case 'Noodles':
				setButtonState(e, 139, 1);
				actionButtonState = 139;
				break;
			
			case 'Pasteries':
				setButtonState(e, 140, 1);
				actionButtonState = 140;
				break;
			
			case 'Sweets':
				setButtonState(e, 141, 1);
				actionButtonState = 141;
				break;
			
			case 'Wafers':
				setButtonState(e, 142, 1);
				actionButtonState = 142;
				break;

		//Play
			case 'Music':
				setButtonState(e, 143, musicButtons);
				actionButtonState = 143;
				break;
			
			case 'OutdoorGames':
				setButtonState(e, 144, outdoorGamesButtons);
				actionButtonState = 144;
				break;
			
			case 'Puzzles':
				setButtonState(e, 145, 1);
				actionButtonState = 145;
				break;
			
			case 'Toys':
				setButtonState(e, 146, toysButtons);
				actionButtonState = 146;
				break;
			
			case 'TV':
				setButtonState(e, 147, tvButtons);
				actionButtonState = 147;
				break;
			
			case 'VideoGames':
				setButtonState(e, 148, 1);
				actionButtonState = 148;
				break;

			//Music
			case 'ChangeMusic':
				setButtonState(e, 149, 1);
				actionButtonState = 149;
				break;
			
			case 'LetsDance':
				setButtonState(e, 150, 1);
				actionButtonState = 150;
				break;
			
			case 'VolumeUp':
				setButtonState(e, 151, 1);
				actionButtonState = 151;
				break;
			
			case 'VolumeDown':
				setButtonState(e, 152, 1);
				actionButtonState = 152;
				break;
			
			//Outdoor Games
			case 'Cars':
				setButtonState(e, 153, 1);
				actionButtonState = 153;
				break;
			
			case 'Garden':
				setButtonState(e, 154, 1);
				actionButtonState = 154;
				break;
			
			case 'Swing':
				setButtonState(e, 155, 1);
				actionButtonState = 155;
				break;
			
			case 'Terrace':
				setButtonState(e, 156, 1);
				actionButtonState = 156;
				break;
			
			case 'Walk':
				setButtonState(e, 157, 1);
				actionButtonState = 157;
				break;
			
			//Toys
			case 'Cars':
				setButtonState(e, 158, 1);
				actionButtonState = 158;
				break;
			
			case 'ActionFigures':
				setButtonState(e, 159, 1);
				actionButtonState = 159;
				break;
			
			case 'PlayWithMe':
				setButtonState(e, 160, 1);
				actionButtonState = 160;
				break;
			
			case 'SoftToys':
				setButtonState(e, 161, 1);
				actionButtonState = 161;
				break;

			//TV
			case 'NextChannel':
				setButtonState(e, 162, 1);
				actionButtonState = 162;
				break;
			
			case 'PreviousChannel':
				setButtonState(e, 163, 1);
				actionButtonState = 163;
				break;
			
			case 'VolumeUp':
				setButtonState(e, 164, 1);
				actionButtonState = 164;
				break;
			
			case 'VolumeDown':
				setButtonState(e, 165, 1);
				actionButtonState = 165;
				break;
				
			//Video Games

			//People
			case 'Dad':
				setButtonState(e, 166, 1);
				actionButtonState = 166;
				break;
			
			case 'Mom':
				setButtonState(e, 167, 1);
				actionButtonState = 167;
				break;
			
			case 'Brother':
				setButtonState(e, 168, 1);
				actionButtonState = 168;
				break;
			
			case 'Sister':
				setButtonState(e, 169, 1);
				actionButtonState = 169;
				break;
			
			case 'Friends':
				setButtonState(e, 170, 1);
				actionButtonState = 170;
				break;
			
			case 'Teacher':
				setButtonState(e, 171, 1);
				actionButtonState = 171;
				break;
			
			case 'Nurse':
				setButtonState(e, 172, 1);
				actionButtonState = 172;
				break;
			
			case 'Doctor':
				setButtonState(e, 173, 1);
				actionButtonState = 173;
				break;

		//Others Button
			case 'Clothes':
				setButtonState(e, 174, clothesButtons);
				actionButtonState = 174;
				break;
			
			case 'Emergency':
				setButtonState(e, 175, emergencyButtons);
				actionButtonState = 175;
				break;
			
			case 'Hygiene':
				setButtonState(e, 176, hygieneButtons);
				actionButtonState = 176;
				break;
			
			case 'School':
				setButtonState(e, 177, schoolButtons);
				actionButtonState = 177;
				break;
			
			case 'Sleep':
				setButtonState(e, 178, sleepButtons);
				actionButtonState = 178;
				break;
			
			case 'Time':
				setButtonState(e, 179, timeButtons);
				actionButtonState = 179;
				break;

			//Clothes
			case 'ChangeFootwear':
				setButtonState(e, 180, 1);
				actionButtonState = 180;
				break;
			
			case 'ChangeInnerwear':
				setButtonState(e, 181, 1);
				actionButtonState = 181;
				break;
			
			case 'ChangeJeans':
				setButtonState(e, 182, 1);
				actionButtonState = 182;
				break;
			
			case 'ChangeTShirt':
				setButtonState(e, 183, 1);
				actionButtonState = 183;
				break;
			
			case 'WearNightClothes':
				setButtonState(e, 184, 1);
				actionButtonState = 184;
				break;
			
			//Emergency
			case 'Bandage':
				setButtonState(e, 185, 1);
				actionButtonState = 185;
				break;
			
			case 'Help':
				setButtonState(e, 186, 1);
				actionButtonState = 186;
				break;
			
			case 'Medicine':
				setButtonState(e, 187, 1);
				actionButtonState = 17;
				break;
			
			//Hygiene
			case 'Bath':
				setButtonState(e, 188, 1);
				actionButtonState = 188;
				break;
			
			case 'Brush':
				setButtonState(e, 189, 1);
				actionButtonState = 189;
				break;
			
			case 'Facewash':
				setButtonState(e, 190, 1);
				actionButtonState = 190;
				break;
			
			case 'Toilet':
				setButtonState(e, 191, 1);
				actionButtonState = 11;
				break;
			
			case 'Vomit':
				setButtonState(e, 192, 1);
				actionButtonState = 192;
				break;
			
			//School
			case 'Bag':
				setButtonState(e, 193, 1);
				actionButtonState = 193;
				break;
			
			case 'Books':
				setButtonState(e, 194, 1);
				actionButtonState = 194;
				break;
			
			case 'Bottle':
				setButtonState(e, 195, 1);
				actionButtonState = 195;
				break;
			
			case 'DontWantToGo':
				setButtonState(e, 196, 1);
				actionButtonState = 196;
				break;
			
			case 'HomeWork':
				setButtonState(e, 197, 1);
				actionButtonState = 197;
				break;
			
			//Sleep
			case 'Door':
				setButtonState(e, 198, 1);
				actionButtonState = 198;
				break;
			
			case 'Fan':
				setButtonState(e, 199, 1);
				actionButtonState = 199;
				break;
			
			case 'FeelingCold':
				setButtonState(e, 200, 1);
				actionButtonState = 200;
				break;
			
			case 'FeelingWarm':
				setButtonState(e, 201, 1);
				actionButtonState = 201;
				break;
			
			case 'Light':
				setButtonState(e, 202, 1);
				actionButtonState = 202;
				break;
			
			case 'Window':
				setButtonState(e, 203, 1);
				actionButtonState = 203;
				break;
			
			//Time
			case 'Afternoon':
				setButtonState(e, 204, 1);
				actionButtonState = 204;
				break;
			
			case 'CurrentTime':
				setButtonState(e, 205, 1);
				actionButtonState = 205;
				break;
			
			case 'Evening':
				setButtonState(e, 206, 1);
				actionButtonState = 206;
				break;
			
			case 'Morning':
				setButtonState(e, 207, 1);
				actionButtonState = 207;
				break;
			
			case 'Night':
				setButtonState(e, 208, 1);
				actionButtonState = 208;
				break;
			
			case 'Tomorrow':
				setButtonState(e, 209, 1);
				actionButtonState = 209;
				break;
			
			case 'Yesterday':
				setButtonState(e, 210, 1);
				actionButtonState = 210;
				break;
				
			case 'goHome':
				setButtonState(e, 0, homeButtons);
				actionButtonState = 0;
				break;
			
			default:
				//do nothing
		}
		
	}
	
	//var whichView = e.source.title;
	//If No actions are selected
	if(actionButtonState == null){
		
		if(mainButtonState == 1){
			//Like: First Sound
			audio = getAudioFile('media/home/like.mp3');

		} else if(mainButtonState == 2){
			//Like: Second Sound
			audio = getAudioFile('media/home/reallyLike.mp3');
			
		} else if(mainButtonState == 4){
			//DontLike: Second Sound
			audio = getAudioFile('media/home/dontLike.mp3');
			
		} else if(mainButtonState == 5){
			//DontLike: Second Sound
			audio = getAudioFile('media/home/reallyDontLike.mp3');

		} else if(mainButtonState == 7){
			//DontLike: Second Sound
			audio = getAudioFile('media/home/yes.mp3');

		} else if(mainButtonState == 8){
			//DontLike: Second Sound
			audio = getAudioFile('media/home/reallyYes.mp3');
			
		} else if(mainButtonState == 10){
			//DontLike: Second Sound
			audio = getAudioFile('media/home/no.mp3');

		} else if(mainButtonState == 11){
			//DontLike: Second Sound
			audio = getAudioFile('media/home/reallyNo.mp3');
			
		} else if(mainButtonState == 13){
			//DontLike: Second Sound
			audio = getAudioFile('media/home/more.mp3');
			
		} else if(mainButtonState == 14){
			//DontLike: Second Sound
			audio = getAudioFile('media/home/reallyMore.mp3');
			
		} else if(mainButtonState == 16){
			//DontLike: Second Sound
			audio = getAudioFile('media/home/less.mp3');
			
		} else if(mainButtonState == 17){
			//DontLike: Second Sound
			audio = getAudioFile('media/home/reallyLess.mp3');
			
		} else {
			//Don't play audio
			var play = 0;
		}
		
		if(play != 0){
			audio.play(); //Play Audio
			play = 1;
		}
	} else {
		//Action button is on
		
		if(actionButtonState == 0){
			//Home button sound
			audio = getAudioFile('media/home/Home.mp3');

		} else if(actionButtonState == 19){
			//If 'Learning'
			soundPath('media/home/learning.mp3');
		} else if (actionButtonState == 20){
			//If 'Eating'
			soundPath('media/home/eating.mp3');
		} else if (actionButtonState == 21){
			//If 'Play'
			soundPath('media/home/play.mp3');
		} else if (actionButtonState == 22){
			//If 'People'
			soundPath('media/home/people.mp3');
		} else if (actionButtonState == 23){
			//If 'Other'
			soundPath('media/home/others.mp3');
		} else if (actionButtonState == 24){
			//If 'Animals'
			soundPath('media/learning/animals.mp3');
		} else if (actionButtonState == 25){
			//If 'Body'
			soundPath('media/learning/body.mp3');
		} else if (actionButtonState == 26){
			//If 'Books'
			soundPath('media/learning/book.mp3');
		} else if (actionButtonState == 27){
			//If 'Color'
			soundPath('media/learning/colors.mp3');
		} else if (actionButtonState == 28){
			//If 'Homeobject'
			soundPath('media/learning/homeobjects.mp3');
		} else if (actionButtonState == 29){
			//If 'Shape'
			soundPath('media/learning/shapes.mp3');
		} else if (actionButtonState == 30){
			//If 'Stationery'
			soundPath('media/learning/stationery.mp3');
		} else if (actionButtonState == 31){
			//If 'Ant'
			soundPath('media/learning/animals/ants.mp3');
		} else if (actionButtonState == 32){
			//If 'Cat'
			soundPath('media/learning/animals/cat.mp3');
		} else if (actionButtonState == 33){
			//If 'Cockroach'
			soundPath('media/learning/animals/cockroaches.mp3');
		} else if (actionButtonState == 34){
			//If 'Dog'
			soundPath('media/learning/animals/dog.mp3');
		} else if (actionButtonState == 35){
			//If 'Fly'
			soundPath('media/learning/animals/flies.mp3');
		} else if (actionButtonState == 36){
			//If 'Mosquito'
			soundPath('media/learning/animals/mosquito.mp3');
		} else if (actionButtonState == 37){
			//If 'Ears'
			soundPath('media/learning/body/ears.mp3');
		} else if (actionButtonState == 38){
			//If 'Eyes'
			soundPath('media/learning/body/eyes.mp3');
		} else if (actionButtonState == 39){
			//If 'Fingers'
			soundPath('media/learning/body/fingers.mp3');
		} else if (actionButtonState == 40){
			//If 'Hair'
			soundPath('media/learning/body/hair.mp3');
		} else if (actionButtonState == 41){
			//If 'Hand'
			soundPath('media/learning/body/hands.mp3');
		} else if (actionButtonState == 42){
			//If 'Head'
			soundPath('media/learning/body/head.mp3');
		} else if (actionButtonState == 43){
			//If 'Legs'
			soundPath('media/learning/body/legs.mp3');
		} else if (actionButtonState == 44){
			//If 'Mouth'
			soundPath('media/learning/body/mouth.mp3');
		} else if (actionButtonState == 45){
			//If 'Stomach'
			soundPath('media/learning/body/stomach.mp3');
		} else if (actionButtonState == 46){
			//If 'BedTimeStories'
			soundPath('media/learning/books/BedTimeStories.mp3');
		} else if (actionButtonState == 47){
			//If 'Comics'
			soundPath('media/learning/books/Comics.mp3');
		} else if (actionButtonState == 48){
			//If 'DrawingBook'
			soundPath('media/learning/books/DrawingBook.mp3');
		} else if (actionButtonState == 49){
			//If 'Maths'
			soundPath('media/learning/books/Maths.mp3');
		} else if (actionButtonState == 50){
			//If 'RhymesBook'
			soundPath('media/learning/books/RhymesBook.mp3');
		} else if (actionButtonState == 51){
			//If 'SchoolNotebook'
			soundPath('media/learning/books/SchoolNotebook.mp3');
		} else if (actionButtonState == 52){
			//If 'Words'
			soundPath('media/learning/books/Words.mp3');
		
		} else if (actionButtonState == 53){
			//If 'Black'
			soundPath('media/learning/colors/Black.mp3');
		} else if (actionButtonState == 54){
			//If 'Blue'
			soundPath('media/learning/colors/Blue.mp3');
		} else if (actionButtonState == 55){
			//If 'Brown'
			soundPath('media/learning/colors/Brown.mp3');
		} else if (actionButtonState == 56){
			//If 'Golden'
			soundPath('media/learning/colors/Golden.mp3');
		} else if (actionButtonState == 57){
			//If 'Green'
			soundPath('media/learning/colors/Green.mp3');
		} else if (actionButtonState == 58){
			//If 'Red'
			soundPath('media/learning/colors/Red.mp3');
		} else if (actionButtonState == 59){
			//If 'Silver'
			soundPath('media/learning/colors/Silver.mp3');
		} else if (actionButtonState == 60){
			//If 'White'
			soundPath('media/learning/colors/White.mp3');
		} else if (actionButtonState == 61){
			//If 'Yellow'
			soundPath('media/learning/colors/Yellow.mp3');
		} else if (actionButtonState == 62){
			//If 'Chair'
			soundPath('media/learning/homeobjects/Chair.mp3');
		} else if (actionButtonState == 63){
			//If 'Door'
			soundPath('media/learning/homeobjects/Door.mp3');
		} else if (actionButtonState == 64){
			//If 'Fan'
			soundPath('media/learning/homeobjects/Fan.mp3');
		} else if (actionButtonState == 65){
			//If 'Kitchen'
			soundPath('media/learning/homeobjects/Kitchen.mp3');
		} else if (actionButtonState == 66){
			//If 'Sofa'
			soundPath('media/learning/homeobjects/Sofa.mp3');
		} else if (actionButtonState == 67){
			//If 'Table'
			soundPath('media/learning/homeobjects/Table.mp3');
		} else if (actionButtonState == 68){
			//If 'Toilet'
			soundPath('media/learning/homeobjects/Toilet.mp3');
		} else if (actionButtonState == 69){
			//If 'Window'
			soundPath('media/learning/homeobjects/Window.mp3');
		} else if (actionButtonState == 70){
			//If 'Circle'
			soundPath('media/learning/shapes/Circle.mp3');
		} else if (actionButtonState == 71){
			//If 'FreeForm'
			soundPath('media/learning/shapes/FreeForm.mp3');
		} else if (actionButtonState == 72){
			//If 'Line'
			soundPath('media/learning/shapes/Line.mp3');
		} else if (actionButtonState == 73){
			//If 'Rectangle'
			soundPath('media/learning/shapes/Rectangle.mp3');
		} else if (actionButtonState == 74){
			//If 'Square'
			soundPath('media/learning/shapes/Square.mp3');
		} else if (actionButtonState == 75){
			//If 'Triangle'
			soundPath('media/learning/shapes/Triangle.mp3');
		} else if (actionButtonState == 76){
			//If 'BlankPaper'
			soundPath('media/learning/stationery/BlankPaper.mp3');
		} else if (actionButtonState == 77){
			//If 'ColoredPaper'
			soundPath('media/learning/stationery/ColoredPaper.mp3');
		} else if (actionButtonState == 78){
			//If 'Crayons'
			soundPath('media/learning/stationery/Crayons.mp3');
		} else if (actionButtonState == 79){
			//If 'Eraser'
			soundPath('media/learning/stationery/Eraser.mp3');
		} else if (actionButtonState == 80){
			//If 'Pen'
			soundPath('media/learning/stationery/Pen.mp3');
		} else if (actionButtonState == 81){
			//If 'Pencil'
			soundPath('media/learning/stationery/Pencil.mp3');
		} else if (actionButtonState == 82){
			//If 'Pouch'
			soundPath('media/learning/stationery/Pouch.mp3');
		} else if (actionButtonState == 83){
			//If 'Scale'
			soundPath('media/learning/stationery/Scale.mp3');
		} else if (actionButtonState == 84){
			//If 'Sharpener'
			soundPath('media/learning/stationery/Sharpener.mp3');
		} else if (actionButtonState == 85){
			//If 'AddOns'
			soundPath('media/eating/AddOns.mp3');
		} else if (actionButtonState == 86){
			//If 'Beverages'
			soundPath('media/eating/Beverages.mp3');
		} else if (actionButtonState == 87){
			//If 'Breakfast'
			soundPath('media/eating/Breakfast.mp3');
		} else if (actionButtonState == 88){
			//If 'Cutlery'
			soundPath('media/eating/Cutlery.mp3');
		} else if (actionButtonState == 89){
			//If 'Dinner'
			soundPath('media/eating/Dinner.mp3');
		} else if (actionButtonState == 90){
			//If 'Fruit'
			soundPath('media/eating/Fruits.mp3');
		} else if (actionButtonState == 91){
			//If 'Lunch'
			soundPath('media/eating/Lunch.mp3');
		} else if (actionButtonState == 92){
			//If 'Snacks'
			soundPath('media/eating/Snack.mp3');
		} else if (actionButtonState == 93){
			//If 'Butter'
			soundPath('media/eating/addon/Butter.mp3');
		} else if (actionButtonState == 94){
			//If 'Jam'
			soundPath('media/eating/addon/Jam.mp3');
		} else if (actionButtonState == 95){
			//If 'Masala'
			soundPath('media/eating/addon/Masala.mp3');
		} else if (actionButtonState == 96){
			//If 'Pepper'
			soundPath('media/eating/addon/Pepper.mp3');
		} else if (actionButtonState == 97){
			//If 'Pickle'
			soundPath('media/eating/addon/Pickle.mp3');
		} else if (actionButtonState == 98){
			//If 'Salt'
			soundPath('media/eating/addon/Salt.mp3');
		} else if (actionButtonState == 99){
			//If 'Sauce'
			soundPath('media/eating/addon/Sauce.mp3');
		} else if (actionButtonState == 100){
			//If 'Sugar'
			soundPath('media/eating/addon/Sugar.mp3');
		} else if (actionButtonState == 101){
			//If 'Juice'
			soundPath('media/eating/beverage/Juice.mp3');
		} else if (actionButtonState == 102){
			//If 'Milk'
			soundPath('media/eating/beverage/Milk.mp3');
		} else if (actionButtonState == 103){
			//If 'Milkshake'
			soundPath('media/eating/beverage/MilkShakes.mp3');
		} else if (actionButtonState == 104){
			//If 'Tea'
			soundPath('media/eating/beverage/Tea.mp3');
		} else if (actionButtonState == 105){
			//If 'Bread'
			soundPath('media/eating/breakfast/Bread.mp3');
		} else if (actionButtonState == 106){
			//If 'Cornflakes'
			soundPath('media/eating/breakfast/Cornflakes.mp3');
		} else if (actionButtonState == 107){
			//If 'Eggs'
			soundPath('media/eating/breakfast/Eggs.mp3');
		} else if (actionButtonState == 108){
			//If 'Milk'
			soundPath('media/eating/breakfast/Milk.mp3');
		} else if (actionButtonState == 109){
			//If 'Porridge'
			soundPath('media/eating/breakfast/Porridge.mp3');
		} else if (actionButtonState == 110){
			//If 'Rice'
			soundPath('media/eating/breakfast/Rice.mp3');
		} else if (actionButtonState == 111){
			//If 'Bowl'
			soundPath('media/eating/cutlery/Bowl.mp3');		//Eating>Cutlery
		} else if (actionButtonState == 112){
			//If 'Fork'
			soundPath('media/eating/cutlery/Fork.mp3');
		} else if (actionButtonState == 113){
			//If 'Glass'
			soundPath('media/eating/cutlery/Glass.mp3');
		} else if (actionButtonState == 114){
			//If 'Knife'
			soundPath('media/eating/cutlery/Knife.mp3');
		} else if (actionButtonState == 115){
			//If 'Spoon'
			soundPath('media/eating/cutlery/Spoon.mp3');
		} else if (actionButtonState == 116){
			//If 'Plate'
			soundPath('media/eating/cutlery/Plate.mp3');
		} else if (actionButtonState == 117){
			//If 'Curd'
			soundPath('media/eating/dinner/Curd.mp3');		//Eating>Dinner
		} else if (actionButtonState == 118){
			//If 'Curry'
			soundPath('media/eating/dinner/Curry.mp3');
		} else if (actionButtonState == 119){
			//If 'Dal'
			soundPath('media/eating/dinner/Dal.mp3');
		} else if (actionButtonState == 120){
			//If 'Khichdi'
			soundPath('media/eating/dinner/Khichdi.mp3');
		} else if (actionButtonState == 121){
			//If 'NonVed'
			soundPath('media/eating/dinner/NonVeg.mp3');
		} else if (actionButtonState == 122){
			//If 'Pizza'
			soundPath('media/eating/dinner/Pizza.mp3');
		} else if (actionButtonState == 123){
			//If 'Rice'
			soundPath('media/eating/dinner/Rice.mp3');
		} else if (actionButtonState == 124){
			//If 'Roti'
			soundPath('media/eating/dinner/Roti.mp3');
		} else if (actionButtonState == 125){
			//If 'Apple'
			soundPath('media/eating/fruit/Apple.mp3');		//Eating>Fruits
		} else if (actionButtonState == 126){
			//If 'Banana'
			soundPath('media/eating/fruit/Banana.mp3');
		} else if (actionButtonState == 127){
			//If 'Grapes'
			soundPath('media/eating/fruit/Grapes.mp3');
		} else if (actionButtonState == 128){
			//If 'Guava'
			soundPath('media/eating/fruit/Guava.mp3');
		} else if (actionButtonState == 129){
			//If 'Mango'
			soundPath('media/eating/fruit/Mango.mp3');
		} else if (actionButtonState == 130){
			//If 'Orange'
			soundPath('media/eating/fruit/Orange.mp3');
		} else if (actionButtonState == 131){
			//If 'Pineapple'
			soundPath('media/eating/fruit/Pineapple.mp3');
		} else if (actionButtonState == 132){
			//If 'Pomogrenate'
			soundPath('media/eating/fruit/Pomogrenate.mp3');
		} else if (actionButtonState == 133){
			//If 'Watermelon'
			soundPath('media/eating/fruit/WaterMelon.mp3');
		} else if (actionButtonState == 134){					//Eating>Lunch (same mene as Dinner), check Lunch Section
			//If 'Biscuits'
			soundPath('media/eating/snack/Biscuits.mp3');		//Eating>Snacks
		} else if (actionButtonState == 135){
			//If 'Chats'
			soundPath('media/eating/snack/Chats.mp3');
		} else if (actionButtonState == 136){
			//If 'Chocolate'
			soundPath('media/eating/snack/Chocolate.mp3');
		} else if (actionButtonState == 137){
			//If 'IceCream'
			soundPath('media/eating/snack/IceCream.mp3');
		} else if (actionButtonState == 138){
			//If 'NonVeg'
			soundPath('media/eating/snack/NonVeg.mp3');
		} else if (actionButtonState == 139){
			//If 'Noodles'
			soundPath('media/eating/snack/Noodles.mp3');
		} else if (actionButtonState == 140){
			//If 'Pastries'
			soundPath('media/eating/snack/Pastries.mp3');
		} else if (actionButtonState == 141){
			//If 'SweetMeals'
			soundPath('media/eating/snack/SweetMeals.mp3');
		} else if (actionButtonState == 142){
			//If 'Wafers'
			soundPath('media/eating/snack/Wafers.mp3');
		} else if (actionButtonState == 143){
			//If 'ChangeMusic'
			soundPath('media/play/Music.mp3');		//Play
		} else if (actionButtonState == 144){
			//If 'LetsDance'
			soundPath('media/play/Outdoor.mp3');
		} else if (actionButtonState == 145){
			//If 'VolumeDown'
			soundPath('media/play/Puzzles.mp3');
		} else if (actionButtonState == 146){
			//If 'VolumeUp'
			soundPath('media/play/Toys.mp3');
		} else if (actionButtonState == 147){
			//If 'Cars'
			soundPath('media/play/TV.mp3');
		} else if (actionButtonState == 148){
			//If 'Garden'
			soundPath('media/play/VideoGames.mp3');
		} else if (actionButtonState == 149){
			//If 'ChangeMusic'
			soundPath('media/play/music/ChangeMusic.mp3');		//Play>Music
		} else if (actionButtonState == 150){
			//If 'LetsDance'
			soundPath('media/play/music/LetsDance.mp3');
		} else if (actionButtonState == 151){
			//If 'VolumeDown'
			soundPath('media/play/music/VolumeDown.mp3');
		} else if (actionButtonState == 152){
			//If 'VolumeUp'
			soundPath('media/play/music/VolumeUp.mp3');
		} else if (actionButtonState == 153){
			//If 'Cars'
			soundPath('media/play/outdoor/Cars.mp3');		//Play>Outdoor Games
		} else if (actionButtonState == 154){
			//If 'Garden'
			soundPath('media/play/outdoor/Garden.mp3');
		} else if (actionButtonState == 155){
			//If 'Swing'
			soundPath('media/play/outdoor/Swing.mp3');
		} else if (actionButtonState == 156){
			//If 'Terrace'
			soundPath('media/play/outdoor/Terrace.mp3');
		} else if (actionButtonState == 157){
			//If 'Walk'
			soundPath('media/play/outdoor/Walk.mp3');
		} else if (actionButtonState == 158){				//Insert Puzzles section here if it has to
			//If 'Cars'
			soundPath('media/play/toys/Cars.mp3');			//Play>Toys
		} else if (actionButtonState == 159){
			//If 'ActionFigure'
			soundPath('media/play/toys/ActionFigure.mp3');
		} else if (actionButtonState == 160){
			//If 'Lets Play'
			soundPath('media/play/toys/LetsPlay.mp3');
		} else if (actionButtonState == 161){
			//If 'Soft Toys'
			soundPath('media/play/toys/SoftToys.mp3');
		} else if (actionButtonState == 162){
			//If 'Cars'
			soundPath('media/play/tv/NextChannel.mp3');		//Play>TV
		} else if (actionButtonState == 163){
			//If 'ActionFigure'
			soundPath('media/play/tv/PrevChannel.mp3');
		} else if (actionButtonState == 164){
			//If 'Lets Play'
			soundPath('media/play/tv/VolumeDown.mp3');
		} else if (actionButtonState == 165){
			//If 'Soft Toys'
			soundPath('media/play/tv/VolumeUp.mp3');
		} else if (actionButtonState == 166){			//Insert Video Games section here if it has to
			//If 'Dad'
			soundPath('media/people/Dad.mp3');			//People
		} else if (actionButtonState == 167){
			//If 'Mom'
			soundPath('media/people/Mom.mp3');
		}  else if (actionButtonState == 168){				
			//If 'Brother'
			soundPath('media/people/Brother.mp3');		
		} else if (actionButtonState == 169){
			//If 'Sister'
			soundPath('media/people/Sister.mp3');
		} else if (actionButtonState == 170){
			//If 'Friend'
			soundPath('media/people/Friends.mp3');
		} else if (actionButtonState == 171){
			//If 'Teacher'
			soundPath('media/people/Teacher.mp3');
		} else if (actionButtonState == 172){
			//If 'Nurse'
			soundPath('media/people/Nurse.mp3');
		} else if (actionButtonState == 173){
			//If 'Doctor'
			soundPath('media/people/Doctor.mp3');
		} else if (actionButtonState == 174){
			//If 'Clothes'
			soundPath('media/others/Clothes.mp3');			//Others
		} else if (actionButtonState == 175){
			//If 'Emergency'
			soundPath('media/others/Emergency.mp3');
		} else if (actionButtonState == 176){
			//If 'Hygiene'
			soundPath('media/others/Hygiene.mp3');
		} else if (actionButtonState == 177){
			//If 'School'
			soundPath('media/others/School.mp3');
		} else if (actionButtonState == 178){
			//If 'Sleep'
			soundPath('media/others/Sleep.mp3');
		} else if (actionButtonState == 179){
			//If 'Time'
			soundPath('media/others/Time.mp3');
		} else if (actionButtonState == 180){
			//If 'Change Footwear'
			soundPath('media/others/clothes/ChangeFootwear.mp3');			//Others>Clothes
		} else if (actionButtonState == 181){
			//If 'Change Innerwear'
			soundPath('media/others/clothes/ChangeInnerwear.mp3');
		} else if (actionButtonState == 182){
			//If 'Change Jeans'
			soundPath('media/others/clothes/ChangeJeans.mp3');
		} else if (actionButtonState == 183){
			//If 'Change T-Shirt'
			soundPath('media/others/clothes/ChangeTShirt.mp3');
		} else if (actionButtonState == 184){
			//If 'Wear Night Clothes'
			soundPath('media/others/emergency/WearNightClothes.mp3');
		} else if (actionButtonState == 185){
			//If 'Bandage'
			soundPath('media/others/clothes/Bandage.mp3');		//Others>Emergency
		} else if (actionButtonState == 186){
			//If 'Help'
			soundPath('media/others/clothes/Help.mp3');
		} else if (actionButtonState == 187){
			//If 'Medicine'
			soundPath('media/others/clothes/Medicine.mp3');
		} else if (actionButtonState == 188){
			//If 'Bath'
			soundPath('media/others/hygiene/Bath.mp3');		//Others>Hygiene
		} else if (actionButtonState == 189){
			//If 'Brush'
			soundPath('media/others/hygiene/Brush.mp3');
		} else if (actionButtonState == 190){
			//If 'FaceWash'
			soundPath('media/others/hygiene/FaceWash.mp3');
		} else if (actionButtonState == 191){
			//If 'Toilet'
			soundPath('media/others/hygiene/Toilet.mp3');
		} else if (actionButtonState == 192){
			//If 'Toilet'
			soundPath('media/others/hygiene/Vomit.mp3');
		} else if (actionButtonState == 193){
			//If 'Bag'
			soundPath('media/others/school/Bag.mp3');		//Others>School
		} else if (actionButtonState == 194){
			//If 'Books'
			soundPath('media/others/school/Books.mp3');
		} else if (actionButtonState == 195){
			//If 'Bottle'
			soundPath('media/others/school/Bottle.mp3');
	/*	} else if (actionButtonState == 196){
			//If 'Homework'
			soundPath('media/others/school/DontWantToGo.mp3'); */
		} else if (actionButtonState == 197){
			//If 'Homework'
			soundPath('media/others/school/Homework.mp3');
		} else if (actionButtonState == 198){
			//If 'Door'
			soundPath('media/others/sleep/Door.mp3');		//Others>Sleep
		} else if (actionButtonState == 199){
			//If 'Fan'
			soundPath('media/others/sleep/Fan.mp3');
		} else if (actionButtonState == 200){
			//If 'Feeling Cold'
			soundPath('media/others/sleep/FeelingCold.mp3');
		} else if (actionButtonState == 201){
			//If 'Feeling Warm'
			soundPath('media/others/sleep/FeelingWarm.mp3');
		} else if (actionButtonState == 202){
			//If 'Light'
			soundPath('media/others/sleep/Light.mp3');
		} else if (actionButtonState == 203){
			//If 'Window'
			soundPath('media/others/sleep/Window.mp3');
		} else if (actionButtonState == 204){
			//If 'Afternoon'
			soundPath('media/others/time/Afternoon.mp3');		//Others>Time
		} else if (actionButtonState == 205){
			//If 'Current Time'
			soundPath('media/others/time/WhatIsTheTime.mp3');
		} else if (actionButtonState == 206){
			//If 'Evening'
			soundPath('media/others/time/Evening.mp3');
		} else if (actionButtonState == 207){
			//If 'Morning'
			soundPath('media/others/time/Morning.mp3');
		} else if (actionButtonState == 208){
			//If 'Night'
			soundPath('media/others/time/Night.mp3');
		} else if (actionButtonState == 209){
			//If 'Tomorrow'
			soundPath('media/others/time/Tomorrow.mp3');
		} else if (actionButtonState == 210){
			//If 'Yesterday'
			soundPath('media/others/time/Yesterday.mp3');
		}
	}
	
})

/* Button creation function */
function createButtons(data){
	
	var height = 20, leftMargin = 20, counter = 1, set = true, tempWidth = 0;
	
	for (var i = 0; i < data.length; i++){
		
		if(leftMargin+120 > detectedWidth-220){
			//Start adding buttons on a new Row
			height = 20+90*counter+20*counter;		//Distance from top where icons should be
			
			//Get total width
			if(set){
				tempWidth = leftMargin;
				set = false;
			}
			
			leftMargin = 20;						//Reset LeftMargin
		}
		
		//Creating each button
		btn[i]  = Titanium.UI.createImageView({
			image:  data[i].path,
			height: 90,
			width: 90,
			top: height,
			left: leftMargin,
			title : data[i].title,
			type: 'action',
			value: 1
		});
		
		//Margin from Left: 120 for 100px width for image button + 20px margin-left
		leftMargin += 120;
		
		btn[i].addEventListener('click',changeState);
		
		//Calculating to put centerButtons within the center of the ScrollView 
		centerButtons.left = 110+20+((detectedWidth-220-tempWidth-20)/2);
		centerButtons.width = tempWidth;

		Ti.API.info(110+20+((detectedWidth-220-tempWidth-20)/2));
		//Adding the buttons to the center view
		centerButtons.add(btn[i]);
	}
	centerButtons.height = height +150;
	
	//Scroll to top
	scrollView.setContentOffset({x:0 ,y:0});
	
}

//Create the Main Buttons
function createMainButtons(data){
	/* Generate Main Buttons */
	for (var i = 0; i < data.length; i++){
		
		//Set button margin as per its position: left or right
		marginLeft = 20;
		if (i%2 == 0){
			marginTop = 40+70*i;
		}
		
		//Creating each button
		mainBtn[i]  = Titanium.UI.createImageView({
			_id: i,
			image:  data[i].path,
			left: marginLeft,
			height: 70,
			width: 70,
			top: marginTop,
			title: data[i].title,
			type: 'main',
			value: 1
		});
		
		//Changing state for main Buttons (separated from action buttons as Main buttons have 3 states while action buttons have 2)
		mainBtn[i].addEventListener('click',changeMainBtnState);
		
		if(i%2 == 0){
			mainHolderLeft.add(mainBtn[i]);
		} else {
			mainHolderRight.add(mainBtn[i]);
		}
		
	}
}

//Function to generate sound for each buttons
function soundPath(path){
	//global mainButtonState;
	//global actionButtonState;
	
	if(mainButtonState == 1){
				
		var audio = Ti.Media.createSound({
			url: 'media/emotion/ILike.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path //'media/home/learning.mp3'
				})
				
				action.play();
			});
		
		audio.play(); //Play Audio
		
	} else if (mainButtonState == 2){

		var audio = Ti.Media.createSound({
			url: 'media/emotion/IReallyLike.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path //'media/home/learning.mp3'
				})
				
				action.play();
			});
			
			mainButtonState = null;
		
		audio.play(); //Play Audio
		
		
	} else if (mainButtonState == 4){
		
		var audio = Ti.Media.createSound({
			url: 'media/emotion/IDontLike.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path //'media/home/learning.mp3'
				})
				
				action.play();
			});
			
			mainButtonState = null;
		
		audio.play(); //Play Audio

	} else if (mainButtonState == 5){
		
		var audio = Ti.Media.createSound({
			url: 'media/emotion/IReallyDontLike.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path //'media/home/learning.mp3'
				})
				
				action.play();
			});
			
			mainButtonState = null;
		
		audio.play(); //Play Audio

	} else if (mainButtonState == 7){
		
		var audio = Ti.Media.createSound({
			url: 'media/emotion/IWant.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path 
				})
				
				action.play();
			});
			
			mainButtonState = null;
		
		audio.play(); //Play Audio

	} else if (mainButtonState == 8){
		
		var audio = Ti.Media.createSound({
			url: 'media/emotion/IReallyWant.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path 
				})
				
				action.play();
			});
			
			mainButtonState = null;
		
		audio.play(); //Play Audio

	} else if (mainButtonState == 10){
		
		var audio = Ti.Media.createSound({
			url: 'media/emotion/IDontWant.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path //'media/home/learning.mp3'
				})
				
				action.play();
			});
			
			mainButtonState = null;
		
		audio.play(); //Play Audio

	} else if (mainButtonState == 11){
		
		var audio = Ti.Media.createSound({
			url: 'media/emotion/IReallyDontWant.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path 
				})
				
				action.play();
			});
			
			mainButtonState = null;
		
		audio.play(); //Play Audio

	} else if (mainButtonState == 13){
		
		var audio = Ti.Media.createSound({
			url: 'media/emotion/IWantMore.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path 
				})
				
				action.play();
			});
			
			mainButtonState = null;
		
		audio.play(); //Play Audio

	} else if (mainButtonState == 14){
		
		var audio = Ti.Media.createSound({
			url: 'media/emotion/IWantMuchMore.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path 
				})
				
				action.play();
			});
			
			mainButtonState = null;
		
		audio.play(); //Play Audio

	} else if (mainButtonState == 16){
		
		var audio = Ti.Media.createSound({
			url: 'media/emotion/IWantLess.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path 
				})
				
				action.play();
			});
			
			mainButtonState = null;
		
		audio.play(); //Play Audio

	} else if (mainButtonState == 17){
		
		var audio = Ti.Media.createSound({
			url: 'media/emotion/IWantMuchLess.mp3'
		})
		
		audio.addEventListener('complete', function(e){
				var action = Ti.Media.createSound({
					url: path 
				})
				
				action.play();
			});
			
			mainButtonState = null;
		
		audio.play(); //Play Audio

	} else if (mainButtonState == null){
		var audio = Ti.Media.createSound({
			url: path 
		})
		audio.play(); //Play Audio
	}
}

function removeAllChildren(viewObject){
    //copy array of child object references because view's "children" property is live collection of child object references
    var children = viewObject.children.slice(0);
 
    for (var i = 0; i < children.length; ++i) {
        viewObject.remove(children[i]);
    }
}

function setButtonState(button, buttonNo, nextLevelButtons){
	
	if(buttonNo == 0){

		//Go to Home
		//Refactor the following codes as its the same as the temp == 2
			
			//Emptying Button names array
			btn.length = 0;
			mainButtonState = null;
			
			if(nextLevelButtons != 1){
				//Load inner page
				removeAllChildren(centerButtons);
				createButtons(nextLevelButtons);
				
				//Meaning new page/button has been loaded
				inside = true;	
			}

		temp = 1;
	} else {
		if(temp == 1){
			temp = 2;
		} else if (temp == 2){
			
			if(actionButtonState == buttonNo){
				//Emptying Button names array
				btn.length = 0;
				mainButtonState = null;
				
				if(nextLevelButtons != 1){
					//Load inner page
					removeAllChildren(centerButtons);
					createButtons(nextLevelButtons);
					
					//Meaning new page/button has been loaded
					inside = true;	
				}
			}
			
			temp = 1;
		}
	}
	
	
	if(inside){
		actionButtonState = null;
	} else {
		actionButtonState = buttonNo;
		inside = false;
	}

}

//Changing the state of the clicked button
function changeState(e){
    //Changing active button background to Grey
    //e.source.backgroundColor = '#C1C1C1';
    var whichBtn;
	//Title of the button
	whichBtn = e.source.title;
    
    //if(e.source.value == 1){
    	
		//Button state glow change
		if(whichBtn == 'Learning'){
			Ti.API.info("Inside Learning")
			e.source.image = 'images/home/state1/learning.png';
		} else if(whichBtn == 'Eating'){
			e.source.image = 'images/home/state1/eating.png';
		} else if(whichBtn == 'Play'){	
			e.source.image = 'images/home/state1/playing.png';
		} else if(whichBtn == 'People'){	
			e.source.image = 'images/home/state1/people.png';
		} else if(whichBtn == 'Other'){	
			e.source.image = 'images/home/state1/others.png';			//HomeButtons Ends
		} else if(whichBtn == 'AddOns'){
			e.source.image = 'images/eating/state1/addons.png';
		} else if(whichBtn == 'Beverages'){
			e.source.image = 'images/eating/state1/beverages.png';
		} else if(whichBtn == 'Breakfast'){	
			e.source.image = 'images/eating/state1/breakfast.png';
		} else if(whichBtn == 'Cutlery'){	
			e.source.image = 'images/eating/state1/cutlery.png';
		} else if(whichBtn == 'Dinner'){	
			e.source.image = 'images/eating/state1/dinner.png';
		} else if(whichBtn == 'Fruit'){	
			e.source.image = 'images/eating/state1/fruits.png';
		} else if(whichBtn == 'Lunch'){	
			e.source.image = 'images/eating/state1/lunch.png';
		} else if(whichBtn == 'Snacks'){	
			e.source.image = 'images/eating/state1/snacks.png';			//Eating Buttons Ends
		} else if(whichBtn == 'Butter'){
			e.source.image = 'images/eating/addons/state1/butter.png';
		} else if(whichBtn == 'Jam'){	
			e.source.image = 'images/eating/addons/state1/jam.png';
		} else if(whichBtn == 'Masala'){	
			e.source.image = 'images/eating/addons/state1/masala.png';
		} else if(whichBtn == 'Pepper'){	
			e.source.image = 'images/eating/addons/state1/pepper.png';
		} else if(whichBtn == 'Pickle'){	
			e.source.image = 'images/eating/addons/state1/pickle.png';
		} else if(whichBtn == 'Salt'){	
			e.source.image = 'images/eating/addons/state1/salt.png';
		} else if(whichBtn == 'Sauce'){	
			e.source.image = 'images/eating/addons/state1/sauce.png';
		} else if(whichBtn == 'Sugar'){	
			e.source.image = 'images/eating/addons/state1/sugar.png';	//AddOns end
		} else if(whichBtn == 'Juice'){	
			e.source.image = 'images/eating/beverages/state1/juice.png';
		} else if(whichBtn == 'Milk'){	
			e.source.image = 'images/eating/beverages/state1/milk.png';
		}  else if(whichBtn == 'Milkshake'){	
			e.source.image = 'images/eating/beverages/state1/milkshake.png';
		} else if(whichBtn == 'Tea'){	
			e.source.image = 'images/eating/breakfast/state1/tea.png';	//Beverages end
		} else if(whichBtn == 'Bread'){	
			e.source.image = 'images/eating/breakfast/state1/bread.png';
		} else if(whichBtn == 'Cornflakes'){	
			e.source.image = 'images/eating/breakfast/state1/cornflakes.png';	
		} else if(whichBtn == 'Eggs'){	
			e.source.image = 'images/eating/breakfast/state1/eggs.png';
		} else if(whichBtn == 'Porridge'){										//Milk removes as same is there in beverage
			e.source.image = 'images/eating/breakfast/state1/porridge.png';
		} else if(whichBtn == 'Rice'){	
			e.source.image = 'images/eating/breakfast/state1/rice.png';		//Breakfast ends
		} else if(whichBtn == 'Bowl'){	
			e.source.image = 'images/eating/cutlery/state1/bowl.png';	
		} else if(whichBtn == 'Fork'){	
			e.source.image = 'images/eating/cutlery/state1/fork.png';
		} else if(whichBtn == 'Glass'){	
			e.source.image = 'images/eating/cutlery/state1/glass.png';	
		} else if(whichBtn == 'Knife'){	
			e.source.image = 'images/eating/cutlery/state1/knife.png';
		} else if(whichBtn == 'Plate'){	
			e.source.image = 'images/eating/cutlery/state1/plate.png';
		} else if(whichBtn == 'Spoon'){	
			e.source.image = 'images/eating/cutlery/state1/spoon.png';	//Breakfast ends
		}
		
		else if(whichBtn == 'curd'){	
			e.source.image = 'images/eating/meal/state1/curd.png';
		} else if(whichBtn == 'Curry'){	
			e.source.image = 'images/eating/meal/state1/curry.png';	
		} else if(whichBtn == 'Dal'){	
			e.source.image = 'images/eating/meal/state1/dal.png';	
		} else if(whichBtn == 'Khichdi'){	
			e.source.image = 'images/eating/meal/state1/khichdi.png';
		} else if(whichBtn == 'NonVeg'){	
			e.source.image = 'images/eating/meal/state1/nonveg.png';	
		} else if(whichBtn == 'Pizza'){	
			e.source.image = 'images/eating/meal/state1/pizza.png';
		} else if(whichBtn == 'Rice'){	
			e.source.image = 'images/eating/meal/state1/rice.png';
		} else if(whichBtn == 'Roti'){	
			e.source.image = 'images/eating/meal/state1/roti.png';	//Meal: Lunch/Dinner ends
		}
		
		else if(whichBtn == 'Apple'){	
			e.source.image = 'images/eating/fruits/state1/apple.png';
		} else if(whichBtn == 'Banana'){	
			e.source.image = 'images/eating/fruits/state1/banana.png';	
		} else if(whichBtn == 'Grapes'){	
			e.source.image = 'images/eating/fruits/state1/grapes.png';	
		} else if(whichBtn == 'Guava'){	
			e.source.image = 'images/eating/fruits/state1/guava.png';
		} else if(whichBtn == 'Mango'){	
			e.source.image = 'images/eating/fruits/state1/mango.png';	
		} else if(whichBtn == 'Orange'){	
			e.source.image = 'images/eating/fruits/state1/orange.png';
		} else if(whichBtn == 'Pineapple'){	
			e.source.image = 'images/eating/fruits/state1/pineapple.png';
		} else if(whichBtn == 'Pomegranate'){	
			e.source.image = 'images/eating/fruits/state1/pomegranate.png';
		} else if(whichBtn == 'Watermelon'){	
			e.source.image = 'images/eating/fruits/state1/watermelon.png';	//Fruits ends
		}
		
		else if(whichBtn == 'Biscuits'){	
			e.source.image = 'images/eating/snacks/state1/biscuits.png';
		} else if(whichBtn == 'Chats'){	
			e.source.image = 'images/eating/snacks/state1/chats.png';	
		} else if(whichBtn == 'Chocolate'){	
			e.source.image = 'images/eating/snacks/state1/chocolate.png';	
		} else if(whichBtn == 'IceCream'){	
			e.source.image = 'images/eating/snacks/state1/icecream.png';
		} else if(whichBtn == 'NonVeg'){	
			e.source.image = 'images/eating/snacks/state1/nonveg.png';	
		} else if(whichBtn == 'Noodles'){	
			e.source.image = 'images/eating/snacks/state1/noodles.png';
		} else if(whichBtn == 'Pasteries'){	
			e.source.image = 'images/eating/snacks/state1/pasteries.png';
		} else if(whichBtn == 'Sweets'){	
			e.source.image = 'images/eating/snacks/state1/sweets.png';
		} else if(whichBtn == 'Wafers'){	
			e.source.image = 'images/eating/snacks/state1/wafers.png';	//Snacks ends
		}
		
		 else if(whichBtn == 'Music'){	
			e.source.image = 'images/play/state1/music.png';
		} else if(whichBtn == 'OutdoorGames'){	
			e.source.image = 'images/play/state1/outdoorgames.png';	
		} else if(whichBtn == 'Puzzles'){	
			e.source.image = 'images/play/state1/puzzles.png';
		} else if(whichBtn == 'Toys'){	
			e.source.image = 'images/play/state1/toys.png';
		} else if(whichBtn == 'TV'){	
			e.source.image = 'images/play/state1/tv.png';
		} else if(whichBtn == 'VideoGames'){	
			e.source.image = 'images/play/state1/videogames.png';	//Play buttons ends
		}
		
		 else if(whichBtn == 'ChangeMusic'){	
			e.source.image = 'images/play/music/state1/changemusic.png';
		} else if(whichBtn == 'LetsDance'){	
			e.source.image = 'images/play/music/state1/letsdance.png';
		} else if(whichBtn == 'VolumeUp'){	
			e.source.image = 'images/play/music/state1/volumedown.png';
		} else if(whichBtn == 'VolumeDown'){	
			e.source.image = 'images/play/music/state1/volumeup.png';	//Music ends
		}
		
		 else if(whichBtn == 'Cars'){	
			e.source.image = 'images/play/outdoorgames/state1/cars.png';
		} else if(whichBtn == 'Garden'){	
			e.source.image = 'images/play/outdoorgames/state1/garden.png';
		} else if(whichBtn == 'Swing'){	
			e.source.image = 'images/play/outdoorgames/state1/swing.png';
		} else if(whichBtn == 'Terrace'){	
			e.source.image = 'images/play/outdoorgames/state1/terrace.png';
		} else if(whichBtn == 'Walk'){	
			e.source.image = 'images/play/outdoorgames/state1/walk.png';	//OutDoorGames ends
		}
		
		 else if(whichBtn == 'ActionFigures'){											//"cars" removed as it's already there in OutDoorGames
			e.source.image = 'images/play/toys/state1/actionfigures.png';
		} else if(whichBtn == 'PlayWithMe'){	
			e.source.image = 'images/play/toys/state1/playwithme.png';
		} else if(whichBtn == 'SoftToys'){	
			e.source.image = 'images/play/toys/state1/softtoys.png';	//Toys ends
		}
		
		 else if(whichBtn == 'NextChannel'){	
			e.source.image = 'images/play/tv/state1/garden.png';		//Volume "Up/Down" removed as it's already there in Music
		} else if(whichBtn == 'PreviousChannel'){	
			e.source.image = 'images/play/tv/state1/swing.png';		//OutDoorGames ends
		}
		
		 else if(whichBtn == 'Dad'){	
			e.source.image = 'images/people/state1/dad.png';	
		} else if(whichBtn == 'Mom'){	
			e.source.image = 'images/people/state1/mom.png';	
		} else if(whichBtn == 'Brother'){	
			e.source.image = 'images/people/state1/brother.png';
		} else if(whichBtn == 'Sister'){	
			e.source.image = 'images/people/state1/sister.png';	
		} else if(whichBtn == 'Friends'){	
			e.source.image = 'images/people/state1/friends.png';
		} else if(whichBtn == 'Teacher'){	
			e.source.image = 'images/people/state1/teacher.png';
		} else if(whichBtn == 'Nurse'){	
			e.source.image = 'images/people/state1/nurse.png';
		} else if(whichBtn == 'Doctor'){	
			e.source.image = 'images/people/state1/doctor.png';	//People Buttons ends
		}
		
		 else if(whichBtn == 'Clothes'){	
			e.source.image = 'images/others/state1/clothes.png';
		} else if(whichBtn == 'Emergency'){	
			e.source.image = 'images/others/state1/emergency.png';	
		} else if(whichBtn == 'Hygiene'){	
			e.source.image = 'images/others/state1/hygiene.png';
		} else if(whichBtn == 'School'){	
			e.source.image = 'images/others/state1/school.png';
		} else if(whichBtn == 'Sleep'){	
			e.source.image = 'images/others/state1/sleep.png';
		} else if(whichBtn == 'Time'){	
			e.source.image = 'images/others/state1/time.png';	//Others Buttons ends
		}
		
		 else if(whichBtn == 'ChangeFootwear'){	
			e.source.image = 'images/others/clothes/state1/changefootwear.png';	
		} else if(whichBtn == 'ChangeInnerwear'){	
			e.source.image = 'images/others/clothes/state1/changeinnerwear.png';
		} else if(whichBtn == 'ChangeJeans'){	
			e.source.image = 'images/others/clothes/state1/changejeans.png';
		} else if(whichBtn == 'ChangeTShirt'){	
			e.source.image = 'images/others/clothes/state1/changetshirt.png';
		} else if(whichBtn == 'WearNightClothes'){	
			e.source.image = 'images/others/clothes/state1/wearnightclothes.png';	//Clothes ends
		}
		
		 else if(whichBtn == 'Bandage'){	
			e.source.image = 'images/others/emergency/state1/bandage.png';
		} else if(whichBtn == 'Help'){	
			e.source.image = 'images/others/emergency/state1/help.png';
		} else if(whichBtn == 'Medicine'){	
			e.source.image = 'images/others/emergency/state1/medicine.png';	//Emergency ends
		}
		
		 else if(whichBtn == 'Bath'){	
			e.source.image = 'images/others/hygiene/state1/bath.png';	
		} else if(whichBtn == 'Brush'){	
			e.source.image = 'images/others/hygiene/state1/brush.png';
		} else if(whichBtn == 'Facewash'){	
			e.source.image = 'images/others/hygiene/state1/facewash.png';
		} else if(whichBtn == 'Toilet'){	
			e.source.image = 'images/others/hygiene/state1/toilet.png';
		} else if(whichBtn == 'Vomit'){	
			e.source.image = 'images/others/hygiene/state1/vomit.png';	//Hygiene ends
		}
		
		 else if(whichBtn == 'Bag'){	
			e.source.image = 'images/others/school/state1/bag.png';	
		} else if(whichBtn == 'Books'){	
			e.source.image = 'images/others/school/state1/books.png';
		} else if(whichBtn == 'Bottle'){	
			e.source.image = 'images/others/school/state1/bottle.png';
		} else if(whichBtn == 'DontWantToGo'){	
			e.source.image = 'images/others/school/state1/dontwanttogo.png';
		} else if(whichBtn == 'HomeWork'){	
			e.source.image = 'images/others/school/state1/homework.png';	//School ends
		}
		
		 else if(whichBtn == 'Door'){	
			e.source.image = 'images/others/sleep/state1/door.png';	
		} else if(whichBtn == 'Fan'){	
			e.source.image = 'images/others/sleep/state1/fan.png';
		} else if(whichBtn == 'FeelingCold'){	
			e.source.image = 'images/others/sleep/state1/feelingcold.png';
		} else if(whichBtn == 'Light'){	
			e.source.image = 'images/others/sleep/state1/light.png';
		} else if(whichBtn == 'Window'){	
			e.source.image = 'images/others/sleep/state1/window.png';	//Sleep ends
		}
		
		else if(whichBtn == 'Afternoon'){	
			e.source.image = 'images/others/time/state1/afternoon.png';	
		} else if(whichBtn == 'CurrentTime'){	
			e.source.image = 'images/others/time/state1/currenttime.png';
		} else if(whichBtn == 'Evening'){	
			e.source.image = 'images/others/time/state1/evening.png';	
		} else if(whichBtn == 'Morning'){	
			e.source.image = 'images/others/time/state1/morning.png';
		} else if(whichBtn == 'Night'){	
			e.source.image = 'images/others/time/state1/night.png';
		} else if(whichBtn == 'Tomorrow'){	
			e.source.image = 'images/others/time/state1/tomorrow.png';
		} else if(whichBtn == 'Yesterday'){	
			e.source.image = 'images/others/time/state1/yesterday.png';	//Time ends
		}
		
   // }
    
    for(var i = 0; i < btn.length; i++){
        if(e.source !== btn[i]){
           // Changing back the background of the Inactive button to white
           //btn[i].backgroundColor = '#FFF';
            
            //Other button titles
        	btnTitle = btn[i].title;
        	
			//Reset the other buttons
			if(btnTitle == 'Learning'){
				btn[i].image = 'images/home/learning.png';
			} else if(btnTitle == 'Eating'){
				btn[i].image = 'images/home/eating.png';
			} else if(btnTitle == 'Play'){	
				btn[i].image = 'images/home/playing.png';
			} else if(btnTitle == 'People'){	
				btn[i].image = 'images/home/people.png';
			} else if(btnTitle == 'Other'){	
				btn[i].image = 'images/home/others.png';			//HomeButtons Ends
			} else if(btnTitle == 'AddOns'){
				btn[i].image = 'images/eating/addons.png';
			} else if(btnTitle == 'Beverages'){
				btn[i].image = 'images/eating/beverages.png';
			} else if(btnTitle == 'Breakfast'){	
				btn[i].image = 'images/eating/breakfast.png';
			} else if(btnTitle == 'Cutlery'){	
				btn[i].image = 'images/eating/cutlery.png';
			} else if(btnTitle == 'Dinner'){	
				btn[i].image = 'images/eating/dinner.png';
			} else if(btnTitle == 'Fruit'){	
				btn[i].image = 'images/eating/fruits.png';
			} else if(btnTitle == 'Lunch'){	
				btn[i].image = 'images/eating/lunch.png';
			} else if(btnTitle == 'Snacks'){	
				btn[i].image = 'images/eating/snacks.png';		//Eating Buttons Ends
			} else if(btnTitle == 'Butter'){
				btn[i].image = 'images/eating/addons/butter.png';
			} else if(btnTitle == 'Jam'){	
				btn[i].image = 'images/eating/addons/jam.png';
			} else if(btnTitle == 'Masala'){	
				btn[i].image = 'images/eating/addons/masala.png';
			} else if(btnTitle == 'Pepper'){	
				btn[i].image = 'images/eating/addons/pepper.png';
			} else if(btnTitle == 'Pickle'){	
				btn[i].image = 'images/eating/addons/pickle.png';
			} else if(btnTitle == 'Salt'){	
				btn[i].image = 'images/eating/addons/salt.png';
			} else if(btnTitle == 'Sauce'){	
				btn[i].image = 'images/eating/addons/sauce.png';
			} else if(btnTitle == 'Sugar'){	
				btn[i].image = 'images/eating/addons/sugar.png';	//AddOns end
			} else if(btnTitle == 'Juice'){	
				btn[i].image = 'images/eating/beverages/juice.png';
			} else if(btnTitle == 'Milk'){	
				btn[i].image = 'images/eating/beverages/milk.png';
			}  else if(btnTitle == 'Milkshake'){	
				btn[i].image = 'images/eating/beverages/milkshake.png';
			} else if(btnTitle == 'Tea'){	
				btn[i].image = 'images/eating/beverages/tea.png';	//Beverages end
			} else if(btnTitle == 'Bread'){	
				btn[i].image = 'images/eating/breakfast/bread.png';
			} else if(btnTitle == 'Cornflakes'){	
				btn[i].image = 'images/eating/breakfast/cornflakes.png';	
			} else if(btnTitle == 'Eggs'){	
				btn[i].image = 'images/eating/breakfast/eggs.png';
			} else if(btnTitle == 'Porridge'){										//Milk removes as same is there in beverage
				btn[i].image = 'images/eating/breakfast/porridge.png';
			} else if(btnTitle == 'Rice'){	
				btn[i].image = 'images/eating/breakfast/rice.png';	//Breakfast ends
			} else if(btnTitle == 'Bowl'){	
				btn[i].image = 'images/eating/cutlery/bowl.png';	
			}  else if(btnTitle == 'Fork'){	
				btn[i].image = 'images/eating/cutlery/fork.png';
			} else if(btnTitle == 'Glass'){	
				btn[i].image = 'images/eating/cutlery/glass.png';	
			} else if(btnTitle == 'Knife'){	
				btn[i].image = 'images/eating/cutlery/knife.png';
			} else if(btnTitle == 'Plate'){	
				btn[i].image = 'images/eating/cutlery/plate.png';
			} else if(btnTitle == 'Spoon'){	
				btn[i].image = 'images/eating/cutlery/spoon.png';	//Breakfast ends
			}
			
			else if(btnTitle == 'curd'){	
				btn[i].image = 'images/eating/meal/curd.png';
			} else if(btnTitle == 'Curry'){	
				btn[i].image = 'images/eating/meal/curry.png';	
			} else if(btnTitle == 'Dal'){	
				btn[i].image = 'images/eating/meal/dal.png';	
			} else if(btnTitle == 'Khichdi'){	
				btn[i].image = 'images/eating/meal/khichdi.png';
			} else if(btnTitle == 'NonVeg'){	
				btn[i].image = 'images/eating/meal/nonveg.png';	
			} else if(btnTitle == 'Pizza'){	
				btn[i].image = 'images/eating/meal/pizza.png';
			} else if(btnTitle == 'Rice'){	
				btn[i].image = 'images/eating/meal/rice.png';
			} else if(btnTitle == 'Roti'){	
				btn[i].image = 'images/eating/meal/roti.png';	//Breakfast ends
			}
			
			else if(btnTitle == 'Apple'){	
				btn[i].image = 'images/eating/fruits/apple.png';
			} else if(btnTitle == 'Banana'){	
				btn[i].image = 'images/eating/fruits/banana.png';	
			} else if(btnTitle == 'Grapes'){	
				btn[i].image = 'images/eating/fruits/grapes.png';	
			} else if(btnTitle == 'Guava'){	
				btn[i].image = 'images/eating/fruits/guava.png';
			} else if(btnTitle == 'Mango'){	
				btn[i].image = 'images/eating/fruits/mango.png';	
			} else if(btnTitle == 'Orange'){	
				btn[i].image = 'images/eating/fruits/orange.png';
			} else if(btnTitle == 'Pineapple'){	
				btn[i].image = 'images/eating/fruits/pineapple.png';
			} else if(btnTitle == 'Pomegranate'){	
				btn[i].image = 'images/eating/fruits/pomegranate.png';
			} else if(btnTitle == 'Watermelon'){	
				btn[i].image = 'images/eating/fruits/watermelon.png';	//Fruits ends
			}
			
			else if(btnTitle == 'Biscuits'){	
				btn[i].image = 'images/eating/snacks/biscuits.png';
			} else if(btnTitle == 'Chats'){	
				btn[i].image = 'images/eating/snacks/chats.png';	
			} else if(btnTitle == 'Chocolate'){	
				btn[i].image = 'images/eating/snacks/chocolate.png';	
			} else if(btnTitle == 'IceCream'){	
				btn[i].image = 'images/eating/snacks/icecream.png';
			} else if(btnTitle == 'NonVeg'){	
				btn[i].image = 'images/eating/snacks/nonveg.png';	
			} else if(btnTitle == 'Noodles'){	
				btn[i].image = 'images/eating/snacks/noodles.png';
			} else if(btnTitle == 'Pasteries'){	
				btn[i].image = 'images/eating/snacks/pasteries.png';
			} else if(btnTitle == 'Sweets'){	
				btn[i].image = 'images/eating/snacks/sweets.png';
			} else if(btnTitle == 'Wafers'){	
				btn[i].image = 'images/eating/snacks/wafers.png';	//Snacks ends
			}
			
			 else if(btnTitle == 'Music'){	
				btn[i].image = 'images/play/music.png';
			} else if(btnTitle == 'OutdoorGames'){	
				btn[i].image = 'images/play/outdoorgames.png';	
			} else if(btnTitle == 'Puzzles'){	
				btn[i].image = 'images/play/puzzles.png';
			} else if(btnTitle == 'Toys'){	
				btn[i].image = 'images/play/toys.png';
			} else if(btnTitle == 'TV'){	
				btn[i].image = 'images/play/tv.png';
			} else if(btnTitle == 'VideoGames'){	
				btn[i].image = 'images/play/videogames.png';	//Play buttons ends
			}
			
			else if(btnTitle == 'ChangeMusic'){	
				btn[i].image = 'images/play/music/changemusic.png';
			} else if(btnTitle == 'LetsDance'){	
				btn[i].image = 'images/play/music/letsdance.png';
			} else if(btnTitle == 'VolumeUp'){	
				btn[i].image = 'images/play/music/volumedown.png';
			} else if(btnTitle == 'VolumeDown'){	
				btn[i].image = 'images/play/music/volumeup.png';	//Music ends
			}
			
			 else if(btnTitle == 'Cars'){	
				btn[i].image = 'images/play/outdoorgames/cars.png';
			} else if(btnTitle == 'Garden'){	
				btn[i].image = 'images/play/outdoorgames/garden.png';
			} else if(btnTitle == 'Swing'){	
				btn[i].image = 'images/play/outdoorgames/swing.png';
			} else if(btnTitle == 'Terrace'){	
				btn[i].image = 'images/play/outdoorgames/terrace.png';
			} else if(btnTitle == 'Walk'){	
				btn[i].image = 'images/play/outdoorgames/walk.png';	//OutDoorGames ends
			}
			
			else if(btnTitle == 'ActionFigures'){											//"cars" removed as it's already there in OutDoorGames
				btn[i].image = 'images/play/toys/actionfigures.png';
			} else if(btnTitle == 'PlayWithMe'){	
				btn[i].image = 'images/play/toys/playwithme.png';
			} else if(btnTitle == 'SoftToys'){	
				btn[i].image = 'images/play/toys/softtoys.png';	//Toys ends
			}
			
			 else if(btnTitle == 'NextChannel'){	
				btn[i].image = 'images/play/tv/garden.png';		//Volume "Up/Down" removed as it's already there in Music
			} else if(btnTitle == 'PreviousChannel'){	
				btn[i].image = 'images/play/tv/swing.png';		//OutDoorGames ends
			}
			
			else if(btnTitle == 'Dad'){	
				btn[i].image = 'images/people/dad.png';	
			} else if(btnTitle == 'Mom'){	
				btn[i].image = 'images/people/mom.png';	
			} else if(btnTitle == 'Brother'){	
				btn[i].image = 'images/people/brother.png';
			} else if(btnTitle == 'Sister'){	
				btn[i].image = 'images/people/sister.png';	
			} else if(btnTitle == 'Friends'){	
				btn[i].image = 'images/people/friends.png';
			} else if(btnTitle == 'Teacher'){	
				btn[i].image = 'images/people/teacher.png';
			} else if(btnTitle == 'Nurse'){	
				btn[i].image = 'images/people/nurse.png';
			} else if(btnTitle == 'Doctor'){	
				btn[i].image = 'images/people/doctor.png';	//People Buttons ends
			}

			else if(btnTitle == 'Clothes'){	
				btn[i].image = 'images/others/clothes.png';
			} else if(btnTitle == 'Emergency'){	
				btn[i].image = 'images/others/emergency.png';	
			} else if(btnTitle == 'Hygiene'){	
				btn[i].image = 'images/others/hygiene.png';
			} else if(btnTitle == 'School'){	
				btn[i].image = 'images/others/school.png';
			} else if(btnTitle == 'Sleep'){	
				btn[i].image = 'images/others/sleep.png';
			} else if(btnTitle == 'Time'){	
				btn[i].image = 'images/others/time.png';	//Others Buttons ends
			}
			
			 else if(btnTitle == 'ChangeFootwear'){	
				btn[i].image = 'images/others/clothes/changefootwear.png';	
			} else if(btnTitle == 'ChangeInnerwear'){	
				btn[i].image = 'images/others/clothes/changeinnerwear.png';
			} else if(btnTitle == 'ChangeJeans'){	
				btn[i].image = 'images/others/clothes/changejeans.png';
			} else if(btnTitle == 'ChangeTShirt'){	
				btn[i].image = 'images/others/clothes/changetshirt.png';
			} else if(btnTitle == 'WearNightClothes'){	
				btn[i].image = 'images/others/clothes/wearnightclothes.png';	//Clothes ends
			}
			
			 else if(btnTitle == 'Bandage'){	
				btn[i].image = 'images/others/emergency/bandage.png';
			} else if(btnTitle == 'Help'){	
				btn[i].image = 'images/others/emergency/help.png';
			} else if(btnTitle == 'Medicine'){	
				btn[i].image = 'images/others/emergency/medicine.png';	//Emergency ends
			}
			
			 else if(btnTitle == 'Bath'){	
				btn[i].image = 'images/others/hygiene/bath.png';	
			} else if(btnTitle == 'Brush'){	
				btn[i].image = 'images/others/hygiene/brush.png';
			} else if(btnTitle == 'Facewash'){	
				btn[i].image = 'images/others/hygiene/facewash.png';
			} else if(btnTitle == 'Toilet'){	
				btn[i].image = 'images/others/hygiene/toilet.png';
			} else if(btnTitle == 'Vomit'){	
				btn[i].image = 'images/others/hygiene/vomit.png';	//Hygiene ends
			}
			
			 else if(btnTitle == 'Bag'){	
				btn[i].image = 'images/others/school/bag.png';	
			} else if(btnTitle == 'Books'){	
				btn[i].image = 'images/others/school/books.png';
			} else if(btnTitle == 'Bottle'){	
				btn[i].image = 'images/others/school/bottle.png';
			} else if(btnTitle == 'DontWantToGo'){	
				btn[i].image = 'images/others/school/dontwanttogo.png';
			} else if(btnTitle == 'HomeWork'){	
				btn[i].image = 'images/others/school/homework.png';	//School ends
			}
			
			 else if(btnTitle == 'Door'){	
				btn[i].image = 'images/others/sleep/door.png';	
			} else if(btnTitle == 'Fan'){	
				btn[i].image = 'images/others/sleep/fan.png';
			} else if(btnTitle == 'FeelingCold'){	
				btn[i].image = 'images/others/sleep/feelingcold.png';
			} else if(btnTitle == 'Light'){	
				btn[i].image = 'images/others/sleep/light.png';
			} else if(btnTitle == 'Window'){	
				btn[i].image = 'images/others/sleep/window.png';	//Sleep ends
			}
			
			else if(btnTitle == 'Afternoon'){	
				btn[i].image = 'images/others/time/afternoon.png';	
			} else if(btnTitle == 'CurrentTime'){	
				btn[i].image = 'images/others/time/currenttime.png';
			} else if(btnTitle == 'Evening'){	
				btn[i].image = 'images/others/time/evening.png';	
			} else if(btnTitle == 'Morning'){	
				btn[i].image = 'images/others/time/morning.png';
			} else if(btnTitle == 'Night'){	
				btn[i].image = 'images/others/time/night.png';
			} else if(btnTitle == 'Tomorrow'){	
				btn[i].image = 'images/others/time/tomorrow.png';
			} else if(btnTitle == 'Yesterday'){	
				btn[i].image = 'images/others/time/yesterday.png';	//Time ends
			}
		
		
        }
    }  
}


//Set Button States for Main Buttons (Needs to refactor code & combine setMainBtnState & changeMainBtnState functions)
function setMainBtnState(e, firstBtnState, secBtnState){
	if(e.source.value == 1){
					
		mainButtonState = firstBtnState;
		
		e.source.value = 2;
		
	} else if (e.source.value == 2){
		
		mainButtonState = secBtnState;
		
		e.source.value = 1;
		//e.source.backgroundColor = null;
	} else {
		//Some other click: :'(
	}
}

//Set background color for Main Buttons
function changeMainBtnState(e){
	
	var whichBtn;
	//Title of the button
	whichBtn = e.source.title;
	
	//Changing Button images to indicate state change
	if(e.source.value == 1){
		
		//User clicked on any of the main buttons
		if(whichBtn == 'Like'){
			e.source.image = 'images/main_buttons/state1/smiley_like.png';
		} else if(whichBtn == 'Yes'){
			e.source.image = 'images/main_buttons/state1/tick_yes.png';
		} else if(whichBtn == 'More'){	
			e.source.image = 'images/main_buttons/state1/plus_more.png';
		} else if(whichBtn == 'DontLike'){	
			e.source.image = 'images/main_buttons/state1/smiley_dont_like.png';
		} else if(whichBtn == 'No'){	
			e.source.image = 'images/main_buttons/state1/cross_no.png';
		} else if(whichBtn == 'Less'){	
			e.source.image = 'images/main_buttons/state1/minus_less.png';
		}
			
			
	} else if (e.source.value == 2){
		
    	//Change Mainbuttons state images
		if(whichBtn == 'Like'){
			e.source.image = 'images/main_buttons/state2/smiley_like.png';
		} else if(whichBtn == 'Yes'){
			e.source.image = 'images/main_buttons/state2/tick_yes.png';
		} else if(whichBtn == 'More'){	
			e.source.image = 'images/main_buttons/state2/plus_more.png';
		} else if(whichBtn == 'DontLike'){	
			e.source.image = 'images/main_buttons/state2/smiley_dont_like.png';
		} else if(whichBtn == 'No'){	
			e.source.image = 'images/main_buttons/state2/cross_no.png';
		} else if(whichBtn == 'Less'){	
			e.source.image = 'images/main_buttons/state2/minus_less.png';
		}
	}
    
    //Changing inactive buttons back to normal button state
    for(var i = 0; i < mainBtn.length; i++){
        if(e.source !== mainBtn[i]){
        	
        	//Other button titles
        	otherBtnTitle = mainBtn[i].title;
        	
        	Titanium.API.info(mainBtn[i].title + "-");
        	
			//User clicked on any of the main buttons
			if(otherBtnTitle == 'Like'){
				mainBtn[i].image = 'images/main_buttons/smiley_like.png';
			} else if(otherBtnTitle == 'Yes'){
				mainBtn[i].image = 'images/main_buttons/tick_yes.png';
			} else if(otherBtnTitle == 'More'){	
        		mainBtn[i].image = 'images/main_buttons/plus_more.png';
			} else if(otherBtnTitle == 'DontLike'){
				mainBtn[i].image = 'images/main_buttons/smiley_dont_like.png';
			} else if(otherBtnTitle == 'No'){
				mainBtn[i].image = 'images/main_buttons/cross_no.png';
			} else if(otherBtnTitle == 'Less'){
				mainBtn[i].image = 'images/main_buttons/minus_less.png';
			}

        }
    }  
}

function getAudioFile(filePath){
	var audio = Ti.Media.createSound({
		url: filePath
	});
	
	return audio;
}
			


//Add Scrolling view for the buttons in the middle
scrollView.add(centerButtons); 

win.add(mainHolderLeft);
win.add(mainHolderRight);

win.add(scrollView);

// open tab group
win.open();

