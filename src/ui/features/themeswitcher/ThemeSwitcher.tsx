import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectMode, setDarkMode, setLightMode } from '../../../store/themeSlice'

export default function ThemeSwitcher() {
  const mode = useAppSelector(selectMode)
  const dispatch = useAppDispatch()

  const onClick = () => {
    if (mode === 'light') dispatch(setDarkMode())
    else dispatch(setLightMode())
  }

  return (
    <div onClick={onClick}>
      <FontAwesomeIcon icon={mode === 'light' ? faMoon : faSun} size="2x" />
    </div>
  )
}
