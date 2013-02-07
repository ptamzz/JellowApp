// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


// create base UI tab and root window
var win = Titanium.UI.createWindow({  
    title:'Jellow',
    backgroundColor:'#fff',
});

//Main-Buttons wrapper
var mainHolder = Titanium.UI.createView({
	width:'auto',
	height: 'auto',
	backgroundColor: '#2f453e', //'#7A993D'
	//zIndex: 10
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
	//backgroundColor: '#333'
});

//Scrolling buttons at the center
var centerButtons = Ti.UI.createView({ 
	width: 110,
	height: 'auto',
	top:10 
});


/* Main Buttons' array */
var mainButtons = [
		{ title: 'Like', path: 'images/main_buttons/smiley_like.png'},
		{ title: 'DontLike', path: 'images/main_buttons/smiley_dont_like.png'},
		{ title: 'Yes', path: 'images/main_buttons/tick_yes.png'},
		{ title: 'No', path: 'images/main_buttons/cross_no.png'},
		{ title: 'More', path: 'images/main_buttons/plus_more.png'},
		{ title: 'Less', path: 'images/main_buttons/minus_less.png'}
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
	{ title: 'Learning', path: 'images/home/learning.png'},
	{ title: 'Eating', path: 'images/home/eating.png'},
	{ title: 'Play', path: 'images/home/playing.png'},
	{ title: 'People', path: 'images/home/people.png'},
	{ title: 'Other', path: 'images/home/others.png'}
]

// Learning buttons
var learningButtons =[
	{ title: 'Animals', path: 'images/learning/animals.png'},
	{ title: 'Body', path: 'images/learning/body.png'},
	{ title: 'Books', path: 'images/learning/books.png'},
	{ title: 'Colors', path: 'images/learning/colors.png'},
	{ title: 'HomeObjects', path: 'images/learning/homeobjects.png'},
	{ title: 'Shapes', path: 'images/learning/shapes.png'},
	{ title: 'Stationary', path: 'images/learning/stationary.png'}
]

	// Animals buttons
	var animalsButtons =[
		{ title: 'Ant', path: 'images/learning/animals/ant.png'},
		{ title: 'Cat', path: 'images/learning/animals/cat.png'},
		{ title: 'Cockroach', path: 'images/learning/animals/cockroach.png'},
		{ title: 'Dog', path: 'images/learning/animals/dog.png'},
		{ title: 'Fly', path: 'images/learning/animals/fly.png'},
		{ title: 'Mosquito', path: 'images/learning/animals/mosquito.png'}
	]
	
	// Body buttons
	var bodyButtons =[
		{ title: 'Ears', path: 'images/learning/body/ears.png'},
		{ title: 'Eyes', path: 'images/learning/body/eyes.png'},
		{ title: 'Fingers', path: 'images/learning/body/fingers.png'},
		{ title: 'Hair', path: 'images/learning/body/hair.png'},
		{ title: 'Hand', path: 'images/learning/body/hands.png'},
		{ title: 'Head', path: 'images/learning/body/head.png'},
		{ title: 'Legs', path: 'images/learning/body/legs.png'},
		{ title: 'Mouth', path: 'images/learning/body/mouth.png'},
		{ title: 'Stomach', path: 'images/learning/body/stomach.png'}
	]
	
	// Books buttons
	var booksButtons =[
		{ title: 'BedTimeStories', path: 'images/learning/books/bedtimestories.png'},
		{ title: 'Comics', path: 'images/learning/books/comics.png'},
		{ title: 'DrawingBook', path: 'images/learning/books/drawingbook.png'},
		{ title: 'Maths', path: 'images/learning/books/maths.png'},
		{ title: 'RhymesBook', path: 'images/learning/books/rhymes.png'},
		{ title: 'SchoolNotebook', path: 'images/learning/books/schoolnotebook.png'},
		{ title: 'Words', path: 'images/learning/books/words.png'}
	]
	
	// Colors buttons
	var colorsButtons =[
		{ title: 'Black', path: 'images/learning/colors/black.png'},
		{ title: 'Blue', path: 'images/learning/colors/blue.png'},
		{ title: 'Brown', path: 'images/learning/colors/brown.png'},
		{ title: 'Golden', path: 'images/learning/colors/golden.png'},
		{ title: 'Green', path: 'images/learning/colors/green.png'},
		{ title: 'Red', path: 'images/learning/colors/red.png'},
		{ title: 'Silver', path: 'images/learning/colors/silver.png'},
		{ title: 'White', path: 'images/learning/colors/white.png'},
		{ title: 'Yellow', path: 'images/learning/colors/yellow.png'}
	]
	
	// Home-Object buttons
	var homeObjectsButtons =[
		{ title: 'Chair', path: 'images/learning/homeobjects/chair.png'},
		{ title: 'Door', path: 'images/learning/homeobjects/door.png'},
		{ title: 'Fan', path: 'images/learning/homeobjects/fan.png'},
		{ title: 'Kitchen', path: 'images/learning/homeobjects/kitchen.png'},
		{ title: 'Sofa', path: 'images/learning/homeobjects/sofa.png'},
		{ title: 'Table', path: 'images/learning/homeobjects/table.png'},
		{ title: 'Toilet', path: 'images/learning/homeobjects/toilet.png'},
		{ title: 'Window', path: 'images/learning/homeobjects/window.png'}
	]
	
	// Shapes buttons
	var shapesButtons =[
		{ title: 'Circle', path: 'images/learning/shapes/circle.png'},
		{ title: 'FreeForm', path: 'images/learning/shapes/freeform.png'},
		{ title: 'Line', path: 'images/learning/shapes/line.png'},
		{ title: 'Rectangle', path: 'images/learning/shapes/rectangle.png'},
		{ title: 'Square', path: 'images/learning/shapes/square.png'},
		{ title: 'Triangle', path: 'images/learning/shapes/triangle.png'}
	]
	
	// Stationary buttons
	var stationaryButtons =[
		{ title: 'BlankPaper', path: 'images/learning/stationary/blankpaper.png'},
		{ title: 'ColoredPaper', path: 'images/learning/stationary/coloredpaper.png'},
		{ title: 'Crayons', path: 'images/learning/stationary/crayons.png'},
		{ title: 'Eraser', path: 'images/learning/stationary/eraser.png'},
		{ title: 'Pen', path: 'images/learning/stationary/pen.png'},
		{ title: 'Pencil', path: 'images/learning/stationary/pencil.png'},
		{ title: 'Pouch', path: 'images/learning/stationary/pouch.png'},
		{ title: 'Scale', path: 'images/learning/stationary/scale.png'},
		{ title: 'Sharpener', path: 'images/learning/stationary/sharpener.png'}
	]
	
	
