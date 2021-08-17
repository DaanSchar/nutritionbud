const initialState = {
    data: null,
}

export const ScannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SCAN':
            return scan(state, action);
    }
    return state;
}

function scan(state, action) {
    return state;
}
