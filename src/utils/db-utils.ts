import { BadRequestException } from '@nestjs/common';

export const wrongIdHandler = (a: any) => {
  if (!a) {
    throw new BadRequestException('wrong id');
  } else {
    return a;
  }
};
