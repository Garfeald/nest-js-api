import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";


interface UserCreationAttr {
    email: string,
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {

    // объявление полей без declare приводит к конфликтам с sequelize и отсутствию некоторых полей

    @ApiProperty({ example: '1', description: 'uniq id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    declare email: string;

    @ApiProperty({ example: '123456', description: 'password' })
    @Column({ type: DataType.STRING, allowNull: false })
    declare password: string;

    @ApiProperty({ example: 'true', description: 'has banned or not' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare banned: boolean;

    @ApiProperty({ example: 'because dumb', description: 'description of ban reason' })
    @Column({ type: DataType.STRING, allowNull: true })
    declare banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    declare roles: Array<Role>

}