import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';

import Check from '../../assets/check.svg';
import Trash from '../../assets/trash.svg';

import Expandable from '../components/Expandable';

export default function MenuItem(props) {
    const [isChecked, setIsChecked] = useState(props.checked);
    const focus = useRef();

    function changeState() {
        setIsChecked(!isChecked);
        props.onChecked();
    }

    return (
        <TouchableOpacity style={styles.bar} onPress={() => { props.setActive(props.id) }}>
            <View style={styles.row}>
                <TouchableOpacity ref={focus} style={isChecked ? styles.checked : styles.unchecked} onPress={changeState}>
                    <Check style={{ display: isChecked ? 'flex' : 'none', marginLeft: -9, marginTop: -8 }} />
                </TouchableOpacity>

                <TextInput selectTextOnFocus={false} style={styles.text} onEndEditing={props.editTitle} onTouchEnd={() => { if (props.id !== props.activeItem) props.setActive(props.id) }}>
                    {props.title}
                </TextInput>
                <Trash onPress={() => { props.onRemoved() }} />
            </View>

            <View style={styles.row}>
                <Expandable description={props.description} editDescription={props.editDescription} expanded={props.id === props.activeItem} />
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
   bar: {
    marginTop: 8,
    width: "95%",
    padding: 8,
    backgroundColor: "#222",
    borderRadius: 5,
  },
  row: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: "100%",
    alignItems: 'center',
  },
  text : {
    padding: 3,
    color: "whitesmoke",
    fontSize: 16,
    width: "75%"
  },
  unchecked: {
    height: 32,
    width: 32,
    borderColor: "whitesmoke",
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  checked: {
    height: 32,
    width: 32,
    borderColor: "whitesmoke",
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: '#32a84c'
  }
});
