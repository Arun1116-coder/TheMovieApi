Local run instructions:

clone the repository and go to the soruce file 
run nmp install
npm start .
Application starts at server 3000 

please do hit the below endpoints to see the response and user can change any input data based on his requriements

Fetching all Movies by pagination .
http://localhost:3000/api/movies?page=1 

Movies by year:
http://localhost:3000/api/movies/year/2020?page=1&sort=asc

Movies by Id : 
http://localhost:3000/api/movies/details/2

Movies by genere : 
http://localhost:3000/api/movies/genre/Drama?page=1


