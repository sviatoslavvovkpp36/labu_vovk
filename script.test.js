import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const html = readFileSync(resolve(process.cwd(), './project/index.html'), 'utf8');

describe('Todo App Business Logic', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html;
        
        global.window = window;
        global.document = window.document;

        const scriptPath = resolve(process.cwd(), './project/script.js');
        // Очищуємо кеш require, щоб скрипт перевантажувався для кожного тесту
        delete require.cache[require.resolve(scriptPath)];
        require(scriptPath);
        
        vi.restoreAllMocks();
    });

    // 1. Тест на успішне додавання
    it('має додавати нове завдання до списку', () => {
        const input = document.getElementById('todoInput');
        const list = document.getElementById('todoList');
        
        input.value = 'Вивчити Vitest';
        window.addTask();

        expect(list.children.length).toBe(1);
        expect(list.querySelector('span').textContent).toBe('Вивчити Vitest');
    });

    // 2. Тест на видалення (покриває onclick у HTML)
    it('має видаляти завдання при натисканні на кнопку', () => {
        const input = document.getElementById('todoInput');
        const list = document.getElementById('todoList');
        
        input.value = 'Завдання для видалення';
        window.addTask();

        const deleteBtn = list.querySelector('.delete-btn');
        deleteBtn.click();

        expect(list.children.length).toBe(0);
    });

    // 3. Тест на валідацію (покриває гілку 'if' та alert)
    it('не має додавати порожнє завдання і виводити alert', () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
        const input = document.getElementById('todoInput');
        const list = document.getElementById('todoList');
        
        input.value = '';
        window.addTask();

        expect(alertMock).toHaveBeenCalledWith("Будь ласка, введіть завдання!");
        expect(list.children.length).toBe(0);
    });

    // 4. Тест на очищення поля
    it('має очищати поле введення після успішного додавання', () => {
        const input = document.getElementById('todoInput');
        input.value = 'Очисти мене';
        window.addTask();
        expect(input.value).toBe('');
    });

    // 5. Тест на додавання через Enter (покриває гілку 'if' у addEventListener)
    it('має додавати завдання при натисканні клавіші Enter', () => {
        const input = document.getElementById('todoInput');
        const list = document.getElementById('todoList');
        input.value = 'Через Enter';

        const event = new KeyboardEvent('keypress', { key: 'Enter' });
        input.dispatchEvent(event);

        expect(list.children.length).toBe(1);
        expect(list.querySelector('span').textContent).toBe('Через Enter');
    });

    // 6. Тест на іншу клавішу (покриває гілку 'else' у addEventListener)
    it('НЕ має додавати завдання при натисканні іншої клавіші (напр. Shift)', () => {
        const input = document.getElementById('todoInput');
        const list = document.getElementById('todoList');
        input.value = 'Не додавати';

        const event = new KeyboardEvent('keypress', { key: 'Shift' });
        input.dispatchEvent(event);

        expect(list.children.length).toBe(0);
    });

    // 7. Тест на декілька завдань
    it('має коректно додавати кілька завдань поспіль', () => {
        const input = document.getElementById('todoInput');
        const list = document.getElementById('todoList');

        ['Перше', 'Друге'].forEach(task => {
            input.value = task;
            window.addTask();
        });

        expect(list.children.length).toBe(2);
    });
});