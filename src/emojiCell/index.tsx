import {Text, TouchableOpacity} from 'react-native'
import {Emoji} from '../interfaces'

interface Props {
	emoji: Emoji
	colSize: number

	onPress(): void
}

export const EmojiCell = ({emoji, colSize, onPress}: Props) => (
	<TouchableOpacity
		activeOpacity={0.5}
		style={{width: colSize, height: colSize, alignItems: 'center', justifyContent: 'center'}}
		onPress={onPress}
	>
		<Text style={{color: '#fff', fontSize: colSize - 15}} children={emoji.emoji}/>
	</TouchableOpacity>
)