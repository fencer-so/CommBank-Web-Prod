import React from 'react';
import styled, { ThemeProvider } from "styled-components";
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectContent, selectIsOpen, selectType, setIsOpen } from './app/modalSlice';
import { GlobalStyle } from './components/GlobalStyles';
import { DarkTheme, LightTheme } from './components/Theme';
import { selectMode } from './features/themeswitcher/themeSlice';
import './font.scss';
import Main from './pages/Main';
import { GoalModal } from './surfaces/modal/GoalModal';
import { Modal, ModalProps } from './surfaces/modal/Modal';
import { Goal } from './types';


function App() {
  const mode = useAppSelector(selectMode);
  const modalIsOpen = useAppSelector(selectIsOpen);
  const modalContent = useAppSelector(selectContent);
  const modalType = useAppSelector(selectType);

  const dispatch = useAppDispatch()

  return (
    <AppContainer onClick={(e) => {
      e.stopPropagation()
      dispatch(setIsOpen(false))
    }} >

      <ThemeProvider theme={mode === 'light' ? LightTheme : DarkTheme}>
        <GlobalStyle />



        <Main />

        <ModalContainer isOpen={modalIsOpen}>
          <Modal isOpen={modalIsOpen} onClick={(e) => {
            e.stopPropagation()
          }}>

            {modalType === "Goal" ? (
              <GoalModal goal={modalContent as Goal} />
            ) : (null)}

          </Modal>
        </ModalContainer>

      </ThemeProvider>
    </AppContainer>

  );
}

export default App;

const AppContainer = styled.div`
  position: relative;
`

const ModalContainer = styled.div<ModalProps>`
  width: 100vw;
  height: 100vh;
  display: ${(props) => props.isOpen ? "flex" : "none"};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.overlay};
  position: absolute;
  top: 0;
  left: 0;
`

