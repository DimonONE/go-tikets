import React, {useState} from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet,} from 'react-native';
import {HeaderNavigate} from '@Components/Profile/HeaderNavigate';
import closeICO from '@Assets/close.png';
import AppText from '@Components/AppText';
import {Wrapper} from '@Components/Wrapper';
import {useNavigation} from '@react-navigation/native';
import {actions} from '@/actions';
import {store, useSnapshot} from '@/globalState';
import {Button} from "@Components/UI";
import {DateBlock} from "@Components/Home/Filter/DateBlock";
import PlaceSlider from "@Components/Home/Filter/PlaceSlider";
import {TicketsOfEvent} from "@Components/Home/Filter/TicketsOfEvent";
import {TicketsBlock} from "@Components/Home/Filter/TicketsBlock";
import Gender from "@Components/Home/Filter/Gender";
import Age from "@Components/Home/Filter/Age";
import {Block} from "@Components/Home/Filter/Block";


export const HomeFilters = () => {
  const navigation = useNavigation();
  const { filters: currFilters } = useSnapshot(store);
  const [filters, setFilters] = useState(
    currFilters || {
      place: 100,
      eventType: '',
      onlyInStock: false,
      dateType: '',
      dateFrom: null,
      dateTo: null
    }
  );

  const changeFiltersValue = (newValue) => {
    setFilters((prev) => ({ ...prev, ...newValue }));
  };

  const addFilters = () => {
    actions.setFiltersForHome(filters);
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView>
      <HeaderNavigate style={styles.headerNavigate}>
        <Pressable
          style={{ height: 14 }}
          onPress={() => navigation.navigate('Home')}
        >
          <Image style={{ height: '100%' }} source={closeICO} />
        </Pressable>
        <AppText
          style={{
            color: '#000000',
            fontWeight: '800',
            fontSize: 14,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Filter
        </AppText>
      </HeaderNavigate>
      <ScrollView>
        <Wrapper style={{ marginTop: 100 }}>
          <Block title='Date'>
            <DateBlock value={{ dateType: filters.dateType, date: { start: filters.dateFrom, end: filters.dateTo } }}
                       onChangeDateType={((value) => changeFiltersValue({ dateType: value }))}
                       onChangeDate={((value) => changeFiltersValue({ dateFrom: value?.start, dateTo: value?.end }))}
            />
          </Block>
          <Block title='Place'>
            <PlaceSlider
              value={filters.place}
              onChange={(value) => changeFiltersValue({ place: value })}
            />
          </Block>
          <Block title='Type of event'>
            <TicketsOfEvent
              value={filters.eventType}
              onChange={(value) => changeFiltersValue({ eventType: value })}
            />
          </Block>
          <Block title='Gender'>
            <Gender/>
          </Block>
          <Block title='Age'>
              <Age/>
          </Block>
          <Block title='Tickets'>
            <TicketsBlock
              value={filters.onlyInStock}
              onChange={(value) => changeFiltersValue({ onlyInStock: value })}
            />
          </Block>
          <Button onPress={addFilters}>Add filter</Button>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerNavigate: {
    width: '100%',
    height: 100,
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    paddingBottom: 25,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'white',
  }
});
