/**
 * removes the building name in brackets
 *
 * @param cleaned name

 * @returns {Promise} the line object
 */
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

const linkRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
/**
 * Finds where links appear in a string.
 *
 * @param val The string
 * @returns {RegExpExecArray | null}
 */
export const findLink = (val) => {
    return linkRegex.exec(val);
};