import { Expose } from "class-transformer";

export class FileDto {
    @Expose()
    id: number;
    @Expose()
    fileName: string;
    @Expose()
    filePath:string;
}