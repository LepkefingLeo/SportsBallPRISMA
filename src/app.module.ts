import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './players/players.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), PlayersModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
