import {z, ZodObject, ZodRawShape} from 'zod';

export type Infer<T extends ZodRawShape> = z.infer<ZodObject<T>>

export declare type ZodArrayOfRawShape = [ZodRawShape];
