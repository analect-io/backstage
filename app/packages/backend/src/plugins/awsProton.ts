import { createRouter } from '@aws/aws-proton-backend-plugin-for-backstage';
import { PluginEnvironment } from '../types';

export default async function createPlugin(env: PluginEnvironment) {
  return await createRouter({
    logger: env.logger,
    config: env.config,
  });
}