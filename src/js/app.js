
function weather( cityName ) {
    const key = '5a61784f731702ae57e794e5dceb17ab';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  

  window.onload = function() {
    weather( 'Wroclaw' );
  }