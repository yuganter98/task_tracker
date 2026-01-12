document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        
        if (tasks.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            // Safe HTML insertion
            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            textSpan.textContent = task.text;
            
            const btn = document.createElement('button');
            btn.className = 'check-btn';
            btn.textContent = task.completed ? 'Undo' : 'Done';
            btn.onclick = () => toggleTask(task.id);

            li.appendChild(textSpan);
            li.appendChild(btn);
            
            taskList.appendChild(li);
        });
    }

    window.toggleTask = function(id) {
        tasks = tasks.map(t => 
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        renderTasks();
    };

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            const newTask = {
                id: Date.now(),
                text: text,
                completed: false
            };
            tasks.push(newTask);
            taskInput.value = '';
            taskInput.focus();
            renderTasks();
        }
    }

    addBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial render
    renderTasks();
});
