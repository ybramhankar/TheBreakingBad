import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {baseColor} from '../utils/Theme';

import {addFavorite, removeFavorite} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
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

  const MainContainer = styled.TouchableOpacity`
    height: 258;
    width: 180;
    margin-left: 5;
    margin-right: 5;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #000000;
  `;

  const CharImg = styled.Image`
    height: 80%;
    border-radius: 10px;
  `;

  const InfoContainer = styled.View`
    flex-direction: row;
    height: 20%;
    margin: 3px;
  `;

  const CharName = styled.Text`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;

    color: #ffffff;
  `;

  const CharNickName = styled.Text`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;

    color: #ffffff;
  `;

  const NameConatiner = styled.View`
    width: 75%;
    justify-content: center;
  `;
  const FavContainer = styled.View`
    justify-content: center;
    width: 25%;
  `;

  const FavImg = styled.Image`
    margin: 3px;
    align-self: center;
  `;

  const FavTouch = styled.TouchableOpacity`
    height: 20px;
    width: 23px;
  `;

  return (
    <MainContainer
      disabled={false}
      onPress={() => {
        props.navigation.navigate('Details', props.data);
      }}>
      <CharImg
        source={{
          uri: props.data && props.data.img ? props.data.img : '',
        }}
      />

      <InfoContainer>
        <NameConatiner>
          <CharName>{props.data.name}</CharName>
          <CharNickName>{props.data.nickname}</CharNickName>
        </NameConatiner>
        <FavContainer>
          <FavTouch
            onPress={() => {
              exists(props.data)
                ? dispatch(removeFavorite(props.data))
                : dispatch(addFavorite(props.data));
            }}>
            <FavImg
              source={
                exists(props.data)
                  ? require('../assets/images/fav.png')
                  : require('../assets/images/nfav.png')
              }
            />
          </FavTouch>
        </FavContainer>
      </InfoContainer>
    </MainContainer>
  );
};

export default Card;
