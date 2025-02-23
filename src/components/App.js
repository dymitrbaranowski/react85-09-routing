import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { QuizForm } from './QuizForm/QuizForm';
import { QuizList } from './QuizList/QuizList';
import { SearchBar } from './SearchBar';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';

import { createQuiz, deleteQuizById, fetchQuizzes } from './api';

export const App = () => {
  const [quizItems, setquizItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setfilters] = useState(() => {
    const savedFilters = localStorage.getItem('quiz-filters');
    if (savedFilters !== null) {
      return JSON.parse(savedFilters);
    }

    return {
      topic: '',
      level: 'all',
    };
  });

  useEffect(() => {
    async function getQuizzes() {
      try {
        setLoading(true);
        setError(false);
        const quizzes = await fetchQuizzes();
        setquizItems(quizzes);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getQuizzes();
  }, []);

  useEffect(() => {
    localStorage.setItem('quiz-filters', JSON.stringify(filters));
  }, [filters]);

  const changeLevelFilter = newLevel => {
    setfilters(prevFilters => ({ ...prevFilters, level: newLevel }));
  };

  const changeTopicFilter = newTopic => {
    setfilters(prevFilters => ({ ...prevFilters, level: newTopic }));
  };

  const resetFilters = () => {
    setfilters({
      topic: '',
      level: 'all',
    });
  };

  const addQuiz = async newQuiz => {
    try {
      setLoading(true);
      setError(false);

      const addedQuiz = await createQuiz(newQuiz);

      setquizItems(prevItems => [...prevItems, addedQuiz]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async quizId => {
    try {
      setLoading(true);
      setError(false);
      const deletedQuiz = await deleteQuizById(quizId);
      setquizItems(prevItems =>
        prevItems.filter(quiz => quiz.id !== deletedQuiz.id)
      );

      toast.success('ВСЕ ОК');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const visibleItems = quizItems.filter(quiz => {
    const hasTopic = quiz.topic
      .toLowerCase()
      .includes(filters.topic.toLowerCase());

    if (filters.level === 'all') {
      return hasTopic;
    }
    return hasTopic && quiz.level === filters.level;
  });

  return (
    <Layout>
      <QuizForm onAdd={addQuiz} />
      <SearchBar
        level={filters.level}
        topic={filters.topic}
        onChangeLevel={changeLevelFilter}
        onChangeTopic={changeTopicFilter}
        onReset={resetFilters}
      />
      {loading && <div>Loading...</div>}
      {error && !loading && <div>Something went wrong...</div>}
      {visibleItems.length > 0 && (
        <QuizList items={visibleItems} onDelete={deleteQuiz} />
      )}

      <GlobalStyle />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </Layout>
  );
};
