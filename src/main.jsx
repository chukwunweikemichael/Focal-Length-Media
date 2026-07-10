import React from 'react'
import ReactDOM from 'react-dom/client'

const path = window.location.pathname;

if (path === '/admin') {
  import('./AdminPanel.jsx').then(mod => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode><mod.default /></React.StrictMode>
    );
  });
} else if (path === '/about') {
  import('./AboutPage.jsx').then(mod => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode><mod.default /></React.StrictMode>
    );
  });
} else if (path === '/portfolio') {
  import('./PortfolioPage.jsx').then(mod => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode><mod.default /></React.StrictMode>
    );
  });
  } else if (path === '/ad') {
  import('./LandingAd.jsx').then(mod => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode><mod.default /></React.StrictMode>
    );
  });

} else {
  import('./App.jsx').then(mod => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode><mod.default /></React.StrictMode>
    );
  });
}