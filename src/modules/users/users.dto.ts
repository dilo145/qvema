import { IsString, IsNotEmpty } from 'class-validator';

export class UserNameDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
