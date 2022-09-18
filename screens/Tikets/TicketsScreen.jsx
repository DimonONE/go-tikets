import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wrapper } from '@Components/Wrapper';
import useQuery from '@Hooks/useQuery';
import { ticket as ticketQuery } from '@/server';
import Toast from 'react-native-toast-message';
import GlobalLoader from '@Components/GlobalLoader';
import { NotAuthorized } from '@Components/NotAuthorized';
import { NoTickets } from '@Screens/Tikets/NoTikets';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import { TicketCard } from '@Screens/Tikets/TicketCard';

const TicketsScreen = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unathorized, setUnathorized] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, message, ok, status } = await useQuery(
        ticketQuery.getMyTickets()
      );

      if (!ok) {
        setLoading(false);
        if (status === 401) {
          setUnathorized(true);
          return;
        }
        Toast.show({
          type: 'error',
          text1: message,
        });
      }

      setTickets(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <GlobalLoader />;

  if (unathorized)
    return (
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <NotAuthorized />
      </View>
    );

  const formatTickets = (guests) => {
    return guests.map((guest) => ({
      id: guest.ticket.id,
      address: guest.ticket.event.address,
      endDate: guest.ticket.event.endDate,
      paymentStatus: guest.paymentStatus,
      creatorName: `${guest.user.name} ${guest.user.surname}`,
      phone: guest.user.phone,
      countTickets: guest.ticket.totalCount,
      priceBonus: guest.ticket.serviceCharge,
      name: guest.ticket.event.name,
      type: guest.ticket.type,
      price: guest.ticket.price,
    }));
  };

  return (
    <SafeAreaView>
      <Wrapper style={{ marginTop: 0, paddingVertical: 28 }}>
        <HeaderNavigate
          style={{
            backgroundColor: 'inherit',
            height: 20,
            marginBottom: 32,
          }}
          title='Tickets'
        />
        {tickets.length ? (
          <FlatList
            renderItem={({ item }) => (
              <TicketCard
                item={{
                  id: item.id,
                  address: item.address,
                  endDate: item.endDate,
                  paymentStatus: item.paymentStatus,
                  creatorName: item.creatorName,
                  phone: item.phone,
                  countTickets: item.countTickets,
                  priceBonus: item.priceBonus,
                  name: item.name,
                  type: item.type,
                  price: item.price,
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            data={formatTickets(tickets)}
          />
        ) : (
          <NoTickets />
        )}
      </Wrapper>
    </SafeAreaView>
  );
};

export default TicketsScreen;
