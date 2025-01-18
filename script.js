body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    text-align: center;
    padding: 20px;
}

h1, h2 {
    color: #333;
}

#avatar-selection {
    margin-bottom: 20px;
}

#avatar-options {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.avatar {
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 5px;
}

.avatar.selected {
    border: 2px solid #333;
}

#level-info {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
}

#categories, #tasks {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
}

.task-item {
    list-style-type: none;
    padding: 10px;
    margin: 5px 0;
    background-color: #e0e0e0;
    border-radius: 5px;
}

.task-item button {
    margin-left: 10px;
    padding: 5px 10px;
}

select, input {
    margin: 5px;
    padding: 5px;
}
