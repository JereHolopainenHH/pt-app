import { useEffect, useState } from "react";

import { Routes, Route } from "react-router";

import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import Navigation from "./components/Navigation";
import { useAlert } from "./components/AlertProvider";

import { getCustomers } from './api/customers';
import { getTrainingsWithCustomerInfo } from './api/trainings';
import { resetDatabase } from "./api/resetdb";

function App() {
  const { showAlert } = useAlert();

  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchData();
  }, [showAlert]);

  const fetchData = async () => {
    try {
      const customerData = await getCustomers();
      setCustomers(customerData._embedded.customers);

      const trainingData = await getTrainingsWithCustomerInfo();
      setTrainings(trainingData);
    } catch (error) {
      showAlert(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      const response = await resetDatabase();
      showAlert(response, "success");
      fetchData();
    } catch (error) {
      showAlert(error.message, "error");
    }
  }

  return (
    <>
      <Navigation handleReset={handleReset} />
      <Routes>
        <Route
          path="/"
          element={<CustomerList customers={customers} setCustomers={setCustomers} isLoading={isLoading} />}
        />
        <Route
          path="/trainings"
          element={<TrainingList trainings={trainings} setTrainings={setTrainings} isLoading={isLoading} />}
        />
      </Routes>
    </>
  )
}

export default App;
