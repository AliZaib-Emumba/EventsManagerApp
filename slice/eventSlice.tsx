import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setData, getData, showErrorToast, checkForConflicts } from "../utils/utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showSuccessToast } from "../utils/utils";
type InitialStateType = {
    events: EventObj[]
}
type EventObj = {
    id: string
    type: string,
    title: string,
    description?: string,
    date: string,
    startTime: string,
    endTime: string
}
const initialState: InitialStateType = {
    events: []
}


export const addDataToStorage = createAsyncThunk(
    'events/addDataToStorage',
    async (incomingData: EventObj) => {
        try {
            let storageItem = await getData();
            if (storageItem) {
                let data = JSON.parse(storageItem);
                if (checkForConflicts(incomingData, data)) {
                    throw Error
                }
                data.push(incomingData);
                await setData(data);
                showSuccessToast("Event created Successfully")
            }
            return incomingData

        }
        catch (err) {
            throw err
        }
    }
);

export const removeDataFromStorage = createAsyncThunk(
    'events/deleteDataFRomStorage',
    async (itemId: string) => {
        let storageItem = await getData();
        let data: EventObj[] = []
        if (storageItem) {
            data = JSON.parse(storageItem)
            data = data.filter(item => item.id !== itemId);
            await setData(data);
            showSuccessToast("Event Deleted Successfully")
        }
        return data;
    }
)

export const updateDataInStorage = createAsyncThunk(
    'events/updateDataInStorage',
    async (updatingItem: { itemId: string, newTitle: string }) => {
        let storageItem = await getData();
        let data: EventObj[] = []
        if (storageItem) {
            data = JSON.parse(storageItem);
            data.map(item => {
                if (item.id === updatingItem.itemId) {
                    item.title = updatingItem.newTitle
                }
            });
            await setData(data);
            showSuccessToast("Event Updated Successfully")
        }
        return data;
    }
)

export const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        addNewEvent: (state, action) => {
            state.events = [...state.events, action.payload];
        },
        setEventsList: (state, action) => {
            state.events = [...action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addDataToStorage.fulfilled, (state, action) => {
            state.events = [...state.events, action.payload];

        })
        builder.addCase(addDataToStorage.rejected, (state, action) => {
            showErrorToast("The newly set timings has conflicts with other meetings")
            return state
        })
        builder.addCase(removeDataFromStorage.fulfilled, (state, action) => {
            state.events = [...action.payload];
        })
        builder.addCase(updateDataInStorage.fulfilled, (state, action) => {
            state.events = [...action.payload];
        })
    }
});

export const { addNewEvent, setEventsList } = eventsSlice.actions;

export const selectEvent = (state: any) => state.events;

export default eventsSlice.reducer;