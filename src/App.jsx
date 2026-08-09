import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import BackToTop from "./components/BackToTop";
import LoadingScreen from "./components/LoadingScreen";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// Sections (all rendered together on one scrolling page)
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";

const HomePage = () => (
  <>
    <section id="home">
      <Hero />
    </section>

    <section id="about">
      <About />
    </section>
    <section id="projects">
      <Projects />
    </section>
    <section id="contact">
      <Contact />
    </section>
  </>
);

const Layout = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <div className="flex flex-col min-h-screen">
        <Cursor />
        <Navbar />

        {/* pt-[73px] offsets the fixed Navbar height so the first section
            (Hero, id="home") never sits underneath it */}
        <div className="flex-1 pt-[73px]">
          <HomePage />
        </div>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Everything lives on one page now — Navbar links scroll to
          #home / #projects / #about / #contact instead of changing route */}
      <Route path="/" element={<Layout />} />

      {/* Any other URL falls back to the error page */}
      <Route path="*" element={<Error />} />
    </>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
