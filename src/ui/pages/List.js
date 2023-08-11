import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from "@react-navigation/native"
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Arrow from '../../assets/arrow.svg';
import Plus from '../../assets/plus.svg';

import ListItem from '../components/ListItem';

export default function Home(props) {
    const [listData, setlistData] = useState([]);
    const [activeID, setActiveID] = useState();
    const route = useRoute();
    const name = route.params?.name;
    
    try {
        // get list items from storage
        AsyncStorage.getItem(`v1/list/${name}`).then(listJsonStr => {
            if (!listJsonStr) {
                // TODO: display some sort of empty list message
                return ('empty');
            }
    
            // parse list items into json
            const listJson = JSON.parse(listJsonStr);

            if (listJson.length == 0) {
                // TODO: display some sort of empty list message
                return ('empty');
            }

            // display list items on page
            setlistData(listJson);
        });
    } catch (error) {
        // TODO: display some sort of empty list message
        console.log(error)
        return ('empty');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.back}>
                <Arrow height={30} width={30} />
            </TouchableOpacity>

            <FlatList
                data={listData}
                renderItem={({item}) => <ListItem
                    activeItem={activeID}
                    setActive={(id) => { activeID === id ? setActiveID(null) : setActiveID(id) }}
                    id={item.id}
                    key={item.id} 
                    title={item.title} 
                    description={item.description}
                    checked={item.checked} 
                    onChecked={() => { checkItem(item.id) }}
                    onRemoved={() => { removeItem(item.id) }}
                    editDescription={(text) => { editItemDesciption(item.id, text.nativeEvent.text) }}
                    editTitle={(text) => { editItemTitle(item.id, text.nativeEvent.text) }}
                />}
                keyExtractor={item => item.id}
                style={styles.items} 
            />

            <TouchableOpacity onPress={addItem} style={styles.new}>
                <Plus />
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );

    async function addItem() {
        // if the list is empty, initialize it
        // otherwise add the new item to the end of the list
        let data = listData.length == 0 ? [{ "id": 0, "title": "untitled", "description": "description", "checked": false }] : [...showData, { "id": showData.length, "title": "untitled", "description": "description", "checked": false }];

        // update the list on the page
        setlistData(data);
        
        // set the selected item to the newly created one
        // this should expand the newly created item
        // TODO: find some way to focus on the textinput for this item
        setActiveID(listData.length);

        try {
            // save the updated list to storage
            await AsyncStorage.setItem(`v1/list/${name}`, JSON.stringify(data));
        } catch (e) {
            // error saving data
            console.log(error);
        }
    }

    async function checkItem(id) {
        data = listData;

        // retrieve the index of the item with the id provided
        let item = data.find(item => item.id == id);
        let index = data.indexOf(item);

        // toggle the items checked property
        data[index].checked = !data[index].checked;

        // display the updates on the page
        setlistData(data);

        try {
            // save the updated list to storage
            await AsyncStorage.setItem(`v1/list/${name}`, JSON.stringify(data));
        } catch (e) {
            // error saving data
            console.log(error);
        }
    }

    async function removeItem(id) {
        data = listData;

        // retrieve the index of the item with the id provided
        let item = data.find(item => item.id == id);
        let index = data.indexOf(item);

        // remove the item from the list
        data.splice(index, 1)

        // display the updates on the page
        setlistData(data);

        try {
            // save the updated list to storage
            await AsyncStorage.setItem(`v1/list/${name}`, JSON.stringify(data));
        } catch (e) {
            // error saving data
            console.log(error);
        }
    }

    async function editItemTitle(id, text) {
        data = listData;

        // retrieve the index of the item with the id provided
        let item = data.find(item => item.id == id);
        let index = data.indexOf(item);

        // update the item title with the new user inputted value
        data[index].title = text;

        // display the updates on the page
        setlistData(data);

        try {
            // save the updated list to storage
            await AsyncStorage.setItem(`v1/list/${name}`, JSON.stringify(data));
        } catch (e) {
            // error saving data
            console.log(error);
        }
    }

    async function editItemDesciption(id, text) {
        data = listData;

        // retrieve the index of the item with the id provided
        let item = data.find(item => item.id == id);
        let index = data.indexOf(item);

        // update the item description with the new user inputted value
        data[index].description = text;

        // display the updates on the page
        setlistData(data);

        try {
            // save the updated list to storage
            await AsyncStorage.setItem(`v1/list/${name}`, JSON.stringify(data));
        } catch (e) {
            // error saving data
            console.log(error);
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
        width: "95%",
        left: "2.5%"
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
