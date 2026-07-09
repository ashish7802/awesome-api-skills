import fs from 'fs';
import path from 'path';
import { Command } from '../interfaces.js';
import {
  ValidatorEngine,
  MetadataPresenceRule,
  SkillMarkdownPresenceRule,
  LastVerifiedMetadataRule,
  MetadataSchemaValidationRule,
  ValidationContext,
  Diagnostic,
} from '@awesome-api-skills/validator';
import { SkillMetadata } from '@awesome-api-skills/shared-types';
import pc from 'picocolors';

function findRepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(dir, 'skills'))) return dir;
    dir = path.dirname(dir);
  }
  return process.cwd();
}

const command: Command = {
  name: 'validate',
  aliases: ['v'],
  description: 'Validates skills in the current workspace against schema and structure rules',
  arguments: '[skill-id]',
  options: {},
  examples: ['awesome-api validate', 'awesome-api validate stripe'],
  async execute(context) {
    const root = findRepoRoot();
    const skillsDir = path.join(root, 'skills');
    const targetId = context.args[0];

    if (!fs.existsSync(skillsDir)) {
      return {
        valid: false,
        totalSkills: 0,
        diagnosticsCount: 1,
        message: 'No skills/ directory found in current workspace',
        results: [],
      };
    }

    const skillFolders = fs
      .readdirSync(skillsDir)
      .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory())
      .filter((f) => !targetId || f === targetId);

    const engine = new ValidatorEngine();
    engine.registerRule(new MetadataPresenceRule());
    engine.registerRule(new SkillMarkdownPresenceRule());
    engine.registerRule(new LastVerifiedMetadataRule());
    engine.registerRule(new MetadataSchemaValidationRule());

    const contexts: ValidationContext[] = skillFolders.map((id) => {
      const dirPath = path.join(skillsDir, id);
      const metaPath = path.join(dirPath, 'metadata.json');
      const skillPath = path.join(dirPath, 'SKILL.md');

      let metadata: SkillMetadata | undefined = undefined;
      if (fs.existsSync(metaPath)) {
        try {
          metadata = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        } catch {
          metadata = undefined;
        }
      }

      const hasMarkdown = fs.existsSync(skillPath);
      return {
        skillPath: dirPath,
        contentHash: hasMarkdown ? 'present' : 'empty',
        metadata,
      };
    });

    const results = await engine.validateAll(contexts);
    const isValid = results.every((r) => r.isValid);
    const totalDiagnostics = results.reduce((acc, r) => acc + r.diagnostics.length, 0);

    return {
      valid: isValid,
      totalSkills: skillFolders.length,
      diagnosticsCount: totalDiagnostics,
      results: results.map((r) => ({
        skillId: r.skillId,
        isValid: r.isValid,
        diagnostics: r.diagnostics,
      })),
    };
  },
};

export default command;

export function formatValidateOutput(data: {
  valid: boolean;
  totalSkills: number;
  diagnosticsCount: number;
  results: Array<{ skillId: string; isValid: boolean; diagnostics: Diagnostic[] }>;
}): string {
  const icon = data.valid ? pc.green('✔') : pc.red('✖');
  const lines = [
    `${icon} ${pc.bold('Skill Schema Validation')} — ${data.totalSkills} skills checked`,
  ];

  if (data.diagnosticsCount === 0) {
    lines.push(pc.green('  All skill files conform to specification & schema rules.'));
  } else {
    lines.push(pc.yellow(`  Found ${data.diagnosticsCount} diagnostic issues across skills.`));
    data.results
      .filter((r) => !r.isValid || r.diagnostics.length > 0)
      .forEach((r) => {
        lines.push(`\n  ${pc.bold(r.skillId)}:`);
        r.diagnostics.forEach((d) => {
          const color = d.severity === 'error' ? pc.red('•') : pc.yellow('•');
          lines.push(`    ${color} [${d.id}] ${d.message}`);
        });
      });
  }

  return lines.join('\n');
}
