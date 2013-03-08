// this sets the background color of the master UIView (when there are no windows/tab groups on it)
// Github Push

Titanium.UI.setBackgroundColor('#000');

var mainButtonState = null;
var actionButtonState = null;
var temp = 1;
var audio;

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
		var button  = Titanium.UI.createImageView({
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
		
		//Adding each button
		mainHolder.add(button);
		
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
		
	} else if (e.source.type == 'action'){
		//User clicked on any of the action buttons (center buttons)
		
		switch(whichView){
			case 'Learning':
				setButtonState(e, 19, learningButtons);
				break;
				
			case 'Eating':
				setButtonState(e, 20, eatingButtons);
				break;
				
			case 'Play':
				setButtonState(e, 21, playButtons);
				break;
				
			case 'People':
				setButtonState(e, 22, peopleButtons);
				break;
				
			case 'Other':			
				setButtonState(e, 23, othersButtons);
				break;
				
			case 'Animals':
				setButtonState(e, 24, othersButtons);	
				break;
				
			case 'Body':
				setButtonState(e, 25, othersButtons);
				break;
				
			case 'Books':
				setButtonState(e, 26, othersButtons);
				break;
				
			case 'Colors':
				setButtonState(e, 27, othersButtons);
				break;
			
			case 'HomeObjects':
				setButtonState(e, 28, othersButtons);
				break;
				
			case 'Shapes':
				setButtonState(e, 29, othersButtons);
				break;
				
			case 'Stationery':
				setButtonState(e, 30, othersButtons);
				break;
				
			case 'Ant':
				setButtonState(e, 31, othersButtons);
				break;
				
			case 'Cat':
				setButtonState(e, 32, othersButtons);
				break;
				
			case 'Cockroach':
				setButtonState(e, 33, othersButtons);
				break;
			
			case 'Dog':
				setButtonState(e, 34, othersButtons);
				break;
				
			case 'Fly':
				setButtonState(e, 35, othersButtons);
				break;
				
			case 'Mosquito':
				setButtonState(e, 36, othersButtons);
				break;
				
			//Body Buttons
			case 'Ears':
				setButtonState(e, 37, othersButtons);
				break;
				
			case 'Eyes':
				setButtonState(e, 38, othersButtons);
				break;
				
			case 'Fingers':
				setButtonState(e, 39, othersButtons);
				break;
				
			case 'Hair':
				setButtonState(e, 40, othersButtons);
				break;
				
			case 'Hand':
				setButtonState(e, 41, othersButtons);
				break;
				
			case 'Head':
				setButtonState(e, 42, othersButtons);
				break;
			
			case 'Legs':
				setButtonState(e, 43, othersButtons);
				break;
				
			case 'Mouth':
				setButtonState(e, 44, othersButtons);
				break;
				
			case 'Stomach':
				setButtonState(e, 45, othersButtons);
				break;
				
			//Books Buttons
			case 'BedTimeStories':
				setButtonState(e, 46, othersButtons);
				break;
				
			case 'Comics':
				setButtonState(e, 47, othersButtons);
				break;
				
			case 'DrawingBook':
				setButtonState(e, 48, othersButtons);
				break;
				
			case 'Maths':
				setButtonState(e, 49, othersButtons);
				break;
			
			case 'RhymesBook':
				setButtonState(e, 50, othersButtons);
				break;
				
			case 'SchoolNotebook':
				setButtonState(e, 51, othersButtons);
				break;
				
			case 'Words':
				setButtonState(e, 52, othersButtons);
				break;
			
			//Colors
			case 'Black':
				setButtonState(e, 53, othersButtons);
				break;
			
			case 'Blue':
				setButtonState(e, 54, othersButtons);
				break;
			
			case 'Brown':
				setButtonState(e, 55, othersButtons);
				break;
			
			case 'Golden':
				setButtonState(e, 56, othersButtons);
				break;
			
			case 'Green':
				setButtonState(e, 57, othersButtons);
				break;
			
			
			case 'Red':
				setButtonState(e, 58, othersButtons);
				break;
			
			case 'Silver':
				setButtonState(e, 59, othersButtons);
				break;
			
			case 'White':
				setButtonState(e, 60, othersButtons);
				break;
			
			case 'Yellow':
				setButtonState(e, 61, othersButtons);
				break;
			
			//Home Objects
			case 'Chair':
				setButtonState(e, 62, othersButtons);
				break;
			
			case 'Door':
				setButtonState(e, 63, othersButtons);
				break;
			
			case 'Fan':
				setButtonState(e, 64, othersButtons);
				break;
			
			case 'Kitchen':
				setButtonState(e, 65, othersButtons);
				break;
			
			case 'Sofa':
				setButtonState(e, 66, othersButtons);
				break;
			
			case 'Table':
				setButtonState(e, 67, othersButtons);
				break;
			
			case 'Toilet':
				setButtonState(e, 68, othersButtons);
				break;
			
			case 'Window':
				setButtonState(e, 69, othersButtons);
				break;
			
			//Shapes
			case 'Circle':
				setButtonState(e, 70, othersButtons);
				break;
			
			case 'Freeform':
				setButtonState(e, 71, othersButtons);
				break;
			
			case 'Line':
				setButtonState(e, 72, othersButtons);
				break;
			
			case 'Rectangle':
				setButtonState(e, 73, othersButtons);
				break;
			
			case 'Square':
				setButtonState(e, 74, othersButtons);
				break;
			
			case 'Triangle':
				setButtonState(e, 75, othersButtons);
				break;
				
			//Stationeries
			case 'BlankPaper':
				setButtonState(e, 76, othersButtons);
				break;
			
			case 'ColoredPaper':
				setButtonState(e, 77, othersButtons);
				break;
			
			case 'Crayons':
				setButtonState(e, 78, othersButtons);
				break;
			
			case 'Eraser':
				setButtonState(e, 79, othersButtons);
				break;
			
			case 'Pen':
				setButtonState(e, 80, othersButtons);
				break;
			
			case 'Pencil':
				setButtonState(e, 81, othersButtons);
				break;
			
			case 'Pouch':
				setButtonState(e, 82, othersButtons);
				break;
			
			case 'Scale':
				setButtonState(e, 83, othersButtons);
				break;
			
			case 'Sharpener':
				setButtonState(e, 84, othersButtons);
				break;
			
		//Eating Buttons
			case 'AddOns':
				setButtonState(e, 85, othersButtons);
				break;
			
			case 'Beverages':
				setButtonState(e, 86, othersButtons);
				break;
			
			case 'Breakfast':
				setButtonState(e, 87, othersButtons);
				break;
			
			case 'Cutlery':
				setButtonState(e, 88, othersButtons);
				break;
			
			case 'Dinner':
				setButtonState(e, 89, othersButtons);
				break;
			
			case 'Fruit':
				setButtonState(e, 90, othersButtons);
				break;
			
			case 'Lunch':
				setButtonState(e, 91, othersButtons);
				break;
			
			case 'Snacks':
				setButtonState(e, 92, othersButtons);
				break;
				
			//AddOns
			case 'Butter':
				setButtonState(e, 93, othersButtons);
				break;
			
			case 'Jam':
				setButtonState(e, 94, othersButtons);
				break;
			
			case 'Masala':
				setButtonState(e, 95, othersButtons);
				break;
			
			case 'Pepper':
				setButtonState(e, 96, othersButtons);
				break;
			
			case 'Pickle':
				setButtonState(e, 97, othersButtons);
				break;
			
			case 'Salt':
				setButtonState(e, 98, othersButtons);
				break;
			
			case 'Sauce':
				setButtonState(e, 99, othersButtons);
				break;
			
			case 'Sugar':
				setButtonState(e, 100, othersButtons);
				break;
				
			//Beverages
			case 'Juice':
				setButtonState(e, 101, othersButtons);
				break;
			
			case 'Milk':
				setButtonState(e, 102, othersButtons);
				break;
			
			case 'Milkshake':
				setButtonState(e, 103, othersButtons);
				break;
			
			case 'Tea':
				setButtonState(e, 104, othersButtons);
				break;
	
			//Breakfast
			case 'Bread':
				setButtonState(e, 105, othersButtons);
				break;
			
			case 'Cornflakes':
				setButtonState(e, 106, othersButtons);
				break;
			
			case 'Eggs':
				setButtonState(e, 107, othersButtons);
				break;
			
			case 'Milk':
				setButtonState(e, 108, othersButtons);
				break;
			
			case 'Porridge':
				setButtonState(e, 109, othersButtons);
				break;
			
			case 'Rice':
				setButtonState(e, 110, othersButtons);
				break;
				
			//Cutlery
			case 'Bowl':
				setButtonState(e, 111, othersButtons);
				break;
			
			case 'Fork':
				setButtonState(e, 112, othersButtons);
				break;
			
			case 'Glass':
				setButtonState(e, 113, othersButtons);
				break;
			
			case 'Knife':
				setButtonState(e, 114, othersButtons);
				break;
			
			case 'Plate':
				setButtonState(e, 115, othersButtons);
				break;
			
			case 'Spoon':
				setButtonState(e, 116, othersButtons);
				break;
	
			//Dinner, Lunch: Meal
			case 'Curd':
				setButtonState(e, 117, othersButtons);
				break;
			
			case 'Curry':
				setButtonState(e, 118, othersButtons);
				break;
			
			case 'Dal':
				setButtonState(e, 119, othersButtons);
				break;
			
			case 'Khichdi':
				setButtonState(e, 120, othersButtons);
				break;
			
			case 'NonVeg':
				setButtonState(e, 121, othersButtons);
				break;
			
			case 'Pizza':
				setButtonState(e, 122, othersButtons);
				break;
			
			case 'Rice':
				setButtonState(e, 123, othersButtons);
				break;
			
			case 'Roti':
				setButtonState(e, 124, othersButtons);
				break;
				
			//Fruit
			case 'Apple':
				setButtonState(e, 125, othersButtons);
				break;
			
			case 'Banana':
				setButtonState(e, 126, othersButtons);
				break;
			
			case 'Grapes':
				setButtonState(e, 127, othersButtons);
				break;
			
			case 'Guava':
				setButtonState(e, 128, othersButtons);
				break;
			
			case 'Mango':
				setButtonState(e, 129, othersButtons);
				break;
			
			case 'Orange':
				setButtonState(e, 130, othersButtons);
				break;
			
			case 'Pineapple':
				setButtonState(e, 131, othersButtons);
				break;
			
			case 'Pomegranate':
				setButtonState(e, 132, othersButtons);
				break;
			
			case 'Watermelon':
				setButtonState(e, 133, othersButtons);
				break;
			
			//Lunch menu is same as dinner: check one set up
		
			//Fruit
			case 'Biscuits':
				setButtonState(e, 134, othersButtons);
				break;
			
			case 'Chats':
				setButtonState(e, 135, othersButtons);
				break;
			
			case 'Chocolate':
				setButtonState(e, 136, othersButtons);
				break;
			
			case 'IceCream':
				setButtonState(e, 137, othersButtons);
				break;
			
			case 'NonVeg':
				setButtonState(e, 138, othersButtons);
				break;
			
			case 'Noodles':
				setButtonState(e, 139, othersButtons);
				break;
			
			case 'Pasteries':
				setButtonState(e, 140, othersButtons);
				break;
			
			case 'Sweets':
				setButtonState(e, 141, othersButtons);
				break;
			
			case 'Wafers':
				setButtonState(e, 142, othersButtons);
				break;

		//Play
			case 'Music':
				setButtonState(e, 143, othersButtons);
				break;
			
			case 'OutdoorGames':
				setButtonState(e, 144, othersButtons);
				break;
			
			case 'Puzzles':
				setButtonState(e, 145, othersButtons);
				break;
			
			case 'Toys':
				setButtonState(e, 146, othersButtons);
				break;
			
			case 'TV':
				setButtonState(e, 147, othersButtons);
				break;
			
			case 'VideoGames':
				setButtonState(e, 148, othersButtons);
				break;

			//Music
			case 'ChangeMusic':
				setButtonState(e, 149, othersButtons);
				break;
			
			case 'LetsDance':
				setButtonState(e, 150, othersButtons);
				break;
			
			case 'VolumeUp':
				setButtonState(e, 151, othersButtons);
				break;
			
			case 'VolumeDown':
				setButtonState(e, 152, othersButtons);
				break;
			
			//Outdoor Games
			case 'Cars':
				setButtonState(e, 153, othersButtons);
				break;
			
			case 'Garden':
				setButtonState(e, 154, othersButtons);
				break;
			
			case 'Swing':
				setButtonState(e, 155, othersButtons);
				break;
			
			case 'Terrace':
				setButtonState(e, 156, othersButtons);
				break;
			
			case 'Walk':
				setButtonState(e, 157, othersButtons);
				break;
			
			//Toys
			case 'Cars':
				setButtonState(e, 158, othersButtons);
				break;
			
			case 'ActionFigures':
				setButtonState(e, 159, othersButtons);
				break;
			
			case 'PlayWithMe':
				setButtonState(e, 160, othersButtons);
				break;
			
			case 'SoftToys':
				setButtonState(e, 161, othersButtons);
				break;

			//TV
			case 'NextChannel':
				setButtonState(e, 162, othersButtons);
				break;
			
			case 'PreviousChannel':
				setButtonState(e, 163, othersButtons);
				break;
			
			case 'VolumeUp':
				setButtonState(e, 164, othersButtons);
				break;
			
			case 'VolumeDown':
				setButtonState(e, 165, othersButtons);
				break;
				
			//Video Games

			//People
			case 'Dad':
				setButtonState(e, 166, othersButtons);
				break;
			
			case 'Mom':
				setButtonState(e, 167, othersButtons);
				break;
			
			case 'Brother':
				setButtonState(e, 168, othersButtons);
				break;
			
			case 'Sister':
				setButtonState(e, 169, othersButtons);
				break;
			
			case 'Friends':
				setButtonState(e, 170, othersButtons);
				break;
			
			case 'Teacher':
				setButtonState(e, 171, othersButtons);
				break;
			
			case 'Nurse':
				setButtonState(e, 172, othersButtons);
				break;
			
			case 'Doctor':
				setButtonState(e, 173, othersButtons);
				break;

		//Others Button
			case 'Clothes':
				setButtonState(e, 174, othersButtons);
				break;
			
			case 'Emergency':
				setButtonState(e, 175, othersButtons);
				break;
			
			case 'Hygiene':
				setButtonState(e, 176, othersButtons);
				break;
			
			case 'School':
				setButtonState(e, 177, othersButtons);
				break;
			
			case 'Sleep':
				setButtonState(e, 178, othersButtons);
				break;
			
			case 'Time':
				setButtonState(e, 179, othersButtons);
				break;

			//Clothes
			case 'ChangeFootwear':
				setButtonState(e, 180, othersButtons);
				break;
			
			case 'ChangeInnerwear':
				setButtonState(e, 181, othersButtons);
				break;
			
			case 'ChangeJeans':
				setButtonState(e, 182, othersButtons);
				break;
			
			case 'ChangeTShirt':
				setButtonState(e, 183, othersButtons);
				break;
			
			case 'WearNightClothes':
				setButtonState(e, 184, othersButtons);
				break;
			
			//Emergency
			case 'Bandage':
				setButtonState(e, 185, othersButtons);
				break;
			
			case 'Help':
				setButtonState(e, 186, othersButtons);
				break;
			
			case 'Medicine':
				setButtonState(e, 187, othersButtons);
				break;
			
			//Hygiene
			case 'Bath':
				setButtonState(e, 188, othersButtons);
				break;
			
			case 'Brush':
				setButtonState(e, 189, othersButtons);
				break;
			
			case 'Facewash':
				setButtonState(e, 190, othersButtons);
				break;
			
			case 'Toilet':
				setButtonState(e, 191, othersButtons);
				break;
			
			case 'Vomit':
				setButtonState(e, 192, othersButtons);
				break;
			
			//School
			case 'Bag':
				setButtonState(e, 193, othersButtons);
				break;
			
			case 'Books':
				setButtonState(e, 194, othersButtons);
				break;
			
			case 'Bottle':
				setButtonState(e, 195, othersButtons);
				break;
			
			case 'DontWantToGo':
				setButtonState(e, 196, othersButtons);
				break;
			
			case 'HomeWork':
				setButtonState(e, 197, othersButtons);
				break;
			
			//Sleep
			case 'Door':
				setButtonState(e, 198, othersButtons);
				break;
			
			case 'Fan':
				setButtonState(e, 199, othersButtons);
				break;
			
			case 'FeelingCold':
				setButtonState(e, 200, othersButtons);
				break;
			
			case 'FeelingWarm':
				setButtonState(e, 201, othersButtons);
				break;
			
			case 'Light':
				setButtonState(e, 202, othersButtons);
				break;
			
			case 'Window':
				setButtonState(e, 203, othersButtons);
				break;
			
			//Time
			case 'Afternoon':
				setButtonState(e, 204, othersButtons);
				break;
			
			case 'CurrentTime':
				setButtonState(e, 205, othersButtons);
				break;
			
			case 'Evening':
				setButtonState(e, 206, othersButtons);
				break;
			
			case 'Morning':
				setButtonState(e, 207, othersButtons);
				break;
			
			case 'Night':
				setButtonState(e, 208, othersButtons);
				break;
			
			case 'Tomorrow':
				setButtonState(e, 209, othersButtons);
				break;
			
			case 'Yesterday':
				setButtonState(e, 210, othersButtons);
				break;
			
			default:
				//do nothing
		}
	} else {
		//User did not clicked on a button
		//Do nothing
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
			soundPath('media/learning/addon/Butter.mp3');
		} else if (actionButtonState == 94){
			//If 'Jam'
			soundPath('media/learning/addon/Jam.mp3');
		} else if (actionButtonState == 95){
			//If 'Masala'
			soundPath('media/learning/addon/Masala.mp3');
		} else if (actionButtonState == 96){
			//If 'Pepper'
			soundPath('media/learning/addon/Pepper.mp3');
		} else if (actionButtonState == 97){
			//If 'Pickle'
			soundPath('media/learning/addon/Pickle.mp3');
		} else if (actionButtonState == 98){
			//If 'Salt'
			soundPath('media/learning/addon/Salt.mp3');
		} else if (actionButtonState == 99){
			//If 'Sauce'
			soundPath('media/learning/addon/Sauce.mp3');
		} else if (actionButtonState == 100){
			//If 'Sugar'
			soundPath('media/learning/addon/Sugar.mp3');
		} else if (actionButtonState == 101){
			//If 'Juice'
			soundPath('media/learning/beverage/Juice.mp3');
		} else if (actionButtonState == 102){
			//If 'Milk'
			soundPath('media/learning/beverage/Milk.mp3');
		} else if (actionButtonState == 103){
			//If 'Milkshake'
			soundPath('media/learning/beverage/MilkShakes.mp3');
		} else if (actionButtonState == 104){
			//If 'Tea'
			soundPath('media/learning/beverage/Tea.mp3');
		} else if (actionButtonState == 105){
			//If 'Bread'
			soundPath('media/learning/breakfast/Bread.mp3');
		} else if (actionButtonState == 106){
			//If 'Cornflakes'
			soundPath('media/learning/breakfast/Cornflakes.mp3');
		} else if (actionButtonState == 107){
			//If 'Eggs'
			soundPath('media/learning/breakfast/Eggs.mp3');
		} else if (actionButtonState == 108){
			//If 'Milk'
			soundPath('media/learning/breakfast/Milk.mp3');
		} else if (actionButtonState == 109){
			//If 'Porridge'
			soundPath('media/learning/breakfast/Porridge.mp3');
		} else if (actionButtonState == 110){
			//If 'Rice'
			soundPath('media/learning/breakfast/Rice.mp3');
		}
	}
	
})



/* Button creation function */
function createButtons(data){
	
	for (var i = 0; i < data.length; i++){
		//Creating each button
		var button  = Titanium.UI.createImageView({
			image:  data[i].path,
			height: 90,
			width: 90,
			top: 20+90*i+20*i,
			title : data[i].title,
			type: 'action',
			value: 1
		});
		
		//Adding the buttons to the center view
		centerButtons.add(button);
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
		button.source.backgroundColor = '#333';
	} else if (temp == 2){
		
		if(actionButtonState == buttonNo){
			//Load inner page
			removeAllChildren(centerButtons);
			createButtons(nextLevelButtons);
			
			inside = true;
		}
		
		temp = 1;
		button.source.backgroundColor = null;
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


function setMainBtnState(e, firstBtnState, secBtnState){
	if(e.source.value == 1){
					
		mainButtonState = firstBtnState;
		
		e.source.value = 2;
		e.source.backgroundColor = '#333';
	} else if (e.source.value == 2){
		
		mainButtonState = secBtnState;
		
		e.source.value = 1;
		e.source.backgroundColor = null;
	} else {
		//Some other click: :'(
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
