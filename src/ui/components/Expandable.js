import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, Text, TextInput } from "react-native";

export default function Expandable({ expanded, editDescription, description }) {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: expanded ? 100 : 0,
      duration: 150,
      useNativeDriver: false
    }).start();
  }, [expanded, height]);

  return (
    <Animated.View style={{ display: expanded ? 'flex' : 'none' }}>
        <TextInput multiline={true} style={styles.description} onEndEditing={editDescription}>{description}</TextInput>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    description: {
        color: 'whitesmoke',
        padding: 10,
        marginTop: 10,
    }
});
