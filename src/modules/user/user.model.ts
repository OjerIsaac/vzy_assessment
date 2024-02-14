import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  _id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;
}
