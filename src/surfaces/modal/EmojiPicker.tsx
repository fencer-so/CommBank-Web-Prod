import { Picker } from 'emoji-mart';
import "emoji-mart/css/emoji-mart.css";
import { useAppSelector } from '../../app/hooks';
import { selectMode } from '../../features/themeswitcher/themeSlice';


type EmojiPickerProps = { onClick: (a: any, b: any) => void }
export default function EmojiPicker(props: EmojiPickerProps) {

  const theme = useAppSelector(selectMode)
  return (
    <Picker theme={theme} showPreview={false} showSkinTones={false} onClick={props.onClick} color="primary" />
  )
}