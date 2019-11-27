
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

  //eksport godzin
  function getDays( cityName ) {
    const key = '5a61784f731702ae57e794e5dceb17ab';
    return fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + key)  
    .then(function(res) { return res.json() }) // Convert data to json
    .then(function(data) {
      
      let tablicaDni = new Array();
      
      for (let i = 0; i < 8; i+=1)
      {
        let dzien = data.list[i].dt_txt;
        tablicaDni.push(dzien);
      }
      // console.log("tablica godzin, ", tablicaGodzin);
      return tablicaDni;
    })
    .catch(function() {
      // catch any errors
      console.log('error');
    });
  }

  const rysujWykres = (days) => {
    console.log('days: ', days);
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
          {x: new Date(days[0]), y: 26 },
          {x: new Date(days[1]), y: 38  },
          {x: new Date(days[2]), y: 43 },
          {x: new Date(days[3]), y: 29},
          {x: new Date(days[4]), y: 41},
          {x: new Date(days[5]), y: 54},
          {x: new Date(days[6]), y: 66},
          {x: new Date(days[7]), y: 60}
        ]
      }
      ]
    });

    chart.render();
  }


  window.onload = function() {
    weather( 'Wroclaw' ); 
  }