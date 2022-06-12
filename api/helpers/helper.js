

module.exports.parseSQLFindResult = (queryResult) => {
    // console.log('Object  . ,', Object.keys);
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