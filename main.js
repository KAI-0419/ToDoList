// // 유저가 값을 입력한다
// // + 버튼을 클릭하면, 할일이 추가된다
// // delete 버튼을 클릭하면, 할일이 추가된다
// // check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// // 진행중 끝남 탭을 누르면, 언더바가 이동한다
// // 끝남탭은, 끝난 아이템만 / 진행중탭은 진행중 아이템만 렌더링
// // 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let textArea = document.getElementById("text-area")
let addButton = document.getElementById("add-button")
let taskList = []
let tabs = document.querySelectorAll(".task-tabs div")
let mode = "all"
let filterList = []
let underLine = document.getElementById("task-tabs-bar")

addButton.addEventListener("click", addTask)

tabs.forEach((menu) => {
    menu.addEventListener("click", (e) => underLine(e))
});
function underLineIndicator(e){
document.getElementById("task-tabs-bar").style.width = event.target.offset,offsetWidth + "px";
document.getElementById("task-tabs-bar").style.top = event.target.offset,offsetHeight + "px";
document.getElementById("task-tabs-bar").style.left = event.target.offset,offsetLeft + "px";
}

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}

function addTask(){
    let task = {
        taskContent: textArea.value,
        isComplete: false,
        id: addIDGenerate()
    }
    taskList.push(task)
    console.log(taskList);
    render()
}

function render(){
    let list = []
    if(mode == "all"){
        list = taskList
    }else if(mode == "ongoing" || mode == "done"){
        list = filterList
    }
    let resultHTML = ""
    for(let i=0; i<list.length; i++){
    if(list[i].isComplete == true){
        resultHTML += `<div class="task">
        <div class = "task-done">
        ${list[i].taskContent}
    </div>
    <div>
    <i onclick = "toggleComplete('${list[i].id}')" class="fa-solid fa-check"></i>
    <i onclick = "toggleDelete('${list[i].id}')" class="fa-solid fa-trash"></i>
    </div>
    </div>`
    }else{
        resultHTML += `<div class="task">
        <div>
        ${list[i].taskContent}
    </div>
    <div>
    <i onclick = "toggleComplete('${list[i].id}')" class="fa-solid fa-check"></i>
    <i onclick = "toggleDelete('${list[i].id}')" class="fa-solid fa-trash"></i>
    </div>
    </div>`
    }
}
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
        taskList[i].isComplete = !taskList[i].isComplete
        break;
}
    }
    render()
    console.log(taskList)
}

function toggleDelete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
        }
    }
    render();
    console.log(taskList)
}

function filter(event){
    mode = event.target.id
    filterList = []
        if(mode == "all"){
            render()
        }else if(mode == "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render()
    }else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
    console.log(filterList)
}

function addIDGenerate(){
    return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
}


