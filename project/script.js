function addTask() {
    const input = document.getElementById('todoInput');
    const taskText = input.value.trim();
    
    if (taskText === "") {
        alert("Будь ласка, введіть завдання!");
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" onclick="this.parentElement.remove()">Видалити</button>
    `;

    document.getElementById('todoList').appendChild(li);
    input.value = ""; // Очистити поле після додавання
}

// Дозволити додавання через клавішу Enter
document.getElementById('todoInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});