function getAvatarUrl(userId) {
    return `http://localhost:8000/user/${userId}/avatar`;
}

module.exports = {
    getAvatarUrl
}