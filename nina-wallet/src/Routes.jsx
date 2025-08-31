import { Route, Routes } from "react-router";
import LandPage from "./pages/Landing_Page";
impo
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandPage />} />

      {/* All other pages WITH BaseLayout */}
      <Route element={<BaseLayout />}>
        <Route path="/select" element={<StepOne />} />
        <Route path="/ticket" element={<TicketBookedPage />} />
        <Route path="/upload" element={<DetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
