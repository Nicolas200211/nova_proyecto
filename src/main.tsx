import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Asegurarse de que el elemento root existe
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("No se encontró el elemento con id 'root'");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mostrar mensaje en consola en desarrollo
if (import.meta.env.DEV) {
  console.log('Modo desarrollo activo');
}
