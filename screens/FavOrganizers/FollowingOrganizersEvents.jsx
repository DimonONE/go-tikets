import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import userIMG from '@Assets/User.png';
import AppText from '@Components/AppText';
import { CustomCarousel } from '@Components/CustomCarousel';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import { ButtonFollowing } from '@Components/Profile/ButtonFollowing';
import { Wrapper } from '@Components/Wrapper';

const Card = (props) => {
  const { name = '', img, onClick } = props;
  return (
    <View style={styles.item}>
      <View style={styles.imageWrap}>
        <Image style={styles.image} source={img ? img : userIMG} />
      </View>
      <AppText style={styles.name}>{name}</AppText>
      <ButtonFollowing onPress={onClick} />
    </View>
  );
};

export const FollowingOrganizersEvents = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [cardOrganizers, setCardOrganizers] = useState([
    {
      id: 1,
      name: 'Emilia Clarke',

      img: userIMG,
    },
    {
      id: 2,
      name: 'Emilia Clarke',
      img: userIMG,
    },
    {
      id: 3,
      name: 'Emilia Clarke',
      img: userIMG,
    },
  ]);

  return (
    <Wrapper>
      <View style={{ marginBottom: 32 }}>
        <HeaderNavigate
          style={{ backgroundColor: 'inherit', height: 20, marginBottom: 21 }}
          arrowBack
          onBack={() => navigation.navigate('Profile')}
        />
      </View>

      <AppText style={[styles.text, { marginBottom: 25 }]}>
        Follow event organisers
      </AppText>
      <AppText style={styles.text}>
        Be the first tj know about great events from the top ogganisers in your
        area
      </AppText>

      <View style={{ marginTop: 45 }}>
        <AppText style={styles.head}>Suggestions for you</AppText>
      </View>

      <CustomCarousel
        data={cardOrganizers}
        card={({ item }) => (
          <Card img={item.img} name={item.name} onClick={() => alert('wwww')} />
        )}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    color: '#5B5B5B',
  },

  head: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 21,
    color: '#000000',
  },

  item: {
    width: 145,
    height: 192,
    marginTop: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },

  imageWrap: {
    width: 58,
    height: 58,
  },

  image: {
    width: 'auto',
    height: '100%',
  },

  name: {
    height: 25,
    marginTop: 17,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
  },
});
