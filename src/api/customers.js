import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const getCustomers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/customers`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getCustomerById = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/customers/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/* POST https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Smith",
  "email": "j.s@smith.com",
  "phone": "343-2332345",
  "streetaddress": "Yellow Street 23",
  "postcode": "344342",
  "city": "Yellowstone"
} */

export const createCustomer = async (customer) => {
    try {
        const response = await axios.post(`${apiUrl}/customers`, customer, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/* PUT /customers/123
Content-Type: application/json

{
    "firstname": "John",
    "lastname": "Smith",
    "email": "j.s@smith.com",
    "phone": "342-2332345",
    "streetaddress": "Yellow Street 23",
    "postcode": "144342",
    "city": "Yellowstone"
} */

export const updateCustomer = async (id, customer) => {
    try {
        const response = await axios.put(`${apiUrl}/customers/${id}`, customer, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};