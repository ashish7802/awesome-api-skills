const { buildSkillV4 } = require('./build-skill-v4');

buildSkillV4({
  name: 'deno-deploy',
  displayName: 'Deno Deploy',
  description: 'Distributed system that runs JavaScript, TypeScript, and WebAssembly at the edge.',
  categories: ['Cloud', 'Developer Tools'],
  learningLevel: 'intermediate',
  useCases: ['Edge Computing', 'Serverless API'],
  deploymentTargets: ['deno-deploy'],
  ecosystem: 'javascript',
  maintainers: ['denoland'],
  stability: 'production',
  relationships: [
    { target: 'cloudflare-workers', type: 'alternative_to' },
    { target: 'hono', type: 'works_well_with' },
  ],
  quickStart:
    'Deno Deploy natively executes TypeScript without any build step or compilation required. It isolates tenants using V8 isolates, providing incredible speed and security.\n\n```bash\ndeloyctl deploy --project=my-project main.ts\n```',
  productionPatterns:
    '### Deno KV\nUse Deno KV for global, strongly consistent database storage built directly into the runtime. It requires zero configuration and provides ACID transactions.',
  architecture:
    "### Web Standard Modules\nDeno completely ignores Node.js `node_modules` and `package.json`. You import modules directly via URLs (e.g., `import { serve } from 'https://deno.land/std/http/server.ts'`).",
  errorRecovery:
    'Deno strictly adheres to web standards. If an unhandled promise rejection occurs, the V8 isolate crashes. Always `await` and `catch` asynchronous network calls.',
  securityNotes:
    'Deno is secure by default. Even when running locally, it cannot access the disk, network, or environment variables unless you explicitly pass flags (e.g., `--allow-net`).',
  links: { 'Deno Deploy Docs': 'https://deno.com/deploy/docs' },
  examples: {
    typescript: {
      server: `import { serve } from "https://deno.land/std@0.140.0/http/server.ts";\n\nserve((req: Request) => {\n  return new Response("Hello from Deno Edge!");\n});`,
    },
  },
});

buildSkillV4({
  name: 'ollama',
  displayName: 'Ollama',
  description: 'Get up and running with large language models locally.',
  categories: ['AI', 'Developer Tools'],
  learningLevel: 'beginner',
  useCases: ['Local AI Inference'],
  deploymentTargets: ['docker', 'linux'],
  ecosystem: 'ai',
  maintainers: ['ollama'],
  stability: 'production',
  relationships: [
    { target: 'vllm', type: 'alternative_to' },
    { target: 'langchain', type: 'integrates_with' },
    { target: 'openai', type: 'alternative_to' },
  ],
  quickStart:
    'Ollama bundles model weights, configuration, and data into a single package. It exposes a local REST API that perfectly mimics the OpenAI API, making local AI drop-in compatible with existing tooling.\n\n```bash\nollama run llama3\n```',
  productionPatterns:
    '### Model Customization (Modelfiles)\nDo not rely on system prompts passed via the API for complex, repetitive behaviors. Create a `Modelfile` to bake the system prompt, parameters (temperature), and custom logic into a new, specialized local model.',
  architecture:
    '### CPU vs GPU\nOllama automatically detects Apple Silicon, NVIDIA, and AMD GPUs. If VRAM is insufficient, it dynamically offloads layers to system RAM and the CPU, allowing massive models to run (albeit slower) on consumer hardware.',
  errorRecovery:
    'If the Ollama daemon consumes too much VRAM and refuses to unload a model, simply restart the Ollama service. Models are cached in memory for 5 minutes by default after the last request.',
  securityNotes:
    'By default, the Ollama API binds to `127.0.0.1`. If you expose it to a local network (`OLLAMA_HOST=0.0.0.0`), beware that there is absolutely zero built-in authentication.',
  links: { 'Ollama Docs': 'https://github.com/ollama/ollama' },
  examples: {
    yaml: {
      Modelfile: `FROM llama3\nPARAMETER temperature 0.5\nSYSTEM """\nYou are a senior backend engineer. You only reply with valid TypeScript code.\n"""`,
    },
    bash: {
      run: `ollama create my-expert -f ./Modelfile\nollama run my-expert`,
    },
  },
});

buildSkillV4({
  name: 'vllm',
  displayName: 'vLLM',
  description: 'High-throughput and memory-efficient LLM inference engine.',
  categories: ['AI', 'Infrastructure'],
  learningLevel: 'advanced',
  useCases: ['Production AI Inference'],
  deploymentTargets: ['docker', 'kubernetes'],
  ecosystem: 'ai',
  maintainers: ['vllm-project'],
  stability: 'production',
  relationships: [
    { target: 'ollama', type: 'alternative_to' },
    { target: 'langchain', type: 'integrates_with' },
  ],
  quickStart:
    'vLLM is designed for high-concurrency production deployments. It uses PagedAttention to efficiently manage attention key-value memory, increasing throughput by up to 24x compared to HuggingFace Transformers.\n\n```bash\npip install vllm\npython -m vllm.entrypoints.openai.api_server --model meta-llama/Llama-2-7b-chat-hf\n```',
  productionPatterns:
    '### PagedAttention\nLLMs generate output token-by-token, causing massive fragmentation in GPU memory. vLLM solves this by treating VRAM like an OS virtual memory page table, drastically increasing the batch size of concurrent user requests.',
  architecture:
    '### OpenAI API Compatibility\nvLLM runs an API server that perfectly matches the OpenAI specification. You can instantly replace your expensive OpenAI endpoint with a self-hosted vLLM endpoint without changing any client code.',
  errorRecovery:
    'If vLLM fails to start with Out of Memory errors, reduce the `gpu_memory_utilization` flag (default is 0.90) to reserve more VRAM for the PyTorch runtime overhead.',
  securityNotes:
    'vLLM does not include production authentication mechanisms. You must place it behind a reverse proxy (like NGINX or Traefik) and handle API Key validation at the proxy layer.',
  links: { 'vLLM Docs': 'https://vllm.readthedocs.io/' },
  examples: {
    python: {
      inference: `from vllm import LLM, SamplingParams\n\nprompts = ["Hello, my name is", "The capital of France is"]\nsampling_params = SamplingParams(temperature=0.8, top_p=0.95)\n\nllm = LLM(model="facebook/opt-125m")\noutputs = llm.generate(prompts, sampling_params)\n\nfor output in outputs:\n    print(output.outputs[0].text)`,
    },
  },
});