// Eating buttons
var stationaryButtons =[
	{ title: 'AddOns', path: 'images/eating/addons.png'},
	{ title: 'Beverages', path: 'images/eating/beverages.png'},
	{ title: 'Breakfast', path: 'images/eating/breakfast.png'},
	{ title: 'Cutlery', path: 'images/eating/cutlery.png'},
	{ title: 'Dinner', path: 'images/eating/dinner.png'},
	{ title: 'Fruit', path: 'images/eating/fruits.png'},
	{ title: 'Lunch', path: 'images/eating/lunch.png'},
	{ title: 'Snacks', path: 'images/eating/snacks.png'}
]

	// Add-Ons buttons
	var addOnsButtons =[
		{ title: 'Butter', path: 'images/eating/addons/butter.png'},
		{ title: 'Jam', path: 'images/eating/addons/jam.png'},
		{ title: 'Masala', path: 'images/eating/addons/masala.png'},
		{ title: 'Pepper', path: 'images/eating/addons/pepper.png'},
		{ title: 'Pickle', path: 'images/eating/addons/pickle.png'},
		{ title: 'Salt', path: 'images/eating/addons/salt.png'},
		{ title: 'Sauce', path: 'images/eating/addons/sauce.png'},
		{ title: 'Sugar', path: 'images/eating/addons/sugar.png'}
	]
	
	// Beverages buttons
	var beveragesButtons =[
		{ title: 'Juice', path: 'images/eating/beverages/juice.png'},
		{ title: 'Milk', path: 'images/eating/beverages/milk.png'},
		{ title: 'Milkshake', path: 'images/eating/beverages/milkshake.png'},
		{ title: 'Tea', path: 'images/eating/beverages/tea.png'}
	]
	
	// Breakfast buttons
	var breakfastButtons =[
		{ title: 'Bread', path: 'images/eating/breakfast/bread.png'},
		{ title: 'Cornflakes', path: 'images/eating/breakfast/cornflakes.png'},
		{ title: 'Eggs', path: 'images/eating/breakfast/eggs.png'},
		{ title: 'Milk', path: 'images/eating/breakfast/milk.png'},
		{ title: 'Porridge', path: 'images/eating/breakfast/porridge.png'},
		{ title: 'Rice', path: 'images/eating/breakfast/rice.png'}
	]
	
	// Cutlery buttons
	var cutleryButtons =[
		{ title: 'Bowl', path: 'images/eating/cutlery/bowl.png'},
		{ title: 'Fork', path: 'images/eating/cutlery/fork.png'},
		{ title: 'Glass', path: 'images/eating/cutlery/glass.png'},
		{ title: 'Knife', path: 'images/eating/cutlery/knife.png'},
		{ title: 'Plate', path: 'images/eating/cutlery/plate.png'},
		{ title: 'Spoon', path: 'images/eating/cutlery/spoon.png'}
	]
	
	// Meal: Dinner/Lunch buttons
	var mealButtons =[
		{ title: 'Curd', path: 'images/eating/meal/curd.png'},
		{ title: 'Curry', path: 'images/eating/meal/curry.png'},
		{ title: 'Dal', path: 'images/eating/meal/dal.png'},
		{ title: 'Khichdi', path: 'images/eating/meal/khichdi.png'},
		{ title: 'NonVeg', path: 'images/eating/meal/nonveg.png'},
		{ title: 'Pizza', path: 'images/eating/meal/pizza.png'},
		{ title: 'Rice', path: 'images/eating/meal/rice.png'},
		{ title: 'Roti', path: 'images/eating/meal/roti.png'}
	]
	
	// Fruits buttons
	var fruitsButtons =[
		{ title: 'Apple', path: 'images/eating/fruits/apple.png'},
		{ title: 'Banana', path: 'images/eating/fruits/banana.png'},
		{ title: 'Grapes', path: 'images/eating/fruits/grapes.png'},
		{ title: 'Guava', path: 'images/eating/fruits/guava.png'},
		{ title: 'Mango', path: 'images/eating/fruits/mango.png'},
		{ title: 'Orange', path: 'images/eating/fruits/orange.png'},
		{ title: 'Pineapple', path: 'images/eating/fruits/pineapple.png'},
		{ title: 'Pomegranate', path: 'images/eating/fruits/pomegranate.png'},
		{ title: 'Watermelon', path: 'images/eating/fruits/watermelon.png'}
	]
	
	// Fruits buttons
	var snacksButtons =[
		{ title: 'Biscuits', path: 'images/eating/snacks/biscuits.png'},
		{ title: 'Chats', path: 'images/eating/snacks/chats.png'},
		{ title: 'Chocolate', path: 'images/eating/snacks/chocolate.png'},
		{ title: 'IceCream', path: 'images/eating/snacks/icecream.png'},
		{ title: 'NonVeg', path: 'images/eating/snacks/nonveg.png'},
		{ title: 'Noodles', path: 'images/eating/snacks/noodles.png'},
		{ title: 'Pasteries', path: 'images/eating/snacks/pasteries.png'},
		{ title: 'Sweets', path: 'images/eating/snacks/sweets.png'},
		{ title: 'Wafers', path: 'images/eating/snacks/wafers.png'}
	]
	

