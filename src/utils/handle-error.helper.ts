import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';

export const handleErrorResponse = (e) => {
  const {
    response: { status, statusText },
  } = e;
  switch (status) {
    case 400:
      throw new BadRequestException(statusText);
    case 401:
      throw new UnauthorizedException(statusText);
    case 403:
      throw new ForbiddenException(statusText);
    case 404:
      throw new NotFoundException(statusText);
    default:
      throw new InternalServerErrorException(statusText);
  }
};
