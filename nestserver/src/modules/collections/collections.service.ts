import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { CollectionsDto } from './dto/collections.dto';
import { Collect, CollectDocument } from './schema/collections.schema';
const bcrypt = require('bcrypt');
require('dotenv').config();

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collect.name) private collectModel: Model<CollectDocument>,
    private jwtService: JwtService,
  ) { }

  async getCollections(token: string) {
    const { id } = this.jwtService.decode(token) as { id: string };
    const collections = await this.collectModel.find({ userId: id }).exec();
    const result = collections.reduce((acc, item) => {
      acc[item.collectionName] = item.repoIds;

      return acc;
    }, {});

    return result;
  }

  async createCollection(collectionsDto: CollectionsDto) {
    const createdCollection = new this.collectModel(collectionsDto);

    return createdCollection.save();
  }

  async deleteCollection(collectionsDto: CollectionsDto) {
    return this.collectModel.findOneAndDelete({
      collectionName: collectionsDto.collectionName,
    });
  }

  async deleteCollectCard(collectionsDto: CollectionsDto) {
    return this.collectModel.updateOne(
      { collectionName: collectionsDto.collectionName },
      { $pull: { repoIds: collectionsDto.repoId } },
      { new: true },
    );
  }

  async addCollections(collectionsDto: CollectionsDto) {
    const collectionsNameArr = collectionsDto.collectionName.split(',');
    const allCollectsOfUser = await this.collectModel
      .find({ userId: collectionsDto.userId }, (err) => {
        if (err) {
          console.log({ Error: err });
          return;
        }
      })
      .exec();


    const result = allCollectsOfUser.map(async (item) => {
      const updateMethod = collectionsNameArr.includes(item.collectionName) ? '$addToSet' : '$pull';
      
      return await this.collectModel
        .findOneAndUpdate(
          { _id: item._id },
          { [updateMethod]: { repoIds: collectionsDto.repoId } },
          { new: true },
        )
        .exec();
    });
    
    return await Promise.all(result);
  }
}
