exports.getPlaceholderStringForArray = (arr) => {
    checkArray(arr);

    // if is array, we'll clone the arr 
    // and fill the new array with placeholders
    const placeholders = [...arr];
    return placeholders.fill('?').join(', ').trim();
}


exports.multipleColumnSet = (object) => {
    const keys = Object.keys(object);
    const values = Object.values(object);

    updateSet = keys.map(key => `${key} = ?`).join(', ');

    return {
        updateSet,
        values
    }
}

function checkArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Invalid input');
    }
}