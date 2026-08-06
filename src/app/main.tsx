import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { initializeColorTheme } from '@/features/toggle-color-theme/model/colorTheme';

import App from './App';
import './styles/index.css';

initializeColorTheme();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
