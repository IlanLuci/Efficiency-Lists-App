import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";

export default function Expandable({ expanded = false }) {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: expanded ? 100 : 0,
      duration: 150,
      useNativeDriver: false
    }).start();
  }, [expanded, height]);

  return (
    <Animated.View style={{ display: expanded ? 'flex' : 'none'}}>
        <Text style={styles.description}>description</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    description: {
        color: 'whitesmoke',
        padding: 10,
        borderTopWidth: 2,
        borderColor: "whitesmoke",
        borderStyle: 'solid',
        marginTop: 10
    }
});
