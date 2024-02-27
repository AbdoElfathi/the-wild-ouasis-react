import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // 1 : load the autenticated user:
  const { isLoading, user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // 2 : If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login", { replace: true });
  });
  // 3 : Show a spinner:
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4 : If authenticated, render children
  return children;
}

export default ProtectedRoute;
