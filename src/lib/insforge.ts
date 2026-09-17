/**
 * InsForge BaaS Client Singleton
 * Menghubungkan aplikasi dengan backend managed PostgreSQL InsForge
 */

import { createClient } from '@insforge/sdk';

const baseUrl =
  process.env.NEXT_PUBLIC_INSFORGE_BASE_URL ||
  'https://r6nu44ke.ap-southeast.insforge.app';

const anonKey =
  process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY ||
  'anon_deccc4a346bc934f34f56f155af945b2409c6f989fae0680e453db725b5208d5';

export const insforge = createClient({
  baseUrl,
  anonKey,
});
