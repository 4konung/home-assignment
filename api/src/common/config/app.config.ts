export interface AppConfiguration {
  port: number;
  globalPrefix: string;
  confidenceThreshold: number;
}

export const appConfiguration = (): { app: AppConfiguration } => ({
  app: {
    globalPrefix: 'api',
    port: parseInt(process.env.API_PORT, 10) || 3333,
    confidenceThreshold: parseInt(process.env.CONFIDENCE_THRESHOLD, 10) || 0,
  },
});
