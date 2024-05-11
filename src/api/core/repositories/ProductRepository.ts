import { Product } from "../models/Product";
import { AppDataSource } from "../../../data-source";

export const productRepository =  AppDataSource.getRepository(Product)