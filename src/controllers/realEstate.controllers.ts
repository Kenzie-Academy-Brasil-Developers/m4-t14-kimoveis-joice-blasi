import { Request, Response } from 'express';
import { tPropertyRequest } from '../interfaces/realEstate.interfaces';
import createPropertyService from '../services/realEstate/createProperty.service';
import readPropertiesService from '../services/realEstate/readProperties.service';

const createPropertyController = async (request: Request, response: Response): Promise<Response> => {
    const propertyData: tPropertyRequest = request.body;
    const newProperty = await createPropertyService(propertyData);
    return response.status(201).json(newProperty);
}

const readPropertiesController = async (request: Request, response: Response) => {
    const allProperties = await readPropertiesService();
    return response.json(allProperties);
}

export {
    createPropertyController,
    readPropertiesController
}