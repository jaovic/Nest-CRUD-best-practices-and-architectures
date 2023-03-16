import { IsNotEmpty, IsUUID } from 'class-validator';

const MessagesHelper = {
  USER_ID_REQUIRED: 'user id is required',
  USER_ID_UUID: 'user id must be uuid',
};

export class findUserParam {
  @IsNotEmpty({ message: MessagesHelper.USER_ID_REQUIRED })
  @IsUUID(undefined, { message: MessagesHelper.USER_ID_UUID })
  user_id: string;
}
