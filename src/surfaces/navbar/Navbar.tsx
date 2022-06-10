import { faBell, faEnvelope, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Tag from '../../assets/images/tag.png';
import Container from '../../components/Container';
import { selectMode, setDarkMode, setLightMode } from '../../features/themeswitcher/themeSlice';
import { media } from '../../utils/media';

const USER_NAME = "Tag Ramotar";
const USER_EMAIL = "tag@fencer.so";

export default function Navbar() {
  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();

  return (
    <NavbarContainer>

      <NavbarActions>
        <NavbarAction onClick={() => {
          if (mode == 'light') dispatch(setDarkMode())
          else dispatch(setLightMode())
        }}>
          <FontAwesomeIcon icon={mode == 'light' ? faMoon : faSun} size="2x" />
        </NavbarAction>

        <NavbarAction>
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
        </NavbarAction>

        <NavbarAction>
          <FontAwesomeIcon icon={faBell} size="2x" />
        </NavbarAction>

        <UserContainer>
          <NavbarAction>
            <Avatar src={Tag} />
          </NavbarAction>

          <NameAndEmail>
            <span>{USER_NAME}</span>
            <span>{USER_EMAIL}</span>
          </NameAndEmail>
        </UserContainer>

      </NavbarActions>
    </NavbarContainer>
  );
}


const NavbarActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const NavbarAction = styled.a`
  margin: 0.8rem;
`

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const NameAndEmail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  
  
  ${media('<tablet')} {
    display: none;
  }
`

const LogoWrapper = styled.a`
  display: flex;
  margin-right: auto;
  text-decoration: none;

  color: rgb(var(--logoColor));
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  ${media('<tablet')} {

  }
`

const Title = styled.h1`
  font-weight: bold;
  margin-left: 8px;
  font-size: 3rem;


  ${media('<tablet')} {
    display: none;
  }
`


const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  padding: 1.5rem 1.5rem;
  width: 100%;
  height: 8rem;
`;

const Content = styled(Container)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
