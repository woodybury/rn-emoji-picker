export const RECENT = 'recent'
export const SEARCH = 'search'

export const categories = [
	{key: RECENT, emoji: '🕛', name: 'Recently used'},
	{key: 'emotion', emoji: '🤪', name: 'Smileys & Emotion'},
	{key: 'people', emoji: '💁‍♀', name: 'People & Body'},
	{key: 'nature', emoji: '🦄', name: 'Animals & Nature'},
	{key: 'food', emoji: '🍔', name: 'Food & Drink'},
	{key: 'activities', emoji: '⚾️', name: 'Activities'},
	{key: 'places', emoji: '✈️', name: 'Travel & Places'},
	{key: 'objects', emoji: '💡', name: 'Objects'},
	{key: 'emojis', emoji: '⁉', name: 'Symbols'},
	{key: 'flags', emoji: '🏳️‍🌈', name: 'Flags'}
] as const;

export const categoryKeys = categories.map(c => c.key);