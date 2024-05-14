import { instance } from "./instance";

export default async function registerUser(name: string, email: string, password: string) {
    const body = {
        name,
        email,
        password
    };

    try {
        const { data: { newUser } } = await instance
            .post("/api/register", body);

        return newUser;
    } catch (err) {
        return null
    }
}