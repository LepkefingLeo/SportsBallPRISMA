import { IsString, IsNotEmpty } from "class-validator";

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  country: string;
}
