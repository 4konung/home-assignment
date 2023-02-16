export interface InferenceRunnerConfiguration {
  apiUrl: string;
  apiKeys: string[];
}

export const inferenceRunnerConfig = (): {
  inferenceRunner: InferenceRunnerConfiguration;
} => ({
  inferenceRunner: {
    apiUrl: process.env.INFERENCE_RUNNER_API_URL,
    apiKeys: (process.env.INFERENCE_RUNNER_API_KEYS || '')
      .split(',')
      .map((key) => key.trim()),
  },
});
