const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, '..', 'skills');

const injections = {
  auth0: [
    { target: 'oauth2', type: 'implements' },
    { target: 'openid-connect', type: 'implements' },
    { target: 'nextjs', type: 'integrates_with' },
  ],
  okta: [
    { target: 'oauth2', type: 'implements' },
    { target: 'openid-connect', type: 'implements' },
  ],
  'aws-s3': [
    { target: 'terraform', type: 'provisioned_by' },
    { target: 'pulumi', type: 'provisioned_by' },
  ],
  'aws-dynamodb': [
    { target: 'terraform', type: 'provisioned_by' },
    { target: 'pulumi', type: 'provisioned_by' },
  ],
  discord: [
    { target: 'express', type: 'integrates_with' },
    { target: 'fastapi', type: 'integrates_with' },
  ],
  gemini: [
    { target: 'langchain', type: 'integrates_with' },
    { target: 'llamaindex', type: 'integrates_with' },
  ],
  mapbox: [
    { target: 'react', type: 'integrates_with' },
    { target: 'vue', type: 'integrates_with' },
  ],
  'mongodb-atlas': [{ target: 'prisma', type: 'integrates_with' }],
  plaid: [{ target: 'stripe', type: 'works_well_with' }],
  sendgrid: [{ target: 'twilio', type: 'related_to' }],
  twilio: [{ target: 'sendgrid', type: 'related_to' }],
  sentry: [
    { target: 'nextjs', type: 'monitors' },
    { target: 'express', type: 'monitors' },
    { target: 'fastapi', type: 'monitors' },
  ],
  shopify: [
    { target: 'nextjs', type: 'integrates_with' },
    { target: 'stripe', type: 'works_well_with' },
  ],
  slack: [
    { target: 'github-actions', type: 'integrates_with' },
    { target: 'sentry', type: 'integrates_with' },
  ],
};

for (const [skill, relationships] of Object.entries(injections)) {
  const metaPath = path.join(skillsDir, skill, 'metadata.json');
  if (fs.existsSync(metaPath)) {
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    meta.relationships = relationships;
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    console.log(`[FIXED] Isolated node: ${skill}`);
  }
}
