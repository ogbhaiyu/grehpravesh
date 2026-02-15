import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import PropertyDetail from './pages/PropertyDetail'
import Admin from './pages/Admin'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import About from './pages/About'
import Contact from './pages/Contact'

import PropertiesPage from './pages/PropertiesPage'

function ProtectedAdmin() {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />
  }

  return <Admin />
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#050505]">
          <Navbar />
          <ScrollToTop />
          <LoginModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<PropertiesPage type="sell" />} />
            <Route path="/rent" element={<PropertiesPage type="rent" />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/admin" element={<ProtectedAdmin />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}
