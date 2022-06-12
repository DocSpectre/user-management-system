

module.exports.parseSQLFindResult = (queryResult) => {
    if (Array.isArray(queryResult)) {
        return queryResult.reduce((acc, curr) => {
            if (curr && curr.dataValues) {
                const keyList = Object.keys(curr.dataValues);
                if (keyList.includes('id')) {
                    return acc.concat(curr.dataValues);
                }
            }
        }, [])
    }
    return null;
}

module.exports.isValidArray = (array) => {
    if (Array.isArray(array) && array.length > 0) return true;
    return false;
}