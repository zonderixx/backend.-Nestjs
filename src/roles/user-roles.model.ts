import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";


@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {  // generics
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true}) // последние две хуйни
    id: number;
    
    @ForeignKey(() => Role) // ключ?
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}