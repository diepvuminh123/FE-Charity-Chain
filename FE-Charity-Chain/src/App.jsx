import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ROUTES from '@/constants/routes'

// Lazy-load từng page → code splitting, giảm initial bundle size
const Home = lazy(() => import('@/pages/Home'))
const Campaigns = lazy(() => import('@/pages/Campaigns'))
const Admin = lazy(() => import('@/pages/Admin'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const CampaignDetail = lazy(() => import('@/pages/CampaignDetail'))
const RegisterOrganization = lazy(() => import('@/pages/RegisterOrganization'))
const Organizations = lazy(() => import('@/pages/Organizations'))
const HowItWorks = lazy(() => import('@/pages/HowItWorks'))
const About = lazy(() => import('@/pages/About'))

function AppLayout() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith(ROUTES.ADMIN)

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
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
          <Route path={ROUTES.ORGANIZATIONS} element={<Organizations />} />
          <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorks />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
        </Suspense>
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
