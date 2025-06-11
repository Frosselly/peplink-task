import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import PageOne from './pages/PageOne.tsx'
import PageTwo from './pages/PageTwo.tsx'
import NavigationBar from './components/NavigationBar.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<PageOne />} />
        <Route path="two" element={<PageTwo />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
