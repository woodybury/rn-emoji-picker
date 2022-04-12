import {Text, TouchableOpacity} from "react-native"

export const EmojiCell = ({emoji, colSize, onPress}) => (
    <TouchableOpacity
        activeOpacity={0.5}
        style={{width: colSize, height: colSize, alignItems: "center", justifyContent: "center"}}
        onPress={onPress}
    >
        <Text style={{color: "#fff", fontSize: colSize - 12}} children={emoji.emoji}/>
    </TouchableOpacity>
)