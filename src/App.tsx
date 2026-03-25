import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CMSProvider } from './hooks/useCMS';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/services/ServiceDetail';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import './styles.css';

export default function App() {
  return (
    <CMSProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/cms-admin" element={<AdminPanel />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CMSProvider>
  );
}
