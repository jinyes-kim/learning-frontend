const body = document.querySelector("body")
const IMAGE_NUNBER = 3;


function paintBg(number) {
    const image = new Image();
    image.src = `/Users/jinyes/git/practice/img/${number+1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMAGE_NUNBER);
    return number
}


function init() {
    const randomNum = genRandom();
    paintBg(randomNum);
}

init();