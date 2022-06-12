import React from 'react';
import styled from 'styled-components';
import { selectGoalsMap } from '../../app/goalsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setContent, setIsOpen, setType } from '../../app/modalSlice';

type Props = { id: string };

export default function GoalCard(props: Props) {
  const dispatch = useAppDispatch();

  const goal = useAppSelector(selectGoalsMap)[props.id];

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(setContent(goal))
    dispatch(setType("Goal"))
    dispatch(setIsOpen(true))
  }

  const asLocaleDateString = (date: Date) => new Date(date).toLocaleDateString();

  return (
    <Container key={goal.id} className='card' onClick={onClick}>
      <TargetAmount>${goal.targetAmount}</TargetAmount>
      <TargetDate>{asLocaleDateString(goal.targetDate)}</TargetDate>
      <Icon>{goal.iconName}</Icon>
    </Container>
  )
}

const Container = styled.div`
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
`

const Icon = styled.h1`
  font-size: 5.5rem;
`

const TargetAmount = styled.h2`
  font-size: 2rem;
`

const TargetDate = styled.h4`
  color:  rgba(174, 174, 174, 1);
  font-size: 1rem;
`