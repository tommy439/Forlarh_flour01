async function isAuthenticated() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    //confirm from db if user exists
    return await userExists(user?.email); // Returns true if user exists, false otherwise
}


async function userExists(email) {
    try {
        const response = await fetch(
            `http://localhost:3001/users?email=${email}`
        );

        const users = await response.json();

        // update session storage with user data except password
        if (users.length > 0) {
            sessionStorage.setItem("user", JSON.stringify({ ...users[0], password: undefined }));
        }

        if (users.length > 0) {
           return true; // User exists
        } else {
            return false; // User does not exist
        }
    } catch (error) {
        return false
    }
}