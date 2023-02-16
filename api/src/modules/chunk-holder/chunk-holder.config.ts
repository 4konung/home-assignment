export interface ChunkHolderConfiguration {
  apiUrl: string;
  apiKeys: string[];
}

export const chunkHolderConfig = (): {
  chunkHolder: ChunkHolderConfiguration;
} => ({
  chunkHolder: {
    apiUrl: process.env.CHUNK_HOLDER_API_URL,
    apiKeys: (process.env.CHUNK_HOLDER_API_KEYS || '')
      .split(',')
      .map((key) => key.trim()),
  },
});
