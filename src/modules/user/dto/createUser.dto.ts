import { IsNotEmpty, IsString } from 'class-validator';

const MessagesHelper = {
  NAME_NOT_EMPTY: 'name id is required',
  DOCUMENT_NOT_EMPTY: 'Document is required',
  EMAIL_NOT_EMPTY: 'Email is required',
  NAME_STRING: 'name must be string',
  DOCUMENT_STRING: 'document must be string',
  EMAIL_STRING: 'name must be string',
};

export class CreateUserDto {
  @IsNotEmpty({ message: MessagesHelper.NAME_NOT_EMPTY })
  @IsString({ message: MessagesHelper.NAME_STRING })
  name: string;

  @IsNotEmpty({ message: MessagesHelper.DOCUMENT_NOT_EMPTY })
  @IsString({ message: MessagesHelper.DOCUMENT_STRING })
  document: string;

  @IsNotEmpty({ message: MessagesHelper.EMAIL_NOT_EMPTY })
  @IsString({ message: MessagesHelper.EMAIL_STRING })
  email: string;
}
