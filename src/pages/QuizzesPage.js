import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { QuizList } from 'components/QuizList/QuizList';
import { SearchBar } from 'components/SearchBar';
import { deleteQuizById, fetchQuizzes } from 'api';
import { useSearchParams } from 'react-router-dom';
// import { Routes, Route, Link } from 'react-router-dom';

export default function QuizzesPage() {
  const [quizItems, setquizItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('b'));

  // const [filters, setFilters] = useState({
  //   topic: '',
  //   level: 'all',
  // });

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

  const changeFilters = (value, key) => {
    setSearchParams({
      a: 20,
      b: searchParams.get('b'),
    });
    // setFilters(prevFilters => ({
    //   ...prevFilters,
    //   [key]: value,
    // }));
  };

  const resetFilters = () => {
    // setFilters({
    //   topic: '',
    //   level: 'all',
    // });
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

  // const visibleItems = quizItems.filter(quiz => {
  //   const hasTopic = quiz.topic
  //     .toLowerCase()
  //     .includes(filters.topic.toLowerCase());

  //   if (filters.level === 'all') {
  //     return hasTopic;
  //   }
  //   return hasTopic && quiz.level === filters.level;
  // });

  return (
    <div>
      <SearchBar />
      onCgange={changeFilters}
      onReset={resetFilters}
      {loading && <div>Loading...</div>}
      {error && !loading && <div>Something went wrong...</div>}
      {quizItems.length > 0 && (
        <QuizList items={quizItems} onDelete={deleteQuiz} />
      )}
    </div>
  );
}
