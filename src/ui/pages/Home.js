import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import MenuItem from '../components/MenuItem';

import Empty from '../../assets/empty.svg';
import Star from '../../assets/star.svg';
import Box from '../../assets/box.svg';
import Calendar from '../../assets/calendar.svg';

export default function Home(props) {
  return (
    <View style={styles.container}>
        <MenuItem navigation={props.navigation} link={'General'} icon={Box} title="General"></MenuItem>
        <MenuItem navigation={props.navigation} link={'Today'} icon={Star} title="Today"></MenuItem>
        <MenuItem navigation={props.navigation} link={'Upcoming'} icon={Calendar} title="Upcoming"></MenuItem>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#333',
      alignItems: 'center',
      paddingTop: 70
  },
});
