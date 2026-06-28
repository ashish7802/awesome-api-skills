# Google Gemini API Skill

## Overview
Google Gemini offers natively multimodal capabilities (text, image, audio, video). This skill focuses on `@google/genai` and the v1beta API surface.

## Installation
```bash
npm install @google/genai
pip install google-genai
```

## Authentication
Use a Google API key passed to the client initialization. For GCP environments, Vertex AI authentication via IAM is preferred.

## Core Concepts
- **Parts**: The building blocks of a message. A part can be text or inline data (images).
- **Gemini 1.5 Pro**: Features a massive 1-million to 2-million token context window.
- **System Instructions**: Provided at the model initialization level.

## Common Workflows
1. Initialize `GoogleGenAI`.
2. Call `models.generateContent` with a multimodal array of parts.
3. Extract the text from the response candidate.

## Error Handling
Watch for `FinishReason.SAFETY`. If the model refuses to answer due to safety settings, the response will be empty but the `finishReason` will indicate why.

## Security
Tune safety settings (`HARM_CATEGORY_HATE_SPEECH`, etc.) according to your application's risk tolerance.

## Rate Limits
Free tier offers 15 RPM for Gemini 1.5 Flash. Paid tiers depend on GCP quotas.

## Best Practices
Leverage the massive context window by uploading entire codebases or PDFs rather than aggressively chunking, as Gemini 1.5's recall is exceptionally high.

## Troubleshooting
If multimodal requests fail, ensure inline data is base64 encoded and the correct MIME type (e.g., `image/jpeg`) is specified.

## References
- [API Reference](https://ai.google.dev/api)
