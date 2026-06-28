import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { ValidationError } from '../errors/index.js';
import * as fs from 'fs';

// Load schema statically or rely on passed objects
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function validateSkillMetadata(metadata: unknown, schemaPath: string): boolean {
  if (!fs.existsSync(schemaPath)) {
    throw new Error('Schema not found: ' + schemaPath);
  }
  const schemaStr = fs.readFileSync(schemaPath, 'utf8');
  const schema = JSON.parse(schemaStr);
  const validate = ajv.compile(schema);
  const valid = validate(metadata);
  if (!valid) {
    throw new ValidationError('ValidationError: ' + ajv.errorsText(validate.errors));
  }
  return true;
}
