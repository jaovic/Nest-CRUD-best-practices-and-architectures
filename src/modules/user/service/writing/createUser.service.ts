import { Inject, Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { getClassError } from 'src/utils/errors/custom.error';
import { UserRepository } from '../../repository/user.repository';
import { UserErrorsCodes } from '../../structure/erros.codes.structure';
import { IUserRepository } from '../../structure/IRepository.structure';
import { ICreateUser, ICreateUserService } from '../../structure/IService.structure';

@Injectable()
export class CreateUserService implements ICreateUserService {
  private _error = getClassError<UserErrorsCodes>;

  private readonly _userExist = 'error: user already exist!';
  private readonly _prismaError = 'error: database persistence error, contact admin!';

  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(data: ICreateUser): Promise<users> {
    const docuemtnOrEmailAlready = await this.userRepository.exists({
      OR: [{ document: data.document }, { email: data.email }],
    });

    if (docuemtnOrEmailAlready) throw this._error(this._userExist, UserErrorsCodes.CONFLICT, 403);

    try {
      return this.userRepository.create(data);
    } catch (error) {
      throw this._error(this._prismaError, UserErrorsCodes.INTERNAL, 500);
    }
  }
}
