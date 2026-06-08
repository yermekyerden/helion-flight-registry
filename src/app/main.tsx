import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { initializeColorTheme } from '@/features/toggle-color-theme/model/colorTheme';

import App from './App';
import './styles/index.css';

initializeColorTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
