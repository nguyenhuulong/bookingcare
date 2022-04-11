import express from "express"
import userController from "../controllers/userController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', userController.getHomePage);
    router.get('/get-crud', userController.getCRUD);
    router.post('/post-crud', userController.postCRUD);
    router.get('/edit-crud', userController.editCRUD);
    router.post('/put-crud', userController.putCRUD);
    router.get('/delete-crud', userController.deleteCRUD);
    return app.use("/", router)
}

module.exports = initWebRoutes;