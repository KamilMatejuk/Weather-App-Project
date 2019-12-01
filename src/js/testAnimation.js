window.onscroll = function () {
    window.scrollTo(0, 0);
};

function getLocationFromSearch () {
    const url = new URL(window.location);
    let params = new URLSearchParams(url.search);
    let passedLocation =  params.get("location");
    // this way would be good to display also a location in basic-info, here it gets overwritten
    let x = document.getElementById("basic-info").firstChild;
    x.innerHTML = passedLocation;
    return passedLocation;
}

let dayToDraw;
function setDetailsToDrawGraphs(date) {
    dayToDraw = date;
}

function getDetailsToDrawGraphs()
{
    console.log(`dayToDraw: ${dayToDraw}`);
    return dayToDraw;
}
    
window.onload = function () {
    // data for graphs + drawing graphs
    getData(getLocationFromSearch(), getDetailsToDrawGraphs()).then((response) => {
        tempChart(response);
        humidityChart(response);
    });

    // for displaying details about the chosen day
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

const buttonGraph = document.getElementById("btn-graph").addEventListener('click', (e) => {  
    document.querySelector(".graphs").style.display = 'flex';
    document.querySelector("#graph").style.display = 'block';

    if(document.getElementById("btn-graph").innerHTML === "Temperature")
    {
        getData(getLocationFromSearch(), getDetailsToDrawGraphs()).then((response) => {
            tempChart(response);
        });
    document.getElementById("btn-graph").innerHTML = "Humidity";
    } else {
        getData(getLocationFromSearch(), getDetailsToDrawGraphs()).then((response) => {
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
    console.log(` details from div: ${displayDayInfo}`);
    console.log(chosenDayInfo[0].innerHTML);

    dayDetails(displayDayInfo, chosenDayInfo);
    // data for drawing a graph (the date that just got clicked!)
    console.log(`To setDetails!: ${chosenDayInfo[0].innerHTML}`);
    setDetailsToDrawGraphs(chosenDayInfo[0].innerHTML);
    
    // handling the buttons and graphs simultaneously
    if(document.getElementById("btn-graph").innerHTML === "Temperature")
    {
        getData(getLocationFromSearch(), getDetailsToDrawGraphs()).then((response) => {
            humidityChart(response);
        });
    } else {
        getData(getLocationFromSearch(), getDetailsToDrawGraphs()).then((response) => {
            tempChart(response);
        });
        
    }
}

const dayDetails = (dDayInfo, chDayInfo) => {
    for (let i = 0, j = 2; i < dDayInfo.length; i++, j++)
    {
        dDayInfo[i].children[0].innerHTML = chDayInfo[j].innerHTML;
    }
}

const displaySearchData = document.querySelector('.txt.fraze').addEventListener('change', (e) => {
    // the function to display data should be here, to be replaced
    weather(e.currentTarget.value);
});