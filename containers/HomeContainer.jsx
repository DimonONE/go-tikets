import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { HomeCard, HomeCardSkeleton } from '@Components/Home/HomeCard';
import { Wrapper } from '@Components/Wrapper';
import useQuery from '@/hooks/useQuery';
import { event } from '@/server';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import { store, useSnapshot } from '@/globalState';
import objectToQuery from '@Helpers/objectToQuery';

const renderItem = ({ item }) => (
  <Wrapper key={item.id} style={{ marginTop: 0 }}>
    <HomeCard
      name={item.name}
      date={item.date}
      location={item.location}
      totalTicketsCount={item.totalTicketsCount}
      currentTicketsCount={item.currentTicketsCount}
      textInfo={item.textInfo}
      price={item.price}
      event={item.event}
      imgs={item.demoLinks}
    />
  </Wrapper>
);

const renderSkeletonItem = ({ item }) => (
  <Wrapper key={item.id} style={{ marginTop: 0 }}>
    <HomeCardSkeleton />
  </Wrapper>
);

export const HomeContainer = () => {
  const { filters, userCurrentLocation } = useSnapshot(store);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: remove this const
  const ACTIVE_PLACE = false;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const params = filters
        ? objectToQuery({
            onlyInStock: filters.onlyInStock,
            eventType: filters.eventType,
            dateType: filters.dateType,
            date: filters.date,
            ...(userCurrentLocation && ACTIVE_PLACE
              ? {
                  placeNearInMeters: filters.place,
                  userLocation: userCurrentLocation,
                }
              : {}),
          })
        : '';
      const { data, message, ok } = await useQuery(event.getList(params));
      if (!ok) {
        Toast.show({
          type: 'error',
          text1: message,
        });
        return;
      }
      const mappedData = data.map((item) => {
        const currTicket = item?.tickets[0];
        return {
          id: item?.id || 'id:',
          name: item?.name || 'name',
          date: dayjs(item?.endDate).format('MMM D, HH:mm'),
          location: item?.address,
          totalTicketsCount: currTicket.totalCount,
          currentTicketsCount: currTicket.currentCount,
          textInfo: item?.shortDescription,
          price: `$ ${currTicket.price}`,
          event: item,
          demoLinks: item?.demoLinks || [],
        };
      });
      setData(mappedData);
      setLoading(false);
    })();
  }, [filters]);

  return (
    <View style={{ marginTop: 78 }}>
      {loading ? (
        <FlatList
          data={[{ id: 1 }, { id: 2 }]}
          renderItem={renderSkeletonItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
        />
      )}
    </View>
  );
};
