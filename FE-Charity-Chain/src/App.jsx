import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import CampaignDetail from '@/pages/CampaignDetail'
import RegisterOrganization from '@/pages/RegisterOrganization'
import ROUTES from '@/constants/routes'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CAMPAIGN_DETAIL} element={<CampaignDetail />} />
            <Route path={ROUTES.REGISTER_ORGANIZATION} element={<RegisterOrganization />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
