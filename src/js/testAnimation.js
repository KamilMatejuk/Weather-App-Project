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