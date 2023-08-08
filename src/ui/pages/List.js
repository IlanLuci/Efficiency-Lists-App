import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from "@react-navigation/native"
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Arrow from '../../assets/arrow.svg';
import Plus from '../../assets/plus.svg';

import ListItem from '../components/ListItem';

export default function Home(props) {
    const [showData, setShowData] = useState([]);
    const route = useRoute();
    const name = route.params?.name;
    
    try {
        AsyncStorage.getItem(`v1/list/${name}`).then(listJsonStr => {
            if (!listJsonStr) {
                // TODO: display some sort of empty list message
                return ('fail');
            }
    
            const listJson = JSON.parse(listJsonStr);

            setShowData(listJson);
        });
    } catch (error) {
        // TODO: display some sort of empty list message
        console.log(error)
        return ('fail');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.back}>
                <Arrow height={30} width={30} />
            </TouchableOpacity>

            <ScrollView style={styles.items}>
                {showData.map(dataItem => (
                    <ListItem key={dataItem.id} title={dataItem.title} checked={dataItem.checked} onChecked={() => { checkItem(dataItem.id) }} editTitle={(text) => { editItemTitle(dataItem.id, text.nativeEvent.text) }} />
                ))}
            </ScrollView>

            <TouchableOpacity onPress={addItem} style={styles.new}>
                <Plus />
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );

    async function addItem() {
        let data = showData.length == 0 ? [{ "id": 0, "title": "untitled", "checked": false }] : [...showData, { "id": showData.length, "title": "untitled", "checked": false }];

        setShowData(data);

        try {
            await AsyncStorage.setItem(`v1/list/${name}`, JSON.stringify(data));
        } catch (e) {
            console.log(error)
            // saving error
        }
    }

    async function checkItem(id) {
        data = showData;

        let item = data.find(item => item.id == id);
        let index = data.indexOf(item);

        data[index].checked = !data[index].checked;

        setShowData(data);

        try {
            await AsyncStorage.setItem(`v1/list/${name}`, JSON.stringify(data));
        } catch (e) {
            console.log(error)
            // saving error
        }
    }

    async function editItemTitle(id, text) {
        data = showData;

        let item = data.find(item => item.id == id);
        let index = data.indexOf(item);

        data[index].title = text;

        setShowData(data);

        try {
            await AsyncStorage.setItem(`v1/list/${name}`, JSON.stringify(data));
        } catch (e) {
            console.log(error)
            // saving error
        }
    }
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
    },
    new: {
        backgroundColor: "#222",
        borderRadius: "50%",
        padding: 2,
        position: 'absolute',
        bottom: 15,
        right: 15
    }
});
