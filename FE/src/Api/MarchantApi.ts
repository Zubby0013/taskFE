import axios from "axios";

const URL: string = "http://localhost:2334/api";
export const loginMarchant = async (email: any) => {
    try {
        return await axios.post(`${URL}/login-marchant`, email).then((res: {}) => {
            return res;
        });
    } catch (error) {
        console.log(error);
    }
};

export const getStore = async () => {
    try {
        return await axios.get(`${URL}/view-all-store`).then((res: any) => {
            return res.data.data;
        });
    } catch (error) {
        console.log(error);
    }
};
