import js from "@eslint/js";
import globals from "globals";

export default [
    {
     
        ignores: [
            "dist/**", 
            "node_modules/**", 
            "playwright-report/**",
            "test-results/**"
        ],
    },
    js.configs.recommended,
    {
        // 1. Ігноруємо системні папки та артефакти (Крок 6)
        ignores: ["dist/**", "node_modules/**", "playwright-report/**"],
        
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            // 2. Визначаємо глобальні змінні для різних середовищ
            globals: {
                ...globals.browser, // Для window, document, setTimeout
                ...globals.node,    // Для process, require
                ...globals.vitest   // Для test, expect (якщо пишете тести)
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": "warn",
            "semi": ["error", "always"]
        }
    }
];