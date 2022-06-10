import React from 'react';
import styled from 'styled-components';
import Drawer from '../surfaces/drawer/Drawer';
import Navbar from '../surfaces/navbar/Navbar';

export default function Main() {
    return (
        <MainContainer>
            <Drawer />
            <Navbar />
        </MainContainer>
    );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background-color: rgb(var(--background));
`