buildSkillV4({
  name: 'langchain',
  displayName: 'LangChain',
  description: 'Framework for developing applications powered by language models.',
  categories: ['AI', 'Developer Tools'],
  learningLevel: 'intermediate',
  useCases: ['RAG', 'Agents', 'Chains'],
  deploymentTargets: ['any'],
  ecosystem: 'ai',
  maintainers: ['langchain-ai'],
  stability: 'production',
  relationships: [
    { target: 'llamaindex', type: 'alternative_to' },
    { target: 'openai', type: 'integrates_with' },
    { target: 'pinecone', type: 'integrates_with' },
  ],
  quickStart:
    'LangChain provides standard interfaces for LLMs, Vector Stores, and Memory, allowing you to chain them together to build complex Agents and Retrieval-Augmented Generation (RAG) pipelines.\n\n```bash\npip install langchain langchain-openai\n```',
  productionPatterns:
    '### LCEL (LangChain Expression Language)\nAvoid using massive legacy chain classes (like `ConversationalRetrievalChain`). Migrate entirely to LCEL, which uses Python pipe operators (`|`) to compose prompts, models, and output parsers declaratively. It automatically handles streaming and async logic.',
  architecture:
    "### Agents vs Chains\nA Chain is a deterministic sequence of operations. An Agent utilizes an LLM's reasoning to dynamically determine which Tools to execute and in what order to solve a complex goal.",
  errorRecovery:
    "LLMs frequently output invalid JSON when asked for structured data. Use LangChain's `OutputFixingParser` which automatically catches parsing errors and feeds the broken output back to the LLM with instructions to fix it.",
  securityNotes:
    'Never give an Agent unmitigated access to destructive Tools (e.g., SQL DELETE capabilities or Shell execution). Always enforce human-in-the-loop approval or strict sandbox environments.',
  links: { 'LangChain Docs': 'https://python.langchain.com/docs/get_started/introduction' },
  examples: {
    python: {
      lcel: `from langchain_core.prompts import ChatPromptTemplate\nfrom langchain_openai import ChatOpenAI\nfrom langchain_core.output_parsers import StrOutputParser\n\nprompt = ChatPromptTemplate.from_template("Tell me a joke about {topic}")\nmodel = ChatOpenAI()\noutput_parser = StrOutputParser()\n\nchain = prompt | model | output_parser\nprint(chain.invoke({"topic": "bears"}))`,
    },
  },
});

buildSkillV4({
  name: 'llamaindex',
  displayName: 'LlamaIndex',
  description: 'Data framework for connecting custom data sources to large language models.',
  categories: ['AI', 'Developer Tools'],
  learningLevel: 'intermediate',
  useCases: ['RAG', 'Data Ingestion'],
  deploymentTargets: ['any'],
  ecosystem: 'ai',
  maintainers: ['run-llama'],
  stability: 'production',
  relationships: [
    { target: 'langchain', type: 'alternative_to' },
    { target: 'openai', type: 'integrates_with' },
    { target: 'pinecone', type: 'integrates_with' },
  ],
  quickStart:
    'While LangChain focuses on Agents and Chains, LlamaIndex focuses heavily on Data. It is the premier framework for building advanced Retrieval-Augmented Generation (RAG) applications over unstructured data.\n\n```bash\npip install llama-index\n```',
  productionPatterns:
    '### Advanced Retrieval Strategies\nDo not rely on naive Top-K semantic search. Production RAG requires advanced strategies like Sentence Window Retrieval (fetching the surrounding context of a hit), Auto-Merging Retrieval, or Re-ranking (using Cohere) to improve hallucination resistance.',
  architecture:
    '### Document Ingestion Pipeline\nLlamaIndex handles the entire ingestion pipeline: Data Connectors (PDFs, Notion, SQL) -> Data Indexes (VectorStore, TreeIndex) -> Query Engines.',
  errorRecovery:
    'If the LLM complains about missing context, it means your Chunk Size is too small or your retrieval strategy is pulling irrelevant nodes. Inspect the `source_nodes` array attached to the LlamaIndex response to debug exactly what text was fed to the LLM.',
  securityNotes:
    'When ingesting documents, respect ACLs (Access Control Lists). Ensure that when User A queries the index, the retriever is strictly filtered to only pull vector embeddings derived from documents User A has permission to read.',
  links: { 'LlamaIndex Docs': 'https://docs.llamaindex.ai/' },
  examples: {
    python: {
      rag: `from llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n\n# Ingest data\ndocuments = SimpleDirectoryReader('data').load_data()\nindex = VectorStoreIndex.from_documents(documents)\n\n# Query data\nquery_engine = index.as_query_engine()\nresponse = query_engine.query("What did the author do growing up?")\nprint(response)`,
    },
  },
});
