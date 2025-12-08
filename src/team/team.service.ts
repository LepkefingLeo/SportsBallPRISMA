import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly db: PrismaService) { }

  async create(createTeamDto: CreateTeamDto) {
    return await this.db.team.create({
      data: createTeamDto
    });
  }

  async addPlayerToTeam(id: number, playerId: number) {
    return await this.db.team.update({
      where: { id },
      data: {
        players: {
          connect: {
            id: playerId,
          },
        },
      },
      include: {
        players: {
          omit: {
            teamId: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.db.team.findMany();
  }

  async findOne(id: number) {
    return await this.db.team.findUniqueOrThrow({
      where: {
        id
      }
    });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    return await this.db.team.update({
      where: {
        id
      },
      data: updateTeamDto
    });
  }

  async remove(id: number) {
    return await this.db.team.delete({
      where: {
        id
      },
    });
  }
}
