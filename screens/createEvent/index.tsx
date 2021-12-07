import React, { useState } from "react";
import { Container, Label, TextInput } from "./styles";
import { Formik } from "formik";
import { Button, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEvent = ({ navigation }: { navigation: any }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        /* const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate); */
        console.log(event  + " ---- " + selectedDate )
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    return (
        <Container>
            <Formik
                initialValues={{ title: "", description: "" }}
                onSubmit={values => console.log("Values are here", values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                    <>
                        <Label>Title</Label>
                        <TextInput
                            name="title"
                            placeholder={"Title of the event"}
                            onChangeText={handleChange("title")}
                            onBlur={handleBlur('title')}
                            value={values.title}
                        />
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
            {/* {!show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )} */}
        </Container>
    )
}

export default CreateEvent;