import { Expose, Transform, Type } from "class-transformer";
import "reflect-metadata";
import { FileDto,} from "../file.dto";
import type { InferType } from "yup"
export class ArchitectureBaseDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  get displayTitle(){
    if (this.type === "assistance") {
      return "معاونت " + this.title;
    } else if (this.type === "administration") {
      return "اداره کل " + this.title;
    }
  }
  set displayTitle(value){

  }
  @Expose()
  code: string;
  @Expose()
  type: string;
}

export class ArchitectureDto extends ArchitectureBaseDto {
  @Expose()
  slug: string;
  @Expose()
  @Type(()=>FileDto)
  files: FileDto[];
  @Expose()
  description: string;
  @Expose()
  created_at: string;
}
