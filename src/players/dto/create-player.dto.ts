import { IsInt, IsNotEmpty, IsString, IsDateString } from "class-validator";

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsInt()
  goalCount: number

  @IsNotEmpty()
  @IsDateString()
  birthDate: string
  
  @IsInt()
  teamId: number
}
