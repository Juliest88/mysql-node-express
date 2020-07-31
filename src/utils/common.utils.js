exports.getPlaceholderStringForArray = (arr) => {
    checkArray(arr);

    // if is array, we'll clone the arr 
    // and fill the new array with placeholders
    const placeholders = [...arr];
    return placeholders.fill('?').join(', ').trim();
}


exports.multipleCoulmnSet = (object) => {
    const keys = Object.keys(object);
    const values = Object.values(object);

    setColumnsPartialQuery = keys.map(key => `${key} = ?`).join(', ');

    return {
        setColumnsPartialQuery,
        values
    }
}

function checkArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Invalid input');
    }
}