// script-skills.js

document.addEventListener('DOMContentLoaded', () => {
    let newCategoryInput = document.getElementById('new-category');
    let addCategoryButton = document.getElementById('add-category');
    let categoriesContainer = document.getElementById('categories');
    let categories = [];

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
    function addNewCategory() {
        const newCategory = newCategoryInput.value.trim();
        if (newCategory && !categories.includes(newCategory)) {
            categories.push(newCategory);
            newCategoryInput.value = '';
            updateCategories();
            addCategoryButton.disabled = true;
        } else if (categories.includes(newCategory)) {
            alert('Skill already exists!');
        } else {
            alert('Please enter a valid skill name.');
        }
    }

    // Включаем кнопку "Add", если введен текст
    newCategoryInput.addEventListener('input', () => {
        if (newCategoryInput.value.trim() !== '') {
            addCategoryButton.disabled = false;
        } else {
            addCategoryButton.disabled = true;
        }
    });

    // Обработчик нажатия кнопки "Add"
    addCategoryButton.addEventListener('click', addNewCategory);

    // Обработчик нажатия Enter для ввода новой категории
    newCategoryInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' && !addCategoryButton.disabled) {
            addNewCategory();
        }
    });
});
