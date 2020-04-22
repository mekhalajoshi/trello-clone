/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { handleError, handleResponse } from './apiUtils';

export async function getData() {
  // console.log('-------WebApi GETLIST--------');
  const baseUrl = 'http://localhost:5050';

  const url = `${baseUrl}/1`;

  return axios.get(url)
    .then(handleResponse)
    .catch(handleError);
}
