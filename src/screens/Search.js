import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchHeader from '../components/SearchHeader';
import {baseColor} from '../utils/Theme';
import {GET_SEARCH_CHARACTER} from '../utils/urls';
import Card from '../components/Card';

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
  return (
    <View style={styles.mainContainer}>
      <SearchHeader
        navigation={props.navigation}
        searchTxt={txt => {
          setSearchTxt(txt);
        }}
      />
      <View style={styles.bodyContainer}>
        {searchTxt.length > 0 && searchData.length == 0 ? (
          <View>
            <Text style={styles.headerText}>No Caharacter Found</Text>
            <Text style={styles.containetText}>Try Again</Text>
          </View>
        ) : (
          <FlatList
            data={searchData ? searchData : []}
            numColumns={2}
            renderItem={({item, index}) => {
              return <Card data={item} navigation={props.navigation} />;
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: baseColor.pageBackground,
    // backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    color: baseColor.secondaryColor,
    marginVertical: 7,
  },
  containetText: {
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    color: baseColor.lightColor,
    marginVertical: 2,
  },
});
