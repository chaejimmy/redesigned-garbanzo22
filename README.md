This is the documentation of features used 

After implementing getCurrentUser we can use it to render CLient Side components and add login and logout functionalty to the app 
According to which the app will proceed with its varying functions.

Create actions like getCurrentUser, getListings in action folder
For getlistings action when user requests to get the listings we show it even if user is not signed in as listings are also available for guest users also, and gets filtered out when user signs in.

TO show listings all time we ensure that even if currentUser object is null we show the listings on the app by not sending any error responses

Now to display all listings from action, which invlves use of prisma client which is not used in client componenrts promise object call, we implement a route for get request as well as post request for listings 

TO implement the LisitngCard feature we define an interface first 
where when sending currentUser data , we ensure to send out SafeUser, 
SafeListing,
SafeReservation to avoid showing private or unnecessary details to random users about listings
in types folder under pages folder
