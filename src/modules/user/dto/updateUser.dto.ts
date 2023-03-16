import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

const MessagesHelper = {
  NAME_STRING: 'name must be string',
  DOCUMENT_STRING: 'document must be string',
  EMAIL_STRING: 'name must be string',
  USER_ID_REQUIRED: 'user id is required',
  USER_ID_UUID: 'user id must be uuid',
};

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: MessagesHelper.NAME_STRING })
  name: string;

  @IsOptional()
  @IsString({ message: MessagesHelper.DOCUMENT_STRING })
  document: string;

  @IsOptional()
  @IsString({ message: MessagesHelper.EMAIL_STRING })
  email: string;
}
export class UpdateUserParam {
  @IsNotEmpty({ message: MessagesHelper.USER_ID_REQUIRED })
  @IsUUID(undefined, { message: MessagesHelper.USER_ID_UUID })
  user_id: string;
}
