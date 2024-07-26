import { db } from "../config/db.confg";

const User = db.user;

const createUser = async (user: any) => {
    let userData = {
        name: user.name,
        email: user.email,
        mobileno: user.mobileno,
        password: user.password
    }
    const data = await User.create(userData);
    return data;
}

const getUserByEmail = async (email: string) => {
    const data = await User.findAll({ where: { email: email, is_active: 1, deleted_at: null },attributes:['id','name','password','email','mobileno','user_type'] })
    return data;
}

export {
    createUser,
    getUserByEmail
}