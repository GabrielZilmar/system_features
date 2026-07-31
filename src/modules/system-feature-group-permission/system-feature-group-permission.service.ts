import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSystemFeatureGroupPermissionDto } from '~/modules/system-feature-group-permission/dto/create-system-feature-group-permission.dto';
import { SystemFeatureGroupPermissionDto } from '~/modules/system-feature-group-permission/dto/system-feature-group-permission.dto';
import { UpdateSystemFeatureGroupPermissionDto } from '~/modules/system-feature-group-permission/dto/update-system-feature-group-permission.dto';
import { SystemFeatureGroupPermissionMapper } from '~/modules/system-feature-group-permission/mappers/system-feature-group-permission.mapper';
import { SystemFeatureGroupPermissionRepository } from '~/modules/system-feature-group-permission/repositories/system-feature-group-permission.repository';
import { SystemFeatureGroupRepository } from '~/modules/system-feature-group/repositories/system-feature-group.repository';
import { SystemFeatureRepository } from '~/modules/system-features/repositories/system-feature.repository';

@Injectable()
export class SystemFeatureGroupPermissionService {
  constructor(
    private readonly systemFeatureGroupPermissionRepository: SystemFeatureGroupPermissionRepository,
    private readonly systemFeatureGroupRepository: SystemFeatureGroupRepository,
    private readonly systemFeatureRepository: SystemFeatureRepository,
  ) {}

  private async validateGroupAndFeatureExist(
    groupId: number,
    featureId: number,
  ): Promise<void> {
    const [group, feature] = await Promise.all([
      this.systemFeatureGroupRepository.findById(groupId),
      this.systemFeatureRepository.findById(featureId),
    ]);

    if (!group) {
      throw new NotFoundException(`System feature group ${groupId} was not found`);
    }

    if (!feature) {
      throw new NotFoundException(`System feature ${featureId} was not found`);
    }
  }

  async findAll(): Promise<SystemFeatureGroupPermissionDto[]> {
    const permissions =
      await this.systemFeatureGroupPermissionRepository.findAll({
        order: { groupId: 'ASC', featureId: 'ASC' },
      });
    return permissions.map(SystemFeatureGroupPermissionMapper.toDto);
  }

  async findOne(
    groupId: number,
    featureId: number,
  ): Promise<SystemFeatureGroupPermissionDto> {
    const permission =
      await this.systemFeatureGroupPermissionRepository.findByGroupIdAndFeatureId(
        groupId,
        featureId,
      );

    if (!permission) {
      throw new NotFoundException(
        `System feature group permission ${groupId}:${featureId} was not found`,
      );
    }

    return SystemFeatureGroupPermissionMapper.toDto(permission);
  }

  async create(
    createSystemFeatureGroupPermissionDto: CreateSystemFeatureGroupPermissionDto,
  ): Promise<SystemFeatureGroupPermissionDto> {
    await this.validateGroupAndFeatureExist(
      createSystemFeatureGroupPermissionDto.groupId,
      createSystemFeatureGroupPermissionDto.featureId,
    );

    const duplicatedPermission =
      await this.systemFeatureGroupPermissionRepository.findByGroupIdAndFeatureId(
        createSystemFeatureGroupPermissionDto.groupId,
        createSystemFeatureGroupPermissionDto.featureId,
      );
    if (duplicatedPermission) {
      throw new ConflictException(
        `System feature group permission ${createSystemFeatureGroupPermissionDto.groupId}:${createSystemFeatureGroupPermissionDto.featureId} already exists`,
      );
    }

    const permission = SystemFeatureGroupPermissionMapper.toEntity(
      createSystemFeatureGroupPermissionDto,
    );

    const newPermission =
      await this.systemFeatureGroupPermissionRepository.save(permission);

    return SystemFeatureGroupPermissionMapper.toDto(newPermission);
  }

  async update(
    groupId: number,
    featureId: number,
    updateSystemFeatureGroupPermissionDto: UpdateSystemFeatureGroupPermissionDto,
  ): Promise<SystemFeatureGroupPermissionDto> {
    await this.validateGroupAndFeatureExist(groupId, featureId);

    const permission =
      await this.systemFeatureGroupPermissionRepository.findByGroupIdAndFeatureId(
        groupId,
        featureId,
      );

    if (!permission) {
      throw new NotFoundException(
        `System feature group permission ${groupId}:${featureId} was not found`,
      );
    }

    SystemFeatureGroupPermissionMapper.toEntity(
      updateSystemFeatureGroupPermissionDto,
      permission,
    );

    const updatedPermission =
      await this.systemFeatureGroupPermissionRepository.save(permission);
    return SystemFeatureGroupPermissionMapper.toDto(updatedPermission);
  }

  async remove(groupId: number, featureId: number): Promise<void> {
    const permission = await this.findOne(groupId, featureId);

    if (!permission) {
      throw new NotFoundException(
        `System feature group permission ${groupId}:${featureId} was not found`,
      );
    }

    await this.systemFeatureGroupPermissionRepository.deleteByGroupIdAndFeatureId(
      groupId,
      featureId,
    );
  }
}
