import { useSearchParams } from 'react-router-dom';

export const SearchBar = ({ onChange, onReset }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get('topic') ?? '';
  const level = searchParams.get('level') ?? 'all';
  console.log(topic, level);

  return (
    <div>
      <input
        type="text"
        value={topic}
        onChange={evt => {
          searchParams.set('topic', evt.target.value);
          setSearchParams(searchParams);

          // setSearchParams({
          //   topic: evt.target.value,
          //   level,
          // })
        }}
        placeholder="Topic filter"
      />
      <select
        value={level}
        onChange={evt => {
          searchParams.set('level', evt.target.value);

          setSearchParams(searchParams);
          // setSearchParams({
          //   topic,
          //   level: evt.target.value,
          // })
        }}
      >
        <option value="all">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <button onClick={onReset}>Reset filters</button>
    </div>
  );
};
