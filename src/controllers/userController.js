import db from "../model/index";
import userService from "../services/userService"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', { data: JSON.stringify(data)})
    } catch (e) {
        console.log(e)
    }
}

let getCRUD = async (req, res) => {
    let data = await userService.getAllUser()
    return res.render('displayCRUD.ejs', { data: data })
}

let postCRUD = async (req, res) => {
    await userService.createNewUser(req.body)
}

let editCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId) {
        let userData = await userService.getUserById(userId)
        return res.render('editCRUD.ejs', { data: userData })
    }
    else {
        return res.send('user not found')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await userService.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        data: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId) {
        await userService.deleteUserById(userId);
        return res.send("delete succeed")
    }
    else {
        return res.send('user not found')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}