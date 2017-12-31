export const removeBrackets = (name) => {
    if (typeof (name) === 'undefined') {
        return '';
    }

    const openBracket = name.indexOf('[');
    if (openBracket !== -1) {
        return name.substring(0, openBracket);
    }

    return name;
};