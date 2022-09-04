import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {baseColor} from '../utils/Theme';
import {useSelector, useDispatch} from 'react-redux';
import Card from '../components/Card';
import {useRoute} from '@react-navigation/native';
import MainHeader from '../components/MainHeader';

const Favorite = props => {
  const favList = useSelector(state => state.favorites);
  console.log(favList);
  const route = useRoute();
  return (
    <View style={styles.mainContainer}>
      <MainHeader
        navigation={props.navigation}
        title={'Favorites'}
        page={route.name}
      />

      <View style={styles.bodyContainer}>
        <FlatList
          data={favList}
          numColumns={2}
          renderItem={({item, index}) => {
            return <Card data={item} navigation={props.navigation} />;
          }}
        />
      </View>
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: baseColor.pageBackground,
  },
  bodyContainer: {alignSelf: 'center', marginTop: 5, marginBottom: 20, flex: 1},
});
