import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

const MessagesHelper = {
  USER_ID_NOT_EMPTY: 'user id is required',
  USER_ID_STRING: 'user must be string',

  STREET_NOT_EMPTY: 'street id is required',
  STREET_STRING: 'street must be string',

  NUMBER_NOT_EMPTY: 'number id is required',
  NUMBER_STRING: 'number must be string',

  NEIGHBORHOOD_NOT_EMPTY: 'neighborhood id is required',
  NEIGHBORHOOD_STRING: 'neighborhood must be string',

  COMPLEMENTARY_ADDRESS_NOT_EMPTY: 'complementary address id is required',
  COMPLEMENTARY_ADDRESS_STRING: 'complementary address must be string',

  CITY_NOT_EMPTY: 'city id is required',
  CITY_STRING: 'city must be string',

  STATE_NOT_EMPTY: 'state id is required',
  STATE_STRING: 'state must be string',

  ZIP_CODE_NOT_EMPTY: 'zip code id is required',
  ZIP_CODE_STRING: 'zip code must be string',

  IS_ACTIVE_NOT_EMPTY: 'is active id is required',
  IS_ACTIVE_BOOLEAN: 'is active must be boolean',
};

export class CreateAddressDto {
  @IsNotEmpty({ message: MessagesHelper.STREET_NOT_EMPTY })
  @IsString({ message: MessagesHelper.STREET_STRING })
  street: string;

  @IsNotEmpty({ message: MessagesHelper.NUMBER_NOT_EMPTY })
  @IsString({ message: MessagesHelper.NUMBER_STRING })
  number: string;

  @IsNotEmpty({ message: MessagesHelper.NEIGHBORHOOD_NOT_EMPTY })
  @IsString({ message: MessagesHelper.NEIGHBORHOOD_STRING })
  neighborhood: string;

  @IsNotEmpty({ message: MessagesHelper.COMPLEMENTARY_ADDRESS_NOT_EMPTY })
  @IsString({ message: MessagesHelper.COMPLEMENTARY_ADDRESS_STRING })
  complementary_address: string;

  @IsNotEmpty({ message: MessagesHelper.CITY_NOT_EMPTY })
  @IsString({ message: MessagesHelper.CITY_STRING })
  city: string;

  @IsNotEmpty({ message: MessagesHelper.STATE_NOT_EMPTY })
  @IsString({ message: MessagesHelper.STATE_STRING })
  state: string;

  @IsNotEmpty({ message: MessagesHelper.ZIP_CODE_NOT_EMPTY })
  @IsString({ message: MessagesHelper.ZIP_CODE_STRING })
  zip_code: string;

  @IsNotEmpty({ message: MessagesHelper.IS_ACTIVE_NOT_EMPTY })
  @IsBoolean({ message: MessagesHelper.IS_ACTIVE_BOOLEAN })
  is_active: boolean;
}

export class CreateAddressParam {
  @IsNotEmpty({ message: MessagesHelper.USER_ID_NOT_EMPTY })
  @IsString({ message: MessagesHelper.USER_ID_STRING })
  user_id: string;
}
