import { Actions } from 'react-native-router-flux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const fetchBooks = () => {
    const { currentUser } = auth();

    return (dispatch) => {
        dispatch({type: 'fetch_books' });
        database().ref(`/users/${currentUser.uid}/book`)
        .on('value', snapshot => {
            dispatch({type: 'book_fetch_success', payload: snapshot.val() });
        });
    };
};

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

        database().ref(`users/${currentUser.uid}/book`)
        .push({title, body, lastEdit})
        .then((res) => {
            const id = res.key;
            database().ref(`users/${currentUser.uid}/book/${res.key}/id`).set(id)
            .then(() => {
                dispatch({ type: 'book_create' });
                Actions.Books();
            });
        });
    };
};

export const selectBook = ({ id }) => {
    return {
        type: 'select_note',
        payload: id 
    };

    Actions.AddBook();
};