import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    async create(req: Request, res: Response) {
        const data = req.body;

        const result = await this.categoryService.create(data);

        return res.status(201).json({
            status: "success",
            message: "Category created successfully",
            data: result,
        });
    }

    async fetch(req: Request, res: Response) {
        const result = await this.categoryService.fetchAll();

        return res.status(200).json({
            status: "success",
            message: "Category fetched successfully",
            data: result,
        });
    }
}
