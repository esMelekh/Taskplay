// script-tasks.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const categoryTitle = document.getElementById('category-title');
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');
    const taskNameInput = document.getElementById('task-name');
    const backButton = document.getElementById('back-button');

    categoryTitle.textContent += category;

    // Загружаем задачи и баллы из локального хранилища
    const tasksKey = `tasks-${category}`;
    const scoreKey = `score-${category}`;
    let tasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
    let score = parseInt(localStorage.getItem(scoreKey)) || 0;

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
                if (task.completed) {
                    score += 1;
                    localStorage.setItem(scoreKey, score);
                    if (score >= 100) {
                        alert(`Congratulations! You have mastered ${category}!`);
                        // Удаляем навык и перезагружаем страницу
                        categories.splice(categories.indexOf(category), 1);
                        localStorage.setItem('categories', JSON.stringify(categories));
                        window.location.href = 'skills.html';
                    } else {
                        // С вероятностью 50% вызвать функцию для показа стикера
                        const random = Math.random();
                        if (random < 0.5) {
                            showSticker();
                        }
                        saveTasks();
                        displayTasks();
                    }
                } else {
                    score -= 1;
                    localStorage.setItem(scoreKey, score);
                    saveTasks();
                    displayTasks();
                }
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
            saveTasks();
            displayTasks();
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

    // Обработчик кнопки возврата
    backButton.addEventListener('click', () => {
        window.history.back();
    });
});
