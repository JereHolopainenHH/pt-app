import { useEffect } from "react"
import { getCustomers, updateCustomer } from "./api/customers"
import { resetDatabase } from "./api/reset";

function App() {

  useEffect(() => {
    const fetchData = async () => {
      const customers = await getCustomers();
      console.log(customers);
    }
    fetchData();
  }, []);

  const updateCustomerHandler = async () => {
    const updatedCustomer = {
      firstname: "John - updated",
      lastname: "Johnson - updated",
      streetaddress: "5th Street - updated",
      postcode: "23110 - updated",
      city: "Flintsone - updated",
      email: "john@mail.com - updated",
      phone: "232-2345540 - updated",
    }

    const updatedCustomerResponse = await updateCustomer(3049, updatedCustomer);
    console.log(updatedCustomerResponse);
  }

  return (
    <>
      <button onClick={resetDatabase}>Reset Database</button>
      <button onClick={updateCustomerHandler}>Update Customer</button>
    </>
  )
}

export default App
