import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleErrorResponse = (
  status: number,
  message: string,
  e?: Error,
) => {
  switch (status) {
    case 400:
      throw new BadRequestException(message);
    case 401:
      throw new UnauthorizedException(message);
    case 404:
      throw new NotFoundException(message);
    default:
      throw new InternalServerErrorException(JSON.stringify(e));
  }
};
