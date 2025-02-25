import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Routes, Route, Link } from 'react-router-dom';
import QuizzesPages from 'pages/QuizzesPage';
import CreateQuizPage from 'pages/CreateQuizPage';
import QuizDetailsPage from 'pages/QuizDetailsPage';

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
        <Route path="/create" element={<CreateQuizPage />} />
        <Route path="/quizzes" element={<QuizzesPages />} />
        <Route path="/quizzes/:quizId" element={<QuizDetailsPage />} />
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

//   return (
// <Layout>
//   <QuizForm onAdd={addQuiz} />

// </Layout>
//   );
// };
