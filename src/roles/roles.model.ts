import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from './user-roles.model'


interface RoleCreationAttr {
    value: string,
    description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttr> {

    @ApiProperty({ example: '1', description: 'uniq id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ApiProperty({ example: 'ADMIN', description: 'Role value' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;

    @ApiProperty({ example: 'Administrator', description: 'Description of role' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: Array<User>
}