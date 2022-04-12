import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {WIDTH, ALL, RECENT} from "../constants";

export const TabBar = ({categories, activeCategory, onPress, darkMode}) => {
    const categoryKeys = Object.keys(categories).filter(c => c !== ALL && c !== RECENT);
    const tabSize = WIDTH / categoryKeys.length;

    return (
        <View style={styles.container}>
            {
                categoryKeys.map(c => {
                    const category = categories[c]
                    return (
                        <TouchableOpacity
                            key={category.name}
                            onPress={() => onPress(category)}
                            style={[
                                styles.touchable,
                                {
                                    height: tabSize,
                                }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.emoji,
                                    {fontSize: tabSize - 20}
                                ]}
                            >
                                {category.symbol}
                            </Text>
                            <View
                                style={{
                                    width: tabSize - 20,
                                    height: 1,
                                    backgroundColor: category === activeCategory ? darkMode ?  '#fff' : '#323333' : 'transparent'
                                }}
                            />
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    touchable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        textAlign: "center",
        paddingBottom: 8,
    }
});