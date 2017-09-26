//6. Make a JavaScript file named `liri.js`.
var inquirer = require('inquirer');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var action = process.argv[2]

//7. At the top of the `liri.js` file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
var twitterKeys = require("./keys.js");
//console.log (twitterKeys);

//8. Make it so liri.js can take in one of the following commands:
switch (action) {

  // * `my-tweets`
  case "my-tweets":
  

 
 var client = new Twitter({
   consumer_key: twitterKeys.consumer_key,
   consumer_secret: twitterKeys.consumer_secret,
   access_token_key: twitterKeys.access_token_key,
   access_token_secret: twitterKeys.access_token_secret
 });

 var params = {screen_name: "joeyfboone"};
 client.get('statuses/user_timeline', params, function(error, tweets, response) {


   if (!error) {
     console.log("No Error");
   } 
for (var index = 0; index < 20; index++) {
  console.log ("TWEET :", tweets[index].text);
  console.log ("Created on: ", tweets[index].created_at);
  console.log (" ");
  
}
 
 

  
 });
 break;
 //  * `spotify-this-song`
 case "spotify-this-song":
 fs.readFile("random.txt", "utf8", function(error, data) {
  var song = "";
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      throw error;
    }
  
    // We will then print the contents of data
    console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataARR = data.split(",");
  console.log (dataARR);
    // We will then re-display the content as an array for later use.
    console.log(dataARR +" dataARR");
   song = dataARR[1];
    var spotify = new Spotify({
      id: '45a05553ea724e9d9ac91bc897ade877',
      secret: 'f4498079e8e24d259048787e2d690ddd'
    });
     
    spotify
    
    .search({ type: "track", query: song, limit: 1})
      .then(function(response) {
        console.log(response)
        console.log("Artist: "+response.tracksartists);
        console.log("Song Name: "+ song);
        console.log("Link to Spotify: "+ response.external_urls);
        console.log("Album: "+ response.name);
        console.log("HTML:"+ response.href);


      })
      .catch(function(err) {
        console.log(err);
      });




    
    
  
    
  
  });
  break;
 
 //  * `movie-this`
 case "movie-this":
 var movie = "";
         // Here we grab the text from the input box
        if (process.argv[3] === undefined) {movie = "Mr. Nobody";
          
        } else {
          movie = process.argv[3];
        }
         

// Then run a request to the OMDB API with the movie specified
request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
  
    if (error) {
      throw error;
    }
    // If the request is successful (i.e. if the response status code is 200)
    if (response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      var JSONBody = JSON.parse(body);
      console.log("Title: " + JSONBody.Title);
      console.log("Year: " + JSONBody.Year);
      console.log("IMDB Rating: "+ JSONBody.Ratings[0].Value);
      console.log("RT Rating: "+ JSONBody.Ratings[1].Value);
      console.log("Country: "+ JSONBody.Country);
      console.log("Language: "+ JSONBody.Language);
      console.log("Plot: "+ JSONBody.Plot);
      console.log("Actors: "+ JSONBody.Actors);
    }
  });


                
  break;
}
 // * `do-what-it-says`



//### What Each Command Should Do

//1. `node liri.js my-
  // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
  //   * It should run `spotify- this - song` for "I Want it That Way," as follows the text in `random.txt`.
     
    // * Feel free to change the text in that document to test out the feature for other commands.
//tweets`

  //* This will show your last 20 tweets and when they were created at in your terminal/ bash window.

//2. `node liri.js spotify-this-song '<song name here>'`

//  * This will show the following information about the song in your terminal/ bash window
     
//    * Artist(s)

 //   * The song's name
     
  //    * A preview link of the song from Spotify
     
  //      * The album that the song is from

 //         * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
//   * You will utilize the [node - spotify - api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
//   * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials.You can follow these steps in order to generate a ** client id** and ** client secret**:

//   * Step One: Visit < https://developer.spotify.com/my-applications/#!/>
   
//   * Step Two: Either login to your existing Spotify account or create a new one(a free account is fine) and log in.

 //  * Step Three: Once logged in, navigate to < https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

//   * Step Four: On the next screen, scroll down to where you see your client id and client secret.Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api). See the 

//3. `node liri.js movie-this '<movie name here>'`

 // * This will output the following information to your terminal/ bash window:

//  ```
   //    * Title of the movie.
     //  * Year the movie came out.
     //  * IMDB Rating of the movie.
 //      * Rotten Tomatoes Rating of the movie.
  //     * Country where the movie was produced.
   //    * Language of the movie.
    //   * Plot of the movie.
  //     * Actors in the movie.
  //   ```

 // * If the user doesn't type a movie in, the program will output data for the movie 'Mr.Nobody.'
     
 // * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
 // * It's on Netflix!
   
 // * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `40e9cece`.

//4. `node liri.js do-what-it-says`

//  ### BONUS

 // * In addition to logging the data to your terminal/ bash window, output the data to a .txt file called `log.txt`.
//
//* Make sure you append each command you run to the `log.txt` file. 

//* Do not overwrite your file each time you run a command.
