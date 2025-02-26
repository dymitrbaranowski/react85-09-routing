import { fetchQuizById } from 'api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function QuizDetailsPage() {
  const [quiz, setQuiz] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const fetchedQuiz = await fetchQuizById(params.quizId);
        setQuiz(fetchedQuiz);
      } catch (error) {
        console.log(error);
      }
    }

    fetchQuiz();
  }, [params.quizId]);
  return <div>{quiz && <div>{quiz.topic}</div>}</div>;
}
