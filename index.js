const formInput = document.querySelector('.app__form_input-text')
const formCreateButton = document.querySelector('.app__form_input-button')
const tasks = document.querySelector('.app__tasks')

formCreateButton.addEventListener('click', (e) => {
    e.preventDefault()
    const value = formInput.value
    
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
    

    const taskButton = document.createElement('button')
    taskButton.className = 'app__tasks_task-delete'
    const img = document.createElement('img')
    img.src = './img/delete.png'
    

    taskModify.append(taskDone, taskNode)
    taskButton.append(img)

    task.append(taskModify, taskButton)

    tasks.prepend(task)

    formInput.value = ''
})