import {Get, Delete, JsonController, Req, Res, Param, Body, Put, Post} from 'routing-controllers';
import { Service } from "typedi";
import { ProductService } from '../core/services/ProductService';
import { Product } from '../core/models/Product'

@Service()
@JsonController('/product')
export class ProductController {

  constructor(
    private productService: ProductService
  ) {}

  @Post()
  public async AddProduct(@Body() payload, @Req() request: any, @Res() response: any) {
    const data = new Product;
    data.name = payload.name
    data.productSlug = payload.producSlug
    data.sku = payload.sku
    const result = await this.productService.create(data)
    return response.status(200).send({
        status: 1,
        message: "product created successfully...",
        data: result
    })
  }

  @Get()
  public async addProduct(@Req() request: any, @Res() response: any) {
    const result = await this.productService.find()
    console.log('Add product', result)
    return response.status(200).send({
        status: 1,
        message: "product list...",
        data: result
    })
  }

  @Get('/test')
  public async test(@Req() request: any, @Res() response: any) {
    return response.status(200).send({
        status: 1,
        message: "product list...",
        data: [
          {
            "name": "antony",
            "age": "17"
          },
          {
            "name": "marshal",
            "age": "13"
          },
        ]
    })
  }

  @Put('/:id')
  public async updateProduct(@Param('id') id, @Body() payload, @Req() request: any, @Res() response: any) {
    const data = await this.productService.findOne(id)
    data.name = payload.name
    data.productSlug = payload.producSlug
    data.sku = payload.sku
    const result = await this.productService.create(data)
    return response.status(200).send({
        status: 1,
        message: "product updated successfully...",
        data: result
    })
  }

  @Delete('/:id')
  public async deleteProduct(@Param('id') id, @Req() request: any, @Res() response: any) {
    const data = await this.productService.findOne(id)
    const result = await this.productService.delete(data)
    return response.status(200).send({
        status: 1,
        message: "product deleted successfully...",
    })
  }

}
