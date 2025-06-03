import { FilterQuery } from "mongoose";
import { Car, ICar } from "../models";
import { BadRequestError, ConflictError, NotFoundError } from "../utils";
import { CategoryService } from "./category.service";
import { Document } from "mongoose";
import { SortOrder } from "mongoose";
import {
    PaginationDto,
    PaginationResultDto,
    RecordOrder,
} from "../utils/pagination";

export class CarService {
    constructor(private categoryService: CategoryService) {}

    async create(data: {
        categoryId: string;
        brand: string;
        carModel: String;
        year: number;
        price: number;
        color: string;
        mileage: number;
    }) {
        const categoryExist = await this.categoryService.findById(
            data.categoryId
        );

        if (!categoryExist) {
            throw new BadRequestError("Category not found");
        }

        const car = await this.save({ ...data, category: data.categoryId });

        return car;
    }

    async fetchAll(paginationData: PaginationDto, query: Record<string, any>) {
        const filterQuery = this.processQuery(query);

        const [cars, count] = await this.findAndCount(
            filterQuery,
            { createdAt: paginationData.order === RecordOrder.ASC ? 1 : -1 },
            paginationData.skip,
            paginationData.limit
        );

        return new PaginationResultDto(cars, {
            itemCount: count,
            pageOptionsDto: paginationData,
        });
    }

    async fetch(carId: string) {
        const carExist = await this.findById(carId, ["category"]);

        if (!carExist) {
            throw new NotFoundError("Car not found");
        }

        return carExist;
    }

    async update(
        carId: string,
        data: {
            brand?: string;
            carModel?: String;
            year?: number;
            price?: number;
            color?: string;
            mileage?: number;
        }
    ) {
        const carExist = await this.findById(carId);

        if (!carExist) {
            throw new NotFoundError("Car not found");
        }

        const updateData = Object.entries(data).reduce((acc, [key, value]) => {
            if (value !== "") {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, any>);

        return await this.updateById(carId, updateData);
    }

    async remove(carId: string) {
        const carExist = await this.findById(carId);

        if (!carExist) {
            throw new NotFoundError("Car not found");
        }

        await this.deleteById(carId);
    }

    private async save(data: {
        category: string;
        brand: string;
        carModel: String;
        year: number;
        price: number;
        color: string;
        mileage: number;
    }) {
        return await new Car(data).save();
    }

    private async findById(id: string, populate: string[] = []) {
        return await Car.findById(id).populate(populate);
    }

    private async deleteById(id: string) {
        return await Car.findByIdAndDelete(id);
    }

    private async updateById(id: string, data: Record<string, any>) {
        return await Car.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    private async findAndCount(
        query: FilterQuery<ICar>,
        sort?: Record<string, SortOrder> | string,
        skip?: number,
        limit?: number
    ): Promise<[ICar[], number]> {
        const [data, count] = await Promise.all([
            Car.find(query)
                .sort(sort || {})
                .skip(skip || 0)
                .limit(limit || 10)
                .exec(),
            Car.countDocuments(query),
        ]);

        return [data, count];
    }

    private processQuery(data: Record<string, any>): Record<string, any> {
        const query: Record<string, any> = {};

        if (data.brand) query.brand = data.brand;
        if (data.model) query.carModel = data.model;

        if (data.availability !== undefined) {
            query.isAvailable =
                data.availability === "true" || data.availability === true;
        }

        if (data.minPrice || data.maxPrice) {
            query.price = {};
            if (data.minPrice) query.price.$gte = parseFloat(data.minPrice);
            if (data.maxPrice) query.price.$lte = parseFloat(data.maxPrice);
        }

        if (data.minYear || data.maxYear) {
            query.year = {};
            if (data.minYear) query.year.$gte = parseInt(data.minYear);
            if (data.maxYear) query.year.$lte = parseInt(data.maxYear);
        }

        if (data.minMileage || data.maxMileage) {
            query.year = {};
            if (data.minMileage) query.year.$gte = parseInt(data.minMileage);
            if (data.maxMileage) query.year.$lte = parseInt(data.maxMileage);
        }

        return query;
    }
}
