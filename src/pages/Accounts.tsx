import React from 'react';
import styled from 'styled-components';
import CommBankCard from '../assets/images/commbank_card.svg';
import { Heading } from '../components/Heading';
import { media } from '../utils/media';

export default function Accounts() {
  return (
    <MainContainer className='card'>

      <TopSection>
        <Heading>Accounts</Heading>
      </TopSection>


      <CommBankCardImg src={CommBankCard} />

    </MainContainer>
  );
}

const CommBankCardImg = styled.img`
  width: 350px;
  height: 209px;
`

const TopSection = styled.div`
  display: flex;
  flex-direction: row;

  ${media('<tablet')} {
    flex-direction: column;
  }
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 2rem;
  width: 400px;
  height: 300px;
  border-radius: 2rem;

  margin-top: 2rem;
  margin-bottom: 2rem;

  ${media('<tablet')} {
    width: 100%;
  }
`




