import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { useAppSelector } from '../../store/hooks'
import { selectMode } from '../../store/themeSlice'

type EmojiPickerProps = {
  onClick: (a: any, b: any) => void
}
export default function EmojiPicker(props: EmojiPickerProps) {
  const theme = useAppSelector(selectMode)
  return (
    <Picker
      theme={theme}
      showPreview={false}
      showSkinTones={false}
      onClick={props.onClick}
      color="primary"
    />
  )
}
