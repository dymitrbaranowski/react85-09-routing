import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { QuizList } from 'components/QuizList/QuizList';
import { SearchBar } from 'components/SearchBar/SearchBar';

import { deleteQuizById, fetchQuizzes } from './api';
// import { Routes, Route, Link } from 'react-router-dom';

const getInitialFilters = () => {
  const savedFilters = localStorage.getItem('quiz-filters');
  if (savedFilters !== null) {
    return JSON.parse(savedFilters);
  }

  return {
    topic: '',
    level: 'all',
  };
};

export default function QuizzesPages() {
  const [quizItems, setquizItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(getInitialFilters);

  // HTTP запрос за всеми квизами
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

  // Пишем фильтры в LS
  useEffect(() => {
    localStorage.setItem('quiz-filters', JSON.stringify(filters));
  }, [filters]);

  const changeLevelFilter = newLevel => {
    setFilters(prevFilters => ({ ...prevFilters, level: newLevel }));
  };

  const changeTopicFilter = newTopic => {
    setFilters(prevFilters => ({ ...prevFilters, level: newTopic }));
  };

  const resetFilters = () => {
    setFilters({
      topic: '',
      level: 'all',
    });
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
    <div>
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
    </div>
  );
}
