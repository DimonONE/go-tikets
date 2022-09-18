import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppText from '@Components/AppText';
import crash from '@Assets/crash.svg';
import { Wrapper } from '@Components/Wrapper';
import { Like } from '@Components/Like';
import { ContentSlider } from '@Components/Home/ContentSlider';
import Person from '@Components/Person';
import { NextButton } from '@Components/NextButton';
import ManageEvent from '@Components/Event/ManageEvent';
import Reviews from '@Components/Reviews/Reviews';
import useQuery from '@Hooks/useQuery';
import { event } from '@/server';
import Toast from 'react-native-toast-message';

const reviewsMocks = [
  {
    name: 'Petro Ivanov',
    date: '11/11/2022 11:00',
    text: 'Vestibulum lorem sed risus ultricies tristique nulla aliquet. Tortor condimentum laciniaquis vel eros donec tortor condimentum. Vestibulum lorem sed',
  },
  {
    name: 'Petro Ivanov',
    date: '11/11/2022 11:00',
    text: 'Vestibulum lorem sed risus ultricies tristique nulla aliquet. Tortor condimentum laciniaquis vel eros donec tortor condimentum. Vestibulum lorem sed',
  },
  {
    name: 'Petro Ivanov',
    date: '11/11/2022 11:00',
    text: 'Vestibulum lorem sed risus ultricies tristique nulla aliquet. Tortor condimentum laciniaquis vel eros donec tortor condimentum. Vestibulum lorem sed',
  },
];

const EventInfo = ({ route, ...props }) => {
  const { eventId } = route.params;
  const [eventInfo, setEventInfo] = useState(null);

  const fetchData = async () => {
    const { data, ok, message } = await useQuery(
      event.getList(`?id=${eventId}`)
    );
    console.log({ data, ok, message });

    if (!ok) {
      Toast.show({
        type: 'error',
        text1: message,
      });

      return;
    }

    setEventInfo({
      id: data.id,
      name: data.name,
      startDate: new Date(data.startDate).toDateString(),
      endDate: data.endDate,
      fullDescription: data.fullDescription,
      address:
        data.address.length > 20
          ? data.address.slice(0, 20) + '...'
          : data.address,
      price: data.tickets[0].price,
      tickets: `${data.tickets[0].totalCount}/${data.tickets[0].currentCount}`,
      organizer: `${data.creator.name} ${data.creator.surname}`,
      finished: Date.now() - new Date(data.endDate) > 0,
      guestsCount: data.guests.length || 0,
      reviewsCount: 0,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const myEvent = true;
  const img =
    'https://ondigitalshop.com/wp-content/uploads/2021/07/3852585-3182112-3372146383-minec.jpg';

  if (!eventInfo) {
    return (
      <View>
        <AppText>Loading....</AppText>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Wrapper style={styles.eventInfo}>
          <View style={styles.imageContainer}>
            <Like />
            <ContentSlider
              images={[
                { id: 1, img },
                { id: 2, img },
                { id: 3, img },
              ]}
            />
          </View>
          <View style={styles.infoContainer}>
            <AppText style={styles.boldText}>{eventInfo.name}</AppText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <View>
                <AppText style={styles.textInfo}>{eventInfo.startDate}</AppText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    paddingVertical: 5,
                  }}
                >
                  <AppText style={styles.textInfo}>{eventInfo.address}</AppText>
                  {!myEvent && (
                    <AppText style={{ marginLeft: 10 }} size={14} weight={500}>
                      ON THE MAP
                    </AppText>
                  )}
                </View>
              </View>
              <View>
                {!myEvent && (
                  <AppText
                    style={[
                      styles.boldText,
                      { fontSize: 16, marginLeft: 'auto' },
                    ]}
                    weight={700}
                  >
                    {eventInfo.price} $
                  </AppText>
                )}
                <AppText style={styles.textInfo}>
                  Tickets: {eventInfo.tickets}
                </AppText>
              </View>
            </View>
            <View>
              <Person
                status={'Organizer'}
                style={styles.organizerContainer}
                name={eventInfo.organizer}
              />
              <AppText
                style={[styles.textInfo, { fontSize: 14, marginTop: 9 }]}
              >
                {eventInfo.fullDescription}
              </AppText>
            </View>
          </View>
          <View>
            {myEvent ? (
              <ManageEvent {...eventInfo} />
            ) : (
              <Reviews reviews={reviewsMocks} />
            )}
          </View>
          <View>
            {myEvent ? (
              eventInfo.finished ? (
                <></>
              ) : (
                <NextButton>QR-Scaner</NextButton>
              )
            ) : eventInfo.finished ? (
              <NextButton>Add a review</NextButton>
            ) : (
              <NextButton>Buy tickets</NextButton>
            )}
          </View>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  eventInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    marginTop: 30,
  },
  imageContainer: {
    backgroundColor: '#000',
    width: '100%',
    height: 250,
    marginRight: 13,
  },
  infoContainer: {
    marginVertical: 20,
  },

  boldText: {
    color: '#4F4F4F',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 19,
  },

  textInfo: {
    marginTop: 3,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 17,
    color: '#5B5B5B',
  },
  organizerContainer: {
    marginVertical: 10,
  },
});

export default EventInfo;
