import DateFnsUtils from '@date-io/date-fns'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faDollarSign, faSmile, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import 'date-fns'
import { BaseEmoji } from 'emoji-mart'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { updateGoal as updateGoalApi } from '../../../api/lib'
import { Goal } from '../../../api/types'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectGoalsMap, updateGoal as updateGoalRedux } from '../../../store/goalsSlice'
import EmojiPicker from '../../components/EmojiPicker'
import { Theme } from '../../components/Theme'
import { TransparentButton } from '../../components/TransparentButton'

export type GoalModalProps = { goal: Goal }

export function GoalModal(props: GoalModalProps) {
  const dispatch = useAppDispatch()

  const goal = useAppSelector(selectGoalsMap)[props.goal.id]

  const [isOpen, setIsOpen] = useState(false)
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

  return (
    <GoalModalContainer onClick={() => setIsOpen(false)}>
      <AddIconButtonContainer hasIcon={icon != null}>
        <TransparentButton
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(true)
          }}
        >
          <div>
            <FontAwesomeIcon icon={faSmile} size="2x" />

            <span>Add icon</span>
          </div>
        </TransparentButton>
      </AddIconButtonContainer>

      <IconButton
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <Icon>{icon}</Icon>
      </IconButton>

      <EmojiPickerContainer
        isOpen={isOpen}
        hasIcon={icon != null}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <EmojiPicker
          onClick={(emoji: BaseEmoji, event: MouseEvent) => {
            event.stopPropagation()

            setIcon(emoji.native)
            setIsOpen(false)

            const updatedGoal: Goal = {
              ...props.goal,
              iconName: emoji.native ?? props.goal.iconName,
              name: name ?? props.goal.name,
              targetDate: targetDate ?? props.goal.targetDate,
              targetAmount: targetAmount ?? props.goal.targetAmount,
            }

            dispatch(updateGoalRedux(updatedGoal))

            updateGoalApi(props.goal.id, updatedGoal)
          }}
        />
      </EmojiPickerContainer>

      <NameInput
        value={name ?? ''}
        onChange={(e) => {
          const nextName = e.target.value
          setName(nextName)
          const updatedGoal: Goal = {
            ...props.goal,
            name: nextName,
          }
          dispatch(updateGoalRedux(updatedGoal))
          updateGoalApi(props.goal.id, updatedGoal)
        }}
      />

      <Item>
        <Field name="Target Date" icon={faCalendarAlt} />
        <Value>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              format="MM/dd/yyyy"
              margin="dense"
              id="date-picker-inline"
              value={targetDate}
              onChange={(date: MaterialUiPickersDate) => {
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
              }}
              style={{ width: 160 }}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                },
              }}
            />
          </MuiPickersUtilsProvider>
        </Value>
      </Item>

      <Item>
        <Field name="Target Amount" icon={faDollarSign} />
        <Value>
          <StringInput
            value={targetAmount ?? ''}
            onChange={(e) => {
              const nextTargetAmount = parseFloat(e.target.value)
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
            }}
          />
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
    </GoalModalContainer>
  )
}

const GoalModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  position: relative;
`

type FieldProps = { name: string; icon: IconDefinition }
function Field(props: FieldProps) {
  return (
    <FieldContainer>
      <FontAwesomeIcon icon={props.icon} size="2x" />
      <FieldName>{props.name}</FieldName>
    </FieldContainer>
  )
}

const Value = styled.div`
  margin-left: 2rem;
`

type AddIconButtonContainerProps = { hasIcon: boolean }
const AddIconButtonContainer = styled.div<AddIconButtonContainerProps>`
  display: ${(props) => (props.hasIcon ? 'none' : 'flex')};
`

type EmojiPickerContainerProps = {
  isOpen: boolean
  hasIcon: boolean
}
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
