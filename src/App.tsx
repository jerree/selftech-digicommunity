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
import { PrivacyPage, TermsPage } from "./pages/Legal";
import NotFound from "./pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminResetPassword = lazy(() => import("./pages/admin/AdminResetPassword"));
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminInvolvements = lazy(() => import("./pages/admin/AdminInvolvements"));
const AdminRegistrations = lazy(() => import("./pages/admin/AdminRegistrations"));
const AdminSubscribers = lazy(() => import("./pages/admin/AdminSubscribers"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const AdminResources = lazy(() => import("./pages/admin/AdminResources"));
const AdminImpact = lazy(() => import("./pages/admin/AdminImpact"));
const AdminStories = lazy(() => import("./pages/admin/AdminStories"));

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      {!isAdmin && (
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>
      )}
      <ScrollManager />
      {!isAdmin && <ScrollProgress />}
      {!isAdmin && <Nav />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/training-events" element={<TrainingAndEvents />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="involvements" element={<AdminInvolvements />} />
            <Route path="registrations" element={<AdminRegistrations />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="resources" element={<AdminResources />} />
            <Route path="impact" element={<AdminImpact />} />
            <Route path="stories" element={<AdminStories />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isAdmin && <Footer />}
    </>
  );
}