// Play buttons
var playButtons =[
	{ title: 'Music', path: 'images/play/music.png'},
	{ title: 'OutdoorGames', path: 'images/play/outdoorgames.png'},
	{ title: 'Puzzles', path: 'images/play/puzzles.png'},
	{ title: 'Toys', path: 'images/play/toys.png'},
	{ title: 'TV', path: 'images/play/tv.png'},
	{ title: 'VideoGames', path: 'images/play/videogames.png'}
]

	// Music buttons
	var musicButtons =[
		{ title: 'ChangeMusic', path: 'images/play/music/changemusic.png'},
		{ title: 'LetsDance', path: 'images/play/music/letsdance.png'},
		{ title: 'VolumeUp', path: 'images/play/music/volumeup.png'},
		{ title: 'VolumeDown', path: 'images/play/music/volumedown.png'}
	]
	
	// Outdoor-Games buttons
	var outdoorGamesButtons =[
		{ title: 'Cars', path: 'images/play/outdoorgames/cars.png'},
		{ title: 'Garden', path: 'images/play/outdoorgames/garden.png'},
		{ title: 'Swing', path: 'images/play/outdoorgames/swing.png'},
		{ title: 'Terrace', path: 'images/play/outdoorgames/terrace.png'},
		{ title: 'Walk', path: 'images/play/outdoorgames/walk.png'}
	]

	// Toys buttons
	var toysButtons =[
		{ title: 'ActionFigures', path: 'images/play/toys/actionfigures.png'},
		{ title: 'Cars', path: 'images/play/toys/cars.png'},
		{ title: 'PlayWithMe', path: 'images/play/toys/playwithme.png'},
		{ title: 'SoftToys', path: 'images/play/toys/softtoys.png'}
	]
	
	// TV buttons
	var tvButtons =[
		{ title: 'NextChannel', path: 'images/play/tv/nextchannel.png'},
		{ title: 'PreviousChannel', path: 'images/play/tv/previouschannel.png'},
		{ title: 'VolumeUp', path: 'images/play/music/volumeup.png'},
		{ title: 'VolumeDown', path: 'images/play/music/volumedown.png'}
	]
	

