import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSystemFeatureAccessControlDto } from '~/modules/system-feature-access-control/dto/create-system-feature-access-control.dto';
import { SystemFeatureAccessControlDto } from '~/modules/system-feature-access-control/dto/system-feature-access-control.dto';
import { UpdateSystemFeatureAccessControlDto } from '~/modules/system-feature-access-control/dto/update-system-feature-access-control.dto';
import { SystemFeatureAccessControlMapper } from '~/modules/system-feature-access-control/mappers/system-feature-access-control.mapper';
import { SystemFeatureAccessControlRepository } from '~/modules/system-feature-access-control/repositories/system-feature-access-control.repository';
import { SystemFeatureGroupRepository } from '~/modules/system-feature-group/repositories/system-feature-group.repository';
import { SystemFeatureRepository } from '~/modules/system-features/repositories/system-feature.repository';

@Injectable()
export class SystemFeatureAccessControlService {
  constructor(
    private readonly systemFeatureAccessControlRepository: SystemFeatureAccessControlRepository,
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
      throw new NotFoundException(
        `System feature group ${groupId} was not found`,
      );
    }

    if (!feature) {
      throw new NotFoundException(`System feature ${featureId} was not found`);
    }
  }

  async findAll(): Promise<SystemFeatureAccessControlDto[]> {
    const accessControls =
      await this.systemFeatureAccessControlRepository.findAll({
        order: { groupId: 'ASC', featureId: 'ASC' },
      });
    return accessControls.map(SystemFeatureAccessControlMapper.toDto);
  }

  async findOne(
    groupId: number,
    featureId: number,
  ): Promise<SystemFeatureAccessControlDto> {
    const accessControl =
      await this.systemFeatureAccessControlRepository.findByGroupIdAndFeatureId(
        groupId,
        featureId,
      );

    if (!accessControl) {
      throw new NotFoundException(
        `System feature access control ${groupId}:${featureId} was not found`,
      );
    }

    return SystemFeatureAccessControlMapper.toDto(accessControl);
  }

  async create(
    createSystemFeatureAccessControlDto: CreateSystemFeatureAccessControlDto,
  ): Promise<SystemFeatureAccessControlDto> {
    await this.validateGroupAndFeatureExist(
      createSystemFeatureAccessControlDto.groupId,
      createSystemFeatureAccessControlDto.featureId,
    );

    const duplicatedAccessControl =
      await this.systemFeatureAccessControlRepository.findByGroupIdAndFeatureId(
        createSystemFeatureAccessControlDto.groupId,
        createSystemFeatureAccessControlDto.featureId,
      );
    if (duplicatedAccessControl) {
      throw new ConflictException(
        `System feature access control ${createSystemFeatureAccessControlDto.groupId}:${createSystemFeatureAccessControlDto.featureId} already exists`,
      );
    }

    const accessControl = SystemFeatureAccessControlMapper.toEntity(
      createSystemFeatureAccessControlDto,
    );

    const newAccessControl =
      await this.systemFeatureAccessControlRepository.save(accessControl);

    return SystemFeatureAccessControlMapper.toDto(newAccessControl);
  }

  async update(
    groupId: number,
    featureId: number,
    updateSystemFeatureAccessControlDto: UpdateSystemFeatureAccessControlDto,
  ): Promise<SystemFeatureAccessControlDto> {
    await this.validateGroupAndFeatureExist(groupId, featureId);

    const accessControl =
      await this.systemFeatureAccessControlRepository.findByGroupIdAndFeatureId(
        groupId,
        featureId,
      );

    if (!accessControl) {
      throw new NotFoundException(
        `System feature access control ${groupId}:${featureId} was not found`,
      );
    }

    SystemFeatureAccessControlMapper.toEntity(
      updateSystemFeatureAccessControlDto,
      accessControl,
    );

    const updatedAccessControl =
      await this.systemFeatureAccessControlRepository.save(accessControl);
    return SystemFeatureAccessControlMapper.toDto(updatedAccessControl);
  }

  async remove(groupId: number, featureId: number): Promise<void> {
    const accessControl = await this.findOne(groupId, featureId);

    if (!accessControl) {
      throw new NotFoundException(
        `System feature access control ${groupId}:${featureId} was not found`,
      );
    }

    await this.systemFeatureAccessControlRepository.deleteByGroupIdAndFeatureId(
      groupId,
      featureId,
    );
  }
}
