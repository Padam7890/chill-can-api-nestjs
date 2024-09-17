import { HttpStatus } from "@nestjs/common";

export const createResponse = (
    statusCode:HttpStatus,
    message:string,
    data: any = null
)=> {
    return {
        statusCode,
        message,
        ...(data && { data})
    };
  
}