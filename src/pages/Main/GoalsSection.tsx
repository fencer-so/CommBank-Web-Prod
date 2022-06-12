import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { API_ROOT, createGoal as createGoalApi } from '../../api/lib';
import { createGoal as createGoalRedux, selectGoalsList } from '../../app/goalsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setContent, setIsOpen, setType } from '../../app/modalSlice';
import { Heading } from '../../components/Heading';
import { Goal } from '../../types';
import { media } from '../../utils/media';
import GoalCard from './GoalCard';

export default function GoalsSection() {
  const dispatch = useAppDispatch();

  const goalIds = useAppSelector(selectGoalsList);

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(`${API_ROOT}/api/Goal`)
      response.data.forEach((goal: Goal) => {
        dispatch(createGoalRedux(goal))
      })
    }

    fetch()
  }, [])

  return (
    <MainContainer >

      <TopSection>
        <Heading>Goals</Heading>

        <Icon onClick={async () => {
          const goal = await createGoalApi();

          if (goal != null) {
            dispatch(createGoalRedux(goal))
            dispatch(setContent(goal))
            dispatch(setType("Goal"))
            dispatch(setIsOpen(true))
          }
        }}>
          <FontAwesomeIcon icon={faPlusCircle} size="2x" className='alert' />
        </Icon>

      </TopSection>

      <GoalsContainer>
        {goalIds ? (
          goalIds.map(goalId => (
            <GoalCard key={goalId} id={goalId} />
          ))
        ) : null}
      </GoalsContainer>

    </MainContainer>
  );
}

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 400px;
  padding: 4rem;
  overflow-x: auto;

  ${media('<tablet')} {
    width: 100%;

    padding-left: 0;
    padding-right: 0;
  }

`

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  ${media('<tablet')} {
    flex-direction: column;
  }
`

const Icon = styled.a`
  margin-left: 1rem;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  
  margin-top: 2rem;
  margin-bottom: 2rem;

  ${media('<tablet')} {
    width: 100%;
  }
`




