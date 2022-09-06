import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Card from './Card';

const MainContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SectionTxt = styled.Text`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 23.0226px;
  line-height: 27px;

  color: #ffffff;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const OtherChar = props => {
  return (
    <MainContainer>
      <SectionTxt>Other characters</SectionTxt>

      <FlatList
        data={props.data ? props.data : []}
        horizontal={true}
        renderItem={({item, index}) => {
          return <Card data={item} navigation={props.navigation} />;
        }}
      />
    </MainContainer>
  );
};

export default OtherChar;

const styles = StyleSheet.create({});
