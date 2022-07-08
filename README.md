# Capstone Project

Summary:
Users view a map of the United States and can click on cities to view cost of living and quality of life metrics on the city in order to help determine if they should move there. Additionally, users can see "friends" on a map to help aid in their decision making.

Core Features
- [x] User Authentication
- [ ] API call to RealtyMole to view rent prices
- [ ] User Profile
  - [ ] User Info
  - [ ] Favorites
  - [ ] Friends
- [ ] Homepage
- [ ] Interactive map
   - [ ] Cities information displays on click
   - [ ] View friends on map
   - [ ] View saved places on map
   - [ ] At least 2 cities per state

Stretch Features
- [ ] API call to RealtyMole to view sale prices
- [ ] More cities
- [ ] Zoom in on states on click
- [ ] API call to Zomato
- [ ] API call to BandsInTown
- [ ] API call to Walkscore
- [ ] Share information with friends
- [ ] Pinpoint ideal neighborhood to live in


User Roles
- A person looking to move to a new city and identify where they would like to live
- A homeowner looking to decide on a cost of rent for their home based on average prices in their area

User Personas
- Anna is a senior in college and is applying to jobs all over the country. She has only ever lived in the Midwest and is looking to try something new, but she is struggling to figure out the best city to move to based on where she can afford with her projected salary range and where she will have friends to make the adjustment easier. She typically uses her phone to do research and is easily offput by web applications that aren't responsive in design.
- Robert is a father of two who is looking to move out of Chicago, but he doesn't know exactly where he wants to go. He is deciding between Nashville, Boulder, and San Francisco and wants to decide based on where his kids will have the best quality of life based on the cost of living in the area. He mostly uses his computer to do research. He is familiar with technology, but is not particularly savvy when it comes to interacting with the internet and needs information presented very clearly and simply. 
- Richard is going on sabbatical and is going to rent his two bedroom apartment. He has never rented out his property before and wants to see what rent prices are in his area for other two-bedroom properties in order to help him settle on a reasonable rent price. He typically interacts with web applications on his laptop and is not particularly technologically savvy.

User Stories
- As a renter, I want to create a user profile to see where my friends & family are located, so that I can easily see the people that I care about.
- As a homeowner, I want to be able to filter rent prices by number of bedrooms to see how I should market my home, so that I can find renters and make a living.
- As a renter, I want to be able to view multiple different cities to compare my options, so that I can easily compare different locations to find the location that works best for me.
- As a renter, I want to see cities near potential job locations, so that I can minimize my commute.
- As a buyer, I want to determine the city that will give me the best quality of life, so that my family can grow up with ample space to play & learn.
- As a buyer, I want to see a user feed of people I have connected with, so that I can see where people that are similar to me are located. 
- As a renter, I want to have the ability to see what typical rent prices are in the area that I'm moving to in order to make sure that I am paying a reasonable amount.
- As a homeowner, I want to view properties comparable to mine to see if the rent price I have set for renters is reasonable.
- As a buyer, I want to view listings in the area that I am moving to in order to find a place to live.
- As a renter, I want to see the number of rentals available to see how many options I would have in each location I am looking at.
- As a renter/buyer, I want to see the average rent or sale price in the area to see if I can afford to live in a given location.
- As a renter/buyer, I want to "favorite" places that I would like to live.

Endpoints
- POST: cities, add a city to the user's collection
- DELETE: cities/id, remove a city from the user's collection
- GET: cities, fetch the list of cities in a user's collection
- POST: users, create a new user account
- PUT: users/id, update a user's profile data
- GET: cities, fetch the list of cities visible on the map
- GET: users, fetch the list of "friends" available to the user

Data Model
- User table:
  - ID: integer, primary key
  - Name: text, name of the user
  - Username: text, unique key
  - Password: text, private key
  - Friend_ids: Array of integers, table of foreign keys to connected friend users
  - Favorited_city_ids: Array of integers, table of foreign keys to a city table
  - Rent_or_buy: boolean, if the user is looking at properties for sale or for rent
  - Min_price: integer, minimum rent/sale price
  - Max_price: integer, maximum rent/sale price

- City table:
  - ID: integer, primary key
  - Name: text, name of the city
  - Average_rent: integer, average rent price in the city
  - Average_sale: integer, average sale price in the city
  - Min_rent: integer, minimum rent price in the city
  - Max_rent: integer, maximum rent price in the city
  - Min_sale: integer, minimum sale price in the city
  - Max_sale: integer, maximum sale price in the city
  - Rent_listings: Array of objects, table of listings for rent in the city
  - Sale_listings: Array of objects, table of listings for sale in the city

Wireframes -> red pins are the user's saved places and people are the user's friends
<img width="594" alt="Screen Shot 2022-07-05 at 2 42 44 PM" src="https://user-images.githubusercontent.com/35511922/177421737-9747f24c-4550-42ff-b0a5-518f74a7f57b.png">
<img width="597" alt="Screen Shot 2022-07-05 at 2 43 38 PM" src="https://user-images.githubusercontent.com/35511922/177421808-ec2f30ce-e2a1-4166-b867-e383de4fecbd.png">
<img width="595" alt="Screen Shot 2022-07-05 at 2 43 56 PM" src="https://user-images.githubusercontent.com/35511922/177421852-b2391920-5dab-44eb-b200-ec70de1eb8e4.png">
<img width="593" alt="Screen Shot 2022-07-05 at 2 44 15 PM" src="https://user-images.githubusercontent.com/35511922/177421888-b3d21c1c-50d1-4f84-8679-857f6c6a3228.png">

