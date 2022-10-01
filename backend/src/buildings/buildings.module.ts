/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';
import { Building, BuildingSchema } from './schemas/building';

@Module({
  imports: [MongooseModule.forFeature([{name:"buildings", schema:BuildingSchema}])],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
