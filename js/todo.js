const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteTodo(event){
   // console.log(event.target.parentNode);// 아이디 정보까지 알수있다.
   const btn = event.target;
   const li = btn.parentNode;
   toDoList.removeChild(li);
   // 실제 dotoList가 삭제된것은 아니다.

   //// 중요!!!!!!!!!!!!!!!!!!
   const cleanToDos = toDos.filter(function(toDo){
       //return toDo.id !== li.id; // li.id 가 string 이가 따라서 비교 x
       return toDo.id !== parseInt(li.id);
   });

   toDos = cleanToDos;
   saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newId =  toDos.length + 1;

    delBtn.innerText = "✖";
    delBtn.addEventListener("click", deleteTodo);

    const span = document.createElement("span");
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    } 
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();

