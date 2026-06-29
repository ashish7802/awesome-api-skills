<script setup>
import { ref, computed } from 'vue';

const defaultMetadata = `{
  "skillId": "awesome-example",
  "name": "Awesome Example Skill",
  "version": "1.0.0",
  "description": "An example skill for the playground",
  "publisher": "Acme Corp",
  "license": "MIT",
  "tags": ["example", "demo"],
  "apis": [
    {
      "name": "mockAPI",
      "type": "REST"
    }
  ]
}`;

const metadata = ref(defaultMetadata);
const activeTab = ref('validator');

const parsedMetadata = computed(() => {
  try {
    return JSON.parse(metadata.value);
  } catch (e) {
    return null;
  }
});

const validationResult = computed(() => {
  if (!parsedMetadata.value) return [{ severity: 'error', message: 'Invalid JSON format' }];
  const m = parsedMetadata.value;
  const errors = [];
  if (!m.skillId) errors.push({ severity: 'error', message: 'Missing skillId' });
  if (!m.version) errors.push({ severity: 'error', message: 'Missing version' });
  if (m.version && !/^\d+\.\d+\.\d+$/.test(m.version))
    errors.push({ severity: 'warning', message: 'Version is not semantic' });
  if (!m.apis || m.apis.length === 0)
    errors.push({ severity: 'warning', message: 'No APIs defined' });
  return errors.length ? errors : [{ severity: 'success', message: 'Skill metadata is valid' }];
});

const generatedDocs = computed(() => {
  if (!parsedMetadata.value) return 'Fix JSON errors to generate docs.';
  const m = parsedMetadata.value;
  return `# ${m.name || 'Untitled Skill'}
  
**Version:** ${m.version || '0.0.0'} | **Publisher:** ${m.publisher || 'Unknown'}

${m.description || ''}

## APIs
${(m.apis || []).map((api) => `- ${api.name} (${api.type})`).join('\n')}

## Tags
${(m.tags || []).join(', ')}
`;
});

const registryEntry = computed(() => {
  if (!parsedMetadata.value) return null;
  return {
    registryId: 'playground-reg-01',
    timestamp: new Date().toISOString(),
    entry: parsedMetadata.value,
  };
});

const searchIndex = computed(() => {
  if (!parsedMetadata.value) return null;
  return {
    id: parsedMetadata.value.skillId,
    tokens: [parsedMetadata.value.name, ...(parsedMetadata.value.tags || [])]
      .join(' ')
      .toLowerCase(),
    weight: 1.0,
  };
});
</script>

<template>
  <div class="playground">
    <div class="editor-pane">
      <h3>Metadata Editor (JSON)</h3>
      <textarea v-model="metadata" spellcheck="false"></textarea>
    </div>

    <div class="preview-pane">
      <div class="tabs">
        <button :class="{ active: activeTab === 'validator' }" @click="activeTab = 'validator'">
          Validator
        </button>
        <button :class="{ active: activeTab === 'docs' }" @click="activeTab = 'docs'">
          Documentation
        </button>
        <button :class="{ active: activeTab === 'registry' }" @click="activeTab = 'registry'">
          Registry Entry
        </button>
        <button :class="{ active: activeTab === 'search' }" @click="activeTab = 'search'">
          Search Index
        </button>
      </div>

      <div class="preview-content">
        <div v-if="activeTab === 'validator'" class="validator-output">
          <div v-for="(err, idx) in validationResult" :key="idx" :class="['alert', err.severity]">
            {{ err.message }}
          </div>
        </div>

        <div v-if="activeTab === 'docs'" class="docs-output">
          <pre>{{ generatedDocs }}</pre>
        </div>

        <div v-if="activeTab === 'registry'" class="json-output">
          <pre>{{ JSON.stringify(registryEntry, null, 2) }}</pre>
        </div>

        <div v-if="activeTab === 'search'" class="json-output">
          <pre>{{ JSON.stringify(searchIndex, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}
@media (min-width: 768px) {
  .playground {
    flex-direction: row;
    height: 600px;
  }
}
.editor-pane,
.preview-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
}
.editor-pane h3 {
  padding: 10px 15px;
  margin: 0;
  font-size: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
textarea {
  flex: 1;
  width: 100%;
  padding: 15px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  resize: none;
  outline: none;
}
.tabs {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.tabs button {
  flex: 1;
  padding: 10px;
  font-size: 13px;
  background: none;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  cursor: pointer;
  color: var(--vp-c-text-2);
}
.tabs button:last-child {
  border-right: none;
}
.tabs button.active {
  color: var(--vp-c-brand-1);
  border-bottom: 2px solid var(--vp-c-brand-1);
  font-weight: bold;
}
.preview-content {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}
pre {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  white-space: pre-wrap;
}
.alert {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 13px;
}
.alert.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #f87171;
}
.alert.warning {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fbbf24;
}
.alert.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #4ade80;
}
.dark .alert.error {
  background: #450a0a;
  color: #fca5a5;
  border-color: #7f1d1d;
}
.dark .alert.warning {
  background: #451a03;
  color: #fcd34d;
  border-color: #78350f;
}
.dark .alert.success {
  background: #052e16;
  color: #86efac;
  border-color: #14532d;
}
</style>
