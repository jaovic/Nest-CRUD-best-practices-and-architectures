import { Inject, Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { getClassError } from 'src/utils/errors/custom.error';
import { UserRepository } from '../../repository/user.repository';
import { UserErrorsCodes } from '../../structure/erros.codes.structure';
import { IUserRepository } from '../../structure/IRepository.structure';
import { IDeleteUser, IDeleteUserService } from '../../structure/IService.structure';

@Injectable()
export class DeleteUserService implements IDeleteUserService {
  private _error = getClassError<UserErrorsCodes>;

  private readonly _userNotExist = 'error: user does not exist!';
  private readonly _prismaError = 'error: database persistence error, contact admin!';

  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(data: IDeleteUser): Promise<boolean> {
    const user = await this.userRepository.exists({ id: data.user_id });

    if (!user) throw this._error(this._userNotExist, UserErrorsCodes.NOT_FOUND, 404);

    try {
      return this.userRepository.delete(data.user_id);
    } catch (error) {
      throw this._error(this._prismaError, UserErrorsCodes.INTERNAL, 500);
    }
  }
}
