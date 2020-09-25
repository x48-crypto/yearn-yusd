import React from 'react';
import styled from 'styled-components';
import TopBar from 'components/TopBar';
import YUsd from 'components/YUsd';
import { Switch, Route } from 'react-router-dom';

const Wrapper = styled.div``;

export default function Component() {
  return (
    <Wrapper>
      <TopBar />
      <Switch>
        <Route path="/" component={YUsd} />
      </Switch>
    </Wrapper>
  );
}
