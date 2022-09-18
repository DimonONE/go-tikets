import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppText from '@Components/AppText';
import { Params } from '@Components/Profile/Params';
import rightArrow from '@Assets/rightArrow.png';
import { useNavigation } from '@react-navigation/native';

const ManageEvent = ({ finished, ...eventInfo }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <AppText style={styles.textCommon} size={16} weight={700}>
          Manage event
        </AppText>
      </View>
      <View>
        {finished && (
          <Params
            text={`Reviews: ${eventInfo.reviewsCount}`}
            contentWithRights={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ width: 8, height: 10, marginLeft: 10 }}
                  source={rightArrow}
                />
              </View>
            }
          />
        )}
        <Params
          text={`Guests list: ${eventInfo.guestsCount || 2}`}
          contentWithRights={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/*<AppText>200+</AppText>*/}
              <Image
                style={{ width: 8, height: 10, marginLeft: 10 }}
                source={rightArrow}
              />
            </View>
          }
          onPress={() =>
            navigation.navigate('GuestList', { eventId: eventInfo.id })
          }
        />
        <Params text='Statistics' isArrow />
        <Params text='Edit event' isArrow />
        {!finished && <Params text='Add discount coupons' isArrow />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textCommon: {
    color: '#5B5B5B',
  },
});

export default ManageEvent;
