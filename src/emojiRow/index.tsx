import React, {memo} from 'react'
import {View} from 'react-native'
import {Emoji} from '../interfaces'
import {EmojiCell} from '../emojiCell'

interface Props {
	rowItems: Emoji[]
	colSize: number

	selectEmoji(emoji: Emoji): void
}

const EmojiRow = ({rowItems, colSize, selectEmoji}: Props) => {
	return (
		<View style={{flexDirection: 'row'}}>
			{
				rowItems.map(emoji => (
					<EmojiCell
						key={emoji.unified}
						emoji={emoji}
						onPress={() => selectEmoji(emoji)}
						colSize={colSize}
					/>
				))
			}
		</View>
	)
}

export default memo(EmojiRow)