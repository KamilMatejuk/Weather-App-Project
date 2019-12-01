// const buttonLocation = document.querySelector(".icon-location").addEventListener('click', (e) => {
//     alert('Not implemented yet');
// });

const buttonMic = document.querySelector(".icon-mic").addEventListener('click', (e) => {
    alert('Not implemented yet');
});

// to be expoerted t a separate file (as is used both in index.html and main.html)
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