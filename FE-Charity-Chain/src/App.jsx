import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Campaigns from '@/pages/Campaigns'
import Admin from '@/pages/Admin'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import CampaignDetail from '@/pages/CampaignDetail'
import RegisterOrganization from '@/pages/RegisterOrganization'
import ROUTES from '@/constants/routes'

function AppLayout() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith(ROUTES.ADMIN)

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.CAMPAIGNS} element={<Campaigns />} />
          <Route path={ROUTES.CAMPAIGN_DETAIL} element={<CampaignDetail />} />
          <Route
            path={ROUTES.ADMIN}
            element={
              <ProtectedRoute allowedRoles={[0, 2]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.REGISTER_ORGANIZATION} element={<RegisterOrganization />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  )
}
