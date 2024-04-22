import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "mz1vne",
  e2e: {
    baseUrl: 'https://localhost:3000',
    setupNodeEvents(on, config) {
      
      // implement node event listeners here
    },
  },
});
