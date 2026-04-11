// Функція для відображення статусу середовища
function initApp() {
    const statusElement = document.getElementById('env-status');
    if (statusElement) {
        // Отримуємо змінну з Vite (має починатися з VITE_)
        const appStatus = import.meta.env.VITE_APP_STATUS || 'Unknown Mode';
        statusElement.innerText = appStatus;
        
        // Додаємо клас для стилізації в залежності від режиму
        if (import.meta.env.PROD) {
            statusElement.classList.add('prod-mode');
        } else {
            statusElement.classList.add('dev-mode');
        }
    }
}

function addTask() {
    const input = document.getElementById('todoInput');
    const taskText = input.value.trim();
    
    if (taskText === "") {
        const modal = document.createElement('div');
        modal.innerText = "Будь ласка, введіть завдання!";
        modal.style.cssText = "position:fixed; top:20px; left:50%; transform:translateX(-50%); background:red; color:white; padding:10px; border-radius:5px; z-index:1000;";
        document.body.appendChild(modal);
        setTimeout(() => modal.remove(), 2000);
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" onclick="this.parentElement.remove()">Видалити</button>
    `;

    document.getElementById('todoList').appendChild(li);
    input.value = ""; 
}

// Дозволити додавання через клавішу Enter
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    
    const input = document.getElementById('todoInput');
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

// Експортуємо функцію для HTML onclick
window.addTask = addTask;