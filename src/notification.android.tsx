import PushNotification from "react-native-push-notification";

type EventObj = {
    id: string
    type: string,
    title: string,
    description?: string,
    date: string,
    startTime: string,
    endTime: string
}

export const handleNotification = (item: EventObj) => {
    var eventDate = new Date(item.startTime) ; 
    eventDate.setMinutes(eventDate.getMinutes() - 10) ; 
    PushNotification.localNotificationSchedule({
        channelId: "channelid" , 
        title: "Event in 10 minutes" ,
        message: "You event " + item.title + " is starting in 10 minutes",
        date: new Date(eventDate) ,
        id: item.id
    });
}