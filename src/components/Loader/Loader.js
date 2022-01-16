import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #c0c0c0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderContainer = styled.div`
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 1.8px 4.8px 6px 0 rgba(0, 0, 0, 0.3);
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingRotate = styled.div`
  margin-right: 8px;
  width: 30px;
  height: 30px;
  border: 3px solid transparent;
  border-top: 3px solid #aaa;
  border-radius: 50%;
  animation: ${rotate} 0.6s linear infinite;
`;

export default function Loader() {
  return (
    <Wrapper>
      <LoaderContainer>
        <LoadingRotate />
        Loading...
      </LoaderContainer>
    </Wrapper>
  );
}
