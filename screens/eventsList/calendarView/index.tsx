import React, { useState, useEffect } from 'react';
import { NoEventsContainer, ButtonText, Container, SelectBox, RowView, Button, CardContainer, Header, Heading, HeadingTextField, TempView, ActionButtons, CardDateText, CardDescription, Label, FlatListContainer, CancelButton, UpdateButton, UpdateButtonsText, UpdateButtonsView, CalendarContainer } from '../styles';
import { View, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEventsList,
  selectEvent,
  removeDataFromStorage,
  updateDataInStorage,
} from '../../../slice/eventSlice';
import {
  getData,
  initializeStorage,
  clearStorage,
  formatDate,
  showErrorToast,
} from '../../../utils/utils';
import { If, Then, Else } from 'react-if';
type MarkedDate = {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
  };
};

type EventObj = {
  id: string;
  type: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
};

const CalendarView = ({ navigation }: { navigation: any }) => {
  const [markedDate, setMarkedDate] = useState<MarkedDate>();
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date().toString()));
  const [eventsArray, setEventsArray] = useState<EventObj[]>([]);
  const [isUpdatingItem, setIsUpdatingItem] = useState<string>("");
  const [updatingTitle, setUpdatingTitle] = useState<string>("")
  const selector = useSelector(selectEvent);
  const dispatch = useDispatch();

  useEffect(() => {
    let filteredArray = selector.events.filter((item: EventObj) => formatDate(item.date) === selectedDate);
    setEventsArray(filteredArray);
  }, [selector, selectedDate]);

  const getSelectedDayEvents = (date: string) => {
    setSelectedDate(date.split("-").reverse().join("/"));
    let markedDates: MarkedDate = {};
    markedDates[date] = { selected: true, selectedColor: '#735F8C' };
    setMarkedDate(markedDates);
  };

  const deleteEvent = (itemId: string) => {
    dispatch(removeDataFromStorage(itemId));
  }

  const showConfirmationDialog = (itemId: string) => {
    return (
      Alert.alert(
        "Deleting Meeting", "Are you sure you want to delete this", [{ text: "Delete", onPress: () => deleteEvent(itemId) }, { text: "Cancel" }]
      )
    )
  }

  const updateItem = (itemId: string, originalTitle: string) => {
    if (updatingTitle === originalTitle) {
      showErrorToast("No change detected");
    }
    else {
      dispatch(updateDataInStorage({ itemId: itemId, newTitle: updatingTitle }))
    }
    setIsUpdatingItem("");

  }

  const renderItem = ({ item }: { item: EventObj }) => {
    return (
        <TempView>
            <CardContainer>
                <Header>
                    <If condition={isUpdatingItem === item.id}>
                        <Then>
                            <HeadingTextField autoFocus={isUpdatingItem === item.id} value={updatingTitle} onChangeText={setUpdatingTitle} />
                        </Then>
                        <Else>
                            <Heading>{item.title}</Heading>
                        </Else>
                    </If>
                    <ActionButtons>
                        <TouchableOpacity onPress={() => showConfirmationDialog(item.id)} activeOpacity={0.7}><Ionicons name="trash-outline" size={20} color="#735F8C" /></TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIsUpdatingItem(item.id); setUpdatingTitle(item.title) }} activeOpacity={0.7}><Ionicons name="pencil-sharp" size={20} color="#735F8C" /></TouchableOpacity>
                    </ActionButtons>
                </Header>
                <CardDateText>{formatDate(item.date)}</CardDateText>
                <CardDescription>{item.description}</CardDescription>
                <Label>Files: none</Label>
                <If condition={isUpdatingItem === item.id}>
                    <Then>
                        <UpdateButtonsView>
                            <UpdateButton onPress={() => updateItem(item.id, item.title)} ><UpdateButtonsText>Save</UpdateButtonsText></UpdateButton>
                            <CancelButton onPress={() => setIsUpdatingItem("")}><UpdateButtonsText>Cancel</UpdateButtonsText></CancelButton>
                        </UpdateButtonsView>
                    </Then>
                </If>
            </CardContainer>
        </TempView>
    )
}

  return (
    <Container>
      <RowView>
        <View></View>
        <Button onPress={() => navigation.navigate('CreateEvent')}>
          <ButtonText>+ Create Event</ButtonText>
        </Button>
      </RowView>
      <CalendarContainer>
        <Calendar
          minDate={new Date()}
          enableSwipeMonths={true}
          markedDates={markedDate}
          onDayPress={day => getSelectedDayEvents(day.dateString)}
          markingType="custom"
        />
      </CalendarContainer>
      <If condition={!!(eventsArray.length > 0)}>
        <Then>
          <FlatListContainer>
            <FlatList data={eventsArray} keyExtractor={item => item.id} renderItem={renderItem} />
          </FlatListContainer>
        </Then>
        <Else>
          <NoEventsContainer>
            <Heading>No Events to show</Heading>
          </NoEventsContainer>
        </Else>
      </If>
    </Container>
  );
};

export default CalendarView;
