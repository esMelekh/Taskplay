let currentLevel = 1;
let currentExp = 0;
const requiredExpPerLevel = 100;
const categories = ['General'];
const tasks = [];
let selectedAvatar = null;

const currentLevelElem = document.getElementById('current-level');
const currentExpElem = document.getElementById('current-exp');
const requiredExpElem = document.getElementById('required-exp');
const categorySelect = document.getElementById('category-select');
const addCategoryButton = document.getElementById('add-category-button');
const taskCategorySelect = document.getElementById('task-category-select');
const taskNameInput = document.getElementById('task-name');
const taskWeightSelect = document.getElementById('task-weight');
const addTaskButton = document.getElementById('add-task-button');
const taskListElem = document.getElementById('task-list');
const avatarOptions = document.getElementById('avatar-options');
const newCategoryNameInput = document.getElementById('new-category-name');

const avatars = [
    { src: 'avatar1.png', name: 'Avatar 1' },
    { src: 'avatar2.png', name: 'Avatar 2' },
    { src: 'avatar3.png', name: 'Avatar 3' },
    // Добавьте больше аватаров по мере необходимости
];

function updateCategories() {
    categorySelect.innerHTML = '<option value="default">Select a Category</option>';
    taskCategorySelect.innerHTML = '<option value="default">Select a Category</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
        const taskOption = document.createElement('option');
        taskOption.value = category;
        taskOption.textContent = category;
        taskCategorySelect.appendChild(taskOption);
    });
}

function updateUI() {
    currentLevelElem.textContent = currentLevel;
    currentExpElem.textContent = currentExp;
    requiredExpElem.textContent = requiredExpPerLevel;
    updateCategories();
    taskListElem.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.textContent = `${task.name} (${task.weight} exp) [${task.category}]`;
        const button = document.createElement('button');
        button.textContent = 'Complete';
        button.onclick = () => completeTask(task);
        li.appendChild(button);
        taskListElem.appendChild(li);
    });
}

function completeTask(task) {
    currentExp += task.weight;
    tasks.splice(tasks.indexOf(task), 1);
    updateUI();
    checkLevelUp();
}

function checkLevelUp() {
    if (currentExp >= requiredExpPerLevel) {
        currentExp -= requiredExpPerLevel;
        currentLevel += 1;
        alert(`Congratulations! You have reached Level ${currentLevel}!`);
        updateUI();
    }
}

addCategoryButton.addEventListener('click', () => {
    const newCategory = newCategoryNameInput.value.trim();
    if (newCategory && !categories.includes(newCategory)) {
        categories.push(newCategory);
        newCategoryNameInput.value = '';
        updateCategories();
    } else if (categories.includes(newCategory)) {
        alert('Category already exists!');
    } else {
        alert('Please enter a valid category name.');
    }
});

addTaskButton.addEventListener('click', () => {
    const category = taskCategorySelect.value;
    const taskName = taskNameInput.value;
    const taskWeight = parseInt(taskWeightSelect.value);
    if (category !== 'default' && taskName && taskWeight) {
        tasks.push({ name: taskName, weight: taskWeight, category: category });
        taskNameInput.value = '';
        updateUI();
    } else {
        alert('Please select a category and enter a task name.');
    }
});

// Добавление аватаров
avatars.forEach(avatar => {
    const img = document.createElement('img');
    img.src = avatar.src;
    img.alt = avatar.name;
    img.className = 'avatar';
    img.onclick = () => selectAvatar(avatar);
    avatarOptions.appendChild(img);
});

function selectAvatar(avatar) {
    if (selectedAvatar) {
        const prevAvatar = document.querySelector('.avatar.selected');
        if (prevAvatar) {
            prevAvatar.classList.remove('selected');
        }
    }
    selectedAvatar = avatar;
    const selectedImg = document.querySelector('.avatar[src="' + avatar.src + '"]');
    if (selectedImg) {
        selectedImg.classList.add('selected');
    }
}
