import { StrictMode } from 'react'
import './polyfills';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './context/Context.jsx'
import "regenerator-runtime/runtime";

async function testAsync() {
  return await Promise.resolve("Async works!");
}

testAsync().then(console.log);

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
)
