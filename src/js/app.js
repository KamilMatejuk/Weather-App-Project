// pobranie danych z API
function weather( cityName ) {
  const key = '5a61784f731702ae57e794e5dceb17ab';
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + key)  
  .then(function(res) { return res.json() }) // Convert data to json
  .then(function(data) {
    //testy
    console.log('checking');
    // console.log(`Miasto: ${data.city.name}`);
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


   // displayWeather(data);   //przykladowe wywolanie wyswietlania dla danych
  })
  .catch(function(error) {
    console.log(error);
    // catch any errors
  });
}

// window.onload = function() {
//   weather( 'Wroclaw' ); 
// }

// data export: date (day, hour), temperature and humidity
function getData( cityName, day ) {
  const key = '5a61784f731702ae57e794e5dceb17ab';
  return fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + key)  
  .then(function(res) { return res.json() }) // Convert data to json
  .then(function(data) {

    // console.log(day);
    // console.log(typeof Object.values(data)[3]);
    // console.log(Object.values(Object.values(data)[3]));

    // console.log('foreach: ');
    // Object.values(Object.values(data)[3]).forEach((item) => {
    //   console.log(item.dt_txt);
    // });

    let indexOfThePassedDay = Object.values(Object.values(data)[3]).findIndex((item) => {
      return item.dt_txt === day;
    });
    
    if (indexOfThePassedDay < 0)
    {
      indexOfThePassedDay = 0;
    }

    console.log(indexOfThePassedDay);


    
    let days = [];
    let temperatures = [];
    let humidity = [];
    
    for (let i = indexOfThePassedDay; i < indexOfThePassedDay + 8; i+=1)
    {
      console.log(`i: ${i}`);
      days.push(data.list[i].dt_txt);
      temperatures.push(Math.round(parseFloat(data.list[i].main.temp)-273.15));
      humidity.push(data.list[i].main.humidity);
    }
    return {days, temperatures, humidity};
  })
  .catch(function() {
    // catch any errors
    console.log('Error, data was not read');
  });
}

const tempChart = (data) => {
  var chart = new CanvasJS.Chart("graph",
  {
    title:{
    text: "Daily temperatures"
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
      includeZero: false,
      title: "C\u00B0"
    },
    data: [
    {
      type: "area",
      dataPoints: Object.values(data.days).map((dni,index)=>{
        return {x: new Date(dni), y: data.temperatures[index]
        };
      })
    }
  ]
});

  chart.render();
}

const humidityChart = (data) => {
  var chart = new CanvasJS.Chart("graph",
  {
    title:{
    text: "Humidity"
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
      includeZero: false,
      title: "%"
    },
    data: [
    {
      type: "area",
      dataPoints: Object.values(data.days).map((dni,index)=>{
        return {x: new Date(dni), y: data.humidity[index]
        };
      })
    }
  ]
});

  chart.render();
}
  
  // window.onload = function() {
  //   weather( 'Wroclaw' ); 
  // }

  // window.onload = function() {
    // var url = new URL(window.location);
    // var params = new URLSearchParams(url.search);
    // const passedLocation =  params.get("location");
    // console.log(passedLocation);
  // }