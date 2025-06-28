import { Outlet, Route, Routes, useLocation } from "react-router-dom"
import AppNavbar from "./components/layouts/AppNavbar"
import HomePage from "./pages/HomePage"
import AppFooter from "./components/layouts/AppFooter"
import LoginPage, { LoginGoogleCallback } from "./pages/LoginPage"
import ProductPage from "./pages/ProductPage"
import InnerAnimation from "./components/templates/animated/InnerAnimated"
import { AnimatePresence } from "framer-motion"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import FaqPage from "./pages/FaqPage"
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"
import TermsOfServicePage from "./pages/TermsPage"
import RegisterPage from "./pages/RegsiterPage"
import ProductCartPage from "./pages/ProductCartPage"
import ProfilePage from "./pages/ProfilePage"
import ProductModify from "./pages/ProductModify"
import ProductOrderPage from "./pages/ProductOrderPage"
import { useEffect } from "react"

const MainLayout = () => {
  return (
    <>
      <AppNavbar />
      <InnerAnimation>
        <Outlet />
      </InnerAnimation>
      <AppFooter />
    </>
  )
}

const App = () => {
  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 200)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:category" element={<ProductPage />} />
          <Route path="/products/details/:id" element={<ProductDetailPage />} />
          <Route path="/products/cart" element={<ProductCartPage />} />
          <Route path="/products/modify/:id" element={<ProductModify />} />
          <Route path="/products/order/:id" element={<ProductOrderPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="*" element={<h1>404</h1>} />
        </Route>

        <Route path="/login" element={<InnerAnimation><LoginPage /></InnerAnimation>} />
        <Route path="/register" element={<InnerAnimation><RegisterPage /></InnerAnimation>} />
        <Route path="/login/google" element={<LoginGoogleCallback />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App