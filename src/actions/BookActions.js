import { Actions } from 'react-native-router-flux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const updateBook = ({ prop, value }) => {
    return {
        type: 'book_update',
        payload: { prop, value }
    };
};

export const createBook = ({ title, body }) => {
    // title and body are here correctly

    const { currentUser } = auth();
    const lastEdit = new Date().toLocaleString();


    return (dispatch) => {
        dispatch({ type: 'save_book' });

        database().ref(`/users/${currentUser.uid}/book`)
        .push({title, body, lastEdit})
        .then((res) => {

            const id = res.getKey();
            database().ref(`/users/${currentUser.uid}/book/${res.getKey()}/id`).set(id)
            .then(() => {
                dispatch({ type: 'book_create' });
                Actions.main();
            });
        });
    };
};