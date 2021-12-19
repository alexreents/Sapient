const INITIAL_STATE = { books: {} , id: null, title: ' ', body: ' ', author: null, image: '', loading: false, error: ''};

export default BookReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'fetch_books':
            return { ...state, loading: true };
        case 'book_fetch_success':
            return { books: action.payload, loading: false };
        case 'book_update':
            return({ ...state, [action.payload.prop]: action.payload.value });
        case 'book_edit':
            return { ...state, [action.payload.prop]: action.payload.value };
        case 'book_create':
            return {...state, ...INITIAL_STATE, loading: false };
        case 'save_book':
            return { ...state, loading: true, error: '' };
        case 'delete_book':
            return { ...state, loading: true };
        case 'delete_book_success':
            return { ...state, loading: false };
        default:
            return state;

    };
};