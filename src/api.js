import axios from 'axios';

axios.defaults.baseURL = 'https://6786c74df80b78923aa8220f.mockapi.io/';

export const fetchQuizzes = async () => {
  const response = await axios.get('/quizzes');
  return response.data;
};
export const fetchQuizById = async quizId => {
  const resp = await axios.get(`/quizzes/${quizId}`);
  return resp.data;
};

export const deleteQuizById = async quizId => {
  const response = await axios.delete(`/quizzes/${quizId}`);
  return response.data;
};

export const createQuiz = async quiz => {
  const response = await axios.post(`/quizzes`, quiz);
  return response.data;
};
