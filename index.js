const formInput = document.querySelector('.app__form_input-text')
const formCreateButton = document.querySelector('.app__form_input-button')
const tasks = document.querySelector('.app__tasks_task-inner')

let taskList = []

formCreateButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (formInput.value === '') return
    const value = formInput.value
    let id = Date.now()
    
    const task = document.createElement('div')
    task.className = 'app__tasks_task'

    const taskModify = document.createElement('div')
    taskModify.className = 'app__tasks_task-modify'

    const taskDone = document.createElement('input')
    taskDone.type = 'checkbox'
    taskDone.className = 'app__tasks_task-modify_task-done'
    const taskNode = document.createElement('div')
    taskNode.className = 'app__tasks_task-modify_task-text'
    taskNode.innerHTML = value
    
    const taskDeleteButton = document.createElement('button')
    taskDeleteButton.className = 'app__tasks_task-delete'
    taskDeleteButton.addEventListener('click', () => {
        taskList = taskList.filter(task => id !== task.id)
        return render()
    })

    const img = document.createElement('img')
    img.src = './img/delete.png'

    taskModify.append(taskDone, taskNode)
    taskDeleteButton.append(img)

    task.append(taskModify, taskDeleteButton)
    taskList = [...taskList, {id: id, task: task}]
    console.log(taskList)
    render()

    formInput.value = ''
})

const render = () => {
    tasks.innerHTML = ''
    taskList.map(item => {
        return tasks.prepend(item.task)
    })
}

render()