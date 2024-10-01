import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/CreateProductDto';
import { UpdateProductDto } from 'src/dto/UpdateProductDto';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async read() {
    const productsData = await this.productsRepository.find({
      order: {
        updated_at: 'DESC',
      },
    });

    return productsData.map((productData) => ({
      ...productData,
      overview: productData.overview.split(','),
      mainTechnology: productData.mainTechnology.split(','),
      subTechnology: productData.subTechnology.split(','),
    }));
  }

  async create(CreateProductDto: CreateProductDto) {
    return await this.productsRepository.save(CreateProductDto);
  }

  async update(updateProductDto: UpdateProductDto) {
    return await this.productsRepository.update(
      updateProductDto.id,
      updateProductDto,
    );
  }
}
