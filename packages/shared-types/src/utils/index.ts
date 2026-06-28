import { SkillStatus } from '../enums/index.js';
export const isActiveSkill = (status?: SkillStatus): boolean => status === SkillStatus.Active;
