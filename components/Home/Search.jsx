import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderNavigate} from '@Components/Profile/HeaderNavigate';
import {
    Pressable,
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import AppText from '@Components/AppText';
import {Wrapper} from '@Components/Wrapper';
import arrowBackIcon from '@Assets/arrowBackIcon.svg';
import {SvgXml} from 'react-native-svg';
import {SearchBackdrop} from './SearchBackdrop';
import bottomArrowIcon from '@Assets/bottomArrowIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {AppIconInput} from '../AppIconInput';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import {store, useSnapshot} from '@/globalState';

import searchIcon from '@Assets/searchIcon.svg';
import useQuery from '@/hooks/useQuery';
import {event} from '@/server';
import objectToQuery from "@Helpers/objectToQuery";
import EventItem from "@Components/Event/EventItem";

const renderItem = ({item}) => {
    const formattedDate = dayjs(item.date).format('MMM DD, HH:mm');

    return (
        <View style={{marginBottom: 5}}>
            <EventItem
                event={
                    {...item, date: formattedDate}
                }
            />
        </View>
    );
};

export const HomeSearch = () => {
    const snapshot = useSnapshot(store);
    const [selectedSort, setSelectedSort] = useState({
        label: 'relevance',
        value: 'date',
    });

    const [showBackdrop, setShowBackdrop] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [cards, setCards] = useState([]);

    useEffect(() => {
        (async () => {
            const params = objectToQuery({
                sortBy: selectedSort.value,
                userLocation: snapshot.userCurrentLocation,
                query: searchText
            })

            const {message, ok, data} = await useQuery(
                event.getList(params)
            );

            if (!ok) {
                Toast.show({
                    type: 'error',
                    text1: message,
                });
                return;
            }
            const mappedData = data.map((event) => ({
                id: event.id,
                name: event?.name,
                date: event?.endDate,
                location: event?.address,
            }));

            setCards(mappedData);
        })();
    }, [selectedSort, snapshot?.userCurrentLocation, searchText]);

    const navigation = useNavigation();

    return (
        <>
            <SafeAreaView>
                <HeaderNavigate style={styles.headerNavigate}>
                    <Pressable onPress={() => navigation.navigate('TabNavigation')}>
                        <SvgXml xml={arrowBackIcon}/>
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('CitySelect')}
                        style={[
                            styles.centeredItem,
                            {
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            },
                        ]}
                    >
                        <AppText style={{marginRight: 6}}>Kharkiv</AppText>
                        <SvgXml xml={bottomArrowIcon}/>
                    </Pressable>
                </HeaderNavigate>
                <Wrapper style={{marginTop: 80}}>
                    <AppIconInput
                        icon={searchIcon}
                        onChangeText={setSearchText}
                        value={searchText}
                        placeholder='Search'
                        style={{marginBottom: 20}}
                    />
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 20,
                        }}
                    >
                        <AppText weight={500}>
                            {cards.length} event{cards.length > 1 ? 's' : ''}
                        </AppText>
                        <Pressable
                            style={styles.centeredItem}
                            onPress={() => setShowBackdrop(true)}
                        >
                            <AppText weight={500}>sort by: {selectedSort?.label}</AppText>
                            <SvgXml xml={bottomArrowIcon}/>
                        </Pressable>
                    </View>
                </Wrapper>
                <View style={{paddingBottom: 330, marginHorizontal: 15}}>
                    <FlatList
                        data={cards}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </SafeAreaView>
            <SearchBackdrop
                setShowBackdrop={setShowBackdrop}
                showBackdrop={showBackdrop}
                setSelectedSort={setSelectedSort}
            />
        </>
    );
};

const styles = StyleSheet.create({
    centeredItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerNavigate: {
        width: '100%',
        height: 100,
        alignItems: 'flex-end',
        paddingHorizontal: 25,
        paddingBottom: 25,
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'white',
    },

    checkBoxWrapper: {
        width: '23.3%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 22,
        marginRight: 30,
    },
    checkBoxContainer: {
        width: '23.3%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 22,
        marginRight: 30,
    },
    placeText: {
        color: '#BDBDBD',
        fontSize: 14,
    },

    textInfo: {
        marginTop: 3,
        fontWeight: '400',
        fontSize: 12,
        color: '#5B5B5B',
        lineHeight: 17,
        flexWrap: 'wrap',
        maxWidth: '80%',
    },
});
