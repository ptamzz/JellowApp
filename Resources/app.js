// this sets the background color of the master UIView (when there are no windows/tab groups on it)
// Github Push

Titanium.UI.setBackgroundColor('#000');

var mainButtonState = null;
var actionButtonState = null;
var temp = 1;
var audio;
var mainBtn = [], btn = [];

var inside = false;


// create base UI tab and root window
var win = Titanium.UI.createWindow({  
    title:'Jellow',
    backgroundColor:'#fff',
});

//Main-Buttons wrapper
var mainHolder = Titanium.UI.createView({
	width:'auto',
	height: 'auto',
});
	
//ScrollView
var scrollView = Titanium.UI.createScrollView({ 
	width: 110,
	contentWidth: 110, 
	contentHeight: 'auto',
	top:0,
	left: 110,
	zIndex: 1,
	showVerticalScrollIndicator:true, 
	showHorizontalScrollIndicator:true,
});

//Scrolling buttons at the center
var centerButtons = Ti.UI.createView({ 
	width: 110,
	height: 'auto',
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

function createMainButtons(data){
	/* Generate Main Buttons */
	for (var i = 0; i < data.length; i++){
		
		//Set button margin as per its position: left or right
		if (i%2 == 0){
			marginLeft = 20;
			marginTop = 40+70*i;
		} else {
			marginLeft = 235;
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
		
		//Adding each button
		mainHolder.add(mainBtn[i]);
		
	}
}


// Home buttons
var homeButtons =[
	{ title: 'Learning', path: 'images/home/learning.png'},		//Button: 19		
	{ title: 'Eating', path: 'images/home/eating.png'},			//Button: 20
	{ title: 'Play', path: 'images/home/playing.png'},			//Button: 21
	{ title: 'People', path: 'images/home/people.png'},			//Button: 22
	{ title: 'Other', path: 'images/home/others.png'}			//Button: 23
]

// Learning buttons
var learningButtons =[
	{ title: 'Animals', path: 'images/learning/animals.png'},			//Button: 24
	{ title: 'Body', path: 'images/learning/body.png'},					//Button: 25
	{ title: 'Books', path: 'images/learning/books.png'},				//Button: 26
	{ title: 'Colors', path: 'images/learning/colors.png'},				//Button: 27
	{ title: 'HomeObjects', path: 'images/learning/homeobjects.png'},	//Button: 28
	{ title: 'Shapes', path: 'images/learning/shapes.png'},				//Button: 29
	{ title: 'Stationery', path: 'images/learning/stationary.png'}		//Button: 30
]

	// Animals buttons
	var animalsButtons =[
		{ title: 'Ant', path: 'images/learning/animals/ant.png'},				//Button: 31
		{ title: 'Cat', path: 'images/learning/animals/cat.png'},				//Button: 32
		{ title: 'Cockroach', path: 'images/learning/animals/cockroach.png'},	//Button: 33
		{ title: 'Dog', path: 'images/learning/animals/dog.png'},				//Button: 34
		{ title: 'Fly', path: 'images/learning/animals/fly.png'},				//Button: 35
		{ title: 'Mosquito', path: 'images/learning/animals/mosquito.png'}		//Button: 36
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
		{ title: 'Stomach', path: 'images/learning/body/stomach.png'}		//Button: 45
	]
	
	// Books buttons
	var booksButtons =[
		{ title: 'BedTimeStories', path: 'images/learning/books/bedtimestories.png'},	//Button: 46
		{ title: 'Comics', path: 'images/learning/books/comics.png'},					//Button: 47
		{ title: 'DrawingBook', path: 'images/learning/books/drawingbook.png'},			//Button: 48
		{ title: 'Maths', path: 'images/learning/books/maths.png'},						//Button: 49
		{ title: 'RhymesBook', path: 'images/learning/books/rhymes.png'},				//Button: 50
		{ title: 'SchoolNotebook', path: 'images/learning/books/schoolnotebook.png'},	//Button: 51
		{ title: 'Words', path: 'images/learning/books/words.png'}						//Button: 52
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
		{ title: 'Yellow', path: 'images/learning/colors/yellow.png'}		//Button: 61
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
		{ title: 'Window', path: 'images/learning/homeobjects/window.png'}		//Button: 69
	]
	
	// Shapes buttons
	var shapesButtons =[
		{ title: 'Circle', path: 'images/learning/shapes/circle.png'},			//Button: 70
		{ title: 'FreeForm', path: 'images/learning/shapes/freeform.png'},		//Button: 71
		{ title: 'Line', path: 'images/learning/shapes/line.png'},				//Button: 72
		{ title: 'Rectangle', path: 'images/learning/shapes/rectangle.png'},	//Button: 73
		{ title: 'Square', path: 'images/learning/shapes/square.png'},			//Button: 74
		{ title: 'Triangle', path: 'images/learning/shapes/triangle.png'}		//Button: 75
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
		{ title: 'Sharpener', path: 'images/learning/stationary/sharpener.png'}			//Button: 84
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
	{ title: 'Snacks', path: 'images/eating/snacks.png'}			//Button: 92
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
		{ title: 'Sugar', path: 'images/eating/addons/sugar.png'}		//Button: 100
	]
	
	// Beverages buttons
	var beveragesButtons =[
		{ title: 'Juice', path: 'images/eating/beverages/juice.png'},			//Button: 101
		{ title: 'Milk', path: 'images/eating/beverages/milk.png'},				//Button: 102
		{ title: 'Milkshake', path: 'images/eating/beverages/milkshake.png'},	//Button: 103
		{ title: 'Tea', path: 'images/eating/beverages/tea.png'}				//Button: 104
	]
	
	// Breakfast buttons
	var breakfastButtons =[
		{ title: 'Bread', path: 'images/eating/breakfast/bread.png'},				//Button: 105
		{ title: 'Cornflakes', path: 'images/eating/breakfast/cornflakes.png'},		//Button: 106
		{ title: 'Eggs', path: 'images/eating/breakfast/eggs.png'},					//Button: 107
		{ title: 'Milk', path: 'images/eating/breakfast/milk.png'},					//Button: 108
		{ title: 'Porridge', path: 'images/eating/breakfast/porridge.png'},			//Button: 109
		{ title: 'Rice', path: 'images/eating/breakfast/rice.png'}					//Button: 110
	]
	
	// Cutlery buttons
	var cutleryButtons =[
		{ title: 'Bowl', path: 'images/eating/cutlery/bowl.png'},		//Button: 111
		{ title: 'Fork', path: 'images/eating/cutlery/fork.png'},		//Button: 112
		{ title: 'Glass', path: 'images/eating/cutlery/glass.png'},		//Button: 113
		{ title: 'Knife', path: 'images/eating/cutlery/knife.png'},		//Button: 114
		{ title: 'Plate', path: 'images/eating/cutlery/plate.png'},		//Button: 115
		{ title: 'Spoon', path: 'images/eating/cutlery/spoon.png'}		//Button: 116
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
		{ title: 'Roti', path: 'images/eating/meal/roti.png'}				//Button: 124
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
		{ title: 'Watermelon', path: 'images/eating/fruits/watermelon.png'}			//Button: 133
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
		{ title: 'Wafers', path: 'images/eating/snacks/wafers.png'}					//Button: 142
	]
	

// Play buttons
var playButtons =[
	{ title: 'Music', path: 'images/play/music.png'},					//Button: 143
	{ title: 'OutdoorGames', path: 'images/play/outdoorgames.png'},		//Button: 144
	{ title: 'Puzzles', path: 'images/play/puzzles.png'},				//Button: 145
	{ title: 'Toys', path: 'images/play/toys.png'},						//Button: 146
	{ title: 'TV', path: 'images/play/tv.png'},							//Button: 147
	{ title: 'VideoGames', path: 'images/play/videogames.png'}			//Button: 148
]

	// Music buttons
	var musicButtons =[
		{ title: 'ChangeMusic', path: 'images/play/music/changemusic.png'},		//Button: 149
		{ title: 'LetsDance', path: 'images/play/music/letsdance.png'},			//Button: 150
		{ title: 'VolumeUp', path: 'images/play/music/volumeup.png'},			//Button: 151
		{ title: 'VolumeDown', path: 'images/play/music/volumedown.png'}		//Button: 152
	]
	
	// Outdoor-Games buttons
	var outdoorGamesButtons =[
		{ title: 'Cars', path: 'images/play/outdoorgames/cars.png'},			//Button: 153
		{ title: 'Garden', path: 'images/play/outdoorgames/garden.png'},		//Button: 154
		{ title: 'Swing', path: 'images/play/outdoorgames/swing.png'},			//Button: 155
		{ title: 'Terrace', path: 'images/play/outdoorgames/terrace.png'},		//Button: 156
		{ title: 'Walk', path: 'images/play/outdoorgames/walk.png'}				//Button: 157
	]

	// Toys buttons
	var toysButtons =[
		{ title: 'Cars', path: 'images/play/toys/cars.png'},						//Button: 158
		{ title: 'ActionFigures', path: 'images/play/toys/actionfigures.png'},		//Button: 159		
		{ title: 'PlayWithMe', path: 'images/play/toys/playwithme.png'},			//Button: 160
		{ title: 'SoftToys', path: 'images/play/toys/softtoys.png'}					//Button: 161
	]
	
	// TV buttons
	var tvButtons =[
		{ title: 'NextChannel', path: 'images/play/tv/nextchannel.png'},			//Button: 162
		{ title: 'PreviousChannel', path: 'images/play/tv/previouschannel.png'},	//Button: 163
		{ title: 'VolumeUp', path: 'images/play/music/volumeup.png'},				//Button: 164
		{ title: 'VolumeDown', path: 'images/play/music/volumedown.png'}			//Button: 165
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
	{ title: 'Doctor', path: 'images/people/doctor.png'}		//Button: 173
]

// Others buttons
var othersButtons =[
	{ title: 'Clothes', path: 'images/others/clothes.png'},			//Button: 174
	{ title: 'Emergency', path: 'images/others/emergency.png'},		//Button: 175
	{ title: 'Hygiene', path: 'images/others/hygiene.png'},			//Button: 176
	{ title: 'School', path: 'images/others/school.png'},			//Button: 177
	{ title: 'Sleep', path: 'images/others/sleep.png'},				//Button: 178
	{ title: 'Time', path: 'images/others/clock.png'}				//Button: 179
]

	// Clothes buttons
	var clothesButtons =[
		{ title: 'ChangeFootwear', path: 'images/others/clothes/changefootwear.png'}, 		//Button: 180
		{ title: 'ChangeInnerwear', path: 'images/others/clothes/changeinnerwear.png'},		//Button: 181
		{ title: 'ChangeJeans', path: 'images/others/clothes/changejeans.png'},				//Button: 182
		{ title: 'ChangeTShirt', path: 'images/others/clothes/changetshirt.png'},			//Button: 183
		{ title: 'WearNightClothes', path: 'images/others/clothes/wearnightclothes.png'}	//Button: 184
	]
	
	// Emergency buttons
	var emergencyButtons =[
		{ title: 'Bandage', path: 'images/others/emergency/bandage.png'},		//Button: 185
		{ title: 'Help', path: 'images/others/emergency/help.png'},				//Button: 186
		{ title: 'Medicine', path: 'images/others/emergency/medicine.png'}		//Button: 187
	]
	
	// Hygiene buttons
	var hygieneButtons =[
		{ title: 'Bath', path: 'images/others/hygiene/bath.png'},				//Button: 188
		{ title: 'Brush', path: 'images/others/hygiene/brush.png'},				//Button: 189
		{ title: 'Facewash', path: 'images/others/hygiene/facewash.png'},		//Button: 190
		{ title: 'Toilet', path: 'images/others/hygiene/toilet.png'},			//Button: 191
		{ title: 'Vomit', path: 'images/others/hygiene/vomit.png'}				//Button: 192
	]
	
	// School buttons
	var schoolButtons =[
		{ title: 'Bag', path: 'images/others/school/bag.png'},						//Button: 193 
		{ title: 'Books', path: 'images/others/school/books.png'},					//Button: 194
		{ title: 'Bottle', path: 'images/others/school/bottle.png'},				//Button: 195
		{ title: 'DontWantToGo', path: 'images/others/school/dontwanttogo.png'},	//Button: 196
		{ title: 'HomeWork', path: 'images/others/school/homework.png'}				//Button: 197
	]
	
	// Sleep buttons
	var sleepButtons =[
		{ title: 'Door', path: 'images/others/sleep/door.png'},					//Button: 198
		{ title: 'Fan', path: 'images/others/sleep/fan.png'},					//Button: 199
		{ title: 'FeelingCold', path: 'images/others/sleep/feelingcold.png'},	//Button: 200
		{ title: 'FeelingCold', path: 'images/others/sleep/feelingcold.png'},	//Button: 201
		{ title: 'Light', path: 'images/others/sleep/light.png'},				//Button: 202
		{ title: 'Window', path: 'images/others/sleep/window.png'}				//Button: 203
	]
	
	// Time buttons
	var timeButtons =[
		{ title: 'Afternoon', path: 'images/others/time/afternoon.png'},		//Button: 204
		{ title: 'CurrentTime', path: 'images/others/time/currenttime.png'},	//Button: 205
		{ title: 'Evening', path: 'images/others/time/evening.png'},			//Button: 206
		{ title: 'Morning', path: 'images/others/time/morning.png'},			//Button: 207
		{ title: 'Night', path: 'images/others/time/night.png'},				//Button: 208
		{ title: 'Tomorrow', path: 'images/others/time/tomorrow.png'},			//Button: 209
		{ title: 'Yesterday', path: 'images/others/time/yesterday.png'}			//Button: 210
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
				setButtonState(e, 24, othersButtons);
				actionButtonState = 24;
				break;
				
			case 'Body':
				setButtonState(e, 25, othersButtons);
				actionButtonState = 25;
				break;
				
			case 'Books':
				setButtonState(e, 26, othersButtons);
				actionButtonState = 26;
				break;
				
			case 'Colors':
				setButtonState(e, 27, othersButtons);
				actionButtonState = 27;
				break;
			
			case 'HomeObjects':
				setButtonState(e, 28, othersButtons);
				actionButtonState = 28;
				break;
				
			case 'Shapes':
				setButtonState(e, 29, othersButtons);
				actionButtonState = 29;
				break;
				
			case 'Stationery':
				setButtonState(e, 30, othersButtons);
				actionButtonState = 30;
				break;
				
			case 'Ant':
				setButtonState(e, 31, othersButtons);
				actionButtonState = 31;
				break;
				
			case 'Cat':
				setButtonState(e, 32, othersButtons);
				actionButtonState = 32;
				break;
				
			case 'Cockroach':
				setButtonState(e, 33, othersButtons);
				actionButtonState = 33;
				break;
			
			case 'Dog':
				setButtonState(e, 34, othersButtons);
				actionButtonState = 34;
				break;
				
			case 'Fly':
				setButtonState(e, 35, othersButtons);
				actionButtonState = 35;
				break;
				
			case 'Mosquito':
				setButtonState(e, 36, othersButtons);
				actionButtonState = 36;
				break;
				
			//Body Buttons
			case 'Ears':
				setButtonState(e, 37, othersButtons);
				actionButtonState = 37;
				break;
				
			case 'Eyes':
				setButtonState(e, 38, othersButtons);
				actionButtonState = 38;
				break;
				
			case 'Fingers':
				setButtonState(e, 39, othersButtons);
				actionButtonState = 39;
				break;
				
			case 'Hair':
				setButtonState(e, 40, othersButtons);
				actionButtonState = 40;
				break;
				
			case 'Hand':
				setButtonState(e, 41, othersButtons);
				actionButtonState = 41;
				break;
				
			case 'Head':
				setButtonState(e, 42, othersButtons);
				actionButtonState = 42;
				break;
			
			case 'Legs':
				setButtonState(e, 43, othersButtons);
				actionButtonState = 43;
				break;
				
			case 'Mouth':
				setButtonState(e, 44, othersButtons);
				actionButtonState = 44;
				break;
				
			case 'Stomach':
				setButtonState(e, 45, othersButtons);
				actionButtonState = 45;
				break;
				
			//Books Buttons
			case 'BedTimeStories':
				setButtonState(e, 46, othersButtons);
				actionButtonState = 46;
				break;
				
			case 'Comics':
				setButtonState(e, 47, othersButtons);
				actionButtonState = 47;
				break;
				
			case 'DrawingBook':
				setButtonState(e, 48, othersButtons);
				actionButtonState = 48;
				break;
				
			case 'Maths':
				setButtonState(e, 49, othersButtons);
				actionButtonState = 49;
				break;
			
			case 'RhymesBook':
				setButtonState(e, 50, othersButtons);
				actionButtonState = 50;
				break;
				
			case 'SchoolNotebook':
				setButtonState(e, 51, othersButtons);
				actionButtonState = 51;
				break;
				
			case 'Words':
				setButtonState(e, 52, othersButtons);
				actionButtonState = 52;
				break;
			
			//Colors
			case 'Black':
				setButtonState(e, 53, othersButtons);
				actionButtonState = 53;
				break;
			
			case 'Blue':
				setButtonState(e, 54, othersButtons);
				actionButtonState = 54;
				break;
			
			case 'Brown':
				setButtonState(e, 55, othersButtons);
				actionButtonState = 55;
				break;
			
			case 'Golden':
				setButtonState(e, 56, othersButtons);
				actionButtonState = 56;
				break;
			
			case 'Green':
				setButtonState(e, 57, othersButtons);
				actionButtonState = 57;
				break;
			
			
			case 'Red':
				setButtonState(e, 58, othersButtons);
				actionButtonState = 58;
				break;
			
			case 'Silver':
				setButtonState(e, 59, othersButtons);
				actionButtonState = 59;
				break;
			
			case 'White':
				setButtonState(e, 60, othersButtons);
				actionButtonState = 60;
				break;
			
			case 'Yellow':
				setButtonState(e, 61, othersButtons);
				actionButtonState = 61;
				break;
			
			//Home Objects
			case 'Chair':
				setButtonState(e, 62, othersButtons);
				actionButtonState = 62;
				break;
			
			case 'Door':
				setButtonState(e, 63, othersButtons);
				actionButtonState = 63;
				break;
			
			case 'Fan':
				setButtonState(e, 64, othersButtons);
				actionButtonState = 64;
				break;
			
			case 'Kitchen':
				setButtonState(e, 65, othersButtons);
				actionButtonState = 65;
				break;
			
			case 'Sofa':
				setButtonState(e, 66, othersButtons);
				actionButtonState = 66;
				break;
			
			case 'Table':
				setButtonState(e, 67, othersButtons);
				actionButtonState = 67;
				break;
			
			case 'Toilet':
				setButtonState(e, 68, othersButtons);
				actionButtonState = 68;
				break;
			
			case 'Window':
				setButtonState(e, 69, othersButtons);
				actionButtonState = 69;
				break;
			
			//Shapes
			case 'Circle':
				setButtonState(e, 70, othersButtons);
				actionButtonState = 70;
				break;
			
			case 'Freeform':
				setButtonState(e, 71, othersButtons);
				actionButtonState = 71;
				break;
			
			case 'Line':
				setButtonState(e, 72, othersButtons);
				actionButtonState = 72;
				break;
			
			case 'Rectangle':
				setButtonState(e, 73, othersButtons);
				actionButtonState = 73;
				break;
			
			case 'Square':
				setButtonState(e, 74, othersButtons);
				actionButtonState = 74;
				break;
			
			case 'Triangle':
				setButtonState(e, 75, othersButtons);
				actionButtonState = 75;
				break;
				
			//Stationeries
			case 'BlankPaper':
				setButtonState(e, 76, othersButtons);
				actionButtonState = 76;
				break;
			
			case 'ColoredPaper':
				setButtonState(e, 77, othersButtons);
				actionButtonState = 77;
				break;
			
			case 'Crayons':
				setButtonState(e, 78, othersButtons);
				actionButtonState = 78;
				break;
			
			case 'Eraser':
				setButtonState(e, 79, othersButtons);
				actionButtonState = 79;
				break;
			
			case 'Pen':
				setButtonState(e, 80, othersButtons);
				actionButtonState = 80;
				break;
			
			case 'Pencil':
				setButtonState(e, 81, othersButtons);
				actionButtonState = 1;
				break;
			
			case 'Pouch':
				setButtonState(e, 82, othersButtons);
				actionButtonState = 82;
				break;
			
			case 'Scale':
				setButtonState(e, 83, othersButtons);
				actionButtonState = 3;
				break;
			
			case 'Sharpener':
				setButtonState(e, 84, othersButtons);
				actionButtonState = 84;
				break;
			
		//Eating Buttons
			case 'AddOns':
				setButtonState(e, 85, othersButtons);
				actionButtonState = 85;
				break;
			
			case 'Beverages':
				setButtonState(e, 86, othersButtons);
				actionButtonState = 86;
				break;
			
			case 'Breakfast':
				setButtonState(e, 87, othersButtons);
				actionButtonState = 87;
				break;
			
			case 'Cutlery':
				setButtonState(e, 88, othersButtons);
				actionButtonState = 88;
				break;
			
			case 'Dinner':
				setButtonState(e, 89, othersButtons);
				actionButtonState = 89;
				break;
			
			case 'Fruit':
				setButtonState(e, 90, othersButtons);
				actionButtonState = 90;
				break;
			
			case 'Lunch':
				setButtonState(e, 91, othersButtons);
				actionButtonState = 91;
				break;
			
			case 'Snacks':
				setButtonState(e, 92, othersButtons);
				actionButtonState = 92;
				break;
				
			//AddOns
			case 'Butter':
				setButtonState(e, 93, othersButtons);
				actionButtonState = 93;
				break;
			
			case 'Jam':
				setButtonState(e, 94, othersButtons);
				actionButtonState = 94;
				break;
			
			case 'Masala':
				setButtonState(e, 95, othersButtons);
				actionButtonState = 95;
				break;
			
			case 'Pepper':
				setButtonState(e, 96, othersButtons);
				actionButtonState = 96;
				break;
			
			case 'Pickle':
				setButtonState(e, 97, othersButtons);
				actionButtonState = 97;
				break;
			
			case 'Salt':
				setButtonState(e, 98, othersButtons);
				actionButtonState = 98;
				break;
			
			case 'Sauce':
				setButtonState(e, 99, othersButtons);
				actionButtonState = 99;
				break;
			
			case 'Sugar':
				setButtonState(e, 100, othersButtons);
				actionButtonState = 10;
				break;
				
			//Beverages
			case 'Juice':
				setButtonState(e, 101, othersButtons);
				actionButtonState = 101;
				break;
			
			case 'Milk':
				setButtonState(e, 102, othersButtons);
				actionButtonState = 102;
				break;
			
			case 'Milkshake':
				setButtonState(e, 103, othersButtons);
				actionButtonState = 103;
				break;
			
			case 'Tea':
				setButtonState(e, 104, othersButtons);
				actionButtonState = 104;
				break;
	
			//Breakfast
			case 'Bread':
				setButtonState(e, 105, othersButtons);
				actionButtonState = 105;
				break;
			
			case 'Cornflakes':
				setButtonState(e, 106, othersButtons);
				actionButtonState = 106;
				break;
			
			case 'Eggs':
				setButtonState(e, 107, othersButtons);
				actionButtonState = 107;
				break;
			
			case 'Milk':
				setButtonState(e, 108, othersButtons);
				actionButtonState = 108;
				break;
			
			case 'Porridge':
				setButtonState(e, 109, othersButtons);
				actionButtonState = 109;
				break;
			
			case 'Rice':
				setButtonState(e, 110, othersButtons);
				actionButtonState = 110;
				break;
				
			//Cutlery
			case 'Bowl':
				setButtonState(e, 111, othersButtons);
				actionButtonState = 111;
				break;
			
			case 'Fork':
				setButtonState(e, 112, othersButtons);
				actionButtonState = 112;
				break;
			
			case 'Glass':
				setButtonState(e, 113, othersButtons);
				actionButtonState = 113;
				break;
			
			case 'Knife':
				setButtonState(e, 114, othersButtons);
				actionButtonState = 114;
				break;
			
			case 'Plate':
				setButtonState(e, 115, othersButtons);
				actionButtonState = 115;
				break;
			
			case 'Spoon':
				setButtonState(e, 116, othersButtons);
				actionButtonState = 116;
				break;
	
			//Dinner, Lunch: Meal
			case 'Curd':
				setButtonState(e, 117, othersButtons);
				actionButtonState = 117;
				break;
			
			case 'Curry':
				setButtonState(e, 118, othersButtons);
				actionButtonState = 118;
				break;
			
			case 'Dal':
				setButtonState(e, 119, othersButtons);
				actionButtonState = 119;
				break;
			
			case 'Khichdi':
				setButtonState(e, 120, othersButtons);
				actionButtonState = 120;
				break;
			
			case 'NonVeg':
				setButtonState(e, 121, othersButtons);
				actionButtonState = 121;
				break;
			
			case 'Pizza':
				setButtonState(e, 122, othersButtons);
				actionButtonState = 122;
				break;
			
			case 'Rice':
				setButtonState(e, 123, othersButtons);
				actionButtonState = 123;
				break;
			
			case 'Roti':
				setButtonState(e, 124, othersButtons);
				actionButtonState = 124;
				break;
				
			//Fruit
			case 'Apple':
				setButtonState(e, 125, othersButtons);
				actionButtonState = 125;
				break;
			
			case 'Banana':
				setButtonState(e, 126, othersButtons);
				actionButtonState = 16;
				break;
			
			case 'Grapes':
				setButtonState(e, 127, othersButtons);
				actionButtonState = 127;
				break;
			
			case 'Guava':
				setButtonState(e, 128, othersButtons);
				actionButtonState = 128;
				break;
			
			case 'Mango':
				setButtonState(e, 129, othersButtons);
				actionButtonState = 129;
				break;
			
			case 'Orange':
				setButtonState(e, 130, othersButtons);
				actionButtonState = 130;
				break;
			
			case 'Pineapple':
				setButtonState(e, 131, othersButtons);
				actionButtonState = 131;
				break;
			
			case 'Pomegranate':
				setButtonState(e, 132, othersButtons);
				actionButtonState = 132;
				break;
			
			case 'Watermelon':
				setButtonState(e, 133, othersButtons);
				actionButtonState = 133;
				break;
			
			//Lunch menu is same as dinner: check one set up
		
			//Fruit
			case 'Biscuits':
				setButtonState(e, 134, othersButtons);
				actionButtonState = 134;
				break;
			
			case 'Chats':
				setButtonState(e, 135, othersButtons);
				actionButtonState = 135;
				break;
			
			case 'Chocolate':
				setButtonState(e, 136, othersButtons);
				actionButtonState = 136;
				break;
			
			case 'IceCream':
				setButtonState(e, 137, othersButtons);
				actionButtonState = 137;
				break;
			
			case 'NonVeg':
				setButtonState(e, 138, othersButtons);
				actionButtonState = 138;
				break;
			
			case 'Noodles':
				setButtonState(e, 139, othersButtons);
				actionButtonState = 139;
				break;
			
			case 'Pasteries':
				setButtonState(e, 140, othersButtons);
				actionButtonState = 140;
				break;
			
			case 'Sweets':
				setButtonState(e, 141, othersButtons);
				actionButtonState = 141;
				break;
			
			case 'Wafers':
				setButtonState(e, 142, othersButtons);
				actionButtonState = 142;
				break;

		//Play
			case 'Music':
				setButtonState(e, 143, othersButtons);
				actionButtonState = 143;
				break;
			
			case 'OutdoorGames':
				setButtonState(e, 144, othersButtons);
				actionButtonState = 144;
				break;
			
			case 'Puzzles':
				setButtonState(e, 145, othersButtons);
				actionButtonState = 145;
				break;
			
			case 'Toys':
				setButtonState(e, 146, othersButtons);
				actionButtonState = 146;
				break;
			
			case 'TV':
				setButtonState(e, 147, othersButtons);
				actionButtonState = 147;
				break;
			
			case 'VideoGames':
				setButtonState(e, 148, othersButtons);
				actionButtonState = 148;
				break;

			//Music
			case 'ChangeMusic':
				setButtonState(e, 149, othersButtons);
				actionButtonState = 149;
				break;
			
			case 'LetsDance':
				setButtonState(e, 150, othersButtons);
				actionButtonState = 150;
				break;
			
			case 'VolumeUp':
				setButtonState(e, 151, othersButtons);
				actionButtonState = 151;
				break;
			
			case 'VolumeDown':
				setButtonState(e, 152, othersButtons);
				actionButtonState = 152;
				break;
			
			//Outdoor Games
			case 'Cars':
				setButtonState(e, 153, othersButtons);
				actionButtonState = 153;
				break;
			
			case 'Garden':
				setButtonState(e, 154, othersButtons);
				actionButtonState = 154;
				break;
			
			case 'Swing':
				setButtonState(e, 155, othersButtons);
				actionButtonState = 155;
				break;
			
			case 'Terrace':
				setButtonState(e, 156, othersButtons);
				actionButtonState = 156;
				break;
			
			case 'Walk':
				setButtonState(e, 157, othersButtons);
				actionButtonState = 157;
				break;
			
			//Toys
			case 'Cars':
				setButtonState(e, 158, othersButtons);
				actionButtonState = 158;
				break;
			
			case 'ActionFigures':
				setButtonState(e, 159, othersButtons);
				actionButtonState = 159;
				break;
			
			case 'PlayWithMe':
				setButtonState(e, 160, othersButtons);
				actionButtonState = 160;
				break;
			
			case 'SoftToys':
				setButtonState(e, 161, othersButtons);
				actionButtonState = 161;
				break;

			//TV
			case 'NextChannel':
				setButtonState(e, 162, othersButtons);
				actionButtonState = 162;
				break;
			
			case 'PreviousChannel':
				setButtonState(e, 163, othersButtons);
				actionButtonState = 163;
				break;
			
			case 'VolumeUp':
				setButtonState(e, 164, othersButtons);
				actionButtonState = 164;
				break;
			
			case 'VolumeDown':
				setButtonState(e, 165, othersButtons);
				actionButtonState = 165;
				break;
				
			//Video Games

			//People
			case 'Dad':
				setButtonState(e, 166, othersButtons);
				actionButtonState = 166;
				break;
			
			case 'Mom':
				setButtonState(e, 167, othersButtons);
				actionButtonState = 167;
				break;
			
			case 'Brother':
				setButtonState(e, 168, othersButtons);
				actionButtonState = 168;
				break;
			
			case 'Sister':
				setButtonState(e, 169, othersButtons);
				actionButtonState = 169;
				break;
			
			case 'Friends':
				setButtonState(e, 170, othersButtons);
				actionButtonState = 170;
				break;
			
			case 'Teacher':
				setButtonState(e, 171, othersButtons);
				actionButtonState = 171;
				break;
			
			case 'Nurse':
				setButtonState(e, 172, othersButtons);
				actionButtonState = 172;
				break;
			
			case 'Doctor':
				setButtonState(e, 173, othersButtons);
				actionButtonState = 173;
				break;

		//Others Button
			case 'Clothes':
				setButtonState(e, 174, othersButtons);
				actionButtonState = 174;
				break;
			
			case 'Emergency':
				setButtonState(e, 175, othersButtons);
				actionButtonState = 175;
				break;
			
			case 'Hygiene':
				setButtonState(e, 176, othersButtons);
				actionButtonState = 176;
				break;
			
			case 'School':
				setButtonState(e, 177, othersButtons);
				actionButtonState = 177;
				break;
			
			case 'Sleep':
				setButtonState(e, 178, othersButtons);
				actionButtonState = 178;
				break;
			
			case 'Time':
				setButtonState(e, 179, othersButtons);
				actionButtonState = 179;
				break;

			//Clothes
			case 'ChangeFootwear':
				setButtonState(e, 180, othersButtons);
				actionButtonState = 180;
				break;
			
			case 'ChangeInnerwear':
				setButtonState(e, 181, othersButtons);
				actionButtonState = 181;
				break;
			
			case 'ChangeJeans':
				setButtonState(e, 182, othersButtons);
				actionButtonState = 182;
				break;
			
			case 'ChangeTShirt':
				setButtonState(e, 183, othersButtons);
				actionButtonState = 183;
				break;
			
			case 'WearNightClothes':
				setButtonState(e, 184, othersButtons);
				actionButtonState = 184;
				break;
			
			//Emergency
			case 'Bandage':
				setButtonState(e, 185, othersButtons);
				actionButtonState = 185;
				break;
			
			case 'Help':
				setButtonState(e, 186, othersButtons);
				actionButtonState = 186;
				break;
			
			case 'Medicine':
				setButtonState(e, 187, othersButtons);
				actionButtonState = 17;
				break;
			
			//Hygiene
			case 'Bath':
				setButtonState(e, 188, othersButtons);
				actionButtonState = 188;
				break;
			
			case 'Brush':
				setButtonState(e, 189, othersButtons);
				actionButtonState = 189;
				break;
			
			case 'Facewash':
				setButtonState(e, 190, othersButtons);
				actionButtonState = 190;
				break;
			
			case 'Toilet':
				setButtonState(e, 191, othersButtons);
				actionButtonState = 11;
				break;
			
			case 'Vomit':
				setButtonState(e, 192, othersButtons);
				actionButtonState = 192;
				break;
			
			//School
			case 'Bag':
				setButtonState(e, 193, othersButtons);
				actionButtonState = 193;
				break;
			
			case 'Books':
				setButtonState(e, 194, othersButtons);
				actionButtonState = 194;
				break;
			
			case 'Bottle':
				setButtonState(e, 195, othersButtons);
				actionButtonState = 195;
				break;
			
			case 'DontWantToGo':
				setButtonState(e, 196, othersButtons);
				actionButtonState = 196;
				break;
			
			case 'HomeWork':
				setButtonState(e, 197, othersButtons);
				actionButtonState = 197;
				break;
			
			//Sleep
			case 'Door':
				setButtonState(e, 198, othersButtons);
				actionButtonState = 198;
				break;
			
			case 'Fan':
				setButtonState(e, 199, othersButtons);
				actionButtonState = 199;
				break;
			
			case 'FeelingCold':
				setButtonState(e, 200, othersButtons);
				actionButtonState = 200;
				break;
			
			case 'FeelingWarm':
				setButtonState(e, 201, othersButtons);
				actionButtonState = 201;
				break;
			
			case 'Light':
				setButtonState(e, 202, othersButtons);
				actionButtonState = 202;
				break;
			
			case 'Window':
				setButtonState(e, 203, othersButtons);
				actionButtonState = 203;
				break;
			
			//Time
			case 'Afternoon':
				setButtonState(e, 204, othersButtons);
				actionButtonState = 204;
				break;
			
			case 'CurrentTime':
				setButtonState(e, 205, othersButtons);
				actionButtonState = 205;
				break;
			
			case 'Evening':
				setButtonState(e, 206, othersButtons);
				actionButtonState = 206;
				break;
			
			case 'Morning':
				setButtonState(e, 207, othersButtons);
				actionButtonState = 207;
				break;
			
			case 'Night':
				setButtonState(e, 208, othersButtons);
				actionButtonState = 208;
				break;
			
			case 'Tomorrow':
				setButtonState(e, 209, othersButtons);
				actionButtonState = 209;
				break;
			
			case 'Yesterday':
				setButtonState(e, 210, othersButtons);
				actionButtonState = 210;
				break;
			
			default:
				//do nothing
		}
	
		Titanium.API.info("Action");
		
	} else {
		//User did not clicked on a button
		//Do nothing
	}
	
	Titanium.API.info("actionButtonState " + actionButtonState);
	
	
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
		
		if(actionButtonState == 19){
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
			soundPath('media/learning/stationery/AddOn.mp3');
		} else if (actionButtonState == 86){
			//If 'Beverages'
			soundPath('media/learning/stationery/Beverage.mp3');
		} else if (actionButtonState == 87){
			//If 'Breakfast'
			soundPath('media/learning/stationery/Breakfast.mp3');
		} else if (actionButtonState == 88){
			//If 'Cutlery'
			soundPath('media/learning/stationery/Cutlery.mp3');
		} else if (actionButtonState == 89){
			//If 'Dinner'
			soundPath('media/learning/stationery/Dinner.mp3');
		} else if (actionButtonState == 90){
			//If 'Fruit'
			soundPath('media/learning/stationery/Fruit.mp3');
		} else if (actionButtonState == 91){
			//If 'Lunch'
			soundPath('media/learning/stationery/Lunch.mp3');
		} else if (actionButtonState == 92){
			//If 'Snacks'
			soundPath('media/learning/stationery/Snack.mp3');
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
			soundPath('media/play/music/Music.mp3');		//Play
		} else if (actionButtonState == 144){
			//If 'LetsDance'
			soundPath('media/play/music/Outdoor.mp3');
		} else if (actionButtonState == 145){
			//If 'VolumeDown'
			soundPath('media/play/music/Puzzles.mp3');
		} else if (actionButtonState == 146){
			//If 'VolumeUp'
			soundPath('media/play/music/Toys.mp3');
		} else if (actionButtonState == 147){
			//If 'Cars'
			soundPath('media/play/outdoor/TV.mp3');
		} else if (actionButtonState == 148){
			//If 'Garden'
			soundPath('media/play/outdoor/VideoGames.mp3');
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
	
	for (var i = 0; i < data.length; i++){
		//Creating each button
		btn[i]  = Titanium.UI.createImageView({
			image:  data[i].path,
			height: 90,
			width: 90,
			top: 20+90*i+20*i,
			title : data[i].title,
			type: 'action',
			value: 1
		});
		
		btn[i].addEventListener('click',changeState);
		
		//Adding the buttons to the center view
		centerButtons.add(btn[i]);
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
	if(temp == 1){
					
		temp = 2;
		//button.source.backgroundColor = '#333';
	} else if (temp == 2){
		
		if(actionButtonState == buttonNo){
			//Emptying Button names array
			btn.length = 0;
			mainButtonState = null;
			
			Titanium.API.info("mainButtonState " + mainButtonState +"; actionButtonState " + actionButtonState);
			
			//Load inner page
			removeAllChildren(centerButtons);
			createButtons(nextLevelButtons);
			
			inside = true;
		}
		
		temp = 1;
		//button.source.backgroundColor = null;
	} else {
		//Some other click: :'(
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
    e.source.backgroundColor = '#C1C1C1';
    for(var i = 0; i < btn.length; i++){
        if(e.source !== btn[i]){
           // Changing back the background of the Inactive button to white
            btn[i].backgroundColor = '#FFF';
        }
    }  
}


//Set Button States for Main Buttons (Needs to refactor code & combine setMainBtnState & changeMainBtnState functions)
function setMainBtnState(e, firstBtnState, secBtnState){
	if(e.source.value == 1){
					
		mainButtonState = firstBtnState;
		
		e.source.value = 2;
		//e.source.backgroundColor = '#333';
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
	
	if(e.source.value == 1){
					
		//Changing active button background to Grey
   		 e.source.backgroundColor = '#C1C1C1';
	} else if (e.source.value == 2){
		
		//Changing active button background to Grey
    	e.source.backgroundColor = '#000';
	}
    
    for(var i = 0; i < mainBtn.length; i++){
        if(e.source !== mainBtn[i]){
           // Changing back the background of the Inactive button to white
            mainBtn[i].backgroundColor = '#FFF';
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

//Add button wrappers and scroller
win.add(mainHolder);
win.add(scrollView);

// open tab group
win.open();

