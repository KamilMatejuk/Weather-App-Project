
// pobranie danych z API
function weather(cityName) {
  const key = '5a61784f731702ae57e794e5dceb17ab';
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + key)
    .then(function (res) {
      return res.json()
    }) // Convert data to json
    .then(function (data) {
      //testy
      // console.log(`Miasto: ${data.city.name}`);
      // podstawowe informacje co 8*3h
      for (let i = 0; i < 40; i += 8) {
        console.log(data.list[i].dt_txt);
        console.log(data.list[i].weather[0].description);
        //console.log(data.list[i].main.temp);
        console.log(Math.round(parseFloat(data.list[i].main.temp) - 273.15) + '°C');
      }
      console.log(data); // pełne informacje
      // fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 


      // displayWeather(data);   //przykladowe wywolanie wyswietlania dla danych
    })
    .catch(function (error) {
      console.log(error);
      // catch any errors
    });
}

// window.onload = function() {
//   weather( 'Wroclaw' );
// }

// data export: date (day, hour), temperature and humidity
function getData(cityName, day, unit) {
  const key = '5a61784f731702ae57e794e5dceb17ab';
  return fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + key)
    .then(function (res) {
      return res.json()
    }) // Convert data to json
    .then(function (data) {

      console.log(`unit: ${unit}`);

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

      if (indexOfThePassedDay < 0) {
        indexOfThePassedDay = 0;
      }

      // console.log(indexOfThePassedDay);

      let days = [];
      let temperatures = [];
      let humidity = [];

      for (let i = indexOfThePassedDay; i < indexOfThePassedDay + 8; i += 1) {
        // console.log(`i: ${i}`);
        days.push(data.list[i].dt_txt);
        if (unit === '°C') {
          // console.log('you got celsius!');
          temperatures.push(Math.round(parseFloat(data.list[i].main.temp) - 273.15));
          // console.log(`Temp in celsius: ${Math.round(parseFloat(data.list[i].main.temp)-273.15)}`);
        } else {
          // console.log('you got farenheit!');
          temperatures.push(Math.round(parseFloat(data.list[i].main.temp) * 9 / 5 - 459.67));
          // console.log(`Temperature in farenheit: ${Math.round(parseFloat(data.list[i].main.temp) * 9/5 - 459.67)}`);
        }
        humidity.push(data.list[i].main.humidity);
      }
      return {
        days,
        temperatures,
        humidity,
        unit
      };
    })
    .catch(function () {
      // catch any errors
      console.log('Error, data was not read');
    });
}

const tempChart = (data) => {
  var chart = new CanvasJS.Chart("graph", {
    title: {
      text: "Daily temperatures"
    },
    axisX: {
      valueFormatString: "HH:mm",
      interval: 3,
      intervalType: "hour",
      labelFormatter: function (e) {
        return CanvasJS.formatDate(e.value, "HH");
      }
    },
    axisY: {
      includeZero: false,
      title: data.unit
    },
    data: [{
      type: "area",
      dataPoints: Object.values(data.days).map((dni, index) => {
        return {
          x: new Date(dni),
          y: data.temperatures[index]
        };
      })
    }]
  });

  chart.render();
};

const humidityChart = (data) => {
  var chart = new CanvasJS.Chart("graph", {
    title: {
      text: "Humidity"
    },
    axisX: {
      valueFormatString: "HH:mm",
      interval: 3,
      intervalType: "hour",
      labelFormatter: function (e) {
        return CanvasJS.formatDate(e.value, "HH");
      }
    },
    axisY: {
      includeZero: false,
      title: "%"
    },
    data: [{
      type: "area",
      dataPoints: Object.values(data.days).map((dni, index) => {
        return {
          x: new Date(dni),
          y: data.humidity[index]
        };
      })
    }]
  });

  chart.render();
}

// window.onload = function() {
//   weather( 'Wroclaw' ); 
// }

function autocomplete(inp, arr) {
  //inp = textbox, arr = lista możliwych miast - podpowiedzi

  var currentFocus;
  // przy zmianie textboxa
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    // div z podpowiedziami
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    this.parentNode.appendChild(a);

    // po wpisaniu trzech znakow
    if (val.length > 3) {
      let z = 0; // licznik podpowiedzi (max 6)
      let bylo = [];
      for (let i = 0; i < arr.length; i++) {

        // sprawdzenie poczatkowych liter
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          if (!bylo.includes(arr[i])) {
            bylo.push(arr[i]);
            // div dla pasującego
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            // nowy input trzymający daną podpowiedź
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

            // wybranie podpowiedzi
            b.addEventListener("click", function (e) {
              // przypisanie na input
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
            });
            a.appendChild(b);
            z++;
            // maksymalnie 6 podpowiedzi
            if (z == 6)
              break;
          }
        }
      }
    }

  });

  // obsługa strzałek
  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    // DÓŁ
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    }
    // GÓRA
    else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    }
    // ENTER
    else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        // click na aktywnym
        if (x) x[currentFocus].click();
      }
    }
  });

  // ustaw aktywnym
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }


  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}