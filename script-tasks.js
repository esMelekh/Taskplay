// script-tasks.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const categoryTitle = document.getElementById('category-title');
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');
    const taskNameInput = document.getElementById('task-name');

    categoryTitle.textContent += category;

    // Загружаем задачи из локального хранилища
    const tasksKey = `tasks-${category}`;
    let tasks = JSON.parse(localStorage.getItem(tasksKey)) || [];

    // Отображаем задачи
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.onchange = () => {
                task.completed = checkbox.checked;
                // Добавьте логику для анимации стикера здесь
                if (task.completed) {
                    // С вероятностью 50% вызвать функцию для показа стикера
                    const random = Math.random();
                    if (random < 0.5) {
                        showSticker();
                    }
                }
                saveTasks();
            };
            li.appendChild(checkbox);
            const span = document.createElement('span');
            span.textContent = task.name;
            li.appendChild(span);
            taskList.appendChild(li);
        });
    }

    // Сохраняем задачи в локальное хранилище
    function saveTasks() {
        localStorage.setItem(tasksKey, JSON.stringify(tasks));
    }

    // Добавление новой задачи
    addTaskButton.addEventListener('click', () => {
        const taskName = taskNameInput.value.trim();
        if (taskName) {
            tasks.push({ name: taskName, completed: false });
            taskNameInput.value = '';
            displayTasks();
            saveTasks();
        } else {
            alert('Please enter a valid task name.');
        }
    });

    // Отображение задач при загрузке
    displayTasks();

    // Функция для показа стикера
    function showSticker() {
        const sticker = document.createElement('div');
        sticker.className = 'sticker';
        sticker.style.position = 'fixed';
        sticker.style.top = '50%';
        sticker.style.left = '50%';
        sticker.style.transform = 'translate(-50%, -50%)';
        sticker.style.width = '100px';
        sticker.style.height = '100px';
        sticker.style.backgroundImage = 'url("images/sticker.png")';
        sticker.style.backgroundSize = 'cover';
        sticker.style.animation = 'fadeInOut 2s';
        document.body.appendChild(sticker);
        setTimeout(() => {
            sticker.remove();
        }, 2000);
    }
});
