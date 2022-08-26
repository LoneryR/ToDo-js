const formInput = document.querySelector('.app__form_input-text')
const formCreateButton = document.querySelector('.app__form_input-button')
const tasks = document.querySelector('.app__tasks_task-inner')
const counter = document.querySelector('.app__tasks_info_counter')
const active = document.querySelector('.app__tasks_info_select-active')
const completed = document.querySelector('.app__tasks_info_select-completed')
const all = document.querySelector('.app__tasks_info_select-all')
const clear = document.querySelector('.app__tasks_info_clear-completed_button')

let allPage = false
let activePage = false
let completedPage = false


let taskList = []

formCreateButton.addEventListener('click', (e) => {
    e.preventDefault()
    //close
    if (formInput.value === '') return

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
            } else {
                null
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

const clearCompleted = () => {
    allPage = true
    const check = document.querySelectorAll('.app__tasks_task-modify_task-done')
    const node = document.querySelectorAll('.app__tasks_task-modify_task-text')
    for(let i = 0; i < check.length; i++){
        node[i].className = 'app__tasks_task-modify_task-text'
        check[i].checked = false
    }
    taskList.map((item) => {
        item.completed = false
    })
    return renderAll()
}

all.addEventListener('click', () => {
    all.style.color = '#BD98E7'
    active.style.color = ''
    completed.style.color = ''
    renderAll()
})
active.addEventListener('click', () => {
    all.style.color = ''
    active.style.color = '#BD98E7'
    completed.style.color = ''
    renderActive()
})
completed.addEventListener('click', () => {
    all.style.color = ''
    active.style.color = ''
    completed.style.color = '#BD98E7'
    renderCompleted()
})
clear.addEventListener('click', clearCompleted)

renderAll()