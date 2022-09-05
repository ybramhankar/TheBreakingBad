import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {baseColor} from '../utils/Theme';
import {useSelector, useDispatch} from 'react-redux';
import Card from '../components/Card';
import {useRoute} from '@react-navigation/native';
import MainHeader from '../components/MainHeader';
import styled from 'styled-components';

const Favorite = props => {
  const favList = useSelector(state => state.favorites);
  console.log(favList);
  const route = useRoute();

  const Container = styled.View`
    background-color: ${props => props.bgColor};
    flex: 1;
  `;
  const BodyContainer = styled.View`
    flex: 1;
    align-self: center;
    margin-top: 5px;
    margin-bottom: 20px;
  `;

  return (
    <Container bgColor={baseColor.pageBackground}>
      <MainHeader
        navigation={props.navigation}
        title={'Favorites'}
        page={route.name}
      />

      <BodyContainer>
        <FlatList
          data={favList}
          numColumns={2}
          renderItem={({item, index}) => {
            return <Card data={item} navigation={props.navigation} />;
          }}
        />
      </BodyContainer>
    </Container>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  mainContainer: {},
  bodyContainer: {alignSelf: 'center', marginTop: 5, marginBottom: 20, flex: 1},
});
