
function weather( cityName ) {
    const key = '5a61784f731702ae57e794e5dceb17ab';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data); // pelne info
      //console.log(data.name);
     // console.log(data.weather[0].description);
      //console.log(data.main.temp);
      //console.log(Math.round(parseFloat(data.main.temp)-273.15) + '°C');
      // fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
      
     // displayWeather(data);   //przykladowe wywolanie wyswietlania dla danych
    })
    .catch(function() {
      // catch any errors
    });
  }
  

  window.onload = function() {
    weather( 'Wroclaw' );
  }