import { dataSource } from 'data-source';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

(async () => {
  await dataSource.initialize();

  runSeeders(dataSource, {
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
  });
})();
