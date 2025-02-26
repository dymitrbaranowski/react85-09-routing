import { Link, NavLink, Outlet } from 'react-router-dom';

import styled from 'styled-components';
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const StyledLink = styled(NavLink)`
  color: black;

  text-decoration: none;
  &.active {
    color: orange;
  }
`;

export const Layout = () => {
  return (
    <Wrapper>
      <ul>
        <li>
          <StyledLink to="/create" end>
            Create quiz
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/quizzes" end>
            Quiz list
          </StyledLink>
        </li>
      </ul>
      <Outlet />
    </Wrapper>
  );
};
