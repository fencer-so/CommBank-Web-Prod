import { createTheme, ThemeProvider as ThemeProviderMui } from '@material-ui/core'
import React, { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { getUser as getUserApi } from './api/lib'
import { Goal } from './api/types'
import { useAppDispatch, useAppSelector } from './hooks'
import { selectContent, selectIsOpen, selectType, setIsOpen } from './store/modalSlice'
import { selectMode } from './store/themeSlice'
import { setUser } from './store/userSlice'
import { GlobalStyle } from './ui/components/GlobalStyles'
import { DarkTheme, LightTheme } from './ui/components/Theme'
import Main from './ui/pages/Main/Main'
import { GoalModal } from './ui/surfaces/modal/GoalModal'
import { Modal, ModalProps } from './ui/surfaces/modal/Modal'

function App() {
  const mode = useAppSelector(selectMode)
  const modalIsOpen = useAppSelector(selectIsOpen)
  const modalContent = useAppSelector(selectContent)
  const modalType = useAppSelector(selectType)

  const dispatch = useAppDispatch()

  const muiTheme = createTheme({
    palette: {
      type: mode,
    },
  })

  useEffect(() => {
    async function fetch() {
      const user = await getUserApi()
      if (user != null) {
        dispatch(setUser(user))
      }
    }

    fetch()
  }, [dispatch])

  return (
    <AppContainer
      onClick={(e) => {
        e.stopPropagation()
        dispatch(setIsOpen(false))
      }}
    >
      <ThemeProviderMui theme={muiTheme}>
        <ThemeProvider theme={mode === 'light' ? LightTheme : DarkTheme}>
          <GlobalStyle />

          <Main />

          <ModalContainer isOpen={modalIsOpen}>
            <Modal
              isOpen={modalIsOpen}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {modalType === 'Goal' ? <GoalModal goal={modalContent as Goal} /> : null}
            </Modal>
          </ModalContainer>
        </ThemeProvider>
      </ThemeProviderMui>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  position: relative;
`

const ModalContainer = styled.div<ModalProps>`
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.overlay};
  position: absolute;
  top: 0;
  left: 0;
`
