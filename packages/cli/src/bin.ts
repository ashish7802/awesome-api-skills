#!/usr/bin/env node
import { main } from './index.js';

main(process.argv.slice(2)).catch(() => process.exit(1));
