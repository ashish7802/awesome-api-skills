import { GeneratorPlugin, BuildContext, BuildDiagnostic } from '../interfaces.js';
import * as fs from 'fs';
import * as path from 'path';

export class SearchIndexPlugin implements GeneratorPlugin {
  id = 'plugin-search-index';
  name = 'Search Index Generator';
  targetStages = ['GenerateArtifacts'];

  async generate(context: BuildContext): Promise<BuildDiagnostic> {
    const start = performance.now();
    const index = context.skills.map((s) => ({
      id: s.id,
      name: s.name,
      tags: s.tags,
      categories: s.categories,
    }));
    const hash = 'hash-' + JSON.stringify(index).length;

    if (context.isIncremental && context.cache.isUnchanged('search-index', hash)) {
      return {
        stage: this.id,
        durationMs: performance.now() - start,
        outputsCreated: 0,
        outputsSkipped: 1,
        warnings: [],
        errors: [],
      };
    }

    fs.mkdirSync(context.outputDir, { recursive: true });
    fs.writeFileSync(
      path.join(context.outputDir, 'search-index.json'),
      JSON.stringify(index, null, 2),
    );
    context.cache.setHash('search-index', hash);

    return {
      stage: this.id,
      durationMs: performance.now() - start,
      outputsCreated: 1,
      outputsSkipped: 0,
      warnings: [],
      errors: [],
    };
  }
}

export class RegistryPlugin implements GeneratorPlugin {
  id = 'plugin-registry';
  name = 'Registry Generator';
  targetStages = ['GenerateArtifacts'];

  async generate(context: BuildContext): Promise<BuildDiagnostic> {
    const start = performance.now();
    const hash = 'hash-' + context.skills.length;
    if (context.isIncremental && context.cache.isUnchanged('registry', hash)) {
      return {
        stage: this.id,
        durationMs: performance.now() - start,
        outputsCreated: 0,
        outputsSkipped: 1,
        warnings: [],
        errors: [],
      };
    }

    fs.mkdirSync(context.outputDir, { recursive: true });
    fs.writeFileSync(
      path.join(context.outputDir, 'registry.json'),
      JSON.stringify({ skills: context.skills }, null, 2),
    );
    context.cache.setHash('registry', hash);

    return {
      stage: this.id,
      durationMs: performance.now() - start,
      outputsCreated: 1,
      outputsSkipped: 0,
      warnings: [],
      errors: [],
    };
  }
}

export class ManifestPlugin implements GeneratorPlugin {
  id = 'plugin-manifest';
  name = 'Manifest Generator';
  targetStages = ['GenerateArtifacts'];

  async generate(context: BuildContext): Promise<BuildDiagnostic> {
    const start = performance.now();
    const hash = 'hash-' + context.skills.length;
    if (context.isIncremental && context.cache.isUnchanged('manifest', hash)) {
      return {
        stage: this.id,
        durationMs: performance.now() - start,
        outputsCreated: 0,
        outputsSkipped: 1,
        warnings: [],
        errors: [],
      };
    }

    fs.mkdirSync(context.outputDir, { recursive: true });
    const manifest = {
      registryId: 'official',
      registryVersion: '1.0.0',
      schemaVersion: '1',
      totalSkills: context.skills.length,
    };
    fs.writeFileSync(
      path.join(context.outputDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2),
    );
    context.cache.setHash('manifest', hash);

    return {
      stage: this.id,
      durationMs: performance.now() - start,
      outputsCreated: 1,
      outputsSkipped: 0,
      warnings: [],
      errors: [],
    };
  }
}

export class IntegrityReportPlugin implements GeneratorPlugin {
  id = 'plugin-integrity';
  name = 'Integrity Report Generator';
  targetStages = ['GenerateArtifacts'];

  async generate(context: BuildContext): Promise<BuildDiagnostic> {
    const start = performance.now();
    const hash = 'hash-' + context.skills.length;
    if (context.isIncremental && context.cache.isUnchanged('integrity', hash)) {
      return {
        stage: this.id,
        durationMs: performance.now() - start,
        outputsCreated: 0,
        outputsSkipped: 1,
        warnings: [],
        errors: [],
      };
    }

    fs.mkdirSync(context.outputDir, { recursive: true });
    const integrity = context.skills.map((s) => ({ id: s.id, checksum: 'sha256-mock-' + s.id }));
    fs.writeFileSync(
      path.join(context.outputDir, 'integrity-report.json'),
      JSON.stringify(integrity, null, 2),
    );
    context.cache.setHash('integrity', hash);

    return {
      stage: this.id,
      durationMs: performance.now() - start,
      outputsCreated: 1,
      outputsSkipped: 0,
      warnings: [],
      errors: [],
    };
  }
}

export class DocsPlugin implements GeneratorPlugin {
  id = 'plugin-docs';
  name = 'Docs Generator';
  targetStages = ['GenerateArtifacts'];

  async generate(context: BuildContext): Promise<BuildDiagnostic> {
    const start = performance.now();
    const hash = 'hash-' + context.skills.length;
    if (context.isIncremental && context.cache.isUnchanged('docs', hash)) {
      return {
        stage: this.id,
        durationMs: performance.now() - start,
        outputsCreated: 0,
        outputsSkipped: context.skills.length,
        warnings: [],
        errors: [],
      };
    }

    const docsDir = path.join(context.outputDir, 'docs');
    fs.mkdirSync(docsDir, { recursive: true });

    let outputs = 0;
    for (const skill of context.skills) {
      fs.writeFileSync(
        path.join(docsDir, skill.id + '.md'),
        '# ' + skill.name + '\n\n' + skill.description,
      );
      outputs++;
    }
    context.cache.setHash('docs', hash);

    return {
      stage: this.id,
      durationMs: performance.now() - start,
      outputsCreated: outputs,
      outputsSkipped: 0,
      warnings: [],
      errors: [],
    };
  }
}

export class SitemapPlugin implements GeneratorPlugin {
  id = 'plugin-sitemap';
  name = 'Sitemap Generator';
  targetStages = ['GenerateArtifacts'];

  async generate(context: BuildContext): Promise<BuildDiagnostic> {
    const start = performance.now();
    const hash = 'hash-' + context.skills.length;
    if (context.isIncremental && context.cache.isUnchanged('sitemap', hash)) {
      return {
        stage: this.id,
        durationMs: performance.now() - start,
        outputsCreated: 0,
        outputsSkipped: 1,
        warnings: [],
        errors: [],
      };
    }

    fs.mkdirSync(context.outputDir, { recursive: true });
    const repoBase =
      'https://github.com/ashish7802/awesome-api-skills/tree/master/skills';
    const urls = context.skills
      .map((s) => '<url><loc>' + repoBase + '/' + s.id + '</loc></url>')
      .join('');
    fs.writeFileSync(
      path.join(context.outputDir, 'sitemap.xml'),
      '<?xml version="1.0" encoding="UTF-8"?><urlset>' + urls + '</urlset>',
    );
    context.cache.setHash('sitemap', hash);

    return {
      stage: this.id,
      durationMs: performance.now() - start,
      outputsCreated: 1,
      outputsSkipped: 0,
      warnings: [],
      errors: [],
    };
  }
}
