import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./slice/eventSlice" ;


export default configureStore({
    reducer: {events : eventsSlice}
})