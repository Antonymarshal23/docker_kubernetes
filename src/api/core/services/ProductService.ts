import { productRepository } from "../repositories/ProductRepository";
import { Service } from "typedi";

@Service()
export class ProductService {
    public async find() {
        return productRepository.find()
    }

    public async findOne(id: number) {
        return productRepository.findOne({
            where: {
                id: id
            }
        })
    }

    public async create(data: any) {
        return productRepository.save(data)
    }

    public async update(data: any) {
        return productRepository.save(data)
    }

    public async delete(data: any) {
        return productRepository.delete(data)
    }
      
}