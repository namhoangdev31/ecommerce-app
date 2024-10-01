import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  imageSrcPath: string | null;

  @IsOptional()
  @IsString()
  deployUrl: string | null;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  overview: string;

  @IsString()
  @IsNotEmpty()
  mainTechnology: string;

  @IsOptional()
  @IsString()
  subTechnology: string | null;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  productLinks: string[] | null;
}
