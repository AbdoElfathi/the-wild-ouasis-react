import styled from "styled-components";
import { useUserHook } from "../features/authentication/useUserHook";
import Spinner from "./Spinner";
import { Navigate, useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // 1 : load the autenticated user:
  const { isLoading, user, isAuthenticated } = useUserHook();
  const navigate = useNavigate();
  // 2 : Show a spinner:
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 3 : If not authenticated, redirect to login
  if (!isAuthenticated) return navigate("/login");
  // 4 : If authenticated, render children
  return children;
}

export default ProtectedRoute;
