import { CatalogClient } from '@backstage/catalog-client';
import { createRouter } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';
import { ScmIntegrations } from '@backstage/integration';
import { createBuiltinActions } from '@backstage/plugin-scaffolder-backend';
import { createAwsProtonServiceAction } from '@aws/aws-proton-backend-plugin-for-backstage';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });
  const integrations = ScmIntegrations.fromConfig(env.config);

  const builtInActions = createBuiltinActions({
    integrations,
    catalogClient,
    reader: env.reader,
    config: env.config,
  });

  const actions = [...builtInActions, createAwsProtonServiceAction({ config: env.config })];

  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    actions,
  });
}
