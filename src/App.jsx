import { Routes, Route } from "react-router-dom";
import MapPage from "./features/map/MapPage";
import AppLayout from "./layouts/AppLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<h1>Home Page</h1>} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/admin" element={<h1>Admin Page</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
