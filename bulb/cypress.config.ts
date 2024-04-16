import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "mz1vne",
  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 20000,
    taskTimeout: 30000,

  },
})

//video: true,
//screenshotsFolder: 'cypress/screenshots',
//videosFolder: 'cypress/videos',