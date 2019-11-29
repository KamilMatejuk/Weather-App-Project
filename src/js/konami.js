const pressed = [];
const secretCode = 'coderscamp';

window.addEventListener('keyup', (e) => {
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if(pressed.join('').includes(secretCode)){
        surprise();
    }
})

function surprise(){
    const bg = document.querySelector('.cover');
    bg.style.backgroundImage = 'url("../img/CodersCamp.png")';
    bg.style.backgroundSize = 'contain';
    bg.style.backgroundRepeat = 'repeat-y';
    bg.style.backgroundPosition = 'top';
}