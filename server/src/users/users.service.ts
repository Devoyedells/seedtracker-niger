import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password').exec();
  }

  async updateById(id: string, data: Partial<User>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .select('-password')
      .exec();
  }

  async getStats(): Promise<Record<string, any>> {
    const totalActors = await this.userModel.countDocuments();

    // Count actors by type
    const actorTypeCounts = await this.userModel.aggregate([
      { $match: { actorType: { $exists: true, $ne: null } } },
      { $group: { _id: '$actorType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Count actors by state
    const stateCounts = await this.userModel.aggregate([
      { $match: { registrationState: { $exists: true, $ne: null } } },
      { $group: { _id: '$registrationState', count: { $sum: 1 } } },
    ]);

    // Recent registrations (last 5)
    const recentActors = await this.userModel
      .find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5)
      .exec();

    const activeStates = stateCounts.length;

    return {
      totalActors,
      activeStates,
      actorTypeCounts,
      stateCounts,
      recentActors,
    };
  }
}
