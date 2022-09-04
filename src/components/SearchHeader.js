import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {baseColor} from '../utils/Theme';

const SearchHeader = props => {
  const [inputVal, setInputVal] = useState('');
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <Icon
        name="arrow-left"
        size={24}
        color={baseColor.lightColor}
        onPress={() => {
          setInputVal('');
          props.searchTxt('');
          props.navigation.goBack();
        }}
      />
      <TextInput
        style={styles.inputStyle}
        placeholderTextColor={baseColor.darkColor}
        autoFocus={true}
        placeholder="Search"
        value={inputVal}
        onChangeText={txt => {
          setInputVal(txt);
          props.searchTxt(txt);
        }}></TextInput>
      <Icon
        name="x"
        size={24}
        color={baseColor.lightColor}
        style={{}}
        onPress={() => {
          setInputVal('');
          props.searchTxt('');
        }}
      />
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 30,
    marginHorizontal: 10,
    width: '80%',
    color: baseColor.lightColor,
  },
});
