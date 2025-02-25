import { useParams } from 'react-router-dom';

export default function QuizDetailsPage() {
  const params = useParams();
  return <div>QuizDetailsPage {params.quizId}</div>;
}
