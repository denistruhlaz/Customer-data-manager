//buduci upgrade je da napravim session koji ce trajati 30min
function getUser() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user && user.username) {
        // console.log(user.username);
        return user.username
    }
}
function getToken() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
        return user.token
    }
}

export const auth = {
    getToken: getToken,
    getUser: getUser
}

