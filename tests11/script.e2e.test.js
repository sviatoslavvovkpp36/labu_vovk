import { test, expect } from '@playwright/test';
import path from 'path';

// Отримуємо шлях до локального файлу index.html
const fileUrl = `file://${path.resolve('project/index.html')}`;

test.describe('ToDo App E2E Scenarios', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Сценарій 1: Повний цикл роботи із завданням (створення та видалення)', async ({ page }) => {
    const input = page.locator('#todoInput');
    const addButton = page.getByRole('button', { name: 'Додати' });
    const taskText = 'Придбати продукти для вечері';

    // 1. Додаємо завдання
    await input.fill(taskText);
    await addButton.click();

    // Перевіряємо, що завдання з'явилося у списку
    const taskItem = page.locator('#todoList li');
    await expect(taskItem).toBeVisible();
    await expect(taskItem).toContainText(taskText);

    // 2. Видаляємо завдання
    // Використовуємо .first(), якщо раптом у списку більше одного елемента
    await taskItem.locator('.delete-btn').click();

    // Перевіряємо, що список став порожнім
    await expect(page.locator('#todoList li')).toHaveCount(0);
  });

  test('Сценарій 2: Перевірка валідації та додавання через клавішу Enter', async ({ page }) => {
    const input = page.locator('#todoInput');
    
    // 1. Перевірка додавання через Enter
    const newTask = 'Автоматизувати тести';
    await input.fill(newTask);
    await input.press('Enter');

    // Перевірка результату
    await expect(page.locator('#todoList')).toContainText(newTask);
    await expect(input).toBeEmpty(); // Поле має очиститись

    // 2. Перевірка валідації порожнього рядка
    // Playwright автоматично обробляє діалоги (alerts), якщо ми не налаштували інше,
    // але ми можемо підписатися на подію dialog для перевірки тексту
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Будь ласка, введіть завдання!');
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Додати' }).click();
  });

});