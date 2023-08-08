import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import RightArrow from '../../assets/arrow.svg';

export default function MenuItem(props) {
  return (
    <TouchableOpacity style={styles.bar} onPress={() => props.navigation.navigate(props.link)}>
      <Text style={styles.text}><props.icon /> {props.title} <RightArrow height={12} width={12} style={styles.arrow} /></Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
   bar: {
    margin: 5,
    width: "90%",
    padding: 12,
    backgroundColor: "#222",
    borderRadius: 5,
  },
  text : {
    color: "whitesmoke",
    fontSize: 16,
  },
  arrow: {
    textAlign: "right"
  }
});
