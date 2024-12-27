import axiosInstance from "./axiosInstance"

export const fetchUser = async () => {
    const response = await axiosInstance.get("/user");
    return response.data;
}
export const loginUser = async (credentials) => {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
}
