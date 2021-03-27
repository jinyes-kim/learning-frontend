const userForm = document.querySelector(".js-nameForm"), 
input = userForm.querySelector("input");

const greeting = document.querySelector(".js-greeting");

const USER_LS = 'currentUser';
const SHOWING_CN = 'showing';

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const inputValue = toDoInput.value;
    paintGreeting(inputValue);
    saveName(inputValue);
}

function askName() {
    userForm.classList.add(SHOWING_CN);
    userForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    userForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello, ${text}`;
}

function init(){
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null){
        askName();
    } else {
        paintGreeting(currentUser);
    }
}

init()