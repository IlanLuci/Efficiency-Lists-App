import { StyleSheet, TextInput, View } from "react-native";

export default function Expandable({ expanded, editDescription, description }) {
  // list item description that expands on selection
  return (
    <View style={{ display: expanded ? 'flex' : 'none' }}>
        <TextInput multiline={true} style={styles.description} onEndEditing={editDescription}>{description}</TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
    description: {
        color: 'whitesmoke',
        padding: 10,
        marginTop: 10,
    }
});
