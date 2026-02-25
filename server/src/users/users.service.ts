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

  async getStats(
    userRole: string,
    userState?: string,
  ): Promise<Record<string, any>> {
    const matchFilter: any = {};

    if (userRole === 'ekadmin') matchFilter.registrationState = 'Ekiti';
    if (userRole === 'anadmin') matchFilter.registrationState = 'Anambra';
    if (userRole === 'ngadmin') matchFilter.registrationState = 'Niger';

    const totalActors = await this.userModel.countDocuments(matchFilter);

    // Count actors by type
    const actorTypeCounts = await this.userModel.aggregate([
      {
        $match: {
          actorType: { $exists: true, $ne: null },
          ...matchFilter,
        },
      },
      { $group: { _id: '$actorType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Count actors by state
    const stateCounts = await this.userModel.aggregate([
      {
        $match: {
          registrationState: { $exists: true, $ne: null },
          ...matchFilter,
        },
      },
      { $group: { _id: '$registrationState', count: { $sum: 1 } } },
    ]);

    // Recent registrations (last 5)
    const recentActors = await this.userModel
      .find(matchFilter)
      .select('-password -__v -updatedAt')
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

  async getActors(
    userRole: string,
    userState?: string,
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Promise<{
    data: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const matchFilter: any = {};

    if (userRole === 'ekadmin') matchFilter.registrationState = 'Ekiti';
    if (userRole === 'anadmin') matchFilter.registrationState = 'Anambra';
    if (userRole === 'ngadmin') matchFilter.registrationState = 'Niger';

    if (search) {
      matchFilter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { registrationState: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.userModel
        .find(matchFilter)
        .select('-password -__v -updatedAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments(matchFilter).exec(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }
}
