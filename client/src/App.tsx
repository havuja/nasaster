import React from "react";
import styled from "styled-components";
import Header from "./components/common/Header";
import Asteroids from "./components/Asteroids";

const Content = styled.div`
  margin: 1em;
`;

function App() {
  return (
    <div data-testid="app">
      <Header />
      <Content>
        <Asteroids />
      </Content>
    </div>
  );
}

export default App;
