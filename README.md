# Paroxysm Matching Game
### 2023/09/20 - Elevator Pitch

My website will be a simple matching card game made to test your memory.

![cards](https://github.com/QuakerOatsGuy/startup/assets/66216150/53fb4503-7066-4009-9a84-9cf10797fd91)

This game will have the user choose a set of two cards out of a grid. If they match, the user scores a point. If they don't, the user has to try again.
Scores will be calculated using the amount of time the player took to uncover all of the cards, and they will be posted on a leaderboard. It will utilize image APIs and a custom image collection to make sure that no two games are ever the same!

### Key Features
- Logging in to record your progress
- Gameplay using randomized images
- Ability to see other player's progress in real time
- A scoreboard that users can sort by total score, average score,

### Technologies

These are the technologies this website will utilize:

- **HTML** - Used for the main layout of the website. Will have a login page as well as a game page, a leaderboard page, and a developer blog.
- **CSS** - Will be used for the card animations, such as flipping cards over and dispersing them from a deck.
- **JavaScript** - Will handle login as well as the game's logic.
- **Service** - A backend service will handle recording player usernames and scores for the scoreboard.
- **DB** - A database server will handle the leaderboard and user login information.
- **Login** - Users will have to login to save their progress and join the leaderboard.
- **WebSocket** - If you are playing at the same time as someone else, you will get live updates on their game.
- **React** - The website will use the React framework.




# UPDATES:
## 2023/09/13
Learned how to use Git and Github


## 2023/09/26
I've actually taken this class once before, so I adapted some of my old work into the new website project!
This update was focused on HTML, so I used my old CSS theme and created new HTML pages. I added an index page for testing CSS, a game page, an about page, and a leaderboard.
Next, I'll focus on the CSS theme and making the website look nice. I want to use a windows 98-style theme, like [98.css](https://jdan.github.io/98.css/), and my biggest inspiration is [Joel G's Merch Website](https://joelgc.com/). The git repository does not have most of the media I featured in my website (such as a few audio files and fonts) to conserve space. I have a bit of a stretch goal - a background music player!

## 2023/10/26
I've added Javascript to my website! Now the game can actually be played. There are a few glitches and temporary placeholders here and there, but I will fix them later on.
Now you can actually play the matching game in the game tab!

## 2023/11/11
Today I initalized the startup with Node.js and express to work as an HTTP service. I still don't have a definite grasp on it, but I've figured out how to get the website working with it running. I've successfully gotten all the assignment requirements done, so that's good, but it will take more time to understand this aspect of the website. This area is super important to me because the last time I tried making a website, this is where I got stuck.
Next, I need to fix the matching game logic, replace the numbers with images, and then add HTTP calls to push things like score, player time, and player accuracy to a database.

## 2023/11/30
Still a bit behind, but I've made it so that actual images show up in the card game, not just numbers! I'm going to put all my energy into finishing Simon, then backport the new simon features to my website. I still need to implement database calls, websocket, and some other stuff. It's just like me to pile everything on at the last minute, but oh well.

## 2023//12/11
Today I worked really hard and fixed the website login! Now it tells the database when you create a new account and it can pull your information out of the database to the front end. Next I need to fix the formatting of the login page, make it so you can actually win the game, and get the database to communicate with the game. I should have the website finished within this week!