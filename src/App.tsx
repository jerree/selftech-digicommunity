import { ScrollProgress } from "./components/ScrollProgress";
import { ScrollManager } from "./components/ScrollManager";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ProgramsPage from "./pages/Programs";
import RegisterPage from "./pages/Register";
import TrainingAndEvents from "./pages/TrainingAndEvents";
import ResourcesPage from "./pages/Resources";
import GetInvolvedPage from "./pages/GetInvolved";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>
      <ScrollManager />
      <ScrollProgress />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/training-events" element={<TrainingAndEvents />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
