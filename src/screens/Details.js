import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {baseColor} from '../utils/Theme';
import Icon from 'react-native-vector-icons/Feather';
import {addFavorite, removeFavorite} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {GET_ALL_CAHRACTER} from '../utils/urls';
import Card from '../components/Card';

const Details = props => {
  const [charDetails, setCharDeatils] = useState(props.route.params);

  const dispatch = useDispatch();
  const favList = useSelector(state => state.favorites);
  const [otherChar, setOtherChar] = useState([]);

  useEffect(() => {
    const getAllChar = async () => {
      await fetch(GET_ALL_CAHRACTER)
        .then(response => response.json())
        .then(res => {
          // console.log('res', res);
          // setAllChar(res);
          let data = res.filter(item => item.char_id != charDetails.char_id);
          data.length = 6;
          setOtherChar(data);
        })
        .catch(err => {
          console.error('err---', err);
          alert(err);
        });
    };
    getAllChar();
  }, []);

  console.log(otherChar);

  let exists = char => {
    if (favList.filter(item => item.char_id === char.char_id).length > 0) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={{
          width: '100%',
          height: '80%',
          backgroundColor: '#000000',
          opacity: 0.3,
        }}
        source={{
          uri: charDetails.img ? charDetails.img : '',
        }}
        resizeMode={'stretch'}></ImageBackground>

      <View style={styles.headerOverlay}>
        <Icon
          name="arrow-left"
          size={24}
          color={baseColor.lightColor}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <TouchableOpacity
          style={{margin: 3, alignSelf: 'center'}}
          onPress={() => {
            exists(charDetails)
              ? dispatch(removeFavorite(charDetails))
              : dispatch(addFavorite(charDetails));
          }}>
          <Image
            style={{height: 20, width: 23}}
            source={
              exists(charDetails)
                ? require('../assets/images/fav.png')
                : require('../assets/images/nfav.png')
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.overlay}>
        <Image
          style={styles.charImg}
          source={{
            uri: charDetails.img ? charDetails.img : '',
          }}
        />

        <Text style={styles.charName}>{charDetails.name}</Text>
        <Text style={styles.charNickName}>{charDetails.nickname}</Text>
        <Text style={styles.charStatus}>{charDetails.status}</Text>

        <View style={{width: '100%'}}>
          <Text style={styles.headerText}>Portrayed</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.containetText}>{charDetails.portrayed}</Text>
            <Text style={styles.containetText}>
              {charDetails.birthday}
              {'  '}
              <Icon name="gift" size={14} color={baseColor.lightColor} />
            </Text>
          </View>

          <Text style={styles.headerText}>Occupation</Text>
          <FlatList
            data={
              charDetails.occupation && charDetails.occupation.length > 0
                ? charDetails.occupation
                : []
            }
            renderItem={({item, index}) => {
              return <Text style={styles.containetText}>{item}</Text>;
            }}
          />
          <Text style={styles.headerText}>Appearance in</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={
              charDetails.appearance && charDetails.appearance.length > 0
                ? charDetails.appearance
                : []
            }
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    backgroundColor: baseColor.darkColor,
                    marginHorizontal: 5,
                    paddingHorizontal: 7,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}>
                  <Text style={styles.containetText}>{`Season ` + item}</Text>
                </View>
              );
            }}
          />
          <FlatList
            data={otherChar ? otherChar : []}
            horizontal={true}
            renderItem={({item, index}) => {
              return <Card data={item} navigation={props.navigation} />;
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: baseColor.pageBackground,
  },
  headerOverlay: {
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    // left: 0,
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    top: '0%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  charImg: {
    height: 300,
    width: 200,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: '14%',
    right: 0,
    bottom: '25%',
    left: 0,
    width: '100%',
    paddingHorizontal: 20,
  },
  charName: {
    fontSize: 31,
    fontFamily: 'Roboto-Bold',
    color: baseColor.lightColor,
    marginVertical: 10,
  },
  charNickName: {
    fontSize: 14,
    fontFamily: 'Roboto-Thin',
    color: baseColor.lightColor,
    marginVertical: 5,
  },
  marginVertical: 5,
  charStatus: {fontSize: 16, fontFamily: 'Roboto-Light', color: '#CA184E'},
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
