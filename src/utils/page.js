const getPage = (page, pageSize) => {
    const offset = (page - 1) * pageSize;
    return offset.toString();
}

module.exports = {
    getPage
}