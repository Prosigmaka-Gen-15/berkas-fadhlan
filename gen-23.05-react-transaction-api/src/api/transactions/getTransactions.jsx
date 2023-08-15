import axios from 'axios';

export async function getTransactions() {
  try {
    const response = await axios.get('http://localhost:3001/transactions');
    return response.data;
  } catch (error) {
    throw error;
  }
}
