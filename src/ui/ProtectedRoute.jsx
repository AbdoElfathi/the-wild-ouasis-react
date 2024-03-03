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
  const navigate = useNavigate();

  // 1 : load the autenticated user:
  const { isLoading, isAuthenticated } = useUser();

  // 2 : If not authenticated, redirect to login
  useEffect(
    function () {
      console.log("isAuthenticated", isAuthenticated, "isLoading", isLoading);
      if (!isAuthenticated && !isLoading) {
        console.log("Protected route Redirect");

        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );
  // 3 : Show a spinner:
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4 : If authenticated, render children
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
