export interface AppConfiguration {
  port: number;
  globalPrefix: string;
  confidenceThreshold: number;
  environment: string;
}

export const appConfiguration = (): { app: AppConfiguration } => ({
  app: {
    globalPrefix: 'api',
    port: parseInt(process.env.API_PORT, 10) || 3333,
    confidenceThreshold: parseInt(process.env.CONFIDENCE_THRESHOLD, 10) || 0,
    environment: process.env.NODE_ENV,
  },
});
