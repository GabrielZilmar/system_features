import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSystemFeatureGroupRuleSetDto } from '~/modules/system-feature-group-rule-set/dto/create-system-feature-group-rule-set.dto';
import { SystemFeatureGroupRuleSetDto } from '~/modules/system-feature-group-rule-set/dto/system-feature-group-rule-set.dto';
import { UpdateSystemFeatureGroupRuleSetDto } from '~/modules/system-feature-group-rule-set/dto/update-system-feature-group-rule-set.dto';
import { SystemFeatureGroupRuleSetMapper } from '~/modules/system-feature-group-rule-set/mappers/system-feature-group-rule-set.mapper';
import { SystemFeatureGroupRuleSetRepository } from '~/modules/system-feature-group-rule-set/repositories/system-feature-group-rule-set.repository';
import { SystemFeatureGroupRepository } from '~/modules/system-feature-group/repositories/system-feature-group.repository';

@Injectable()
export class SystemFeatureGroupRuleSetService {
  constructor(
    private readonly systemFeatureGroupRuleSetRepository: SystemFeatureGroupRuleSetRepository,
    private readonly systemFeatureGroupRepository: SystemFeatureGroupRepository,
  ) {}

  private async validateGroupExists(groupId: number): Promise<void> {
    const group = await this.systemFeatureGroupRepository.findById(groupId);

    if (!group) {
      throw new NotFoundException(
        `System feature group ${groupId} was not found`,
      );
    }
  }

  async findAll(): Promise<SystemFeatureGroupRuleSetDto[]> {
    const ruleSets = await this.systemFeatureGroupRuleSetRepository.findAll({
      order: { id: 'ASC' },
    });
    return ruleSets.map(SystemFeatureGroupRuleSetMapper.toDto);
  }

  async findOne(id: number): Promise<SystemFeatureGroupRuleSetDto> {
    const ruleSet = await this.systemFeatureGroupRuleSetRepository.findById(id);

    if (!ruleSet) {
      throw new NotFoundException(
        `System feature group rule set ${id} was not found`,
      );
    }

    return SystemFeatureGroupRuleSetMapper.toDto(ruleSet);
  }

  async create(
    createSystemFeatureGroupRuleSetDto: CreateSystemFeatureGroupRuleSetDto,
  ): Promise<SystemFeatureGroupRuleSetDto> {
    await this.validateGroupExists(createSystemFeatureGroupRuleSetDto.groupId);

    const duplicatedRuleSet =
      await this.systemFeatureGroupRuleSetRepository.findByGroupIdAndName(
        createSystemFeatureGroupRuleSetDto.groupId,
        createSystemFeatureGroupRuleSetDto.name,
      );
    if (duplicatedRuleSet) {
      throw new ConflictException(
        `System feature group rule set with name: ${createSystemFeatureGroupRuleSetDto.name} already exists for group ${createSystemFeatureGroupRuleSetDto.groupId}`,
      );
    }

    const ruleSet = SystemFeatureGroupRuleSetMapper.toEntity(
      createSystemFeatureGroupRuleSetDto,
    );

    const newRuleSet =
      await this.systemFeatureGroupRuleSetRepository.save(ruleSet);

    return SystemFeatureGroupRuleSetMapper.toDto(newRuleSet);
  }

  async update(
    id: number,
    updateSystemFeatureGroupRuleSetDto: UpdateSystemFeatureGroupRuleSetDto,
  ): Promise<SystemFeatureGroupRuleSetDto> {
    const ruleSet = await this.systemFeatureGroupRuleSetRepository.findById(id);

    if (!ruleSet) {
      throw new NotFoundException(
        `System feature group rule set ${id} was not found`,
      );
    }

    if (updateSystemFeatureGroupRuleSetDto.name !== undefined) {
      const duplicatedRuleSet =
        await this.systemFeatureGroupRuleSetRepository.findByGroupIdAndName(
          ruleSet.groupId,
          updateSystemFeatureGroupRuleSetDto.name,
        );
      if (duplicatedRuleSet && duplicatedRuleSet.id !== id) {
        throw new ConflictException(
          `System feature group rule set with name: ${updateSystemFeatureGroupRuleSetDto.name} already exists for group ${ruleSet.groupId}`,
        );
      }
    }

    SystemFeatureGroupRuleSetMapper.toEntity(
      updateSystemFeatureGroupRuleSetDto,
      ruleSet,
    );

    const updatedRuleSet =
      await this.systemFeatureGroupRuleSetRepository.save(ruleSet);
    return SystemFeatureGroupRuleSetMapper.toDto(updatedRuleSet);
  }

  async remove(id: number): Promise<void> {
    const ruleSet = await this.findOne(id);

    if (!ruleSet) {
      throw new NotFoundException(
        `System feature group rule set ${id} was not found`,
      );
    }

    await this.systemFeatureGroupRuleSetRepository.delete(id);
  }
}
