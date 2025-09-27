import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
// import TrialElement from './components/slideshow/SlideShow.jsx';
import TrialElement from './components/frame/Frame.jsx';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import { useState } from 'react';
const Dine = lazy(() => import('./pages/dine/Dine'));
const Rooms = lazy(() => import('./pages/rooms/Rooms'));
const Banquet = lazy(() => import('./pages/banquet/Banquet'));
const Contact = lazy(() => import('./pages/contact/Contact'));
import About from './pages/about/About';
import Gallery from './pages/gallery/Gallery';
import Feedback from './pages/feedback/Feedback';
import PageNotFound from './pages/badRequest/PageNotFound';

import BlogCard from './components/blogCard/BlogCard';



import img1 from './assets/demoImages/1.jpeg';
import img2 from './assets/demoImages/2.jpeg';
import img3 from './assets/demoImages/3.jpeg';
import img4 from './assets/demoImages/4.jpeg';
import img5 from './assets/demoImages/5.jpeg';



function App() {  return (
    <BrowserRouter>
      <Navbar />
      <div id = "mainContentDiv">
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/test" element={<BlogCard img1 = {img1} img2 = {img2} blog1 = "hi" blog2 = "hello"/>}/>
            <Route path="/dine" element={<Suspense fallback={<div>Loading Dine...</div>}><Dine /></Suspense>}/>
            <Route path="/rooms" element={<Suspense fallback={<div>Loading Rooms...</div>}><Rooms /></Suspense>}/>
            <Route path="/Banquet-hall" element={<Suspense fallback={<div>Loading Banquet...</div>}><Banquet /></Suspense>}/>
            <Route path="/contact-us" element={<Suspense fallback={<div>Loading Contact...</div>}><Contact /></Suspense>}/>
            <Route path="/About-Us" element={<About />}/>
            <Route path="/Gallery" element={<Gallery />}/>
            <Route path="/Feedback" element={<Feedback />}/>
            <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
