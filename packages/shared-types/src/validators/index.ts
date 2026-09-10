import Ajv, { type ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import { ValidationError } from '../errors/index.js';
import * as fs from 'fs';

// Load schema statically or rely on passed objects
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const compiledSchemas = new Map<string, ValidateFunction>();

export function validateSkillMetadata(metadata: unknown, schemaPath: string): boolean {
  if (!fs.existsSync(schemaPath)) {
    throw new Error('Schema not found: ' + schemaPath);
  }
  const schemaStr = fs.readFileSync(schemaPath, 'utf8');
  let validate = compiledSchemas.get(schemaStr);
  if (!validate) {
    validate = ajv.compile(JSON.parse(schemaStr));
    compiledSchemas.set(schemaStr, validate);
  }
  const valid = validate(metadata);
  if (!valid) {
    throw new ValidationError('ValidationError: ' + ajv.errorsText(validate.errors));
  }
  return true;
}
