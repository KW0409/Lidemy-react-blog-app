import styled from "styled-components";

const Container = styled.div`
  margin: 3rem auto;
  padding: 32px 24px;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  background: #fffffb;
  border: 1px solid rgba(180, 180, 180, 0.3);
  border-radius: 6px;
`;

const Content = styled.div`
  width: 100%;
  color: rgba(152, 152, 152, 1);
  font-size: 20px;
  letter-spacing: 1.5px;
  line-height: 1.3em;
  white-space: pre-line;
`;

export default function AboutPage() {
  console.log("render AboutPage");

  return (
    <Container>
      <Content>
        {`嗨嗨，我是 Ken
        去年四月中誤打誤撞的進入了程式的世界，
        到現在都快過年了，竟然還沒上完課程....
        所以短期的目標是盡快完成 Lidemy 的課程！！
        `}
      </Content>
    </Container>
  );
}
