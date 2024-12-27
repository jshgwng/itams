import { jwtDecode } from "jwt-decode";

const INACTIVITY_TIMEOUT = 5 * 60 * 1000
let inactivityTimer

export const isTokenExpired = (token) => {
    try {
        const { exp } = jwtDecode(token)
        const currentTime = Date.now() / 1000
        return exp < currentTime
    } catch (error) {
        console.log("Invalid Token: ", error)
        return true
    }
}

export const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const expired = isTokenExpired(token)
            if (expired) {
                console.log("Token has expired")
            } else {
                console.log("User Inactive for 5 minutes")
            }
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    }, INACTIVITY_TIMEOUT);
}

export const checkTokenOnLoad = () => {
    const token = localStorage.getItem("token")
    if (token && isTokenExpired(token)) {
        console.log("Token is expired")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }
}

export const setupInactivityHandler = () => {
    ["mousemove", "keydown", "mousedown", "scroll"].forEach((event) => window.addEventListener(event, resetInactivityTimer))
}

export const initTokenManager = () => {
    checkTokenOnLoad()
    setupInactivityHandler();
    resetInactivityTimer()
}