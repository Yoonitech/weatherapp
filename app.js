const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }));


app.get('/', function(req, res){

  res.render('first', { connectionState : '' });
});

app.post('/', function(req, res){
   var name = req.body.cityname;
   const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=057952587ebf8aa80fc659f6abcc8fc7&units=metric';

   https.get(url, function(response){
     if ( response.statusCode === 200 ) {

       response.on('data', function(data){
         const weatherData = JSON.parse(data)
         const temp = weatherData.main.temp
         const weatherDescription = weatherData.weather[0].description
         const icon = weatherData.weather[0].icon
         res.render('weatherapp', { city : name, description : weatherDescription, icon : icon, temp : temp });

       });

     }
     else {
       res.render('first', { connectionState : 'I can\'t find this city' });
     }

   });

});

app.post('/back', function(req, res){
  res.redirect('/');
})

// my code  : 057952587ebf8aa80fc659f6abcc8fc7






app.listen(3000 || process.env.PORT, function(){
  console.log('app in listening on port : 3000');
})
