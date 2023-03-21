import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

const MessagesHelper = {
  NAME_STRING: 'street must be string',
  NUMBER_STRING: 'number must be string',
  NEIGHBORHOOD_STRING: 'neighborhood must be string',
  COMPLEMENTARY_ADDRESS_STRING: 'complementary_address must be string',
  CITY_STRING: 'city must be string',
  STATE_STRING: 'state must be string',
  ZIP_CODE_STRING: 'zip_code must be string',
  ADDRESS_ID_REQUIRED: 'address id is required',
  ADDRESS_ID_UUID: 'address id must be uuid',
};

export class UpdateAddressDto {
  @IsOptional()
  @IsString({ message: MessagesHelper.NAME_STRING })
  street: string;

  @IsOptional()
  @IsString({ message: MessagesHelper.NUMBER_STRING })
  number: string;

  @IsOptional()
  @IsString({ message: MessagesHelper.NEIGHBORHOOD_STRING })
  neighborhood: string;

  @IsOptional()
  @IsString({ message: MessagesHelper.COMPLEMENTARY_ADDRESS_STRING })
  complementary_address: string;

  @IsOptional()
  @IsString({ message: MessagesHelper.CITY_STRING })
  city: string;

  @IsOptional()
  @IsString({ message: MessagesHelper.STATE_STRING })
  state: string;

  @IsOptional()
  @IsString({ message: MessagesHelper.ZIP_CODE_STRING })
  zip_code: string;
}
export class UpdateAddressParam {
  @IsNotEmpty({ message: MessagesHelper.ADDRESS_ID_REQUIRED })
  @IsUUID(undefined, { message: MessagesHelper.ADDRESS_ID_UUID })
  address_id: string;
}
