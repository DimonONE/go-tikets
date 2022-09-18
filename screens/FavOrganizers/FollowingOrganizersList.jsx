import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import userIMG from '@Assets/User.png';
import AppText from '@Components/AppText';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import { Wrapper } from '@Components/Wrapper';

const CardOrganizers = (props) => {
  const { name = '', img, city, events, soon } = props;

  const onClick = () => {
    alert('onPress');
  };
  return (
    <Pressable style={styles.cardOrganizers} onPress={onClick}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={img ? img : userIMG} />
        </View>
        <View style={[styles.wrapper, styles.wrapContent]}>
          <View>
            <AppText style={styles.name}>{name}</AppText>
            <AppText style={styles.textInfo}>{city}</AppText>
          </View>
          <View>
            <AppText
              style={[
                styles.textInfo,
                { fontWeight: '600', textAlign: 'right' },
              ]}
            >
              Events: {events}
            </AppText>
            <AppText
              style={[
                styles.textInfo,
                { fontWeight: '600', textAlign: 'right' },
              ]}
            >
              Soon: {soon}
            </AppText>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export const FollowingOrganizersList = () => {
  const navigation = useNavigation();
  const [cardOrganizers, setCardOrganizers] = useState([
    {
      id: 1,
      name: 'Emilia Clarke',
      city: 'Kharkiv',
      events: '690',
      soon: '98',
      img: userIMG,
    },
    {
      id: 2,
      name: 'Emilia Clarke',
      city: 'Kharkiv',
      events: '690',
      soon: '98',
      img: userIMG,
    },
    {
      id: 3,
      name: 'Emilia Clarke',
      city: 'Kharkiv',
      events: '690',
      soon: '98',
      img: userIMG,
    },
  ]);

  return (
    <Wrapper>
      <View style={{ marginBottom: 20 }}>
        <HeaderNavigate
          style={{ backgroundColor: 'inherit', height: 20, marginBottom: 21 }}
          arrowBack
          onBack={() => navigation.navigate('Profile')}
          title='Following organizers'
        />
      </View>

      {cardOrganizers.map((item) => (
        <CardOrganizers
          key={item.id}
          img={item.img}
          name={item.name}
          city={item.city}
          events={item.events}
          soon={item.soon}
        />
      ))}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  cardOrganizers: {
    backgroundColor: '#fff',
    borderColor: '#BDBDBD',
    borderRadius: 13,
    padding: 14,
    marginTop: 5,

    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    elevation: 4,
  },

  wrapContent: {
    width: '80%',
    justifyContent: 'space-between',
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageWrap: {
    width: 48,
    height: 48,
    marginRight: 18,
  },

  image: {
    width: 'auto',
    height: '100%',
  },

  name: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 19,
  },

  textInfo: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 19,
  },
});