// People buttons
var peopleButtons =[
	{ title: 'Dad', path: 'images/people/dad.png'},
	{ title: 'Mom', path: 'images/people/mom.png'},
	{ title: 'Brother', path: 'images/people/brother.png'},
	{ title: 'Sister', path: 'images/people/sister.png'},
	{ title: 'Friends', path: 'images/people/friends.png'},
	{ title: 'Teacher', path: 'images/people/teacher.png'},
	{ title: 'Nurse', path: 'images/people/nurse.png'},
	{ title: 'Doctor', path: 'images/people/doctor.png'}
]

// Others buttons
var othersButtons =[
	{ title: 'Clothes', path: 'images/others/clothes.png'},
	{ title: 'Emergency', path: 'images/others/emergency.png'},
	{ title: 'Hygiene', path: 'images/others/hygiene.png'},
	{ title: 'School', path: 'images/others/school.png'},
	{ title: 'Sleep', path: 'images/others/sleep.png'},
	{ title: 'Time', path: 'images/others/clock.png'}
]

	// Clothes buttons
	var clothesButtons =[
		{ title: 'ChangeFootwear', path: 'images/others/clothes/changefootwear.png'},
		{ title: 'ChangeInnerwear', path: 'images/others/clothes/changeinnerwear.png'},
		{ title: 'ChangeJeans', path: 'images/others/clothes/changejeans.png'},
		{ title: 'ChangeTShirt', path: 'images/others/clothes/changetshirt.png'},
		{ title: 'WearNightClothes', path: 'images/others/clothes/wearnightclothes.png'}
	]
	
	// Emergency buttons
	var emergencyButtons =[
		{ title: 'Bandage', path: 'images/others/emergency/bandage.png'},
		{ title: 'Help', path: 'images/others/emergency/help.png'},
		{ title: 'Medicine', path: 'images/others/emergency/medicine.png'}
	]
	
	// Hygiene buttons
	var hygieneButtons =[
		{ title: 'Bath', path: 'images/others/hygiene/bath.png'},
		{ title: 'Brush', path: 'images/others/hygiene/brush.png'},
		{ title: 'Facewash', path: 'images/others/hygiene/facewash.png'},
		{ title: 'Toilet', path: 'images/others/hygiene/toilet.png'},
		{ title: 'Vomit', path: 'images/others/hygiene/vomit.png'}
	]
	
	// School buttons
	var schoolButtons =[
		{ title: 'Bag', path: 'images/others/school/bag.png'},
		{ title: 'Books', path: 'images/others/school/books.png'},
		{ title: 'Bottle', path: 'images/others/school/bottle.png'},
		{ title: 'DontWantToGo', path: 'images/others/school/dontwanttogo.png'},
		{ title: 'HomeWork', path: 'images/others/school/homework.png'}
	]
	
	// Sleep buttons
	var sleepButtons =[
		{ title: 'Door', path: 'images/others/sleep/door.png'},
		{ title: 'Fan', path: 'images/others/sleep/fan.png'},
		{ title: 'FeelingCold', path: 'images/others/sleep/feelingcold.png'},
		{ title: 'Light', path: 'images/others/sleep/light.png'},
		{ title: 'Window', path: 'images/others/sleep/window.png'}
	]
	
	// Time buttons
	var timeButtons =[
		{ title: 'Afternoon', path: 'images/others/time/afternoon.png'},
		{ title: 'CurrentTime', path: 'images/others/time/currenttime.png'},
		{ title: 'Evening', path: 'images/others/time/evening.png'},
		{ title: 'Morning', path: 'images/others/time/morning.png'},
		{ title: 'Night', path: 'images/others/time/night.png'},
		{ title: 'Tomorrow', path: 'images/others/time/tomorrow.png'},
		{ title: 'Yesterday', path: 'images/others/time/yesterday.png'}
	]

