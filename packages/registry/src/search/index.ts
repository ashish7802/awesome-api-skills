import { SkillMetadata } from '@awesome-api-skills/shared-types';
import { RegistryCache } from '../cache/index.js';

export interface SearchQuery {
  term?: string;
  category?: string;
  tags?: string[];
  provider?: string;
  language?: string;
}

export class SearchIndex {
  constructor(private cache: RegistryCache) {}

  search(query: SearchQuery): SkillMetadata[] {
    const entries = this.cache.getAll().map((e) => e.skill);

    return entries
      .filter((skill) => {
        if (
          query.term &&
          !skill.name.toLowerCase().includes(query.term.toLowerCase()) &&
          !skill.description.toLowerCase().includes(query.term.toLowerCase())
        )
          return false;
        if (query.category && !skill.categories.some((c) => c === query.category)) return false;
        if (query.tags && !query.tags.every((t) => skill.tags.includes(t))) return false;
        if (query.language && !skill.sdkLanguages.includes(query.language)) return false;
        return true;
      })
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }
}
