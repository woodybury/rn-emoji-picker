import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {WIDTH} from '../constants'
import {Category} from '../interfaces'

interface Props {
	categories: Category[]
	activeCategory: Category
	darkMode: boolean

	onPress(category: Category): void
}

export const TabBar = ({categories, activeCategory, onPress, darkMode}: Props) => {
	const tabSize = WIDTH / categories.length
	const uiSize = tabSize - 20

	return (
		<View style={styles.container}>
			{
				categories.map(category => {
					return (
						<TouchableOpacity
							key={category.key}
							onPress={() => onPress(category)}
							style={[
								styles.touchable,
								{
									height: tabSize
								}
							]}
						>
							<Text
								style={[
									styles.emoji,
									{fontSize: uiSize}
								]}
							>
								{category.emoji}
							</Text>
							<View
								style={{
									width: uiSize,
									height: 1,
									backgroundColor: category.key === activeCategory.key ? darkMode ? '#fff' : '#323333' : 'transparent'
								}}
							/>
						</TouchableOpacity>
					)
				})
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	touchable: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	emoji: {
		textAlign: 'center',
		paddingBottom: 8
	}
})