//Create buttons	
createButtons(learningButtons);

var whichView = null;

//Sound file handing through user click event
win.addEventListener('click', function(e){
	//alert(e.source.type + " " + e.source.title + " " + e.source.value);
	
	//Get which button the user clicked
	var whichView = e.source.title;
	
	if(e.source.type == 'main'){
		
		//User clicked on any of the main buttons
		switch(whichView){
			case 'Like':
				//Check first click or second click
				if(e.source.value == 1){
					//First Click: Play first sound
					var audio = Ti.Media.createSound({
						url: 'media/home/like.mp3'
					})
					e.source.value = 2;
					e.source.backgroundColor = '#333';
				} else if (e.source.value == 2){
					//Second click: Play second sound
					var audio = Ti.Media.createSound({
						url: 'media/home/reallyLike.mp3'
					})
					e.source.value = 1;
					e.source.backgroundColor = null;
				} else {
					//Some other click: :'(
				}
				
				audio.play(); //Play Audio
				break;
			
			case 'Yes':
				//Check first click or second click
				if(e.source.value == 1){
					//First Click: Play first sound
					var audio = Ti.Media.createSound({
						url: 'media/home/yes.mp3'
					})
					e.source.value = 2;
					e.source.backgroundColor = '#333';
				} else if (e.source.value == 2){
					//Second click: Play second sound
					var audio = Ti.Media.createSound({
						url: 'media/home/reallyYes.mp3'
					})
					e.source.value = 1;
					e.source.backgroundColor = null;
				} else {
					//Some other click: :'(
				}
				
				audio.play(); //Play Audio
				break;
			
			case 'More':
				//Check first click or second click
				if(e.source.value == 1){
					//First Click: Play first sound
					var audio = Ti.Media.createSound({
						url: 'media/home/more.mp3'
					})
					e.source.value = 2;
					e.source.backgroundColor = '#333';
				} else if (e.source.value == 2){
					//Second click: Play second sound
					var audio = Ti.Media.createSound({
						url: 'media/home/reallyMore.mp3'
					})
					e.source.value = 1;
					e.source.backgroundColor = null;
				} else {
					//Some other click: :'(
				}
				
				audio.play(); //Play Audio
				break;
			
			case 'DontLike':
				//Check first click or second click
				if(e.source.value == 1){
					//First Click: Play first sound
					var audio = Ti.Media.createSound({
						url: 'media/home/dontLike.mp3'
					})
					e.source.value = 2;
					e.source.backgroundColor = '#333';
				} else if (e.source.value == 2){
					//Second click: Play second sound
					var audio = Ti.Media.createSound({
						url: 'media/home/reallyDontLike.mp3'
					})
					e.source.value = 1;
					e.source.backgroundColor = null;
				} else {
					//Some other click: :'(
				}
				
				audio.play(); //Play Audio
				break;
			
			case 'No':
				//Check first click or second click
				if(e.source.value == 1){
					//First Click: Play first sound
					var audio = Ti.Media.createSound({
						url: 'media/home/no.mp3'
					})
					e.source.value = 2;
					e.source.backgroundColor = '#333';
				} else if (e.source.value == 2){
					//Second click: Play second sound
					var audio = Ti.Media.createSound({
						url: 'media/home/reallyNo.mp3'
					})
					e.source.value = 1;
					e.source.backgroundColor = null;
				} else {
					//Some other click: :'(
				}
				
				audio.play(); //Play Audio
				break;
			
			case 'Less':
				//Check first click or second click
				if(e.source.value == 1){
					//First Click: Play first sound
					var audio = Ti.Media.createSound({
						url: 'media/home/less.mp3'
					})
					e.source.value = 2;
					e.source.backgroundColor = '#333';
				} else if (e.source.value == 2){
					//Second click: Play second sound
					var audio = Ti.Media.createSound({
						url: 'media/home/reallyLess.mp3'
					})
					e.source.value = 1;
					e.source.backgroundColor = null;
				} else {
					//Some other click: :'(
				}
				
				audio.play(); //Play Audio
				break;
			
			default:
				//Catch outlier
		}
	} else if (e.source.type == 'action'){
		//User clicked on any of the action buttons (center buttons)
		
	} else {
		//User did not clicked on a button
		//Do nothing
	}
	var whichView = e.source.title;
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
	

//Add Scrolling view for the buttons in the middle
scrollView.add(centerButtons); 

//Add button wrappers and scroller
win.add(mainHolder);
win.add(scrollView);

// open tab group
win.open();
