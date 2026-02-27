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

  async updateVerification(
    id: string,
    data: {
      isEmailVerified?: boolean;
      verificationCode?: string | undefined;
      verificationCodeSentAt?: Date | undefined;
    },
  ): Promise<void> {
    const setFields: Record<string, any> = {};
    const unsetFields: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      if (value === undefined) {
        unsetFields[key] = '';
      } else {
        setFields[key] = value;
      }
    }

    const update: Record<string, any> = {};
    if (Object.keys(setFields).length) update.$set = setFields;
    if (Object.keys(unsetFields).length) update.$unset = unsetFields;

    await this.userModel.findByIdAndUpdate(id, update).exec();
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

    if (userRole === 'user' && userState) {
      matchFilter.registrationState = userState;
    }
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

  async getMapActors(
    userRole: string,
    userState?: string,
    isPublic: boolean = false,
  ): Promise<any[]> {
    const matchFilter: any = {
      lat: { $exists: true, $nin: [null, ''] },
      lng: { $exists: true, $nin: [null, ''] },
    };

    if (userRole === 'user' && userState) {
      matchFilter.registrationState = userState;
    }
    if (userRole === 'ekadmin') matchFilter.registrationState = 'Ekiti';
    if (userRole === 'anadmin') matchFilter.registrationState = 'Anambra';
    if (userRole === 'ngadmin') matchFilter.registrationState = 'Niger';

    const projection = isPublic
      ? 'lat lng actorType'
      : 'lat lng actorType registrationState fullName';

    return this.userModel.find(matchFilter).select(projection).exec();
  }
}
