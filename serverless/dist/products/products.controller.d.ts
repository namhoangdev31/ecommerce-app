import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/CreateProductDto';
import { UpdateProductDto } from 'src/dto/UpdateProductDto';
export declare class ProductsController {
    private readonly ProductsService;
    constructor(ProductsService: ProductsService);
    readAll(): Promise<{
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
    create(CreateProductDto: CreateProductDto): Promise<CreateProductDto & import("../entity/product.entity").Product>;
    update(updateProductDto: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
}
