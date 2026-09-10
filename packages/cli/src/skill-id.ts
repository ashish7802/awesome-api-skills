export function assertSkillId(id: string): void {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    throw new Error('Skill ID must contain only lowercase letters, numbers, and hyphens.');
  }
}
