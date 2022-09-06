import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Card from '../components/Card';
import {GET_ALL_CAHRACTER} from '../utils/urls';
import {baseColor} from '../utils/Theme';
import MainHeader from '../components/MainHeader';
import {useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';

const Home = props => {
  useEffect(() => {
    const getAllChar = async () => {
      await fetch(GET_ALL_CAHRACTER)
        .then(response => response.json())
        .then(res => {
          // console.log('res', res);
          setAllChar(res);
        })
        .catch(err => {
          console.error('err---', err);
          alert(err);
        });
    };
    // getAllChar();
  }, []);

  const [allChar, setAllChar] = useState([
    {
      appearance: [1, 2, 3, 4, 5],
      better_call_saul_appearance: [],
      birthday: '09-07-1958',
      category: 'Breaking Bad',
      char_id: 1,
      img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
      name: 'Walter White',
      nickname: 'Heisenberg',
      occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
      portrayed: 'Bryan Cranston',
      status: 'Presumed dead',
    },
    {
      appearance: [1, 2, 3, 4, 5],
      better_call_saul_appearance: [],
      birthday: '09-24-1984',
      category: 'Breaking Bad',
      char_id: 2,
      img: 'https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441',
      name: 'Jesse Pinkman',
      nickname: "Cap n' Cook",
      occupation: ['Meth Dealer'],
      portrayed: 'Aaron Paul',
      status: 'Alive',
    },
    {
      appearance: [1, 2, 3, 4, 5],
      better_call_saul_appearance: [],
      birthday: '07-08-1993',
      category: 'Breaking Bad',
      char_id: 4,
      img: 'https://media1.popsugar-assets.com/files/thumbor/WeLUSvbAMS_GL4iELYAUzu7Bpv0/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2018/01/12/910/n/1922283/fb758e62b5daf3c9_TCDBRBA_EC011/i/RJ-Mitte-Walter-White-Jr.jpg',
      name: 'Walter White Jr.',
      nickname: 'Flynn',
      occupation: ['Teenager'],
      portrayed: 'RJ Mitte',
      status: 'Alive',
    },
    {
      appearance: [1, 2, 3, 4, 5],
      better_call_saul_appearance: [],
      birthday: 'Unknown',
      category: 'Breaking Bad',
      char_id: 5,
      img: 'https://vignette.wikia.nocookie.net/breakingbad/images/b/b7/HankS5.jpg/revision/latest/scale-to-width-down/700?cb=20120620014136',
      name: 'Henry Schrader',
      nickname: 'Hank',
      occupation: ['DEA Agent'],
      portrayed: 'Dean Norris',
      status: 'Deceased',
    },
    {
      appearance: [1, 2, 3, 4, 5],
      better_call_saul_appearance: [],
      birthday: 'Unknown',
      category: 'Breaking Bad',
      char_id: 6,
      img: 'https://vignette.wikia.nocookie.net/breakingbad/images/1/10/Season_2_-_Marie.jpg/revision/latest?cb=20120617211645',
      name: 'Marie Schrader',
      nickname: 'Marie',
      occupation: ['Housewife', 'Clepto'],
      portrayed: 'Betsy Brandt',
      status: 'Alive',
    },
    {
      appearance: [2, 3, 4, 5],
      better_call_saul_appearance: [1, 2, 3, 4, 5],
      birthday: 'Unknown',
      category: 'Breaking Bad, Better Call Saul',
      char_id: 7,
      img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_mike-ehrmantraut-lg.jpg',
      name: 'Mike Ehrmantraut',
      nickname: 'Mike',
      occupation: ['Hitman', 'Private Investigator', 'Ex-Cop'],
      portrayed: 'Jonathan Banks',
      status: 'Deceased',
    },
  ]);

  const route = useRoute();

  const Container = styled.View`
    flex: 1;
    background-color: ${props => props.bgColor};
  `;

  const ContainerBody = styled.View`
    flex: 1;
    align-self: center;
    margin-top: 5px;
    margin-bottom: 20px;
  `;

  return (
    <Container bgColor={baseColor.pageBackground}>
      <MainHeader navigation={props.navigation} title={'The Breaking Bad'} />

      <ContainerBody>
        <FlatList
          data={allChar ? allChar : []}
          numColumns={2}
          renderItem={({item, index}) => {
            return <Card data={item} navigation={props.navigation} />;
          }}
        />
      </ContainerBody>
    </Container>
  );
};

export default Home;
