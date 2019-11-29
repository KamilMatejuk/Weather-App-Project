const data = new Date();
// grudzień
if(data.getMonth() == 11){
    // tydzień przed świetami i do końca świąt, oraz na mikołajki
    if((data.getDate() >= 17 && data.getDate() <= 26) || data.getDate() == 6){
        const addition = document.createElement('div');
        addition.classList.add('time');
        addition.style.width = '150px';
        addition.style.height = '150px';
        addition.style.backgroundImage = 'url("../img/christmas_hat.png")';
        addition.style.backgroundSize = 'contain';
        addition.style.position = 'absolute';
        addition.style.top = '-77px';
        addition.style.right = '-55px';

        const basic = document.getElementById('basic-data');
        basic.appendChild(addition);
    }
}