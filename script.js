// JavaScript для index.html

document.addEventListener('DOMContentLoaded', () => {
    let selectedAvatar = null;

    // Получаем все элементы аватаров
    const avatars = document.querySelectorAll('.avatar');
    const startButton = document.getElementById('start-button');

    // Добавляем обработчик событий для каждого аватара
    avatars.forEach(avatar => {
        avatar.addEventListener('click', () => {
            // Убираем выделение у всех аватаров
            avatars.forEach(a => a.classList.remove('selected'));
            // Добавляем выделение выбранному аватару
            avatar.classList.add('selected');
            // Устанавливаем выбранный аватар
            selectedAvatar = avatar.id;
            // Активируем кнопку "Start"
            startButton.disabled = false;
        });
    });

    // Добавляем обработчик событий для кнопки "Start"
    startButton.addEventListener('click', () => {
        if (selectedAvatar) {
            // Переходим на страницу категорий
            window.location.href = 'skills.html';
        } else {
            alert('Please select an avatar.');
        }
    });
});
