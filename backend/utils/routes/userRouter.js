import express from 'express';
import { logInController, signUpController } from '../controllers/userControllers/AccountController.js';
import { getUserProfileData } from '../controllers/userControllers/getUserData.js';
import { changeUserProfilePicture, uploadUserProfilePicture } from '../controllers/userControllers/changeProfilePicture.js';
import authenticateUser from '../../middleware/authenticateUser.js';
import { resetUserPasswordController } from '../controllers/userControllers/resetUserPasswordController.js';

const userRouter = express.Router();

userRouter.post('/sign-up', signUpController)

userRouter.post('/log-in', logInController)

userRouter.post('/update-user-profile-photo/:token', uploadUserProfilePicture, changeUserProfilePicture)

userRouter.post('/reset-user-password/:token', resetUserPasswordController)

userRouter.get('/get-user-profile-data/:token', getUserProfileData)

userRouter.get('/get-user-profile-data-for-video-page/:token', getUserProfileData)

export default userRouter;