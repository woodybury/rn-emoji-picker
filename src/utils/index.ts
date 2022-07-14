import {Emoji} from '../interfaces'

// filter emojis by category name
export const emojiByCategory = (categoryName: string, emojis: Emoji[]) => emojis.filter(e => e.category.toLowerCase() === categoryName.toLowerCase())

// sort dec using order param
export const sortEmojis = (emojis: Emoji[]) => emojis.sort((a, b) => a.order - b.order)

// chunk emojis into arrays for each row
export const chunkEmojis = (emojis: Emoji[], key: string, chunkSize = 6) => {
	const chunkedArr = []
	for (let i = 0; i < emojis.length; i += chunkSize) {
		const chunk = emojis.slice(i, i + chunkSize)
		chunkedArr.push({key: key + '-' + i, category: key, data: chunk})
	}
	return chunkedArr
}


// @todo calc section list item layout
// try to modernize/simplify https://github.com/jsoendermann/rn-section-list-get-item-layout
interface Props {
	itemHeight: number
	separatorHeight?: number
	sectionHeaderHeight?: number
	sectionFooterHeight?: number
	listHeaderHeight?: number
	listFooterHeight?: number
	sections: any
	index: number
}

export const calcSectionItemLayout = ({
	                              itemHeight = 0,
	                              separatorHeight = 0,
	                              sectionHeaderHeight = 0,
	                              sectionFooterHeight = 0,
	                              listHeaderHeight = 0,
	                              listFooterHeight = 0,
																sections = [],
																index = 0
                              }: Props) => {
	let length = listHeaderHeight!, offset = 0, currentIndex = 0
	while (currentIndex < index) {
		offset += length
		if (currentIndex > 0)  length = listFooterHeight
		currentIndex++
		const sectionsLength = sections.length
		for (let sectionIndex = 0; ((sectionIndex < sectionsLength) && (currentIndex < index)); sectionIndex++) {
			offset += length
			length = sectionHeaderHeight
			currentIndex++
			const sectionData = sections[sectionIndex].data
			const dataLength = sectionData.length
			for (let dataIndex = 0; ((dataIndex < dataLength) && (currentIndex < index)); dataIndex++) {
				offset += length
				const separator_height = dataIndex < dataLength - 1 ? separatorHeight : 0
				length = itemHeight + separator_height
				currentIndex++
			}
			if (!dataLength && (currentIndex < index)) {
				offset += length
				length = sectionFooterHeight
				currentIndex++
			}
		}
	}
	return {
		index,
		length,
		offset
	}
}
