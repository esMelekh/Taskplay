let selectedAvatar = null;

// Главная страница
const avatars = document.querySelectorAll('.avatar');
const startButton = document.getElementById('start-button');

avatars.forEach(avatar => {
    avatar.addEventListener('click', () => {
        avatars.forEach(a => a.style.border = '2px solid transparent');
        avatar.style.border = '2px solid #ff4500';
        selectedAvatar = avatar.id;
    });
});

startButton.addEventListener('click', () => {
    if (selectedAvatar) {
        window.location.href = 'skills.html';
    } else {
        alert('Пожалуйста, выберите аватара.');
    }
});

// Страница с категориями
let categories = ['General'];

const newCategoryInput = document.getElementById('new-category');
const addCategoryButton = document.getElementById('add-category');
const categoriesContainer = document.getElementById('categories');

function updateCategories() {
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-button';
        button.textContent = category;
        button.onclick = () => {
            window.location.href = `tasks.html?category=${category}`;
        };
        categoriesContainer.appendChild(button);
    });
}

addCategoryButton.addEventListener('click', () => {
    const newCategory = newCategoryInput.value.trim();
    if (newCategory && !categories.includes(newCategory)) {
        categories.push(newCategory);
        newCategoryInput.value = '';
        updateCategories();
    } else if (categories.includes(newCategory)) {
        alert('Категория уже существует!');
    } else {
        alert('Пожалуйста, введите корректное название категории.');
    }
});

// Страница с задачами
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const categoryTitle = document.getElementById('category-title');
const taskList = document.getElementById('task-list');

if (category) {
    categoryTitle.textContent = `Tasks for ${category}`;
    // Здесь можно добавить логику для загрузки задач из хранилища
    // Например, из localStorage или из базы данных
    // Для простоты, мы будем использовать статический список задач
    const tasks = [
        { name: 'Task 1', completed: false },
        { name: 'Task 2', completed: false },
        { name: 'Task 3', completed: false },
    ];
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
        };
        li.appendChild(checkbox);
        const span = document.createElement('span');
        span.textContent = task.name;
        li.appendChild(span);
        taskList.appendChild(li);
    });
}

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

// Добавьте стили для анимации стикера в styles.css
