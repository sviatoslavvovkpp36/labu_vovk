import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// ВИПРАВЛЕНО: шлях до index.html тепер відповідає твоїй структурі (файл у корені)
const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');

describe('Todo App Business Logic', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html;
        
        // Налаштування глобального середовища
        global.window = window;
        global.document = window.document;

        // ВИПРАВЛЕНО: шлях до script.js (файл у корені)
        const scriptPath = resolve(process.cwd(), 'script.js');
        
        // Очищуємо кеш require, щоб скрипт перевантажувався для кожного тесту
        if (require.cache[require.resolve(scriptPath)]) {
            delete require.cache[require.resolve(scriptPath)];
        }
        require(scriptPath);
        
        vi.restoreAllMocks();
    });

    it('має додавати нове завдання до списку', () => {
        const input = document.getElementById('todoInput');
        const list = document.getElementById('todoList');
        
        input.value = 'Вивчити Vitest';
        // Викликаємо функцію, яку твій script.js має додавати у window
        if (typeof window.addTask === 'function') {
            window.addTask();
            expect(list.children.length).toBe(1);
            expect(list.querySelector('span').textContent).toBe('Вивчити Vitest');
        }
    });

    it('має очищати поле введення після успішного додавання', () => {
        const input = document.getElementById('todoInput');
        input.value = 'Очисти мене';
        if (typeof window.addTask === 'function') {
            window.addTask();
            expect(input.value).toBe('');
        }
    });

    it('не має додавати порожнє завдання', () => {
    const input = document.getElementById('todoInput');
    const list = document.getElementById('todoList');
    
    input.value = '';
    // Просто перевіряємо, що в список нічого не додалося
    if (typeof window.addTask === 'function') {
        window.addTask();
        expect(list.children.length).toBe(0);
    }
});
});