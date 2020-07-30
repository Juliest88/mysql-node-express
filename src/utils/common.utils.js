exports.getPlaceholderStringForArray = (arr) => {
    checkArray(arr);

    // if is array, we'll clone the arr 
    // and fill the new array with placeholders
    const placeholders = [...arr];
    return placeholders.fill('?').join(', ').trim();
}

function checkArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Invalid input');
    }
}