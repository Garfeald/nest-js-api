import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from 'class-validator';
import { ValidationExeption } from "src/exeption/validation.exeption";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (!metadata?.metatype) {
            return value;
        }

        const obj = plainToInstance(metadata.metatype, value)
        const errors = await validate(obj);

        if (errors?.length) {
            let messages = errors.map(error => {
                return `${error.property} - ${Object.values(error?.constraints ?? {}).join(', ')}`
            })
            throw new ValidationExeption(messages)
        }
        return value
    }

}