# Game-Design-Pizza-Crusader

UWO Game Design project.

#Game Summary

In a simpler time long ago, your family controlled the most successful pizza empire in all of Salem, the Pizza Crusader. Yet, as the years went by, a struggle for power emerged within the city as countless other pizza empires rushed to make their claim on the city’s regions. The battle for pizza and power raged on and slowly sent the Pizza Crusader empire into downfall and ruin, leaving Salem divided. Can you return the Pizza Crusader empire to its former glory and take back the lands it once ruled?
Pizza Crusader: A Slice of Power is an economic region-based single-player/multi-player strategy game which uses a simultaneous turn-based system which its essence from the region conquest style games which value tactical decisions through the use of a simplified turn-based economic system based upon the amount and power of a player’s held franchise regions.
Through their intuition and strategic might, players will be able to conquer opposing regions and defend those under their own control in a battle for pizza and power within the city’s regions so that they might become the supreme pizza empire of Salem. Complex and rewarding gameplay decisions allow for endless replayability and enjoyment, providing ample gaming experiences to a wide spectrum of gamer types. From casual game players looking for a few minutes of fun, to those whom want to be the very best franchise empire creators, Pizza Crusader has it all. 


#Build
This is only necessary if you wish to install the game on a phone, which is not the preferred method for testing this game.

If you wish to build the application, Phonegap will need to be installed. Follow the instructions on http://phonegap.com/install/ to install phonegap on your local computer. After installing Phonegap, follow the instructions on http://docs.phonegap.com/en/edge/guide_platforms_android_index.md.html#Android%20Platform%20Guide to install the Android developer tools and build/run the application from source.

#Install - Phone
pizza-crusader.apk has been provided that can be installed on any Android device. Copy the apk file onto your device and open it using the file explorer to allow for install.

If you do not have an Android device, an Android emulator can be used. Follow the steps present on http://developer.android.com/tools/devices/index.html on how to install an emulator on your computer.


#Execute
There are 3 ways you can execute the game. The preferred method of running this application is through the browser. Running the game on the phone requires the build and install steps described above.

##Browser - Preferred Method
Simply opening the index.html provided in the www/ folder of the source will open the game. This is the quickest way to start playing the game.

##Phone
After the install process, Pizza Crusader will appear in the app drawer of your phone. Clicking this icon will launch and play the game.

##PhoneGap Emulator
A web server(such as apache, PHP, or python) needs to be started in the www/ folder in the given source. Go to http://emulate.phonegap.com/ and enter in ip address of the new server started(usually localhost:8080). This site allows you to mock an android device and run the game directly from the source.

#Tutorial
The main screen is present after the application is launched. From here, clicking on any of the buttons present will navigate to the respective screen. The back button on top of each screen will allow you to go back to the previous screen.

##High Scores - Mocked
This shows the high scores of all the players in the game. 

##Store - Mocked
This allows the player to purchase upgrades that can be used in game

##About
This screen displays the backstory to the game.

##Play Game
Clicking this button will take the player into matchmaking. Matchmaking matches the player with 3 other players of equal skill. In this prototype, the matchmaking is mocked and 3 bots are assigned to the game. 
From this point on, the player can continue and click "Play Game" or return to the main menu by clicking "Back".

###In Game
The game has 3 main states. Pre, Round, and End. The current state of the game is displayed at the bottom of the screen.

####User Interface
At the top left is a timer that indicates how much time is left in the current game state. The top right corner has an 'X' button which lets the player quit the current game and return to the main menu.

At the bottom, the current game state is shown as well as a pizza icon and a red bar icon. The number beside the pizza icon indicates how many resources the player has remaining. The red bar icon is mocked.

The corners of the game board are colour coded to indicate which is the controlling player of the zone. The top left is where the player starts and is colour coded red.

####Pre Round
This state displays a brief summary of the current state of the game. The player cannot interact with the game board at this time.

####Round
This is the state where the player can send deliveries to neighbouring zones. The player's zones are shown in the color red. In order to deliver pizzas to other zones, the player clicks on the neighbouring zones and hits the +1 button.
In order to remove deliveries from a zone, the user clicks on the -1 button. 
The +1 and -1 button are disabled if the user does not have enough resources of there are no resources left. 

After the timer reaches 0, the game processes data and updates the zones to indicate their new owners. At this point, the game goes back to the pre round state unless the game is over in which the end state is invoked.

####End
This state is only reached when all the zones are conquered by a single player or there are no rounds left. When entering this state, a popup is displayed which indicates the winner and how many zones they controlled. 

#Prototype State
We focused on functionality rather than graphical design for this type. This means that non-gameplay elements have been mocked. 
The elements that are mocked in the game include the high scores, store, matchmaking, and multiplayer components.

As for implemented functionality, the player can play a game of Pizza Crusader with a simple AI.
All core gameplay mechanics have been implemented which includes the ability to deliver to neighbouring zones, ability to conquer zones, and ofcourse the ability to win the game.


##Future Plans
Future updates would include better visualization of graphics to bring them more into line with the medieval theme of Pizza Crusader as described in the pitch documentation. This would be done by themeing the UI elements.

The mocked out functionality would also be implemented as described in the TDD.  One of the main features is a randomly generated map which is currently not present.
Sounds and music that would normally be present in the game would also be included to round out the gameplay experience.

#Credits
Created by Jon Demelo and Ramesh Raj

