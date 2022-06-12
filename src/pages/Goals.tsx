import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { API_ROOT } from '../api/lib';
import { createGoal, selectGoalsList, selectGoalsMap } from '../app/goalsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setContent, setIsOpen, setType } from '../app/modalSlice';
import { Heading } from '../components/Heading';
import { Goal } from '../types';
import { media } from '../utils/media';

export default function Goals() {
  const dispatch = useAppDispatch();

  const goalIds = useAppSelector(selectGoalsList);

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(`${API_ROOT}/api/Goal`)
      response.data.forEach((goal: Goal) => {
        dispatch(createGoal(goal))
      })
    }

    fetch()
  }, [])

  return (
    <MainContainer >

      <TopSection>
        <Heading>Goals</Heading>

        <Icon>
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


type GoalCardProps = { id: string };
function GoalCard(props: GoalCardProps) {
  const dispatch = useAppDispatch();

  const goal = useAppSelector(selectGoalsMap)[props.id];

  return (
    <GoalItem key={goal.id} className='card' onClick={(e) => {
      e.stopPropagation()
      dispatch(setContent(goal))
      dispatch(setType("Goal"))
      dispatch(setIsOpen(true))
    }}>
      <h2>${goal.targetAmount}</h2>
      <h4>{new Date(goal.targetDate).toLocaleDateString()}</h4>
      <h1>{goal.iconName}</h1>
    </GoalItem>
  )
}

const GoalItem = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 140px;
  min-width: 140px;
  width: 33%;

  cursor: pointer;

  margin-left: 2rem;
  margin-right: 2rem;
  border-radius: 2rem;

  align-items: center;

  h2 {
    font-size: 2rem;
  }

  h4 {
    color:  rgba(174, 174, 174, 1);
    font-size: 1rem;
  }

  h1 {
    font-size: 5.5rem;
  }
`

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




