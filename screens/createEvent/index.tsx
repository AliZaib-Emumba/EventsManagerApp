import React, { useState, useRef, useEffect } from "react";
import { Container, Label, TextInput, DateTimeText, DateTimeView, TimeRow, SelectBox, Button, ButtonText, ErrorText } from "./styles";
import { Formik } from "formik";
import { Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate, formatTime, getData, initializeStorage } from "../../utils/utils";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch } from "react-redux";
import { addDataToStorage } from "../../slice/eventSlice";
import * as yup from "yup";
import { If, Then } from "react-if";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
const eventTitleValidationSchema = yup.object().shape({
    title: yup.string().required("Title for the event is a required field")
})
type EventObj = {
    id: string,
    type: string,
    title: string,
    description?: string,
    date: string,
    startTime: string,
    endTime: string
}
const CreateEvent = ({ navigation }: { navigation: any }) => {
    const [date, setDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<Date>(new Date(0,0,0,0));
    const [endTime, setEndTime] = useState<Date>(new Date(0,0,0,0));
    const [mode, setMode] = useState<any>('date');
    const [show, setShow] = useState<boolean>(false);
    const [isEndtime, setIsEndTime] = useState<boolean>(false);
    const [eventType, setEventType] = useState<string>("");
    const [eventTypeError, setEventTypeError] = useState<string>("");
    const [dateError, setDateError] = useState<string>("");
    const dispatch = useDispatch();
    const formikRef = useRef<any>();

    useEffect(() => {
        async function checkData() {
            let data = await getData();
            if (data === null) {
                initializeStorage();
            }
        }
        checkData();

    }, []);

    const showMode = (currentMode: string) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const manageEndTime = () => {
        showTimepicker();
        setIsEndTime(true);
    }
    const handleConfirm = (date: any) => {
        if (mode === 'date') {
            let newDate = new Date(date) ;
            newDate.setHours(0,0,0,0) ;
            setDate(newDate);
            setEndTime(newDate) ;
            setStartTime(newDate)
        }
        else if (isEndtime && mode === 'time') {
            setEndTime(date);
            setIsEndTime(false);

        }
        else if (!isEndtime && mode === "time") {
            setStartTime(date);
        }
        setShow(false);
    }

    const createNewEvent = () => {
        setEventTypeError("");
        setDateError("");
        if (!formikRef.current.values.title) {
            formikRef.current.submitForm()
        }
        else if (!eventType) {
            setEventTypeError("Event type is required.")
        }
        else if ((startTime.toString() === endTime.toString()) || startTime > endTime) {
            setDateError("Event End time must be greater than start time");
        }
        // error check for meeting availability 
        else {
            let eventObj: EventObj = {
                id: uuidv4(),
                type: eventType,
                title: formikRef.current.values.title,
                description: formikRef.current.values.description,
                date: date.toString(),
                startTime: startTime.toString(),
                endTime: endTime.toString()
            }
            dispatch(addDataToStorage(eventObj))

        }
    }

    return (
        <Container>
            <Label>Type</Label>
            <SelectBox platform={Platform.OS}>
                <RNPickerSelect
                    onValueChange={value => {
                        setEventTypeError("");
                        setEventType(value)
                    }}
                    items={[
                        { label: 'Events', value: 'event' },
                        { label: 'Out of office', value: 'outOfOffice' },
                        { label: 'Tasks', value: 'task' },
                    ]}
                />
            </SelectBox>
            <If condition={eventTypeError}>
                <Then>
                    <ErrorText>{eventTypeError}</ErrorText>
                </Then>
            </If>
            <Formik
                innerRef={formikRef}
                validationSchema={eventTitleValidationSchema}
                initialValues={{ title: "", description: "" }}
                onSubmit={values => { }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, setFieldValue }) => (
                    <>
                        <Label>Title</Label>
                        <TextInput
                            name="title"
                            placeholder={"Title of the event"}
                            onChangeText={handleChange("title")}
                            onBlur={handleBlur('title')}
                            value={values.title}
                        />
                        <If condition={errors.title || touched.title}>
                            <Then>
                                <ErrorText>{errors.title}</ErrorText>
                            </Then>
                        </If>
                        <Label>Description</Label>
                        <TextInput
                            name="description"
                            placeholder="description (optional)"
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            numberOfLines={5}
                            multiline={true}
                        />
                    </>
                )}

            </Formik>
            <Label>Date:</Label>
            <DateTimeView onPress={showDatepicker} ><DateTimeText>{formatDate(date.toString())}</DateTimeText></DateTimeView>
            <Label>Timings</Label>
            <TimeRow>
                <DateTimeView style={{ width: "40%", alignItems: "center" }} onPress={showTimepicker}><DateTimeText>{formatTime(startTime.toString())}</DateTimeText></DateTimeView>
                <DateTimeView style={{ width: "40%", alignItems: "center" }} onPress={manageEndTime}><DateTimeText>{formatTime(endTime.toString())}</DateTimeText></DateTimeView>
            </TimeRow>
            <DateTimePickerModal
                isVisible={show}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={() => setShow(false)}
                minimumDate={isEndtime ? startTime : new Date()}
                date={date}
            />
            <Button activeOpacity={0.8} onPress={createNewEvent}><ButtonText>Create Event</ButtonText></Button>
            <If condition={dateError}>
                <Then>
                    <ErrorText style={{ marginTop: 4 }}>{dateError}</ErrorText>
                </Then>
            </If>
        </Container>
    )
}

export default CreateEvent;