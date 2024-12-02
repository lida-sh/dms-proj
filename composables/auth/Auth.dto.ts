import { Expose } from "class-transformer";
import type { Identity } from "./Auth.interface";

export class IdentityDto implements Identity{
    @Expose()
    username: string;
    @Expose()
    first_name?: string | undefined;
    @Expose()
    last_name?: string | undefined;
    @Expose()
    email?: string | undefined;
}