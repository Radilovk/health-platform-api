// userController.js - Controler for user management features

import UserModel from '../models/userModel';

const getUserById = async ( req, res ) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: 'User not found' });
    }
};

export { getUserById };
