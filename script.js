// Обновленный JavaScript для skills.html

let categories = ['General'];

const newCategoryInput = document.getElementById('new-category');
const addCategoryButton = document.getElementById('add-category');
const categoriesContainer = document.getElementById('categories');

// Функция для обновления списка категорий
function updateCategories() {
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-button';
        button.textContent = category;
        button.onclick = () => {
            window.location.href = `tasks.html?category=${encodeURIComponent(category)}`;
        };
        categoriesContainer.appendChild(button);
    });
}

// Функция для добавления новой категории
addCategoryButton.addEventListener('click', () => {
    const newCategory = newCategoryInput.value.trim();
    if (newCategory && !categories.includes(newCategory)) {
        categories.push(newCategory);
        newCategoryInput.value = '';
        updateCategories();

        // Создание новой страницы для задач
        createTasksPage(newCategory);
    } else if (categories.includes(newCategory)) {
        alert('Категория уже существует!');
    } else {
        alert('Пожалуйста, введите корректное название категории.');
    }
});

// Функция для создания страницы задач
function createTasksPage(category) {
    const tasksPageContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tasks for ${category}</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <div class="tasks-page">
            <h1>Tasks for ${category}</h1>
            <ul id="task-list">
                <!-- Задачи будут добавлены здесь -->
            </ul>
            <div id="add-task">
                <input type="text" id="task-name" placeholder="Enter task name">
                <button id="add-task-button">Add Task</button>
            </div>
        </div>
        <script>
            const taskList = document.getElementById('task-list');
            const addTaskButton = document.getElementById('add-task-button');
            const taskNameInput = document.getElementById('task-name');

            addTaskButton.addEventListener('click', () => {
                const taskName = taskNameInput.value.trim();
                if (taskName) {
                    const li = document.createElement('li');
                    li.className = 'task-item';
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    li.appendChild(checkbox);
                    const span = document.createElement('span');
                    span.textContent = taskName;
                    li.appendChild(span);
                    taskList.appendChild(li);
                    taskNameInput.value = '';
                } else {
                    alert('Please enter a valid task name.');
                }
            });
        </script>
    </body>
    </html>
    `;

    const blob = new Blob([tasksPageContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    // Сохраняем URL в локальное хранилище для дальнейшего использования
    localStorage.setItem(`tasks-${category}`, url);
}

// Инициализация страницы
updateCategories();
