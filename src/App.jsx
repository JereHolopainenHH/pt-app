import { Routes, Route } from "react-router";

import Dashboard from "./components/Dashboard";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
      </Routes>
    </div>
  )
}

export default App;
