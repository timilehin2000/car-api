import { Category } from "../models";
import { ConflictError } from "../utils";

export class CategoryService {
    async create(data: { name: string; description: String }) {
        const categoryExist = await this.findByName(data.name);

        if (categoryExist) {
            throw new ConflictError("Category already exist");
        }

        const category = await this.save(data);

        return category;
    }

    private async save(data: { name: string; description: String }) {
        return await new Category(data).save();
    }

    async fetchAll() {
        return await Category.find();
    }

    private async findByName(name: string) {
        return await Category.findOne({ name });
    }

    async findById(id: string) {
        return await Category.findById(id);
    }
}
