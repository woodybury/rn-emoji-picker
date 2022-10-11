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
import {categories , SEARCH, RECENT, categoryKeys} from './constants'
import {Emoji, Category} from './interfaces'
import SectionHeader from './sectionHeader'
import EmojiRow from './emojiRow'
import {chunkEmojis, sortEmojis, emojiByCategory} from './utils'

// helper fn for end users see https://github.com/yonahforst/react-native-emoji-picker/issues/4
export const emojiFromUtf16 = (utf16: string) => String.fromCodePoint(...utf16.split('-').map(u => '0x' + u) as any)

type CategoryKey = `${typeof categories[number]['key']}`;
interface Props {
	recent?: Emoji[]
	emojis: Emoji[]
	loading: boolean
	autoFocus: boolean
	darkMode: boolean
	perLine: number
	backgroundColor?: string
	defaultCategory?: CategoryKey
	enabledCategories?: CategoryKey[],
	onSelect(emoji: Emoji): void

	onChangeRecent?(recent: Emoji[]): void
}

const EmojiPicker = ({
	recent = [],
	emojis = [],
	loading = false,
	autoFocus = true,
	darkMode = true,
	backgroundColor = darkMode ? '#000' : '#fff',
	perLine = 8,
	onSelect = (emoji: Emoji) => null,
	onChangeRecent = (recent: Emoji[]) => {},
	defaultCategory = 'emotion',
	enabledCategories = categoryKeys,
  }: Props) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [width, setWidth] = useState(0);
	const colSize = Math.floor(width / perLine)
	const sectionList = useRef<any>(null)
	const [init, setInit] = useState(true)
	const finalCategories = categories.filter(category => enabledCategories.includes(category.key))
	const [category, setCategory] = useState<Category>(finalCategories.find(c => c.key === defaultCategory) || finalCategories[1]) // smiley

	const {sections} = useMemo(() => { // expensive calc @todo speed up
		const emojiList = {} // map of emojis to categories
		finalCategories.forEach(category => {
			const key = category.key
			const list = key === RECENT ? recent : sortEmojis(emojiByCategory(category.name, emojis))
			emojiList[key] = chunkEmojis(list, key, perLine)
		})
		const sections = finalCategories.map(category => ({name: category.name, key: category.key, data: emojiList[category.key]}))
		return ({sections})
	}, [emojis, finalCategories, recent])

	const searchResults = useMemo(() => { // expensive calc @todo speed up?
		if (!searchQuery.length) return []
		let emoji
		const filtered = emojis.filter(e => {
			const term = searchQuery.toLowerCase()
			if (term.includes(e.emoji)) {
				emoji = e // if user types an emoji select it
				return true
			}
			return e.keywords.some(e => e.includes(term))
		})
		if (emoji) onSelect(emoji)
		return [{name: 'Search results', key: SEARCH, data: chunkEmojis(filtered, SEARCH, perLine)}] // create one section on results
	}, [emojis, searchQuery])

	const selectTab = (category: Category) => {
		setSearchQuery('')
		setCategory(category)
		setInit(false)
	}

	const selectEmoji = (emoji: Emoji) => {
		onSelect(emoji)
		addToRecent(emoji)
	}

	const addToRecent = (emoji: Emoji) => {
		const newRecent: Emoji[] = []
		const existing = recent.find(h => h.unified === emoji.unified)
		if (existing) { // if already saved, bump to the front
			const filtered = recent.filter(h => h.unified !== emoji.unified)
			newRecent.push(emoji, ...filtered)
		} else { // add to the front
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

	const activeSection = sections.find(s => s.key === category.key)

	return (
		<View style={[styles.container, {backgroundColor}]} onLayout={event => setWidth(event.nativeEvent.layout.width)}>
			<TabBar
				activeCategory={category}
				onPress={selectTab}
				categories={finalCategories}
				darkMode={darkMode}
				width={width}
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
						sections={searchQuery ? searchResults : init && recent.length ? [sections[0], activeSection] : [activeSection]}
						keyExtractor={(item) => item.key}
						renderItem={renderEmojiRow}
						renderSectionHeader={renderSectionHeader}
						contentContainerStyle={{paddingBottom: colSize}}
						horizontal={false}
						keyboardShouldPersistTaps={"handled"}
						removeClippedSubviews
						showsVerticalScrollIndicator={false}
						stickySectionHeadersEnabled={false}
						ref={sectionList}
						onScrollBeginDrag={Keyboard.dismiss}
					/>
					// <SectionList
					// 	style={{flex: 1}}
					// 	sections={searchResults.length ? searchResults : sections}
					// 	keyExtractor={item => item.key}
					// 	renderItem={renderEmojiRow}
					// 	renderSectionHeader={renderSectionHeader}
					// 	contentContainerStyle={{paddingBottom: colSize}}
					// 	horizontal={false}
					// 	keyboardShouldPersistTaps={'handled'}
					// 	removeClippedSubviews={true}
					// 	showsVerticalScrollIndicator={false}
					// 	stickySectionHeadersEnabled={false}
					// 	ref={sectionList}
					// 	initialNumToRender={total} // @todo calc section list item layout see calcSectionItemLayout util method
					// 	onScrollBeginDrag={Keyboard.dismiss}
					// 	onViewableItemsChanged={data => { // update category from scroll pos
					// 		const categoryKey = data.viewableItems[0]?.item?.category
					// 		if (!categoryKey || categoryKey === category.key) return
					// 		if (categoryKey === 'search') return setCategory(categories[0])
					// 		setCategory(categories.find(c => c.key === categoryKey)!)
					// 	}}
					// />
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