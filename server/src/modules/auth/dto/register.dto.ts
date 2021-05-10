import { IsEmail, IsString, Length } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsString()
  @Length(7, 18)
  password: string
}
