import { View, StyleSheet, TextInput } from 'react-native'

export const Input = ({
        placeholder,
        value,
        onChangeText,
        autoFocus,
        darkMode
    }) => {

    return (
        <View style={[styles.container, {
            backgroundColor: darkMode ? '#323333' : '#fff',
            borderColor: darkMode ? 'transparent' : '#999',
            borderWidth: darkMode ? 0 : 1
        }]}>
            <View flex={1}>
                <TextInput
                    clearButtonMode={'while-editing'}
                    style={[styles.input, {color: darkMode ? '#fff' : '#323333'}]}
                    returnKeyType={'search'}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#999'
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
        borderRadius: 2,
        overflow: 'hidden',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        height: 40,
        fontSize: 16,
    }
})