import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {baseColor} from '../utils/Theme';
import Icon from 'react-native-vector-icons/Feather';
import {FavIcon} from '../utils/Constant';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${props => props.bgColor};
  padding: 20px;
  justify-content: space-between;
  flex-direction: row;
  height: 74px;
  background: #070707;
`;
const TitleText = styled.Text`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 23.0226px;
  line-height: 27px;
  color: ${props => props.txtColor};
`;
const CloseBtn = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;
const TouchableView = styled.TouchableOpacity`
  margin: 3px;
  align-self: center;
  margin-horizontal: 10px;
`;

const FavButton = styled.TouchableOpacity`
  align-self: center;
  margin-left: 10px;
`;

const MainHeader = props => {
  return (
    <Container bgColor={baseColor.pageBackground}>
      <TitleText
        txtColor={
          props.page && props.page == 'Favorite'
            ? baseColor.secondaryColor
            : baseColor.lightColor
        }>
        {props.title}
      </TitleText>

      {props.page && props.page == 'Favorite' ? (
        <CloseBtn>
          <Icon
            name="x"
            size={23}
            color={baseColor.lightColor}
            style={{margin: 3}}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </CloseBtn>
      ) : (
        <CloseBtn>
          <Icon
            name="search"
            size={23}
            color={baseColor.lightColor}
            style={{margin: 3}}
            onPress={() => {
              props.navigation.navigate('Search');
            }}
          />

          <FavButton
            onPress={() => {
              props.navigation.navigate('Favorite');
            }}>
            <Image
              style={{height: 20, width: 23}}
              source={require('../assets/images/fav.png')}
            />
          </FavButton>
        </CloseBtn>
      )}
    </Container>
  );
};

export default MainHeader;
