import PushNotificationIOS from '@react-native-community/push-notification-ios';

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
    PushNotificationIOS.addNotificationRequest({
        id: item.id ,
        title: "Event in 10 minutes" ,
        body: "You event " + item.title + " is starting in 10 minutes",
        fireDate: new Date(eventDate),
        isCritical: true ,
    });
}