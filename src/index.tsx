import React, {useMemo, useRef, useState} from 'react'
import {
	View,
	StyleSheet,
	ActivityIndicator,
	SectionList,
	Keyboard
} from 'react-native'
import {TabBar} from './tabBar'
import {Input} from './input'
import {categories, SEARCH, RECENT, WIDTH} from './constants'
import {Emoji, Category} from './interfaces'
import SectionHeader from './sectionHeader'
import EmojiRow from './emojiRow'
import {chunkEmojis, sortEmojis, emojiByCategory, calcSectionItemLayout} from './utils'

// helper fn for end users
export const emojiFromUtf16 = (utf16: string) => String.fromCodePoint(...utf16.split('-').map(u => '0x' + u) as any)

interface Props {
	recent: Emoji[]
	emojis: Emoji[]
	loading: boolean
	autoFocus: boolean
	darkMode: boolean
	perLine: number

	onSelect(emoji: Emoji): void

	onChangeRecent(recent: Emoji[]): void
}

const EmojiPicker = ({
	                     recent = [],
	                     emojis = [],
	                     loading = false,
	                     autoFocus = true,
	                     darkMode = true,
	                     perLine = 8,
	                     onSelect = (emoji: Emoji) => null,
	                     onChangeRecent = (recent: Emoji[]) => null
                     }: Props) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [category, setCategory] = useState(categories[0])
	const colSize = Math.floor(WIDTH / perLine)
	const sectionList = useRef<any>(null)

	const {sections, total} = useMemo(() => { // expensive calc
		const emojiList = {}
		let total = 0
		categories.forEach(category => {
			const key = category.key
			const list = key === RECENT ? recent : sortEmojis(emojiByCategory(category.name, emojis))
			const chunks = chunkEmojis(list, key, perLine)
			total += chunks.length
			emojiList[key] = chunkEmojis(list, key, perLine)
		})
		const sections = categories.map(category => ({name: category.name, data: emojiList[category.key]}))
		return ({sections, total})
	}, [emojis, categories, recent])

	const searchResults = useMemo(() => { // expensive calc
		if (!searchQuery.length) return []
		let emoji
		const filtered = emojis.filter(e => {
			const term = searchQuery.toLowerCase()
			if (term.includes(e.emoji)) {
				emoji = e
				return true
			}
			return e.keywords.some(e => e.includes(term))
		})
		if (emoji) onSelect(emoji)
		return [{name: 'Search results', data: chunkEmojis(filtered, SEARCH, perLine)}]
	}, [emojis, searchQuery])

	const selectTab = (category: Category) => {
		if (!loading && sectionList?.current) {
			const index = categories.findIndex(c => c.key === category.key)
			sectionList.current.scrollToLocation({
				sectionIndex: index,
				itemIndex: 0,
				animated: false
			})
			setSearchQuery('')
			setCategory(category)
		}
	}

	const selectEmoji = (emoji: Emoji) => {
		onSelect(emoji)
		addToRecent(emoji)
	}

	const addToRecent = (emoji: Emoji) => {
		const newRecent: Emoji[] = []
		const existing = recent.find(h => h.unified === emoji.unified)
		if (existing) {
			const filtered = recent.filter(h => h.unified !== emoji.unified)
			newRecent.push(emoji, ...filtered)
		} else {
			newRecent.push(emoji, ...recent)
		}
		onChangeRecent(newRecent.splice(0, 18))
	}

	const renderSectionHeader = ({section}: { section: any }) => <SectionHeader name={section.name}/>

	const renderEmojiRow = ({item}: { item: { key: string, data: Emoji[] } }) => <EmojiRow
		selectEmoji={selectEmoji}
		rowItems={item.data}
		colSize={colSize}
	/>

	return (
		<View style={[styles.container, {backgroundColor: darkMode ? '#000' : '#fff'}]}>
			<TabBar
				activeCategory={category}
				onPress={selectTab}
				categories={categories}
				darkMode={darkMode}
			/>
			<View style={{flex: 1}}>
				<View style={styles.searchbarContainer}>
					<Input
						placeholder="Search..."
						value={searchQuery}
						onChangeText={setSearchQuery}
						autoFocus={autoFocus}
						darkMode={darkMode}
					/>
				</View>
				{!loading ? (
					<SectionList
						style={{flex: 1}}
						sections={searchResults.length ? searchResults : sections}
						keyExtractor={item => item.key}
						renderItem={renderEmojiRow}
						renderSectionHeader={renderSectionHeader}
						contentContainerStyle={{paddingBottom: colSize}}
						horizontal={false}
						keyboardShouldPersistTaps={'handled'}
						removeClippedSubviews={true}
						showsVerticalScrollIndicator={false}
						stickySectionHeadersEnabled={false}
						ref={sectionList}
						initialNumToRender={total} // @todo calc section list item layout see calcSectionItemLayout util method
						onScrollBeginDrag={Keyboard.dismiss}
						onViewableItemsChanged={data => {
							const categoryKey = data.viewableItems[0]?.item?.category
							if (!categoryKey || categoryKey === category.key) return
							if (categoryKey === 'search') return setCategory(categories[0])
							setCategory(categories.find(c => c.key === categoryKey)!)
						}}
					/>
				) : (
					<View style={styles.loader}>
						<ActivityIndicator size="large" color="#323333"/>
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {flex: 1, width: '100%'},
	loader: {flex: 1, alignItems: 'center', justifyContent: 'center'},
	searchbarContainer: {width: '100%', zIndex: 1, padding: 8},
	sectionHeader: {margin: 8, fontSize: 17, width: '100%', color: '#999'}
})

export default EmojiPicker