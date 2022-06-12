module.exports.validateDataType = (data) => {
    if (data !== undefined
        || data !== null
        && data.length > 0) {
        return true
    }

    return false;
}