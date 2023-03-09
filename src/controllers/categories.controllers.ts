import { Request, Response } from 'express';
import { tCategoryRequest } from '../interfaces/categories.interfaces';
import createCategoryService from '../services/categories/createCategory.service';
import readCategoriesService from '../services/categories/readCategories.service';
import readRealEstateByCategoryService from '../services/categories/readRealEstateByCategory.service';

const createCategoryController = async (request: Request, response: Response): Promise<Response> => {
    const categoryData: tCategoryRequest = request.body;
    const newCategory = await createCategoryService(categoryData);
    return response.status(201).json(newCategory);
}

const readCategoriesController = async (request: Request, response: Response): Promise<Response> => {
    const categories = await readCategoriesService();
    return response.json(categories);
}

const readRealEstateByCategoryController = async (request: Request, response: Response): Promise<Response> => {
    const idCategory = parseInt(request.params.id);
    const realEstate = await readRealEstateByCategoryService(idCategory);
    return response.json(realEstate);
}

export {
    createCategoryController,
    readCategoriesController,
    readRealEstateByCategoryController
};