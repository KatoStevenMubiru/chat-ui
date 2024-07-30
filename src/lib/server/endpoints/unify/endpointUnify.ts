import type { TextGenerationStreamOutput } from "@huggingface/inference";
import axios from "axios";
import { z } from "zod";

const endpointUnify = {
	name: "unify",
	async *generate(params: {
		model: string;
		prompt: string;
		temperature?: number;
		maxTokens?: number;
		apiKey: string;
	}) {
		const { model, prompt, temperature, maxTokens, apiKey } = params;
		const response = await axios.post(
			"https://api.unify.ai/v0/chat/completions",
			{
				model,
				messages: [{ role: "user", content: prompt }],
				temperature,
				max_tokens: maxTokens,
			},
			{
				headers: {
					Authorization: `Bearer ${apiKey}`,
				},
			}
		);

		let generatedText = "";
		let tokenId = 0;

		for (const choice of response.data.choices) {
			const text = choice.message.content;
			const last = choice.finish_reason === "stop";
			if (text) {
				generatedText = generatedText + text;
			}
			const output: TextGenerationStreamOutput = {
				token: {
					id: tokenId++,
					text,
					logprob: 0,
					special: last,
				},
				generated_text: last ? generatedText : null,
				details: null,
			};
			yield output;
		}
	},
};

export default endpointUnify;
export const endpointUnifyParametersSchema = z.object({
	type: z.literal("unify"),
	apiKey: z.string(),
	model: z.string(),
	prompt: z.string(),
	temperature: z.number().optional(),
	maxTokens: z.number().optional(),
});
