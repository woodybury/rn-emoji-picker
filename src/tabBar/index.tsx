import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Category} from '../interfaces'

interface Props {
	categories: Readonly<Category[]>
	activeCategory: Category
	darkMode: boolean
	width: number
	
	onPress(category: Category): void
}

export const TabBar = ({categories, activeCategory, onPress, darkMode, width}: Props) => {
	const tabSize = width / categories.length
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