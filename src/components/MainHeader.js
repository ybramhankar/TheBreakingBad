import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {baseColor} from '../utils/Theme';
import Icon from 'react-native-vector-icons/Feather';
import {FavIcon} from '../utils/Constant';

const MainHeader = props => {
  return (
    <View style={styles.headerContainer}>
      <Text
        style={[
          styles.headerTitle,
          {
            color:
              props.page && props.page == 'Favorite'
                ? baseColor.secondaryColor
                : baseColor.lightColor,
          },
        ]}>
        {props.title}
      </Text>
      {props.page && props.page == 'Favorite' ? (
        <View style={styles.iconView}>
          <Icon
            name="x"
            size={23}
            color={baseColor.lightColor}
            style={{margin: 3}}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </View>
      ) : (
        <View style={styles.iconView}>
          <Icon
            name="search"
            size={23}
            color={baseColor.lightColor}
            style={{margin: 3}}
            onPress={() => {
              props.navigation.navigate('Search');
            }}
          />

          <TouchableOpacity
            style={{margin: 3, alignSelf: 'center', marginHorizontal: 10}}
            onPress={() => {
              props.navigation.navigate('Favorite');
            }}>
            <Image
              style={{height: 20, width: 23}}
              source={require('../assets/images/fav.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: baseColor.mainHeaderBackground,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Roboto-Bold',
    color: baseColor.lightColor,
    fontSize: 23,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
