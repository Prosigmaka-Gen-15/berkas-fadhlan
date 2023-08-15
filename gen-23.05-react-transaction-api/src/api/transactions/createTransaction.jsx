import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, transactionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
