import { Request, Response } from 'express';
import { tUserRequest, tUserResponse, tUserUpdate } from '../interfaces/users.interfaces';
import createUserService from '../services/users/createUser.service';
import readUsersService from '../services/users/readUsers.service';
import softDeleteUserService from '../services/users/softDeleteUser.service';
import updateUserService from '../services/users/updateUser.service';

const createUserController = async (request: Request, response: Response): Promise<Response> => {
    const userData: tUserRequest = request.body;
    const newUser: tUserResponse = await createUserService(userData);
    return response.status(201).json(newUser);
}

const readUsersController = async (request: Request, response: Response): Promise<Response> => {
    const users = await readUsersService();
    return response.json(users);
}

const updateUserController = async (request: Request, response: Response): Promise<Response> => {
    const userData: tUserUpdate = request.body;
    const idParam = parseInt(request.params.id);
    const updatedUser = await updateUserService(userData, idParam);
    return response.json(updatedUser);
}

const softDeleteUserController = async (request: Request, response: Response): Promise<Response> => {
    const idParam = parseInt(request.params.id);
    await softDeleteUserService(idParam);
    return response.status(204).send();
}

export {
    createUserController,
    readUsersController,
    updateUserController,
    softDeleteUserController
}