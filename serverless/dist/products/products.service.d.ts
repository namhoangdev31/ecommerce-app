import { CreateProductDto } from 'src/dto/CreateProductDto';
import { UpdateProductDto } from 'src/dto/UpdateProductDto';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    read(): Promise<{
        overview: string[];
        mainTechnology: string[];
        subTechnology: string[];
        id: number;
        imageSrcPath: string | null;
        deployUrl: string | null;
        productName: string;
        productLinks: string[] | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    create(CreateProductDto: CreateProductDto): Promise<CreateProductDto & Product>;
    update(updateProductDto: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
}
