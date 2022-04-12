import { StyleSheet, View } from 'react-native';
import EmojiPicker from "../index";
import {useState} from "react";

export default function App() {
    const [history, setHistory] = useState([])
    return (
        <View style={styles.container}>
            <EmojiPicker
                onSelect={console.log}
                history={history}
                setHistory={setHistory}
                autoFocus={true}
                loading={false}
                darkMode={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 50
    },
});
