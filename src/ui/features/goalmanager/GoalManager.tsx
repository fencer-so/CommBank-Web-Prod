import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faDollarSign, faSmile, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import 'date-fns'
import { BaseEmoji } from 'emoji-mart'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { updateGoal as updateGoalApi } from '../../../api/lib'
import { Goal } from '../../../api/types'
import { selectGoalsMap, updateGoal as updateGoalRedux } from '../../../store/goalsSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import DatePicker from '../../components/DatePicker'
import EmojiPicker from '../../components/EmojiPicker'
import { Theme } from '../../components/Theme'
import { TransparentButton } from '../../components/TransparentButton'

type Props = { goal: Goal }
export function GoalManager(props: Props) {
  const dispatch = useAppDispatch()

  const goal = useAppSelector(selectGoalsMap)[props.goal.id]

  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false)

  const [icon, setIcon] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [targetDate, setTargetDate] = useState<Date | null>(null)
  const [targetAmount, setTargetAmount] = useState<number | null>(null)

  useEffect(() => {
    setIcon(props.goal.iconName)
    setName(props.goal.name)
    setTargetDate(props.goal.targetDate)
    setTargetAmount(props.goal.targetAmount)
  }, [
    props.goal.id,
    props.goal.iconName,
    props.goal.name,
    props.goal.targetDate,
    props.goal.targetAmount,
  ])

  useEffect(() => {
    setName(goal.name)
  }, [goal.name])

  const hasIcon = () => icon != null

  const addIconOnClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setEmojiPickerIsOpen(true)
  }

  const closeEmojiPicker = () => setEmojiPickerIsOpen(false)

  const pickEmojiOnClick = () => (emoji: BaseEmoji, event: MouseEvent) => {
    event.stopPropagation()

    setIcon(emoji.native)
    setEmojiPickerIsOpen(false)

    const updatedGoal: Goal = {
      ...props.goal,
      iconName: emoji.native ?? props.goal.iconName,
      name: name ?? props.goal.name,
      targetDate: targetDate ?? props.goal.targetDate,
      targetAmount: targetAmount ?? props.goal.targetAmount,
    }

    dispatch(updateGoalRedux(updatedGoal))

    updateGoalApi(props.goal.id, updatedGoal)
  }

  const updateNameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextName = event.target.value
    setName(nextName)
    const updatedGoal: Goal = {
      ...props.goal,
      name: nextName,
    }
    dispatch(updateGoalRedux(updatedGoal))
    updateGoalApi(props.goal.id, updatedGoal)
  }

  const updateTargetAmountOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextTargetAmount = parseFloat(event.target.value)
    setTargetAmount(nextTargetAmount)
    const updatedGoal: Goal = {
      ...props.goal,
      iconName: icon ?? props.goal.iconName,
      name: name ?? props.goal.name,
      targetDate: targetDate ?? props.goal.targetDate,
      targetAmount: nextTargetAmount,
    }
    dispatch(updateGoalRedux(updatedGoal))
    updateGoalApi(props.goal.id, updatedGoal)
  }

  const pickDateOnChange = (date: MaterialUiPickersDate) => {
    if (date != null) {
      setTargetDate(date)
      const updatedGoal: Goal = {
        ...props.goal,
        iconName: icon ?? props.goal.iconName,
        name: name ?? props.goal.name,
        targetDate: date ?? props.goal.targetDate,
        targetAmount: targetAmount ?? props.goal.targetAmount,
      }
      dispatch(updateGoalRedux(updatedGoal))
      updateGoalApi(props.goal.id, updatedGoal)
    }
  }

  return (
    <GoalManagerContainer onClick={closeEmojiPicker}>
      <AddIconButtonContainer hasIcon={hasIcon()}>
        <TransparentButton onClick={addIconOnClick}>
          <FontAwesomeIcon icon={faSmile} size="2x" />
          <AddIconButtonText>Add icon</AddIconButtonText>
        </TransparentButton>
      </AddIconButtonContainer>

      <IconButton onClick={addIconOnClick}>
        <Icon>{icon}</Icon>
      </IconButton>

      <EmojiPickerContainer
        isOpen={emojiPickerIsOpen}
        hasIcon={hasIcon()}
        onClick={(event) => event.stopPropagation()}
      >
        <EmojiPicker onClick={pickEmojiOnClick} />
      </EmojiPickerContainer>

      <NameInput value={name ?? ''} onChange={updateNameOnChange} />

      <Item>
        <Field name="Target Date" icon={faCalendarAlt} />
        <Value>
          <DatePicker value={targetDate} onChange={pickDateOnChange} />
        </Value>
      </Item>

      <Item>
        <Field name="Target Amount" icon={faDollarSign} />
        <Value>
          <StringInput value={targetAmount ?? ''} onChange={updateTargetAmountOnChange} />
        </Value>
      </Item>

      <Item>
        <Field name="Balance" icon={faDollarSign} />
        <Value>
          <StringValue>{props.goal.balance}</StringValue>
        </Value>
      </Item>

      <Item>
        <Field name="Date Created" icon={faCalendarAlt} />
        <Value>
          <StringValue>{new Date(props.goal.created).toLocaleDateString()}</StringValue>
        </Value>
      </Item>
    </GoalManagerContainer>
  )
}

type FieldProps = { name: string; icon: IconDefinition }
type AddIconButtonContainerProps = { hasIcon: boolean }
type EmojiPickerContainerProps = { isOpen: boolean; hasIcon: boolean }

function Field(props: FieldProps) {
  return (
    <FieldContainer>
      <FontAwesomeIcon icon={props.icon} size="2x" />
      <FieldName>{props.name}</FieldName>
    </FieldContainer>
  )
}

const GoalManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  position: relative;
`
const Value = styled.div`
  margin-left: 2rem;
`
const AddIconButtonContainer = styled.div<AddIconButtonContainerProps>`
  display: ${(props) => (props.hasIcon ? 'none' : 'flex')};
  flex-direction: row;
  align-items: flex-end;
`
const AddIconButtonText = styled.span`
  margin-left: 0.6rem;
  font-size: 1.5rem;
  color: rgba(174, 174, 174, 1);
`
const EmojiPickerContainer = styled.div<EmojiPickerContainerProps>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: absolute;
  top: ${(props) => (props.hasIcon ? '10rem' : '2rem')};
  left: 0;
`
const Item = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
`
const NameInput = styled.input`
  display: flex;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 4rem;
  font-weight: bold;
  color: ${({ theme }: { theme: Theme }) => theme.text};
`
const IconButton = styled.a`
  cursor: pointer;
  padding: 0px;
`
const Icon = styled.h1`
  font-size: 6rem;
  cursor: pointer;
`
const FieldName = styled.h1`
  font-size: 1.8rem;
  margin-left: 1rem;
  color: rgba(174, 174, 174, 1);
  font-weight: normal;
`
const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 20rem;

  svg {
    color: rgba(174, 174, 174, 1);
  }
`
const StringValue = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
`
const StringInput = styled.input`
  display: flex;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }: { theme: Theme }) => theme.text};
`
