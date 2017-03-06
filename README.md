# Project 2 - Express Application with an External API

###Overview
A Google Maps application with user authentication and utilising data from an external API.  
This was the second project of the immersive course - an Express application with a Mongo database using the Mongoose ORM.

The application can be used here: [NightMapper](https://nightmapper.herokuapp.com/)

![image](http://imgur.com/kUViKTQ.png)
![image](http://imgur.com/vQ98q3N.png)
![image](http://imgur.com/WoFwmvY.png)
![image](http://imgur.com/q3cwl8j.png)

***
###Intial Concept - MVP
After researching available API's and with help from my instructors we came up with an application designed to help people walk home safely at night.  
I knew I wanted the design of the map to be interesting, as opposed to a map with random markers dotted around, so the intial concept was decided upon after finding streetlight API data that I thought would look good once plotted. Building upon that I could use recent Police data to indicate which areas had more crime than others.  
Although I wanted the map to be used for London only certain boroughs had given out streetlight information, which would have become too tedious a task to bring together.  Due to this NightMapper is based around Nottingham.

#####MVP 

* Append the Google Map using the Gooogle Maps API, centralised in Nottingham.
* Utilising MongoDB
  *  Create a fully authenticated User Model using JWT tokens.
  * Create a Streetlight Model
  * Create a Police Crime Model 
* Create markers on the Lng Lat of each crime and street light.
* Using the Google Maps API directions service add a calcRoute() function. 
 
#####Building upon MVP

* Display an information window with details of each crime. 
* Utilise the Google Maps API autocomplete for any address input.
* Once registered with a home address the user can click "Get Me Home" to calculate the route home from their current location. 
* Display and Information window onload of the page to explain what the map does.

When the User first registers they are authenticated using JWT tokens, then using .atob of the user token I could identify which user was logged in. This part was important for my "Get Me Home" function to work as when the user first registers, their home location is stored into the model.  
As there was little change of the streetlight data changing in the future the data was saved in db/data in JSON. Then using mongoose.promise I added the Lat and Lng co-ordinates of each light to the database.  
With help from the Police API Documentation the app uses a request-promise in order to retrieve the JSON data from the external url    
>"https://data.police.uk/api/crimes-street/all-crime?poly=52.957699,-1.265336:53.014850,-1.164429:52.954106,-1.096938:52.911270,-1.167319"   
 
Taking all street level crime from the area of Nottingham and saving the lat, lng, category of crime and month each crime took place into the database.  
From the Google Maps API documentation I was able to add a google directions service, and autocomplete functions for certain input fields in the app.

***
###Styling
The concept of the map was always to emphasise the street lights and so I felt styling the map with darker tones was important. Using SnazzyMaps I experimented with a few different grey styled maps, and played around with the tones of the certain roads in order to make the markers stand out.  
Bootstrap was used as a framework but altered a lot in order to match the overall tone of the app. 
######Information Windows
As I felt the InfoWindows provided by the Google Maps API didn't really suit the styling I put the information into modals as well. However, this then made it slightly hard to see which crime has been selected - something to work on.

***
###Wins
I was really pleased with my code in the front-end app.js file as I think it was DRY and so when it came to changing certain aspects of my project - for instance the crime info window to a modal for aesthetic purposes - it was straightforward and I could see exactly which function was occuring where.
***
###Challenges
With this project my main blocker was getting the data from the external API's, I struggled to get going on the backend as it was more unfamiliar after the pervious project.  
My initial concept was also to create a subtle glowing animation for the lights on the map, which I spent probably an excess amout of time on. However, this never functioned on the page as there were too many lights to process.
***
###Improvements
One thing I would really like to implement in the future is a way of calculating the best route home based upon the number of crime markers and street light markers along the direction route.   
Another thing I have found is the loading time of the light data. Due to there being so many lights the page takes a long time to load and so a loading screen as well as adding the lights one by one as opposed to all at once, would really improve the user experience.  
Improving the mobile responsiveness would also be a bonus and with the correct data this could be implemented in London.


