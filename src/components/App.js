import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { QuizForm } from './QuizForm/QuizForm';
import { QuizList } from './QuizList/QuizList';
import { SearchBar } from './SearchBar';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';

import { createQuiz, deleteQuizById, fetchQuizzes } from '../api';
import { Routes, Route, Link } from 'react-router-dom';
import QuizzesPages from 'pages/QuizzesPage';

export const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/create">Create quiz</Link>
        </li>
        <li>
          <Link to="/quizzes">Quiz list</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/create" element={<div>Create quiz Page</div>} />
        <Route path="/quizzes" element={<QuizzesPages />} />
        <Route path="/quizzes/:quizzes" element={<div>Single quiz Page</div>} />
      </Routes>

      <GlobalStyle />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
};
// export const App = () => {

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [filters, setfilters] = useState(() => {
//     const savedFilters = localStorage.getItem('quiz-filters');
//     if (savedFilters !== null) {
//       return JSON.parse(savedFilters);
//     }

//     return {
//       topic: '',
//       level: 'all',
//     };
//   });

//   const addQuiz = async newQuiz => {
//     try {
//       setLoading(true);
//       setError(false);

//       const addedQuiz = await createQuiz(newQuiz);

//       setquizItems(prevItems => [...prevItems, addedQuiz]);
//     } catch (error) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
// <Layout>
//   <QuizForm onAdd={addQuiz} />

// </Layout>
//   );
// };
