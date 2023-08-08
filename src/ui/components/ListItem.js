import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { useState } from 'react';

import Check from '../../assets/check.svg';

import Expandable from '../components/Expandable';

export default function MenuItem(props) {
    const [isChecked, setIsChecked] = useState(props.checked);
    const [isActive, setIsActive] = useState(false);

    function changeState() {
        setIsChecked(!isChecked);
        props.onChecked();
    }

    return (
        <TouchableOpacity style={styles.bar} onPress={() => { setIsActive(!isActive); }}>
            <View style={styles.row}>
                <TouchableOpacity style={isChecked ? styles.checked : styles.unchecked} onPress={changeState}>
                    <Check style={{ display: isChecked ? 'flex' : 'none', marginLeft: -9, marginTop: -8 }} />
                </TouchableOpacity>

                <TextInput editable={isActive} selectTextOnFocus={isActive} style={styles.text} onSubmitEditing={props.editTitle} onTouchStart={() => { if (!isActive) setIsActive(!isActive) }}>
                    {props.title}
                </TextInput>
            </View>

            <View style={styles.row}>
                <Expandable expanded={isActive} />
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
    color: "whitesmoke",
    fontSize: 16,
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
