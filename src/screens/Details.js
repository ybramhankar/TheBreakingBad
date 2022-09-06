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
import styled from 'styled-components/native';
import OtherChar from '../components/OtherChar';
import {useRoute} from '@react-navigation/native';

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

  const route = useRoute();
  const pagename = route.name;
  console.log('routeroute******', pagename);

  let exists = char => {
    if (favList.filter(item => item.char_id === char.char_id).length > 0) {
      return true;
    }
    return false;
  };

  const MainContainer = styled.View`
    flex: 1;
    background-color: ${props => props.bgColor};
  `;

  const ImgBackground = styled.ImageBackground`
    width: 100%;
    height: 80%;
    background-color: #000000;
    opacity: 0.3;
  `;

  const Overlay = styled.View`
    flex: 1;
    align-items: center;
    position: absolute;
    right: 0px;
    bottom: 25px;
    left: 0px;
    top: 13%;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  `;

  const OverlayHeader = styled.View`
    align-items: center;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    height: 50px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
  `;
  const FavBtn = styled.Image`
    height: 20px;
    width: 23px;
  `;

  const CharImg = styled.Image`
    height: 300px;
    width: 200px;
  `;

  const CharName = styled.Text`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 31.1579px;
    line-height: 37px;

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
  const CharStatus = styled.Text`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #ca184e;
  `;

  const DetailContainer = styled.View`
    width: 100%;
  `;

  const TxtHeader = styled.Text`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    margin-top: 5px;
    margin-bottom: 5px;
    color: #18ca75;
  `;

  const TxtContent = styled.Text`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    margin-top: 5px;
    margin-bottom: 5px;
    color: #ffffff;
  `;

  const Section = styled.View`
    flex-direction: row;
    justify-content: space-between;
  `;

  const Season = styled.View`
    background: #242424;
    border-radius: 3px;

    margin-left: 5px;
    margin-right: 5px;
    margin-top: 10px;
    margin-bottom: 10px;

    padding-left: 7px;
    padding-right: 7px;
    padding-top: 5px;
    padding-bottom: 5px;
  `;

  const SeasonTxt = styled.Text`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;

    color: #ffffff;
  `;

  const ScrollContent = styled.ScrollView``;

  const CenterSection = styled.View`
    align-self: center;
    align-items: center;
  `;

  return (
    <MainContainer bgColor={baseColor.pageBackground}>
      <ImgBackground
        source={{
          uri: charDetails.img ? charDetails.img : '',
        }}
        resizeMode={'stretch'}></ImgBackground>
      <OverlayHeader>
        <Icon
          name="arrow-left"
          size={24}
          color={baseColor.lightColor}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            exists(charDetails)
              ? dispatch(removeFavorite(charDetails))
              : dispatch(addFavorite(charDetails));
          }}>
          <FavBtn
            source={
              exists(charDetails)
                ? require('../assets/images/fav.png')
                : require('../assets/images/nfav.png')
            }
          />
        </TouchableOpacity>
      </OverlayHeader>

      <Overlay>
        <ScrollContent>
          <CenterSection>
            <CharImg
              style={styles.charImg}
              source={{
                uri: charDetails.img ? charDetails.img : '',
              }}
            />

            <CharName>{charDetails.name}</CharName>
            <CharNickName>{charDetails.nickname}</CharNickName>
            <CharStatus>{charDetails.status}</CharStatus>
          </CenterSection>

          <DetailContainer style={{width: '100%'}}>
            <TxtHeader>Portrayed</TxtHeader>

            {/* <Text style={styles.headerText}>Portrayed</Text> */}

            <Section>
              <TxtContent>{charDetails.portrayed}</TxtContent>
              <TxtContent>
                {charDetails.birthday}
                {'  '}
                <Icon name="gift" size={14} color={baseColor.lightColor} />
              </TxtContent>
            </Section>
            <TxtHeader>Occupation</TxtHeader>

            <FlatList
              data={
                charDetails.occupation && charDetails.occupation.length > 0
                  ? charDetails.occupation
                  : []
              }
              renderItem={({item, index}) => {
                return <TxtContent>{item}</TxtContent>;
              }}
            />

            <TxtHeader>Appearance in</TxtHeader>
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
                  <Season>
                    <SeasonTxt>{`Season ` + item}</SeasonTxt>
                  </Season>
                );
              }}
            />
            {otherChar ? (
              <OtherChar
                data={otherChar}
                navigation={props.navigation}
                page={pagename}
              />
            ) : null}
          </DetailContainer>
        </ScrollContent>
      </Overlay>
    </MainContainer>
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
