import axios from 'axios';
import { apiUrl } from '../config';

export const getCarSell = async (id) => {
  const { data } = await axios.get(`${apiUrl}/carSell/${id}`);
  return data;
};

export const patchCarSell = async (id, data) => {
  const { data: response } = await axios.patch(`${apiUrl}/carSell/${id}`, { data });
  return response;
};
