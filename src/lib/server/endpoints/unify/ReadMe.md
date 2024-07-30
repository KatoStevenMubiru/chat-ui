## Configuration
Environment Variables
Create a ```.env ```file in the root directory and add the following variables:

env
```
UNIFY_API_KEY=your_unify_api_key_here
```
Usage
Running the Development Server
```sh
npm run dev
```
The development server will start, and you can access it at http://localhost:5173.

## Endpoints
### Unify Endpoint Integration
The Unify endpoint has been integrated into the project to enable text generation via the Unify API.

Endpoint Configuration
Endpoint Implementation (```endpointUnify.ts```):

```typescript

import { TextGenerationEndpoint, TextGenerationResponse } from '../types';
import axios from 'axios';
import { z } from 'zod';

const endpointUnify: TextGenerationEndpoint = {
  name: 'unify',
  generate: async (params) => {
    const { model, prompt, temperature, maxTokens, apiKey } = params;
    const response = await axios.post(
      'https://api.unify.ai/v0/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature,
        max_tokens: maxTokens,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data as TextGenerationResponse;
  },
};

export default endpointUnify;
export const endpointUnifyParametersSchema = z.object({
  type: z.literal('unify'),
  apiKey: z.string(),
  model: z.string(),
  prompt: z.string(),
  temperature: z.number().optional(),
  maxTokens: z.number().optional(),
});
```
###  Register the Endpoint (endpoints.ts):

```typescript

import endpointUnify, { endpointUnifyParametersSchema } from './unify/endpointUnify';

export const endpoints = {
  // other endpoints
  unify: endpointUnify,
};

export const endpointSchema = z.discriminatedUnion('type', [
  // other schemas
  endpointUnifyParametersSchema,
]);
```
### License
This project is licensed under the MIT License. See the LICENSE file for details.

This README provides a high-level overview of the current Unify endpoint integration within the Chat-UI project. For more detailed information, please refer to the source code and comments within the implementation files.










ChatGPT can make mistakes. Check important info.
