import { instance } from "./instance";

export default function loginUser(name: string, password: string) {
    const body = {
        name,
        password
    };

    return instance
    .post("/api/login", body)
    .then(({data: {loginDetails}}) => {
        return loginDetails
    })
    .catch(({response}) => {
        if(response?.data.msg) return Promise.reject(response.data.msg);

        console.log(response, "Unhandled error at login function")
    })

}