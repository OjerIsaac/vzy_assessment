import { Injectable } from '@nestjs/common';
import { ErrorHelper } from '../../utils';
import { PaginationDto, PaginationMetadataDto, PaginationResultDto } from '../../queries/dto';
import { UserRepository } from './repository';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async createDemo(dto: UserDto) {
    const demo = await this.userRepo.create({
      ...dto,
    });

    return demo;
  }

  async getDemo(id: string) {
    const demo = await this.userRepo.findOne({
      where: {
        id,
      },
    });

    if (!demo) {
      ErrorHelper.NotFoundException('Record not found');
    }

    return demo;
  }

  async getAllDemo(paginationDto: PaginationDto) {
    const [demo, itemCount] = await this.userRepo.findAndCount(paginationDto);

    const pageMetaDto = new PaginationMetadataDto({
      itemCount,
      pageOptionsDto: paginationDto,
    });

    return new PaginationResultDto(demo, pageMetaDto);
  }
}
