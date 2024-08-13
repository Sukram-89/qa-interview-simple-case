import { FullConfig} from '@playwright/test'
import { promises as fs } from 'fs'
import { existingUsers } from '../playwright/.setup/userData'
import { setupDir, setupFile } from '../playwright.config'

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use
  const storageState = {
    cookies: [],
    origins: [
      {
        origin: baseURL,
        localStorage: [
          { name: 'users', value: JSON.stringify({ users: existingUsers }) },
        ],
      },
    ],
  }

  await fs.mkdir(setupDir, { recursive: true })
  await fs.writeFile(setupFile, JSON.stringify(storageState, null, 2))

}

export default globalSetup