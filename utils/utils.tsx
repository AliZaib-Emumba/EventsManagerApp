import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const showSuccessToast = (message: string) => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
    position: 'bottom',
  });
};
export const showErrorToast = (message?: string) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message ? message : 'Error while saving data',
    position: 'bottom',
  });
};

export function formatDate(date: string): string {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
}

export function formatTime(date: string | undefined): string | undefined {
  if (date) {
    let d = new Date(date);
    let hours = '' + d.getHours();
    let minutes = '' + d.getMinutes();
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    return [hours, minutes].join(':');
  }
}
type EventObj = {
  type: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
};

export async function clearStorage() {
  try {
    await AsyncStorage.removeItem('EVENTS');
  } catch (e) {
    showErrorToast('Error clearing data');
  }
}
export async function initializeStorage() {
  let Events: EventObj[] = [];
  try {
    await AsyncStorage.setItem('EVENTS', JSON.stringify(Events));
  } catch (e) {
    showErrorToast();
  }
}

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('EVENTS');
    return value;
  } catch (e) {
    throw e;
  }
};
export const setData = async (data: EventObj | EventObj[]) => {
  try {
    await AsyncStorage.setItem('EVENTS', JSON.stringify(data));
  } catch (e) {
    throw e;
  }
};

export const checkForConflicts = (newEvent: EventObj, allEvents: EventObj[]) => {
  let hasConflicts: boolean = false;
  allEvents.map(item => {
    if (formatDate(item.date) === formatDate(newEvent.date)) {
      if ((new Date(newEvent.startTime).getTime() >= new Date(item.startTime).getTime() && new Date(newEvent.startTime).getTime() <= new Date(item.endTime).getTime()) 
      || 
      (new Date(newEvent.endTime).getTime() >= new Date(item.startTime).getTime() && new Date(newEvent.endTime).getTime() <= new Date(item.endTime).getTime())
      ||
      (new Date(newEvent.startTime).getTime() <= new Date(item.startTime).getTime() && new Date(newEvent.endTime).getTime() >= new Date(item.endTime).getTime())
      ) {
        hasConflicts = true;
        return;
      }
    }
  });
  return hasConflicts;
}