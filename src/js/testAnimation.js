window.onscroll = function () {
    window.scrollTo(0, 0);
};

window.onload = function () {
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);
    const passedLocation =  params.get("location");
    // checking that the info about the location is passsed from the index.html
    console.log(passedLocation);

    // data for graphs + drawing graphs
    getData(passedLocation).then((response) => {
        tempChart(response);
        humidityChart(response);
    });

    let divDays = document.getElementsByClassName("date-choose");
    for (let i = 0; i < divDays.length; i++) {
        divDays[i].addEventListener('click', function(e){displayDayOnClick(e)});
    }

    document.getElementById("loader-wrapper").style.display = "none";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    window.onscroll = function () {};
}

let toggleButtonDetails = false;
const buttonDetails = document.getElementById("btn-detail").addEventListener('click', () => {
    $(document.getElementsByClassName("details")).toggleClass('none', toggleButtonDetails);
    
    if(toggleButtonDetails === false) {
        const chosenDay = document.getElementsByClassName('chosen');
        const chosenDayInfo = chosenDay[0].children;
        let displayDay = document.getElementById("details");
        let displayDayInfo = displayDay.children;
        dayDetails(displayDayInfo, chosenDayInfo);
    }

    toggleButtonDetails = !toggleButtonDetails;
});

const buttonLocation = document.querySelector(".icon-location").addEventListener('click', (e) => {
    alert('Not implemented yet');
});

const buttonMic = document.querySelector(".icon-mic").addEventListener('click', (e) => {
    alert('Not implemented yet');
});

const buttonUnit = document.getElementById('btn-change-unit').addEventListener('click', (e) => {
    let displayedUnit = document.getElementById('temp-unit');
    let tempValue = document.getElementById('temp-txt');
    
    if(displayedUnit.innerHTML === '°C') {
        displayedUnit.innerHTML = '°F';
        e.target.innerHTML = '°C';
        tempValue.innerHTML = Math.round(tempValue.innerHTML * 1.8 + 32);
    } else {
        displayedUnit.innerHTML = '°C';
        e.target.innerHTML = '°F';
        tempValue.innerHTML = Math.round((tempValue.innerHTML-32) * 5/9);
    }
});

const buttonDisplayMode = document.querySelector(".weather-icon").addEventListener('click', (e) => {
    const icon = ".weather-icon";
    if(e.target.classList.contains("icon-sun")) {
        $( icon ).toggleClass( "icon-sun", false );
        // for now, later should be changed to an icon with a moon or something like this
        $( icon ).toggleClass( "icon-cloud", true );
        document.querySelector(".cover").style.backgroundImage = "url('../img/bg_sunny.jpg')";
    } else {
        $( icon ).toggleClass( "icon-cloud", false );
        // for now, later should be changed to an icon with a moon or something like this
        $( icon ).toggleClass( "icon-sun", true );
        document.querySelector(".cover").style.backgroundImage = "url('../img/Night-sky.jpg')";
    }
});

const buttonGraph = document.getElementById("btn-graph").addEventListener('click', (e) => {
    
    document.querySelector(".graphs").style.display = 'flex';
    document.querySelector("#graph").style.display = 'block';

    if(document.getElementById("btn-graph").innerHTML === "Temperature")
    {
        // cannot be hardcoded, just for checking
        getData('Wroclaw').then((response) => {
            tempChart(response);
        });
    document.getElementById("btn-graph").innerHTML = "Humidity";
    } else {
        // cannot be hardcoded, just for checking
        getData('Wroclaw').then((response) => {
            humidityChart(response);
        });
        document.getElementById("btn-graph").innerHTML = "Temperature";
    }
});
    
    function displayDayOnClick (e){
        let previousChosen = document.getElementsByClassName('chosen');
        
        if (previousChosen.length !== 1) {
            console.log("ERROR, there should be one chosen element at any time!")
            return;
        }

        $(previousChosen).removeClass("chosen");
        $(e.currentTarget).addClass("chosen");
        const chosenDayInfo = e.currentTarget.children;

        let displayDay = document.getElementById("details");
        let displayDayInfo = displayDay.children;

        dayDetails(displayDayInfo, chosenDayInfo);
    }

    const dayDetails = (dDayInfo, chDayInfo) => {
        for (let i = 0, j = 2; i < dDayInfo.length; i++, j++)
        {
            dDayInfo[i].children[0].innerHTML = chDayInfo[j].innerHTML;
        }

    }

    // happens to fail to fetch. To be checked
    const displaySearchData = document.querySelector('.txt.fraze').addEventListener('change', (e) => {
        weather(e.currentTarget.value);
        console.log('po');
    });