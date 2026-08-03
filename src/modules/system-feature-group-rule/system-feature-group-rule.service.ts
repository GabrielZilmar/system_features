import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSystemFeatureGroupRuleDto } from '~/modules/system-feature-group-rule/dto/create-system-feature-group-rule.dto';
import { FindAllSystemFeatureGroupRuleQueryDto } from '~/modules/system-feature-group-rule/dto/find-all-system-feature-group-rule.query.dto';
import { SystemFeatureGroupRuleDto } from '~/modules/system-feature-group-rule/dto/system-feature-group-rule.dto';
import { UpdateSystemFeatureGroupRuleDto } from '~/modules/system-feature-group-rule/dto/update-system-feature-group-rule.dto';
import { SystemFeatureGroupRuleMapper } from '~/modules/system-feature-group-rule/mappers/system-feature-group-rule.mapper';
import { SystemFeatureGroupRuleRepository } from '~/modules/system-feature-group-rule/repositories/system-feature-group-rule.repository';
import { SystemFeatureGroupRuleSetRepository } from '~/modules/system-feature-group-rule-set/repositories/system-feature-group-rule-set.repository';

@Injectable()
export class SystemFeatureGroupRuleService {
  constructor(
    private readonly systemFeatureGroupRuleRepository: SystemFeatureGroupRuleRepository,
    private readonly systemFeatureGroupRuleSetRepository: SystemFeatureGroupRuleSetRepository,
  ) {}

  private async validateRuleSetExists(ruleSetId: number): Promise<void> {
    const ruleSet =
      await this.systemFeatureGroupRuleSetRepository.findById(ruleSetId);

    if (!ruleSet) {
      throw new NotFoundException(
        `System feature group rule set ${ruleSetId} was not found`,
      );
    }
  }

  async findAll(
    query?: FindAllSystemFeatureGroupRuleQueryDto,
  ): Promise<SystemFeatureGroupRuleDto[]> {
    const rules =
      await this.systemFeatureGroupRuleRepository.findAllByRuleSetIdAndGroupId({
        ruleSetId: query?.ruleSetId,
        groupId: query?.groupId,
      });
    return rules.map(SystemFeatureGroupRuleMapper.toDto);
  }

  async findOne(id: number): Promise<SystemFeatureGroupRuleDto> {
    const rule = await this.systemFeatureGroupRuleRepository.findById(id);

    if (!rule) {
      throw new NotFoundException(
        `System feature group rule ${id} was not found`,
      );
    }

    return SystemFeatureGroupRuleMapper.toDto(rule);
  }

  async create(
    createSystemFeatureGroupRuleDto: CreateSystemFeatureGroupRuleDto,
  ): Promise<SystemFeatureGroupRuleDto> {
    await this.validateRuleSetExists(createSystemFeatureGroupRuleDto.ruleSetId);

    const rule = SystemFeatureGroupRuleMapper.toEntity(
      createSystemFeatureGroupRuleDto,
    );

    const newRule = await this.systemFeatureGroupRuleRepository.save(rule);

    return SystemFeatureGroupRuleMapper.toDto(newRule);
  }

  async update(
    id: number,
    updateSystemFeatureGroupRuleDto: UpdateSystemFeatureGroupRuleDto,
  ): Promise<SystemFeatureGroupRuleDto> {
    const rule = await this.systemFeatureGroupRuleRepository.findById(id);

    if (!rule) {
      throw new NotFoundException(
        `System feature group rule ${id} was not found`,
      );
    }

    SystemFeatureGroupRuleMapper.toEntity(
      updateSystemFeatureGroupRuleDto,
      rule,
    );

    const updatedRule = await this.systemFeatureGroupRuleRepository.save(rule);
    return SystemFeatureGroupRuleMapper.toDto(updatedRule);
  }

  async remove(id: number): Promise<void> {
    const rule = await this.findOne(id);

    if (!rule) {
      throw new NotFoundException(
        `System feature group rule ${id} was not found`,
      );
    }

    await this.systemFeatureGroupRuleRepository.delete(id);
  }
}
