import { FullConfig} from '@playwright/test'
import { promises as fs } from 'fs'
import { setupDir, setupFile } from '../playwright.config'
import { existingUsers } from '@testdata/userdata'

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