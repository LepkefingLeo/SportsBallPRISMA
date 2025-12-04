import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespaceBrowser';

@Injectable()
export class PlayersService {
  constructor(private readonly db: PrismaService) { }

  async create(createPlayerDto: CreatePlayerDto) {
    return await this.db.player.create({
      data: {
        ...createPlayerDto,
        birthDate: new Date(createPlayerDto.birthDate)
      }
    });
  }

  async findAll() {
    return await this.db.player.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.db.player.findUniqueOrThrow({
        where: { id }
      });
    } catch (error: any) {
      if (error.code === 'P2025' || error.code === 'P2016') {
        throw new NotFoundException(`Player with ID ${id} not found`);
      }
      throw error;
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    const data = { ...updatePlayerDto };
    return await this.db.player.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    return await this.db.player.delete({
      where: {
        id
      }
    });
  }
}
