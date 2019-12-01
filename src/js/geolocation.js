
function getGeolocation() {
    // check if geolocation is supported/enabled
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                let latitude = position.coords.latitude.toFixed(2);
                let longitude = position.coords.longitude.toFixed(2);
                findNearest(latitude, longitude);
            },
            function error(error_message) {
                alert('You have to accept location services in order to use this function');
            });
    } else {
        alert('Geolocation is not enabled on this browser')
    }
}

function findNearest(lat, lon){
    // set text
    const field = document.getElementsByClassName('fraze')[0];
    field.value = `${lat}, ${lon}`;
}

const locationBtn = document.getElementsByClassName('icon-location')[0];
locationBtn.addEventListener('click', getGeolocation);