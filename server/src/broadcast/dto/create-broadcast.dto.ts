import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateBroadcastDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  htmlBody: string;

  @IsIn(['all', 'actor_types'])
  targetType: string;

  @IsArray()
  @IsOptional()
  targetActorTypes?: string[];

  @IsBoolean()
  @IsOptional()
  includeAdmins?: boolean;

  @IsBoolean()
  @IsOptional()
  sendEmail?: boolean;
}
