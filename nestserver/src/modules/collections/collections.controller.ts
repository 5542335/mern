import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsDto } from './dto/collections.dto';

@Controller('api/collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Get('/getCollections')
  getCollections(@Query('token') token: string) {
    return this.collectionsService.getCollections(token);
  }

  @Post('/create')
  createCollection(@Body() collectionsDto: CollectionsDto) {
    return this.collectionsService.createCollection(collectionsDto);
  }

  @Delete('/delete')
  deleteCollection(@Body() collectionsDto: CollectionsDto) {
    return this.collectionsService.deleteCollection(collectionsDto);
  }

  @Patch('/add')
  addCollections(@Body() collectionsDto: CollectionsDto) {
    return this.collectionsService.addCollections(collectionsDto);
  }

  @Patch('/delete-collect-card')
  deleteCollectCard(@Body() collectionsDto: CollectionsDto) {
    return this.collectionsService.deleteCollectCard(collectionsDto);
  }
}
