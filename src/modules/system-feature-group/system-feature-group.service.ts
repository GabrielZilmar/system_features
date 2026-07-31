import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSystemFeatureGroupDto } from '~/modules/system-feature-group/dto/create-system-feature-group.dto';
import { SystemFeatureGroupDto } from '~/modules/system-feature-group/dto/system-feature-group.dto';
import { UpdateSystemFeatureGroupDto } from '~/modules/system-feature-group/dto/update-system-feature-group.dto';
import { SystemFeatureGroupMapper } from '~/modules/system-feature-group/mappers/system-feature-group.mapper';
import { SystemFeatureGroupRepository } from '~/modules/system-feature-group/repositories/system-feature-group.repository';

@Injectable()
export class SystemFeatureGroupService {
  constructor(
    private readonly systemFeatureGroupRepository: SystemFeatureGroupRepository,
  ) {}

  async findAll(): Promise<SystemFeatureGroupDto[]> {
    const groups = await this.systemFeatureGroupRepository.findAll({
      order: { id: 'ASC' },
    });
    return groups.map(SystemFeatureGroupMapper.toDto);
  }

  async findOne(id: number): Promise<SystemFeatureGroupDto> {
    const systemFeatureGroup =
      await this.systemFeatureGroupRepository.findById(id);

    if (!systemFeatureGroup) {
      throw new NotFoundException(`System feature group ${id} was not found`);
    }

    return SystemFeatureGroupMapper.toDto(systemFeatureGroup);
  }

  async create(
    createSystemFeatureGroupDto: CreateSystemFeatureGroupDto,
  ): Promise<SystemFeatureGroupDto> {
    const duplicatedSystemFeatureGroup =
      await this.systemFeatureGroupRepository.findByName(
        createSystemFeatureGroupDto.name,
      );
    if (duplicatedSystemFeatureGroup) {
      throw new ConflictException(
        `System feature group with name: ${createSystemFeatureGroupDto.name} already exists`,
      );
    }

    const systemFeatureGroup = SystemFeatureGroupMapper.toEntity(
      createSystemFeatureGroupDto,
    );

    const newSystemFeatureGroup =
      await this.systemFeatureGroupRepository.save(systemFeatureGroup);

    return SystemFeatureGroupMapper.toDto(newSystemFeatureGroup);
  }

  async update(
    id: number,
    updateSystemFeatureGroupDto: UpdateSystemFeatureGroupDto,
  ): Promise<SystemFeatureGroupDto> {
    const systemFeatureGroup =
      await this.systemFeatureGroupRepository.findById(id);

    if (!systemFeatureGroup) {
      throw new NotFoundException(`System feature group ${id} was not found`);
    }

    if (updateSystemFeatureGroupDto.name) {
      const duplicatedSystemFeatureGroup =
        await this.systemFeatureGroupRepository.findByName(
          updateSystemFeatureGroupDto.name,
        );
      if (
        duplicatedSystemFeatureGroup &&
        duplicatedSystemFeatureGroup.id != id
      ) {
        throw new ConflictException(
          `System feature group with name: ${updateSystemFeatureGroupDto.name} already exists`,
        );
      }
    }

    SystemFeatureGroupMapper.toEntity(
      updateSystemFeatureGroupDto,
      systemFeatureGroup,
    );

    const updatedSystemFeatureGroup =
      await this.systemFeatureGroupRepository.save(systemFeatureGroup);
    return SystemFeatureGroupMapper.toDto(updatedSystemFeatureGroup);
  }

  async remove(id: number): Promise<void> {
    const systemFeatureGroup = await this.findOne(id);

    if (!systemFeatureGroup) {
      throw new NotFoundException(`System feature group ${id} was not found`);
    }

    await this.systemFeatureGroupRepository.delete(id);
  }
}
