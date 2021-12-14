import React, { useState, useEffect, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import RNPickerSelect from 'react-native-picker-select';
import { TouchableOpacity, Platform, FlatList, Alert } from "react-native";
import { NoEventsContainer, ButtonText, Container, SelectBox, RowView, Button, CardContainer, Header, Heading, HeadingTextField, TempView, ActionButtons, CardDateText, CardDescription, Label, FlatListContainer, CancelButton, UpdateButton, UpdateButtonsText, UpdateButtonsView } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { setEventsList, selectEvent, removeDataFromStorage, updateDataInStorage } from "../../../slice/eventSlice";
import { getData, initializeStorage, clearStorage, formatDate, showErrorToast } from "../../../utils/utils";
import { If, Then, Else } from "react-if";

type EventObj = {
    id: string,
    type: string,
    title: string,
    description?: string,
    date: string,
    startTime: string,
    endTime: string
}

const ListView = ({ navigation }: { navigation: any }) => {
    const [filterItem, setFilterItem] = useState<string>("all");
    const [isUpdatingItem, setIsUpdatingItem] = useState<string>("");
    const [updatingTitle, setUpdatingTitle] = useState<string>("")
    const selector = useSelector(selectEvent)
    const [eventsArray, setEventsArray] = useState<EventObj[]>([]);
    const dispatch = useDispatch();
    const updateInputRef = useRef()
    const initializeState = async () => {
        try {
            let res = await getData();
            if (res) {
                dispatch(setEventsList(JSON.parse(res)));
            }
            else {
                initializeStorage();
            }
        }
        catch (e) {
            throw e;
        }
    }
    useEffect(() => {
        initializeState();
    }, []);

    useEffect(() => {
        console.log("Events are here" , selector.events)
        if (filterItem !== 'all') {
            let filteredArray = selector.events.filter((item: EventObj) => item.type === filterItem);
            setEventsArray(filteredArray);
        }
        else {
            setEventsArray(selector.events);
        }
    }, [selector, filterItem]);

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
                <SelectBox platform={Platform.OS}>
                    <RNPickerSelect
                        onValueChange={(value) => setFilterItem(value)}
                        items={[
                            { label: 'All', value: 'all' },
                            { label: 'Events', value: 'event' },
                            { label: 'Out of office', value: 'outOfOffice' },
                            { label: 'Tasks', value: 'task' },
                        ]}
                    />
                </SelectBox>
                <Button onPress={() => navigation.navigate("CreateEvent")} ><ButtonText>+ Create Event</ButtonText></Button>
            </RowView>
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
    )
}

export default ListView;