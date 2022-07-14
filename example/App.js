import {StyleSheet, View} from 'react-native'
// import EmojiPicker, {emojiFromUtf16} from "rn-emoji-picker"
import EmojiPicker, {emojiFromUtf16} from "./dist"
// import {emojis} from "rn-emoji-picker/dist/data"
import {emojis} from './dist/data'
// recommend using an asset loader for emojis
// or fetching over network for decreased bundle size
import {useState} from "react"
import {StatusBar} from 'expo-status-bar'

console.log(emojiFromUtf16('1F9E8')) // "🧨" helper to decode unified

export default function App() {
    const [recent, setRecent] = useState([])
    // replace w/ your preferred device storage library

    return ( // try in a navigation modal!
        <View style={styles.container}>
            <EmojiPicker
                emojis={emojis} // emojis data source see data/emojis
                recent={recent} // store of recently used emojis
                autoFocus={true} // autofocus search input
                loading={false} // spinner for if your emoji data or recent store is async
                darkMode={true} // to be or not to be, that is the question
                perLine={7} // # of emoji's per line
                onSelect={console.log} // callback when user selects emoji - returns emoji obj
                onChangeRecent={setRecent} // callback to update recent storage - arr of emoji objs
                // backgroundColor={'#000'} // optional custom bg color
            />
            <StatusBar style="light"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 50
    },
})
