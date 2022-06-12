import React from 'react';
import styled from 'styled-components';
import Drawer from '../surfaces/drawer/Drawer';
import Navbar from '../surfaces/navbar/Navbar';
import { media } from '../utils/media';
import Accounts from './Accounts';
import Goals from './Goals';
import RecentTransactions from './RecentTransactions';

export default function Main() {
  return (
    <MainContainer>
      <Drawer />

      <MainSection>
        <Navbar />
        <Content>
          <SubSection>
            <Accounts />
            <Goals />
          </SubSection>
          <RecentTransactions />
        </Content>
      </MainSection>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background-color: rgb(var(--background));
  overflow: hidden;
`

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 250px);
  height: 100%;

  ${media('<=tablet')} {
      width: 100%;
      overflow: scroll;
  }
`

const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  align-items: center;
  justify-content: center;

  ${media('<=tablet')}{
      width: 100%;
      justify-content: flex-start;
      overflow: scroll;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;

  ${media('<desktop')} {
    flex-direction: column;
    justify-content: center;
    flex-wrap: none;
  }
`


