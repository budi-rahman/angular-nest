import { BadRequestException, Body, Controller, Get, Post, Put, Delete, Req, Res, UnauthorizedException, Param } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService:JwtService
    
    ) {
  }

  @Post('register')
  async register(
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('password') password: string
    ){
      const hashedPassword = await bcrypt.hash(password, 12)

      const user = await this.appService.create({
        fullname,
        email,
        password: hashedPassword
      })
      
      delete user.password

      return user
  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
  ){
    const user = await this.appService.findOne({email});
    console.log(user)
    if(!user){
      throw new BadRequestException('invalid credentials')
    } 

    if(!await bcrypt.compare(password, user.password)){
      throw new BadRequestException('invalid credentials')
    }

    const jwt = await this.jwtService.signAsync({id: user.id})
    response.cookie('jwt', jwt, {httpOnly: true})

    console.log(jwt)
    return {
      message: 'success',
    };
  }
  @Get('user')
  async user(@Req() request: Request){
    try{
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie)
      if(!data){
        throw new UnauthorizedException()
      }

      const user = await this.appService.findOne({id: data['id']})

      const {password, ...result} = user;

      return result;
    } catch(err){
      throw new UnauthorizedException()
    }
  }

  @Put(':id')
  async update(
    @Param('id') id:string,
    @Body() body:any
    ) {
      const newUser: any = await this.appService.update(id, body)
      return newUser
    }

  @Delete(':id')
  async remove(@Param('id') id:string){
    await this.appService.delete(id)
    return "User Deleted"
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response){
    response.clearCookie('jwt');
    return{
      message: 'success logout'
    }
  }
}
