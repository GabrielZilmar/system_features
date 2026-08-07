import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSystemFeatureDto } from '~/modules/system-features/dto/create-system-feature.dto';
import { SystemFeatureDto } from '~/modules/system-features/dto/system-feature.dto';
import { UpdateSystemFeatureDto } from '~/modules/system-features/dto/update-system-feature.dto';
import { SystemFeatureMapper } from '~/modules/system-features/mappers/system-feature.mapper';
import { SystemFeatureRepository } from '~/modules/system-features/repositories/system-feature.repository';

@Injectable()
export class SystemFeatureService {
  constructor(
    private readonly systemFeatureRepository: SystemFeatureRepository,
  ) {}

  async findAll(): Promise<SystemFeatureDto[]> {
    const features = await this.systemFeatureRepository.findAll({
      order: { id: 'ASC' },
    });
    return features.map(SystemFeatureMapper.toDto);
  }

  async findOne(id: number): Promise<SystemFeatureDto> {
    const systemFeature =
      await this.systemFeatureRepository.findDetailsById(id);

    if (!systemFeature) {
      throw new NotFoundException(`System feature ${id} was not found`);
    }

    return SystemFeatureMapper.toDto(systemFeature);
  }

  async create(
    createSystemFeatureDto: CreateSystemFeatureDto,
  ): Promise<SystemFeatureDto> {
    const duplicatedSystemFeature =
      await this.systemFeatureRepository.findByKey(createSystemFeatureDto.key);
    if (duplicatedSystemFeature) {
      throw new ConflictException(
        `System feature with key: ${createSystemFeatureDto.key} already exists`,
      );
    }

    const systemFeature = SystemFeatureMapper.toEntity(createSystemFeatureDto);

    const newSystemFeature =
      await this.systemFeatureRepository.save(systemFeature);

    return SystemFeatureMapper.toDto(newSystemFeature);
  }

  async update(
    id: number,
    updateSystemFeatureDto: UpdateSystemFeatureDto,
  ): Promise<SystemFeatureDto> {
    const systemFeature = await this.systemFeatureRepository.findById(id);

    if (!systemFeature) {
      throw new NotFoundException(`System feature ${id} was not found`);
    }

    if (updateSystemFeatureDto.key) {
      const duplicatedSystemFeature =
        await this.systemFeatureRepository.findByKey(
          updateSystemFeatureDto.key,
        );
      if (duplicatedSystemFeature && duplicatedSystemFeature.id != id) {
        throw new ConflictException(
          `System feature with key: ${updateSystemFeatureDto.key} already exists`,
        );
      }
    }

    SystemFeatureMapper.toEntity(updateSystemFeatureDto, systemFeature);

    const updateSystemFeature =
      await this.systemFeatureRepository.save(systemFeature);
    return SystemFeatureMapper.toDto(updateSystemFeature);
  }

  async remove(id: number): Promise<void> {
    const systemFeature = await this.findOne(id);

    if (!systemFeature) {
      throw new NotFoundException(`System feature ${id} was not found`);
    }

    await this.systemFeatureRepository.delete(id);
  }
}
