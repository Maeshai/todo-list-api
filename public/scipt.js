document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskTitle = document.getElementById('task-title').value;
    
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: taskTitle })
    })
    .then(response => response.json())
    .then(task => {
        addTaskToList(task);
        document.getElementById('task-title').value = '';
    });
});

function addTaskToList(task) {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');
    listItem.textContent = task.title;
    taskList.appendChild(listItem);
}
