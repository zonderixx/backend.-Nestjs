import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { addRoleDto } from './dto/add-role.dto';
import { banUserDto } from './dto/ban-user.dto';
import { createUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService) {} // как именно работает конструктор
    
    async createUser(dto: createUserDto) { //dto??
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue("ADMIN")
        await user.$set('roles', [role.id]) // вешает роль на юзера через сервис Роли
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail(email: string) { // проверка, если лт вообще такой юзер через эмеил
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}}) //чтоб сразу на юзера вешались роли
        return user;
    }

    async addRole(dto: addRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.rolesService.getRoleByValue(dto.value)
        if (role && user) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException('User or role is not found', HttpStatus.NOT_FOUND)
    }

    async ban(dto: banUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user) {
            throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
        }
        user.banned = true
        user.banReason = dto.banReason
        await user.save()
        return user

    }
}
