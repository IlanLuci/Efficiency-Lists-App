import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Arrow from '../../assets/arrow.svg';

import MenuItem from '../components/MenuItem';

export default function Home(props) {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.back}>
            <Arrow height={30} width={30} />
        </TouchableOpacity>
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
      }
});
