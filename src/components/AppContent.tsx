import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import WhatEazyyOffers from './WhatEazyyOffers';
import WhyChooseEazyy from './WhyChooseEazyy';
import FAQ from './FAQ';
import Footer from './Footer';
import ServiceSelection from './order/ServiceSelection';
import WashAndIronItems from './order/items/WashAndIronItems';
import DryCleaningItems from './order/items/DryCleaningItems';
import RepairItems from './order/items/RepairItems';
import EazyBagItems from './order/items/EazyBagItems';
import AddressSelection from './order/AddressSelection';
import SchedulePickup from './order/SchedulePickup';
import OrderConfirmation from './order/OrderConfirmation';
import OrderSuccess from './order/OrderSuccess';
import CustomPriceRequest from './order/CustomPriceRequest';
import QuoteConfirmation from './order/QuoteConfirmation';
import Support from './pages/Support';
import DeleteRequest from './pages/DeleteRequest';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Press from './pages/Press';
import Partners from './pages/Partners';
import About from './pages/About';
import Services from './pages/Services';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import AuthCallback from './auth/AuthCallback';
import Profile from './account/Profile';
import Orders from './account/Orders';
import Settings from './account/Settings';
import Quotes from './account/Quotes';
import Business from './pages/business/Business';
import BusinessRegistration from './pages/business/BusinessRegistration';
import BusinessSuccess from './pages/business/BusinessSuccess';
import BusinessDashboard from './pages/business/BusinessDashboard';
import BusinessBilling from './pages/business/BusinessBilling';
import BusinessTeam from './pages/business/BusinessTeam';
import BusinessReports from './pages/business/BusinessReports';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import SEO from './SEO';

const HomePage = () => (
  <main>
    <SEO />
    <Hero />
    <HowItWorks />
    <WhatEazyyOffers />
    <WhyChooseEazyy />
    <FAQ />
  </main>
);

const AppContent: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isOrderingRoute = location.pathname.startsWith('/order/');
  const isAdminRoute = location.pathname.startsWith('/admin/');

  return (
    <div className="relative overflow-hidden">
      <SEO />
      {!isAdminRoute && <Header scrollY={scrollY} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          
          {/* Business Routes */}
          <Route path="/business" element={<Business />} />
          <Route path="/business/register" element={<BusinessRegistration />} />
          <Route path="/business/success" element={<BusinessSuccess />} />
          <Route path="/business/dashboard" element={<BusinessDashboard />} />
          <Route path="/business/billing" element={<BusinessBilling />} />
          <Route path="/business/team" element={<BusinessTeam />} />
          <Route path="/business/reports" element={<BusinessReports />} />
          
          {/* Order Flow Routes */}
          <Route path="/order/service" element={<ServiceSelection />} />
          <Route path="/order/items/wash-iron" element={<WashAndIronItems />} />
          <Route path="/order/items/dry-cleaning" element={<DryCleaningItems />} />
          <Route path="/order/items/repairs" element={<RepairItems />} />
          <Route path="/order/items/easy-bag" element={<EazyBagItems />} />
          <Route path="/order/address" element={<AddressSelection />} />
          <Route path="/order/schedule" element={<SchedulePickup />} />
          <Route path="/order/confirmation" element={<OrderConfirmation />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/order/custom-quote" element={<CustomPriceRequest />} />
          <Route path="/order/quote-confirmation" element={<QuoteConfirmation />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* Account Routes */}
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route path="/account/quotes" element={<Quotes />} />
          <Route path="/account/settings" element={<Settings />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          
          {/* Support & Legal Pages */}
          <Route path="/support" element={<Support />} />
          <Route path="/delete-account" element={<DeleteRequest />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Business Pages */}
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/press" element={<Press />} />
          <Route path="/partners" element={<Partners />} />
        </Routes>
      </AnimatePresence>
      {!isOrderingRoute && !isAdminRoute && <Footer />}
    </div>
  );
};

export default AppContent;