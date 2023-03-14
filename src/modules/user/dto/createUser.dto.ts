import { IsNotEmpty, IsString } from 'class-validator';

const MessagesHelper = {
  NAME_NOT_EMPTY: 'Shop id is required',
  DOCUMENT_NOT_EMPTY: 'Document is required',
  EMAIL_NOT_EMPTY: 'Email is required',
  NAME_STRING: 'Search must be string',
  DOCUMENT_STRING: 'Search must be string',
  EMAIL_STRING: 'Search must be string',
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
