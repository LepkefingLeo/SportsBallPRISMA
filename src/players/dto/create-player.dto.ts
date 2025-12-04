import { IsInt, IsNotEmpty, IsString, IsDateString, IsOptional } from "class-validator";

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  goalCount: number;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;
  
  @IsOptional()
  @IsInt()
  teamId?: number;
}
