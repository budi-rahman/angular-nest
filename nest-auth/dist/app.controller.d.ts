import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class AppController {
    private readonly appService;
    private jwtService;
    constructor(appService: AppService, jwtService: JwtService);
    register(fullname: string, email: string, password: string): Promise<import("./user.entity").User>;
    login(email: string, password: string, response: Response): Promise<{
        message: string;
    }>;
    user(request: Request): Promise<{
        id: number;
        fullname: string;
        email: string;
    }>;
    update(id: string, body: any): Promise<any>;
    remove(id: string): Promise<string>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
