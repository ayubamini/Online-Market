

const logout = (setAuthenticated) => {

    console.log('logout')

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setAuthenticated({
        registered: false,
        isStaff: false,
        isAdmin: false
    })

}

export { logout };