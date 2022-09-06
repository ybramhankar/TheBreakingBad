import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {baseColor} from '../utils/Theme';
import styled from 'styled-components/native';

const SearchHeader = props => {
  // const [inputVal, setInputVal] = useState('');

  const SerachContainer = styled.View`
    align-items: center;
    padding-left: 10px;
    flex-direction: row;
    padding-right: 10px;
  `;

  const TxtInput = styled.TextInput`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 100;
    font-size: 33.2549px;
    line-height: 39px;
    width: 80%;
    color: #ffffff;
  `;

  return (
    <SerachContainer>
      <Icon
        name="arrow-left"
        size={24}
        color={baseColor.lightColor}
        onPress={() => {
          // setInputVal('');
          props.searchTxt('');
          props.navigation.goBack();
        }}
      />
      <TxtInput
        placeholderTextColor={baseColor.darkColor}
        // autoFocus={true}
        placeholder="Search"
        value={props.val}
        onChangeText={txt => {
          // setInputVal(txt);
          console.log(txt);
          props.searchTxt(txt);
        }}
      />
      <Icon
        name="x"
        size={24}
        color={baseColor.lightColor}
        style={{}}
        onPress={() => {
          // setInputVal('');
          props.searchTxt('');
        }}
      />
    </SerachContainer>
  );
};

export default SearchHeader;
