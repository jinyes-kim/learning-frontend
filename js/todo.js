const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDosArray";
let toDoArray = [];


function saveToDo() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDoArray));
}


function deleteToDo(event) {
    const targetLI = event.target.parentNode;
    toDoList.removeChild(targetLI);
    
    const cleanToDos = toDoArray.filter(function(toDo) {
        return toDo.id !== parseInt(targetLI.id);
    })

    toDoArray = cleanToDos;
    saveToDo();

}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDoArray.length + 1;

    delBtn.addEventListener("click", deleteToDo);

    delBtn.innerText = "❌";
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;

    toDoList.appendChild(li);

    // save to do
    const toDoObj = {
        text: text,
        id: newId
    }

    toDoArray.push(toDoObj);
    saveToDo();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";

}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }    

}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);

}

init();