import {
  PipelineEngine,
  GeneratorCache,
  BuildGraph,
  SearchIndexPlugin,
} from '@awesome-api-skills/generator';
import { SkillMetadata } from '@awesome-api-skills/shared-types';

export class GenerationManager {
  private engine: PipelineEngine;
  private cache: GeneratorCache;
  private graph: BuildGraph;

  constructor() {
    this.engine = new PipelineEngine();
    this.engine.registerPlugin(new SearchIndexPlugin());
    this.cache = new GeneratorCache();
    this.graph = new BuildGraph();
  }

  async generate(skills: SkillMetadata[], outputDir: string) {
    return this.engine.runPipeline(
      {
        skills,
        cache: this.cache,
        graph: this.graph,
        outputDir,
        isIncremental: false,
      },
      ['GenerateArtifacts'],
    );
  }
}
