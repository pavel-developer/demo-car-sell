import axios from 'axios';
import { apiUrl } from '../config';

export const sendEmail = async (data) => {
  const { data: response } = await axios.post(`${apiUrl}/email`, { data });
  return response;
};