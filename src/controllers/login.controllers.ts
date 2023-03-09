import { Request, Response } from 'express';
import { tLoginRequest } from '../interfaces/login.interfaces';
import createLoginService from '../services/login/createLogin.service';

const createLoginController = async (request: Request, response: Response): Promise<Response> => {
    const loginData: tLoginRequest = request.body;
    const token = await createLoginService(loginData);
    return response.json({ token: token });
}

export { createLoginController };