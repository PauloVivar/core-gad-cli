import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import { LoginPage } from './Pages/LoginPage';
import './index.css'


//<App />
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>,
)
