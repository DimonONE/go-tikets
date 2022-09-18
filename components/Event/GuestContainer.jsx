import React, { useEffect, useMemo, useState } from 'react';
import Selector from '@Components/UI/Selector';
import { FlatList } from 'react-native';
import GuestItem from '@Components/Event/GuestItem';
import { Wrapper } from '@Components/Wrapper';
import useQuery from '@Hooks/useQuery';
import { guest } from '@/server';
import Toast from 'react-native-toast-message';

const GuestContainer = ({ onSelectGuest, eventId }) => {
  const [guestList, setGuestList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filters = useMemo(() => {
    return guestList.reduce(
      (acc, curr) => {
        if (!acc.some((element) => element.name === curr.status)) {
          acc.push({ name: curr.status, count: 1 });
        } else {
          acc = acc.map((element) =>
            element.name === curr.status
              ? { ...element, count: element.count + 1 }
              : element
          );
        }
        return acc;
      },
      [{ name: 'all', count: guestList.length }]
    );
  }, [guestList]);

  const filteredGuestList = useMemo(() => {
    return guestList.filter((item) =>
      !selectedFilter?.name || selectedFilter?.name === 'all'
        ? true
        : item.status === selectedFilter.name
    );
  }, [guestList, selectedFilter]);

  const fetchData = async () => {
    const { data, message, ok } = await useQuery(guest.getList(eventId));

    if (!ok) {
      Toast.show({
        type: 'error',
        text1: message,
      });
    }

    const mapData = data.map((item) => ({
      id: item.id,
      status: item.status,
      name: `${item.user.name} ${item.user.surname}`,
      ticketName: item.ticket.name,
      ticketsNum: item.ticket.totalCount,
      createDate: '05/07/2022',
    }));

    setGuestList(mapData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeGuest = async () => {
    await fetchData();
  };

  return (
    <Wrapper style={{ marginTop: 70 }}>
      <Selector
        selectValue={selectedFilter}
        selectors={filters}
        onChange={setSelectedFilter}
        getLabel={(item) =>
          `${item.name.charAt(0).toUpperCase() + item.name.slice(1)} (${
            item.count
          })`
        }
      />
      <FlatList
        data={filteredGuestList}
        renderItem={({ item }) => (
          <GuestItem
            key={item.id}
            id={item.id}
            name={item.name}
            ticketsNum={item.ticketsNum}
            ticketName={item.ticketName}
            createDate={item.createDate}
            status={item.status}
            onSelectGuest={onSelectGuest}
            onChangeGuest={onChangeGuest}
          />
        )}
      />
    </Wrapper>
  );
};

export default GuestContainer;
