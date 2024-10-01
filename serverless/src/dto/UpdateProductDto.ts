import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

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
