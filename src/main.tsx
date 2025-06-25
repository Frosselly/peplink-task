import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import PageOne from './pages/PageOne/PageOne.tsx'
import PageTwo from './pages/PageTwo/PageTwo.tsx'
import App from './pages/App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<PageOne />} />
        <Route path="two" element={<PageTwo />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
