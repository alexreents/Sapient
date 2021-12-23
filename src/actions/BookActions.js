import { Actions } from 'react-native-router-flux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { result } from 'lodash';

export const fetchBooks = () => {
    const { currentUser } = auth();

    return (dispatch) => {
        dispatch({type: 'fetch_books' });
        database().ref(`/users/${currentUser.uid}/book`)
        .on('value', snapshot => {
            //console.log(snapshot.val());
            dispatch({type: 'book_fetch_success', payload: snapshot.val() });
        });
    };
};

export const createBook = ({ title, body, author, image }) => {
    const { currentUser } = auth();
    const lastEdit = new Date().toLocaleString();


    return () => {
        database().ref(`users/${currentUser.uid}/book`)
        .push({title, body, author, image, lastEdit})
        .then((res) => {
            const id = res.key;
            database().ref(`users/${currentUser.uid}/book/${res.key}/id`).set(id)
            .then(() => {
                
            });
        });
    };
};

export const selectBook = ({ id }) => {
    return {
        type: 'select_book',
        payload: id 
    };

    //Actions.AddBook();
};


export const editBook = ({ title, body, author, image, id }) => {
    const { currentUser } = auth();
    const lastEdit = new Date().toLocaleString();

    return () => {
        database().ref(`users/${currentUser.uid}/book/${id}`)
        .set({
            title: title,
            body: body,
            lastEdit : lastEdit,
            author: author,
            image: image,
            id: id
        }).then(() => {
        });
    };
};


export const loadBook = ({ prop, value }) => {
    return {
        type: 'book_edit',
        payload: { prop, value }
    };
};


export const updateBook = ({ prop, value }) => {
    return {
        type: 'book_update',
        payload: { prop, value }
    };
};



export const deleteBook = ({ id }) => {
    const { currentUser } = auth();

    return (dispatch) => {
        dispatch({ type: 'delete_book' });

        database().ref(`/users/${currentUser.uid}/book/${id}`).remove()
        .then(() => {
            dispatch({ type: 'delete_book_success' });
            //Actions.Books();
        })
    }
};