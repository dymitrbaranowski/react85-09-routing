import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import QuizzesPages from 'pages/QuizzesPage';
import CreateQuizPage from 'pages/CreateQuizPage';
import QuizDetailsPage from 'pages/QuizDetailsPage';
import { useEffect, useState } from 'react';

export const App = () => {
  // const [user, setUser] = useState(null);
  // const [serachParams, setSearchParams] = useSearchParams();
  // const userName = serachParams.get('userName') ?? '';
  // const password = serachParams.get('password') ?? '';

  // useEffect(() => {
  //   if (userName && password === '') return;

  //   async function login() {
  //     const user = await FakeAPI(userName, password);
  //     setUser(user);
  //   }
  //   login();
  // }, [userName, password]);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   setSearchParams({
  //     userName: form.elements.userName.value,
  //     password: form.elements.password.value,
  //   });
  //   form.reset();
  // };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="create" element={<CreateQuizPage />} />
          <Route path="quizzes" element={<QuizzesPages />} />
          <Route path="quizzes/:quizId" element={<QuizDetailsPage />} />
        </Route>
      </Routes>

      <GlobalStyle />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
};
