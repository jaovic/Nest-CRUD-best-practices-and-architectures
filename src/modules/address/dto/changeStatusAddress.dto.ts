import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

const MessagesHelper = {
  IS_ACTIVE_REQUIRED: 'is atvice is required',
  IS_ACTIVE_BOOLEAN: 'is atvice must be boolean',
  ADDRESS_ID_REQUIRED: 'address id is required',
  ADDRESS_ID_UUID: 'address id must be uuid',
};

export class ChangeStatusAddressDto {
  @IsNotEmpty({ message: MessagesHelper.IS_ACTIVE_REQUIRED })
  @IsBoolean({ message: MessagesHelper.IS_ACTIVE_BOOLEAN })
  is_active: boolean;
}
export class ChangeStatusAddressParam {
  @IsNotEmpty({ message: MessagesHelper.ADDRESS_ID_REQUIRED })
  @IsUUID(undefined, { message: MessagesHelper.ADDRESS_ID_UUID })
  address_id: string;
}
