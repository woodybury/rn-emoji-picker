import {View, StyleSheet, TextInput} from 'react-native'

interface Props {
	placeholder: string
	value: string
	darkMode: boolean
	autoFocus: boolean

	onChangeText(text: string): void
}


export const Input = ({
	                      placeholder,
	                      value,
	                      onChangeText,
	                      autoFocus,
	                      darkMode
                      }: Props) => {
	return (
		<View style={[styles.container, {
			backgroundColor: darkMode ? '#323333' : '#fff',
			borderColor: darkMode ? 'transparent' : '#999',
			borderWidth: darkMode ? 0 : 1
		}]}>
			<View style={{flex: 1}}>
				<TextInput
					clearButtonMode={'while-editing'}
					style={[styles.input, {color: darkMode ? '#fff' : '#323333'}]}
					returnKeyType={'search'}
					onChangeText={onChangeText}
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#999"
					blurOnSubmit
					underlineColorAndroid="transparent"
					autoFocus={autoFocus}
					keyboardAppearance={darkMode ? 'dark' : 'light'}
					autoCorrect={false}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		overflow: 'hidden',
		height: 34,
		flexDirection: 'row',
		alignItems: 'center'
	},
	input: {
		flex: 1,
		paddingHorizontal: 15,
		height: 34,
		fontSize: 16,
		padding: 0
	}
})