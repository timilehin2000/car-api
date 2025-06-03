import { Request, Response } from "express";
import { CarService } from "../services";
import { PaginationDto } from "../utils/pagination";

export class CarController {
    constructor(private carService: CarService) {}
    async create(req: Request, res: Response) {
        const data = req.body;

        const result = await this.carService.create(data);

        return res.status(201).json({
            status: "success",
            message: "Car created successfully",
            data: result,
        });
    }

    async fetchAll(req: Request, res: Response) {
        const { query } = req;

        const q = Object.assign(new PaginationDto(), {
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        });

        const result = await this.carService.fetchAll(q, query);

        return res.status(200).json({
            status: "success",
            message: "Cars fetched successfully",
            data: result.data,
            meta: result.meta,
        });
    }

    async fetch(req: Request, res: Response) {
        const { carId } = req.params;

        const result = await this.carService.fetch(carId);

        return res.status(200).json({
            status: "success",
            message: "Car fetched successfully",
            data: result,
        });
    }

    async update(req: Request, res: Response) {
        const { carId } = req.params;

        const data = req.body;

        const result = await this.carService.update(carId, data);

        return res.status(200).json({
            status: "success",
            message: "Car updated successfully",
            data: result,
        });
    }

    async remove(req: Request, res: Response) {
        const { carId } = req.params;

        await this.carService.remove(carId);

        return res.status(200).json({
            status: "success",
            message: "Car deleted successfully",
        });
    }
}
