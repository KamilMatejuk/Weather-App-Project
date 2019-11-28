window.onscroll = function () {
    window.scrollTo(0, 0);
};

window.onload = function () {
    weather('Wroclaw');

    // dane do wykresow + rysowanie wykresow
    getData('Wroclaw').then((response) => {
        tempChart(response);
        humidityChart(response);
    });

    document.getElementById("loader-wrapper").style.display = "none";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    window.onscroll = function () {};
}

let toggleButtonDetails = false;
let buttonDetails = document.getElementById("btn-detail").addEventListener('click', () => {
    $(document.getElementById("details")).toggleClass('none', toggleButtonDetails);
    toggleButtonDetails = !toggleButtonDetails;
});

let buttonDisplayMode = document.querySelector(".weather-icon").addEventListener('click', (e) => {
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

