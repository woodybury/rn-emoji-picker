import {memo} from 'react'
import {StyleSheet, Text} from 'react-native'

const SectionHeader = ({name}: { name: string }) => {
	return (
		<Text
			style={styles.sectionHeader}
		>
			{name}
		</Text>
	)
}

const styles = StyleSheet.create({
	sectionHeader: {margin: 8, fontSize: 17, width: '100%', color: '#999'}
})

export default memo(SectionHeader)