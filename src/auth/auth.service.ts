import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    
    constructor(private userService: UsersService,
        private jwtService: JwtService) {}

    async login(userDto: createUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: createUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('User with this email already  exists', HttpStatus.BAD_REQUEST)
        } else {
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword}) // хешированый пароль?
        return this.generateToken(user)
        }
    }

    private async generateToken(user: User) { // зачем вешать тип Юзер из схемы
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: createUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)// первый пароль от клиента, второе пароль из бд
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Invalid email or password'})
    }
}
