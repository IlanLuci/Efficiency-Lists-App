import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Arrow from '../../assets/arrow.svg';

import ListItem from '../components/ListItem';

export default function Home(props) {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.back}>
            <Arrow height={30} width={30} />
        </TouchableOpacity>

        <View style={styles.items}>
            {/* Temporary */}
            <ListItem title={'Item 1'} />
            <ListItem title={'Item 2'} />
            <ListItem title={'Item 3'} />
        </View>

        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        paddingTop: 50
    },
    back: {
        transform: [{ rotate: '180deg'}],
        alignSelf: 'left',
        marginLeft: 20,
        borderRadius: 5,
        backgroundColor: "#222",
        padding: 7
    },
    items: {
        width: "90%"
    }
});
