import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const SongListItem = props => {
  return (
    <TouchableOpacity onPress={props.selectedSong.bind(this, props.Id)}>
        <View style={styles.listItem}>
          <Text style={styles.item}>{props.Id}</Text>
          <Text style={styles.item}> - </Text>
          <Text style={styles.item}>{props.Title}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    overflow: 'hidden',
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    marginHorizontal: 16,
    borderBottomColor: '#E1BD7B',
    borderBottomWidth: 1
  },
  item: {
    fontSize: 20,
    fontFamily: 'Roboto'
  }
})

export default SongListItem;