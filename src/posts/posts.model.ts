import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { NumberDataType } from "sequelize/types";
import { User } from "src/users/users.model";

interface PostCreationAttrs { // зачем именно здесь интерфейс?
    title: string;
    content: string;
    userId: number;
    image: string
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {  // generics
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true}) // последние две хуйни
    id: number;
    
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING})
    image: string

    @ForeignKey(() => User) // внешний ключ
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => User)
    author: User
}