export interface TextGenerationEndpoint {
	name: string;
	generate: (params: {
		model: string;
		prompt: string;
		temperature?: number;
		maxTokens?: number;
		apiKey: string;
	}) => Promise<TextGenerationResponse>;
}

export interface TextGenerationResponse {
	id: string;
	object: string;
	created: number;
	model: string;
	choices: Array<{
		message: {
			role: string;
			content: string;
		};
		finish_reason: string;
	}>;
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
}
