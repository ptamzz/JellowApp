/* This file contains all the functions */


function createButtons(data){
	/* mainButtonState = 'dontPlay';
	actionButtonState = null;	//Which action button is currently active 
	
	audio = null;
	
	Ti.API.info("Test: " + audio); */


	var gridWidth, column = 0, i = 0, numColumns = 0, numRows = 0, temp = 1;
	
	//Determing with of scrollview area
	scrollViewWidth = detectedWidth - 220;
		
	/*
	 * Determine how many buttons will fit in a row
	 * Total width = 90*x + 20*(x+1); where x is the number of buttons per row
	 * 5px on extreme left & right each
	 */
	
	while(temp <= data.length){

		if((90*temp + 20*(temp-1) + (5*2)) > scrollViewWidth) {
			
			numColumns = (temp == 1 ? temp : temp-1); 		//No. of columns
			
			gridWidth = 90*numColumns + 20*(numColumns-1) + (5*2);	//Total width of the columns
			
			break;
		} else {
			//If all buttons fit within one row
			numColumns = temp;
			gridWidth = detectedWidth - 220 - 10;
			
		}
		
		temp++;
	}		
	
	
	while(i < data.length){
		
		//Decide where to add the buttons (top,left) coordinates
		left = 5 + (column*90) + (column*20);
		top =  20 + (90 + 20)*numRows;
		
		if(column < numColumns-1){
			column++;		//New column
		} else {
			column = 0;		//Reset Column no.
			numRows++;		//New Row
		}


		//Add buttons to the centerButtons View
			//Creating each button
			btn[i]  = Titanium.UI.createImageView({
				image:  data[i].path,
				height: 90,
				width: 90,
				top: top,
				left: left,
				title : data[i].title,
				type: 'action',
				value: 1
			});
			
			btn[i].addEventListener('click',changeState);
		
			//Adding the buttons to the center view
			centerButtons.add(btn[i]);

		i++;
	}

	//Calculating to put centerButtons within the center of the ScrollView 
	centerButtons.left = (detectedWidth/2) - (gridWidth/2);  //subtract half the centerButtons view width from half the device width
	centerButtons.width = gridWidth;

	scrollView.height = top + 150;
	centerButtons.height = top + 150;
	
	Ti.API.info("Height: " + (top + 150));
	Ti.API.info("");
	
	//Scroll to top
	scrollView.setContentOffset({x:0 ,y:0});
	
}


/* Button creation function */
function createButtonsVV(data){
	
	var height = 20, leftMargin = 120, counter = 1, set = true, tempWidth = 0, grid = 0;
	
	//Ti.API.info("createButtons: dWidth = " + detectedWidth + ", dHeight = " + detectedHeight);
	
	Ti.API.info("Nos of Buttons: " + data.length);
	
	for (var i = 0; i < data.length; i++){
		
		//LeftMargin is buttonWidth + Margin on left
		//DetectedWidth - 220 = width of the category buttons (scrollView Content)
		if(leftMargin*(grid+1) > detectedWidth-220){
			
			
			//Get total width (only required for the first row)
			if(set){
				if(i == 0) {
					tempWidth = 90;
				} else {
					tempWidth = leftMargin*grid;
					
					Ti.API.info("TempWidth : " + tempWidth);
					Ti.API.info("");
				}
				
				set = false;
			}
			
			height = ((90+20)*(counter-1)) + 20;		//Distance from top where icons should be
			counter++;	//Next row starts
			
			Ti.API.info("Next Row Top: " + height);
			
			
			leftMargin = 120;						//Reset LeftMargin
			grid = 0;		//No of columns per row
		}
		
			
			Ti.API.info("Button : " + (i+1) + ", Matrix: (" + (grid+1) + "," + counter + "), Height: " + height+ + ", LeftMargin: " + (leftMargin*grid));
			Ti.API.info("");

			
			
			//Creating each button
			btn[i]  = Titanium.UI.createImageView({
				image:  data[i].path,
				height: 90,
				width: 90,
				top: height,
				left: leftMargin*grid,
				title : data[i].title,
				type: 'action',
				value: 1
			});
			
			btn[i].addEventListener('click',changeState);
		
			//Adding the buttons to the center view
			centerButtons.add(btn[i]);

			grid++; //Next column no.
		
		
	}
	
	//Calculating to put centerButtons within the center of the ScrollView 
	centerButtons.left = (detectedWidth/2) - (tempWidth/2);  //subtract half the centerButtons view width from half the device width
	centerButtons.width = tempWidth;

	scrollView.height = height + 150;
	centerButtons.height = height + 150;
	
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


function generateUI(e){

	
	//If orientation is changed, reset views heights & widths
	if(e){
		Ti.API.info("e = True");
		
		//Reset Window dimension
		win.width = detectedWidth;
		win.height = detectedHeight;
		
		//ScrollView
		scrollView.width = detectedWidth;
		scrollView.height = detectedHeight;
		
		//Scrolling buttons at the center
		centerButtons.width = detectedWidth-220;	
		
		//Set main buttons on right to the extreme right
		mainHolderRight.left = detectedWidth-110;

	}
	
	//Add Scrolling view for the buttons in the middle
	scrollView.add(centerButtons);
	
	//Create buttons	
	createButtons(homeButtons);

	//Create Main Buttons 
	createMainButtons(mainButtons);
	
	win.add(mainHolderLeft);
	win.add(mainHolderRight);
	
	win.add(scrollView);
	
	// open tab group
	win.open();
	
}


function clearUI(){
	Ti.API.info("UI Cleared!");
	 
	removeAllChildren(centerButtons);
	
	//Add Scrolling view for the buttons in the middle
	scrollView.remove(centerButtons); 
	win.remove(scrollView);
	
	win.remove(mainHolderLeft);
	win.remove(mainHolderRight);
	
	win.close();
}

function removeAllChildren(viewObject){
    //copy array of child object references because view's "children" property is live collection of child object references
    var children = viewObject.children.slice(0);
 
    for (var i = 0; i < children.length; ++i) {
        viewObject.remove(children[i]);
    }
}