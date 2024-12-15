import './App.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginPage from './pages/Login';
// import Posts from './pages/Posts';
// import jsonData from './data/posts.json'
// import CreatePost from './pages/CreatePost';


function App() {
  return (
    <LoginPage/>
  )
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
