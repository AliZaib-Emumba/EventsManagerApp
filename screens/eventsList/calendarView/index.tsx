import React, { useState } from "react";
import { Container, RowView, Button, ButtonText, CalendarContainer } from "../styles";
import { View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";

type MarkedDate = {
    [key: string]: {
        selected: boolean,
        selectedColor: string,

    }
}


const CalendarView = ({ navigation }: { navigation: any }) => {
    const [markedDate, setMarkedDate] = useState<MarkedDate>()

    const getSelectedDayEvents = (date: string) => {
        console.log("Date is here", date)
        let markedDates: MarkedDate = {};
        markedDates[date] = { selected: true, selectedColor: "#735F8C" }
        setMarkedDate(markedDates);
    }


    return (
        <Container>
            <RowView>
                <View></View>
                <Button onPress={()=>navigation.navigate("CreateEvent")} ><ButtonText>+ Create Event</ButtonText></Button>
            </RowView>
            <CalendarContainer>
                <Calendar
                    minDate={new Date()}
                    enableSwipeMonths={true}
                    markedDates={markedDate}
                    onDayPress={(day) => getSelectedDayEvents(day.dateString)}
                    markingType='custom'
                />
            </CalendarContainer>
        </Container>
    );
}

export default CalendarView;