import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

// Функция для рендеринга с обработкой ошибок
const renderApp = () => {
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
        console.error('Root element not found');
        return;
    }
    
    try {
        const root = ReactDOM.createRoot(rootElement);
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    } catch (error) {
        console.error('Error rendering app:', error);
        rootElement.innerHTML = `
            <div style="padding: 20px; text-align: center; color: white;">
                <h1>⚠️ Ошибка загрузки приложения</h1>
                <p>Пожалуйста, обновите страницу или попробуйте позже</p>
                <button onclick="location.reload()">Обновить</button>
            </div>
        `;
    }
};

// Запускаем приложение
renderApp();