import { NextFunction, Request, Response } from "express";
import { UrlCreateRequest } from "../models/ulr";
import { UrlRepository } from "../repositories/url.repository";
import { UrlService } from "../services/url.service";

export const getUrls = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const urlRepository = new UrlRepository();
        const response = await urlRepository.getAll();
        res.json(response);
        res.status(200);
    } catch (e) {
        next(e);
    }
    
}

export const createUrl = async (req: Request<{}, {}, UrlCreateRequest>, res: Response, next: NextFunction) => {
    try {
        const urlService = new UrlService();
        const url = await urlService.create(req.body);

        res.location(url.shortened);
        res.status(201);
        res.json(url);
    }
    catch (e){
        next(e);
    }
}