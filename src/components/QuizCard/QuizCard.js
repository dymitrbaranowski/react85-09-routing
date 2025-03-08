import { Link, useLocation } from 'react-router-dom';
import { Topic, Wrapper, MetaWrapper, Text, Button } from './QuizCard.styled';

export const QuizCard = ({
  quiz: { id, topic, level, time, questions },
  onDelete,
}) => {
  const location = useLocation();
  console.log(location);

  return (
    <Wrapper level={level}>
      <Link to={`/quizzes/${id}`} state={{ from: location }}>
        <Topic>{topic}</Topic>
      </Link>
      <MetaWrapper>
        <Text>
          <b>Level:</b> {level}
        </Text>
        <Text>
          <b>Time:</b> {time}
        </Text>
        <Text>
          <b>Questions:</b> {questions}
        </Text>
      </MetaWrapper>
      <Button onClick={() => onDelete(id)}>Delete</Button>
    </Wrapper>
  );
};
