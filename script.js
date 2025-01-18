let currentLevel = 1;
let currentExp = 0;
const requiredExpPerLevel = 100;
const tasks = [];

const currentLevelElem = document.getElementById('current-level');
const currentExpElem = document.getElementById('current-exp');
const requiredExpElem = document.getElementById('required-exp');
const taskListElem = document.getElementById('task-list');
const addButton = document.getElementById('add-button');

function updateUI() {
    currentLevelElem.textContent = currentLevel;
    currentExpElem.textContent = currentExp;
    requiredExpElem.textContent = requiredExpPerLevel;
    taskListElem.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.textContent = `${task.name} (${task.exp} exp)`;
        const button = document.createElement('button');
        button.textContent = 'Complete';
        button.onclick = () => completeTask(task);
        li.appendChild(button);
        taskListElem.appendChild(li);
    });
}

function completeTask(task) {
    currentExp += task.exp;
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

addButton.addEventListener('click', () => {
    const taskName = document.getElementById('task-name').value;
    const taskExp = parseInt(document.getElementById('task-exp').value);
    if (taskName && taskExp) {
        tasks.push({ name: taskName, exp: taskExp });
        document.getElementById('task-name').value = '';
        document.getElementById('task-exp').value = '';
        updateUI();
    }
});
