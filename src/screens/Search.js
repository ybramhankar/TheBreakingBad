import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchHeader from '../components/SearchHeader';
import {baseColor} from '../utils/Theme';
import {GET_SEARCH_CHARACTER} from '../utils/urls';
import Card from '../components/Card';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

const Search = props => {
  const [filterData, setFilterData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');

  useEffect(() => {
    if (searchTxt.trim().length > 0) {
      let url = GET_SEARCH_CHARACTER.replace('{SEARCH_STRING}', searchTxt);
      const getSearchChar = async () => {
        await fetch(url)
          .then(response => response.json())
          .then(res => {
            // console.log('res', res);
            setSearchData(res);
          })
          .catch(err => {
            console.error('err---', err);
          });
      };
      getSearchChar();
    }
  }, [searchTxt]);

  const MainContainer = styled.View`
    flex: 1;
    background-color: ${props => props.bgColor};
  `;
  const BodyContainer = styled.View`
    flex: 1;
    margin: 10px;
  `;
  const TxtHeader = styled.Text`
    height: 28px;
    left: 24px;
    top: 138px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;
    color: ${props => props.color};
  `;
  const TxtContaint = styled.Text`
    height: 28px;
    left: 24px;
    top: 166px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;

    color: #c4c4c4;
  `;

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
    <MainContainer bgColor={baseColor.pageBackground}>
      {/* <SearchHeader
        navigation={props.navigation}
        val={searchTxt}
        searchTxt={txt => {
          console.log('88888888', txt);
          setSearchTxt(txt);
        }}
      /> */}

      <SerachContainer>
        <Icon
          name="arrow-left"
          size={24}
          color={baseColor.lightColor}
          onPress={() => {
            // setInputVal('');
            // props.searchTxt('');
            setSearchTxt('');
            props.navigation.goBack();
          }}
        />
        <TxtInput
          placeholderTextColor={baseColor.darkColor}
          // autoFocus={true}
          placeholder="Search"
          // value={props.val}
          onChangeText={txt => {
            setSearchTxt(txt);
          }}
        />
        <Icon
          name="x"
          size={24}
          color={baseColor.lightColor}
          style={{}}
          onPress={() => {
            // setInputVal('');
            // props.searchTxt('');
            setSearchTxt('');
          }}
        />
      </SerachContainer>

      <BodyContainer>
        {searchTxt.length > 0 && searchData.length == 0 ? (
          <>
            <TxtHeader color={baseColor.secondaryColor}>
              No Caharacter Found
            </TxtHeader>
            <TxtContaint>Try Again</TxtContaint>
          </>
        ) : (
          <FlatList
            data={searchData ? searchData : []}
            numColumns={2}
            renderItem={({item, index}) => {
              return <Card data={item} navigation={props.navigation} />;
            }}
          />
        )}
      </BodyContainer>
    </MainContainer>
  );
};

export default Search;
