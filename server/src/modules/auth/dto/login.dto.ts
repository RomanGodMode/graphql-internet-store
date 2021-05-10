import { IsEmail, IsString, Length } from 'class-validator'

export class LoginDto {
  @IsEmail()
  email: string

  @IsString()
  @Length(7, 18)
  password: string
}
