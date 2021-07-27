class toDoClass{
    constructor(){
        // alert("working right");
        this.task = JSON.parse( localStorage.getItem("TASK"));
        if(!this.task){
            this.task = [
            {task:"Do your first schedule", isComplete:false},
            {task:"Do the project from some advanced javascript books", isComplete:true},
            {task:"Read the summary", isComplete:false},
            {task:"Take the break and do your favourite thing", isComplete:true}
        ]

        }
        
            this.loadTask();
            this.addEventListeners();
    }

    loadTask(){
        let Tasks = this.task.reduce((html, task, index)=>
            html+=this.handleTasks(task,index)," ")
            document.getElementById('taskList').innerHTML = Tasks;
            localStorage.setItem("TASK", JSON.stringify(this.task));
    }
    addEventListeners(){
        document.getElementById("addTask").addEventListener('keypress', event=>{
            if(event.keyCode === 13){
                this.handleAddTask(event.target.value)
                event.target.value = '';
            }
        } )
    }
    handleChange(index){
        this.task[index].isComplete = !this.task[index].isComplete;
        this.loadTask();
    }
    handleDelete(event,index){
        event.preventDefault();
        console.log(event);
        this.task.splice(index,1);
        this.loadTask();
    }

    handleAdd(){
        let targetobject = document.getElementById("addTask");
        this.handleAddTask(targetobject.value);
        targetobject.value = "";
    }
    handleAddTask(task){
            let newTask = {
                task,
                isComplete:false,
            }
            let parentEle = document.getElementById("addTask").parentElement;
            if(task === ''){
                parentEle.classList.add('has-error');
            }else{
                parentEle.classList.remove('has-error');
                this.task.push(newTask);
                this.loadTask();
            }
    }


    handleTasks(task,index){
        return `
                <li class="list-group-item checkbox">
                    <div class="row">
                        <div class="col-sm-1 col-xs-1 col-md-1 col-lg-1 checkbox">
                            <label><input type="checkbox" id="toggleTaskStatus" onchange="toDo.handleChange(${index})"  class="" ${task.isComplete? "checked": ""} ></label>

                        </div>
                        <div class="col-sm-10 col-xs-10 col-md-10 col-lg-10 task-text ${task.isComplete ? "complete": ""} ">
                            ${task.task}
                        </div>
                        <div class="col-sm-1 col-xs-1 col-md-1 col-lg-1 delete-icon-area">
                            <a href="/" onClick="toDo.handleDelete(event,${index}) " ><i  id="deleteTask" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"> </i></a>
                        </div>

                    </div>

                </li>
        `

    }

}

let toDo;
window.addEventListener('load',()=>{
   toDo = new toDoClass();
} )