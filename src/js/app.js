
// pobranie danych z API
  function weather( cityName ) {
    const key = '5a61784f731702ae57e794e5dceb17ab';
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + key)  
    .then(function(res) { return res.json() }) // Convert data to json
    .then(function(data) {
      //testy
      console.log(data.city.name);
      console.log('checking');
      let tablicaGodzin = new Array();
      let tablicaTemperatur = new Array();
      // podstawowe informacje co 8*3h
      // poprawka: wyswietlanie info co 3h (na potrzeby wykresu)
      for (let i = 0; i < 8; i+=1)
      {
        console.log(`Element: ${i}`);
        console.log(data.list[i].dt_txt);
        let split_data_and_hour = data.list[i].dt_txt.split(" ");
        let godzina = split_data_and_hour[1].substring(0, 5);
        console.log("Godzina do wypchniecia: ", godzina);
        tablicaGodzin.push(godzina);
        
        // console.log(data.list[i].weather[0].description);
        // console.log(data.list[i].main.temp);
        console.log(Math.round(parseFloat(data.list[i].main.temp)-273.15) + '°C');
        tablicaTemperatur.push(Math.round(parseFloat(data.list[i].main.temp)-273.15));
      }
      console.log("Tablica godzin: ", tablicaGodzin);
      console.log("Tablica temperatur: ", tablicaTemperatur);
      console.log(data); // pełne informacje
      console.log("spr.: ",  data.list[0].dt_txt);
      // fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 


     // displayWeather(data);   //przykladowe wywolanie wyswietlania dla danych
    })
    .catch(function() {
      // catch any errors
    });
  }

  //eksport dni
  function getDays( cityName ) {
    const key = '5a61784f731702ae57e794e5dceb17ab';
    return fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + key)  
    .then(function(res) { return res.json() }) // Convert data to json
    .then(function(data) {
      
      let tablicaDni = new Array();
      let tablicaTemp = new Array();
      
      for (let i = 0; i < 8; i+=1)
      {
        tablicaDni.push(data.list[i].dt_txt);
        tablicaTemp.push(Math.round(parseFloat(data.list[i].main.temp)-273.15));
      }
      let daneWykres = {tablicaDni, tablicaTemp}
      return daneWykres;
    })
    .catch(function() {
      // catch any errors
      console.log('error');
    });
  }

  const rysujWykres = (data) => {
    console.log('days: ', data.tablicaDni[0]);
    var chart = new CanvasJS.Chart("chartContainer",
    {

      title:{
      text: "Temperatury dobowe"
      },
      axisX: {
        valueFormatString: "HH:mm",
        interval:3,
        intervalType: "hour",
        labelFormatter: function (e) {
          return CanvasJS.formatDate( e.value, "HH");
        }
      },
      axisY:{
        includeZero: false

      },
      
      data: [
      {
        type: "line",

        dataPoints: [
          {x: new Date(data.tablicaDni[0]), y: data.tablicaTemp[0]},
          {x: new Date(data.tablicaDni[1]), y: data.tablicaTemp[1]},
          {x: new Date(data.tablicaDni[2]), y: data.tablicaTemp[2]},
          {x: new Date(data.tablicaDni[3]), y: data.tablicaTemp[3]},
          {x: new Date(data.tablicaDni[4]), y: data.tablicaTemp[4]},
          {x: new Date(data.tablicaDni[5]), y: data.tablicaTemp[5]},
          {x: new Date(data.tablicaDni[6]), y: data.tablicaTemp[6]},
          {x: new Date(data.tablicaDni[7]), y: data.tablicaTemp[7]}
        ]
      }
      ]
    });

    chart.render();
  }


  window.onload = function() {
    weather( 'Wroclaw' ); 
  }