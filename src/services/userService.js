import bcrypt from 'bcryptjs';
import db from "../model/index";

const salt = bcrypt.genSaltSync(10);

let getAllUser = async () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            })
            resolve(users)
        } catch(e) {
            reject(e)
        }
    })
}

let getUserById = async (userId) => {
    return new Promise((resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if(user) {
                resolve(user)
            }
            else {
                resolve([])
            }
        } catch(e) {
            reject(e)
        }
    })
}

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender === '1' ? true : false,
                address: data.address,
                phoneNumber: data.phoneNumber,
                // image: data.image,
                roleId: data.roleId,
                // positionId: data.positionId
            })
            resolve()
        } catch(e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch(e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if(user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save()
                let allUsers = await db.User.findAll();
                resolve(allUsers)
            }
            else {
                resolve()
            }
        } catch(e) {
            reject(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if(user) {
                await user.destroy()
                resolve()
            }
            else {
                resolve()
            }
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}