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
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.bgColor};
  padding: 10px;
  justify-content: space-between;
  flex-direction: row;

  width: 375px;
  height: 74px;
  left: 0px;
  top: 0px;

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
  margin: 3;
  align-self: center;
  margin-horizontal: 10;
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

          <TouchableOpacity
            style={{}}
            onPress={() => {
              props.navigation.navigate('Favorite');
            }}>
            <Image
              style={{height: 20, width: 23}}
              source={require('../assets/images/fav.png')}
            />
          </TouchableOpacity>
        </CloseBtn>
      )}
    </Container>
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
