# React Native Emoji Picker

### Super light weight 0 dependencies emoji picker for React Native Apps. 


<img width="200px" src="https://raw.githubusercontent.com/WoodburyShortridge/rn-emoji-picker/master/screenshot.png" />

If using an asset loader for the emoji json (recommended):

- 3.7 kB packaged
- 12.3 kB unpacked

### Un-opinionated:
- Use any storage framework (e.g. [Async Storage](https://reactnative.directory/?search=storage) vs. new JSI [Mmkv Stoage](https://github.com/ammarahm-ed/react-native-mmkv-storage))
- Load emoji json any way you please (e.g. import from package, [Expo Assets](https://docs.expo.dev/versions/latest/sdk/asset/), over network)

### Install:

`npm i rn-emoji-picker` or `yarn rn-emoji-picker`

### Example usage:

```javascript
import { StyleSheet, View } from 'react-native'
import EmojiPicker, {emojiFromUtf16} from "rn-emoji-picker"
import {emojis} from "rn-emoji-picker/data/emojis"
// recommend using an asset loader for emojis
// or fetching over network for decreased bundle size
import {useState} from "react"

console.log(emojiFromUtf16('1F9E8')) // "🧨" helper to decode unified

export default function App() {
  const [recent, setRecent] = useState([])
  // replace w/ your preferred device storage library

  return ( // try in a navigation modal!
    <View style={styles.container}>
        <EmojiPicker
            emojis={emojis} // emojis data source see data/emojis.js
            recent={recent} // store of recently used emojis
            autoFocus={true} // autofocus search input
            loading={false} // use if your emoji data or recent store is async
            darkMode={true} // to be or not to be, that is the question
            onSelect={console.log} // callback when user selects emoji - returns emoji obj
            onChangeRecent={setRecent} // callback to update recent storage - arr of emoji objs
        />
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
```
