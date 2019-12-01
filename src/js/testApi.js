import '../css/main.css'
import '../css/basic.css'
import '../css/search.css'

function weather( cityName ) {
    const key = '5a61784f731702ae57e794e5dceb17ab';
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + key)  
    .then(function(res) { return res.json() }) // Convert data to json
    .then(function(data) {
      console.log(`City name: ${cityName}`);
      console.log(`Miasto: ${data.city.name}`);

      // podstawowe informacje co 8*3h
      for (let i = 0; i < 40; i+=8)
      {
        console.log(data.list[i].dt_txt);
        console.log(data.list[i].weather[0].description);
        //console.log(data.list[i].main.temp);
        console.log(Math.round(parseFloat(data.list[i].main.temp)-273.15) + '°C');
      }

      console.log(data); // pełne informacje
      // fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
    })
    .catch(function(error) {
      // catch any errors
      console.log(error);
    });
  }