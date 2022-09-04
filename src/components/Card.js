import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {baseColor} from '../utils/Theme';

import {addFavorite, removeFavorite} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
const Card = props => {
  let characters = props.data;
  const dispatch = useDispatch();
  const favList = useSelector(state => state.favorites);

  let exists = characters => {
    if (
      favList.filter(item => item.char_id === characters.char_id).length > 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.navigation.navigate('Details', props.data);
      }}>
      <Image
        style={styles.charImg}
        source={{
          uri: props.data && props.data.img ? props.data.img : '',
        }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.charName}>{props.data.name}</Text>
          <Text style={styles.charNickName}>{props.data.nickname}</Text>
        </View>
        <View style={styles.favContainer}>
          <TouchableOpacity
            style={{margin: 3, alignSelf: 'center'}}
            onPress={() => {
              exists(props.data)
                ? dispatch(removeFavorite(props.data))
                : dispatch(addFavorite(props.data));
            }}>
            <Image
              style={{height: 20, width: 23}}
              source={
                exists(props.data)
                  ? require('../assets/images/fav.png')
                  : require('../assets/images/nfav.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: 258,
    width: 180,
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: baseColor.pageBackground,
  },
  charImg: {
    height: '80%',
    borderRadius: 10,
  },
  addFavImg: {height: 20, width: 23},
  infoContainer: {
    flexDirection: 'row',
    height: '20%',
    margin: 3,
  },
  favContainer: {
    width: '25%',
    justifyContent: 'center',
  },
  nameContainer: {
    width: '75%',
    justifyContent: 'center',
  },
  charName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: baseColor.lightColor,
  },
  charNickName: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    color: baseColor.lightColor,
  },
});
