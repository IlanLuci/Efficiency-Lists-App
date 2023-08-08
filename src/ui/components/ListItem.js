import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import Check from '../../assets/check.svg';

export default function MenuItem(props) {
    const [isActive, setIsActive] = useState(false);

    function changeState(e) {
        setIsActive(current => !current);
    }

    return (
        <TouchableOpacity style={styles.bar}>
            <TouchableOpacity style={isActive ? styles.checked : styles.unchecked} onPress={changeState}>
                <Check style={{ display: isActive ? 'flex' : 'none', marginLeft: -9, marginTop: -8 }} />
            </TouchableOpacity>

            <Text style={styles.text}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
   bar: {
    flexDirection:'row',
    flexWrap:'wrap',
    gap: 10,
    alignItems: 'center',
    marginTop: 8,
    width: "100%",
    padding: 8,
    backgroundColor: "#222",
    borderRadius: 5,
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
