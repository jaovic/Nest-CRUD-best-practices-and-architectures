import { IsNotEmpty, IsUUID } from 'class-validator';

const MessagesHelper = {
  ADDRESS_ID_REQUIRED: 'address id is required',
  ADDRESS_ID_UUID: 'address id must be uuid',
};

export class DeleteAddressParam {
  @IsNotEmpty({ message: MessagesHelper.ADDRESS_ID_REQUIRED })
  @IsUUID(undefined, { message: MessagesHelper.ADDRESS_ID_UUID })
  address_id: string;
}
