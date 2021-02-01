import {setEventPending, setEvents, addEvent, editEvent} from './actions';
import kyClient from "../../api/kyClient";
import {Event } from './types';
import {
    readAuthorizationUserFromLocalStorage,
    removeAuthorizationUserFromLocalStorage,
    saveAuthorizationUserInLocalStorage
} from "../../redux/Authorization/utils";

export const fetchEvents = (id, handler) => async (
    dispatch,
    getState
) => {
    try {
        const response = await kyClient.get(`trainer/${id}/events`);
        const data = await response.json();
        if (data) {
            dispatch(setEvents(data.data));
        }
    } catch (e) {
        handler();
    }
};

export const addEventToDatabase = (event, image) => async (
    dispatch
) => {
    try {
        console.log("EVENT: ",event)
        const response = await kyClient.post('post', {json: event});
        const data = await response.json();
        console.log("EVENT2: ",data)
        if(image != null){
            const responseImage = await kyClient.post(`post/${data.featuredImage}/featuredImage`, {json: image});
        }
        if (data) {
            dispatch(addEvent(data));
        }

    } catch (e) {
        console.log("ERROR")
    }
};


export const updateEventInDatabase = (event, id, image) => async (
    dispatch
) => {
    try {
        console.log(id, "Post to update: ", event);
        const response = await kyClient.put(`post/${id}`, {json: event});
        const data = await response.json();
        console.log("Post after update: ", data);
        if(image != null){
            const responseImage = await kyClient.post(`post/${data.featuredImage}/featuredImage`, {json: image});
        }
        if (data) {
            dispatch(editEvent(data));
        }

    } catch (e) {
        console.log("ERROR")
    }
};
