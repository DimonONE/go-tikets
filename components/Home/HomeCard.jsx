import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppText from '@Components/AppText';
import { NextButton } from '@Components/NextButton';
import { Like } from '@Components/Like';
import crash from '@Assets/crashIMG.png';
import { ContentSlider } from './ContentSlider';
import {staticFile} from "@/server";

export const HomeCard = (props) => {
  const {
    name = '',
    date = '',
    location = '',
    totalTicketsCount = 0,
    currentTicketsCount = 0,
    price = '',
    textInfo = '',
    imgs = [crash],
    event,
  } = props;

  const navigation = useNavigation();

  const locationAndTime = `${location.split(', ')[0]}... - ${date}`;

  const source = imgs.map((img, index) => ({
    id: index,
    img: typeof img === 'string' ? staticFile.getStatic(img) : img,
  }));

    console.log(source)

  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <View>
          <Like />
          <ContentSlider images={source} />
        </View>
      </View>
      <View style={styles.info}>
        <AppText style={[styles.textInfo, { marginBottom: 8 }]} weight={700}>{locationAndTime}</AppText>
        <AppText style={styles.boldText} weight={700}>{name}</AppText>
        <AppText
          style={[
            styles.textInfo,
            { fontSize: 14, marginTop: 10, marginBottom: 10 },
          ]}
        >
          {textInfo}
        </AppText>
          <View style={styles.bottomContainer}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AppText size={20} weight={700}>{price}</AppText>
                    <AppText style={{ marginLeft: 10 }} weight={500}>+Taxes</AppText>
                </View>
                  <AppText style={{ color: '#999999' }}>Tickets: {totalTicketsCount + '/' + currentTicketsCount}</AppText>
              </View>
              <NextButton
                  style={{ marginTop: 10, width: '50%' }}
                  onPress={() => navigation.navigate('BuyTickets', { event })}
              >
                  Buy ticket
              </NextButton>
          </View>
      </View>
    </View>
  );
};

export const HomeCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <View
          style={{ height: '100%', width: '100%', backgroundColor: '#BDBDBD' }}
        />
      </View>
      <View style={[styles.info]}>
        <Text
          style={{ backgroundColor: '#5B5B5B', marginBottom: 4, width: '60%' }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <View>
            <Text style={styles.textInfoSkeleton} />
            <Text style={[styles.textInfoSkeleton]} />
          </View>
          <View>
            <Text
              style={[
                {
                  marginLeft: 'auto',
                },
                styles.textInfoSkeleton,
                { width: 40 },
              ]}
            />
            <Text style={[styles.textInfoSkeleton, { width: 90 }]} />
          </View>
        </View>
        <Text
          style={[
            styles.textInfo,
            {
              fontSize: 14,
              color: '#BDBDBD',
              marginTop: 9,
              width: '90%',
              backgroundColor: '#5B5B5B',
            },
          ]}
        />
        <View
          style={{
            backgroundColor: '#BDBDBD',
            height: 50,
            width: '100%',
            marginTop: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: 'space-between',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D8D8D8',
  },

  containerImg: {
    width: '100%',
    maxHeight: 190,
    overflow: 'hidden',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },

  info: {
    width: 'auto',
    padding: '5%',
    justifyContent: 'space-between',
  },

  boldText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 19,
  },

  textInfo: {
    marginTop: 3,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 17,
    color: '#000000',
  },
  textInfoSkeleton: { backgroundColor: '#BDBDBD', width: 70, marginBottom: 4 },
  bottomContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: '#DCDCDC',
  }
});
