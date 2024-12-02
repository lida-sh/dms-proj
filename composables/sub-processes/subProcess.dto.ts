import { ArchitectureBaseDto } from "../architectures/architecture.dto";
import { FileDto,} from "../file.dto";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { ProcessBaseDto } from "~/composables/processes/process.dto";

export class SubProcessBaseDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  code: string;
  @Expose()
  architecture_id: number;
  @Expose()
  process_id: number;
}

export class SubProcessDto extends SubProcessBaseDto {
  @Expose()
  slug: string;
  @Expose()
  @Type(()=>FileDto)
  files: FileDto[];
  @Expose()
  status: number;
  @Expose()
  description: string;
  @Expose()
  created_at: string;
  @Expose()
  @Type(()=>ArchitectureBaseDto)
  architecture: ArchitectureBaseDto
  @Expose()
  @Type(()=>ProcessBaseDto)
  process: ProcessBaseDto
}
export class SubProcessDtoPagination {
  @Expose()
  @Type(()=>SubProcessDto)
  subProcesses: SubProcessDto[];
  @Expose()
  links: LinksDto;
  @Expose()
  meta: MetaDto
  
}
export class LinksDto{
  @Expose()
  first:string;
  @Expose()
  last:string;
  @Expose()
  prev:string;
  @Expose()
  next:string;
}
export class MetaDto{
  @Expose()
  current_page:number;
  @Expose()
  last_page	: number;
  @Expose()
  path: string;
  @Expose()
  per_page: number;
  @Expose()
  total:number
}