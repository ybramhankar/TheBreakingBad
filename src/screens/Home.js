import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Card from '../components/Card';
import {GET_ALL_CAHRACTER} from '../utils/urls';
import {baseColor} from '../utils/Theme';
import MainHeader from '../components/MainHeader';
import {useRoute} from '@react-navigation/native';

const Home = props => {
  useEffect(() => {
    const getAllChar = async () => {
      await fetch(GET_ALL_CAHRACTER)
        .then(response => response.json())
        .then(res => {
          // console.log('res', res);
          setAllChar(res);
        })
        .catch(err => {
          console.error('err---', err);
          alert(err);
        });
    };
    getAllChar();
  }, []);

  const [allChar, setAllChar] = useState([]);

  const route = useRoute();
  return (
    <View style={styles.mainContainer}>
      <MainHeader navigation={props.navigation} title={'The Breaking Bad'} />
      <View style={styles.bodyContainer}>
        <FlatList
          data={allChar ? allChar : []}
          numColumns={2}
          renderItem={({item, index}) => {
            return <Card data={item} navigation={props.navigation} />;
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: baseColor.pageBackground,
  },
  bodyContainer: {alignSelf: 'center', marginTop: 5, marginBottom: 20, flex: 1},
});
