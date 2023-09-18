import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from '@/app/components/navigation/header'
import * as pages from '@/app/pages'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<pages.Home />} />
      </Routes>
    </Router>
  )
}