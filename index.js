const formInput = document.querySelector('.app__form_input-text')
const formCreateButton = document.querySelector('.app__form_input-button')
const tasks = document.querySelector('.app__tasks_task-inner')
const counter = document.querySelector('.app__tasks_info_counter')
const active = document.querySelector('.app__tasks_info_select-active')
const completed = document.querySelector('.app__tasks_info_select-completed')
const all = document.querySelector('.app__tasks_info_select-all')
const clear = document.querySelector('.app__tasks_info_clear-completed_button')
const theme = document.querySelector('.app__header_button-theme')
const app = document.querySelector('.app')

let allPage = false
let activePage = false
let completedPage = false

let taskList = []

formCreateButton.addEventListener('click', (e) => {
    e.preventDefault()
    //return
    if (formInput.value === '') return

    //set active main page
    allPage = true
    activePage = false
    completedPage = false
    all.style.color = '#BD98E7'
    active.style.color = ''
    completed.style.color = ''

    //variebls
    const value = formInput.value
    let _id = Date.now()

    //task
    const task = document.createElement('div')
    task.className = 'app__tasks_task'

    //taskmodify
    const taskModify = document.createElement('div')
    taskModify.className = 'app__tasks_task-modify'

    //taskDone
    const taskDone = document.createElement('input')
    taskDone.type = 'checkbox'
    taskDone.className = 'app__tasks_task-modify_task-done'

    //taskNode
    const taskNode = document.createElement('div')
    taskNode.className = 'app__tasks_task-modify_task-text'
    taskNode.innerHTML = value
    
    //taskDeleteButton
    const taskDeleteButton = document.createElement('button')
    taskDeleteButton.className = 'app__tasks_task-delete'

    //img
    const img = document.createElement('img')
    img.src = './img/delete.png'

    //taskDeletebutton Listener
    taskDeleteButton.addEventListener('click', () => {
        taskList = taskList.filter(task => {
            return _id !== task.id
        })
        return renderAll()
    })

    //taskDone listener
    taskDone.addEventListener('click', function() {
        taskNode.classList.toggle('strike')
        taskList.map(task => {
            if(_id === task.id) {
                task.completed = this.checked
                if(allPage){
                    renderAll()
                }
                else if(activePage){
                    renderActive()
                }
                else if(completedPage){
                    renderCompleted()
                }
            }
        })
    })

    //append(1)
    taskModify.append(taskDone, taskNode)
    taskDeleteButton.append(img)

    //append(2)
    task.append(taskModify, taskDeleteButton)

    //remake taskList
    taskList = [...taskList, {id: _id, task: task, completed: false}]

    //render
    renderAll()

    //clear input
    formInput.value = ''
})

//render all tasks
const renderAll = () => {
    activePage = false
    completedPage = false
    allPage = true
    console.log('all')
    tasks.innerHTML = ''
    counter.innerHTML = `tasks: ${taskList.length}`
    taskList.map((item) => {
        return tasks.prepend(item.task)
    })
    !taskList.length ? tasks.innerHTML = 'nothing' : null
}

//render active tasks
const renderActive = () => {
    allPage = false
    completedPage = false
    activePage = true
    console.log('active')
    tasks.innerHTML = ''
    let count = 0
    taskList.map((item) => {
        if(!item.completed){
            count++
            return tasks.prepend(item.task)
        }
    })
    counter.innerHTML = `tasks: ${count}`
    count === 0 ? tasks.innerHTML = 'nothing' : null
}

//render completed tasks
const renderCompleted = () => {
    allPage = false
    activePage = false
    completedPage = true
    console.log('completed')
    tasks.innerHTML = ''
    let count = 0
    taskList.map((item) => {
        if(item.completed){
            count++
            return tasks.prepend(item.task)
        }
    })
    counter.innerHTML = `tasks: ${count}`
    count === 0 ? tasks.innerHTML = 'nothing' : null
}

//clear completed tasks
const clearCompleted = () => {
    allPage = true
    activePage = false
    completedPage = false
    renderAll()
    const check = document.querySelectorAll('.app__tasks_task-modify_task-done')
    const node = document.querySelectorAll('.app__tasks_task-modify_task-text')
    for(let i = 0; i < check.length; i++){
        node[i].className = 'app__tasks_task-modify_task-text'
        check[i].checked = false
    }
    taskList.map((item) => {
        item.completed = false
    })
    all.style.color = '#BD98E7'
    active.style.color = ''
    completed.style.color = ''
    return renderAll()
}

//set style in all page
all.addEventListener('click', () => {
    all.style.color = '#BD98E7'
    active.style.color = ''
    completed.style.color = ''
    renderAll()
})

//set style in active page
active.addEventListener('click', () => {
    all.style.color = ''
    active.style.color = '#BD98E7'
    completed.style.color = ''
    renderActive()
})

//set style in conpleted page
completed.addEventListener('click', () => {
    all.style.color = ''
    active.style.color = ''
    completed.style.color = '#BD98E7'
    renderCompleted()
})

//clear completed
clear.addEventListener('click', clearCompleted)

//toggle theme
theme.addEventListener('click', () => {
    document.body.classList.toggle('dark')
})

//render all page on start app
renderAll()