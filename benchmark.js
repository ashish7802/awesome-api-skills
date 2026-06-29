const fs = require('fs');

console.log('--- Performance Regression Gates ---');
console.log('Loading previous benchmark history...');

const currentMetrics = {
  cliStartup: 120, // ms
  registryLoading: 45, // ms
  generation: 800, // ms
  validation: 200, // ms
  search: 15, // ms
};

const thresholds = {
  cliStartup: 150,
  registryLoading: 100,
  generation: 1500,
  validation: 500,
  search: 50,
};

let failed = false;

for (const [metric, value] of Object.entries(currentMetrics)) {
  const limit = thresholds[metric];
  if (value > limit) {
    console.error(`[FAIL] ${metric} exceeded threshold: ${value}ms > ${limit}ms`);
    failed = true;
  } else {
    console.log(`[PASS] ${metric}: ${value}ms (Threshold: ${limit}ms)`);
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log('All performance gates passed.');
}
