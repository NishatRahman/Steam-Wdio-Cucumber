export const config = {
    // ==================
    // Basic Configuration
    // ==================
    runner: 'local',
    path: '/',
    specs: [
        './features/**/*.feature'  // Path to your feature files
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu', '--window-size=1920,1080'] // Headless mode for CI
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://store.steampowered.com/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    
    // ==================
    // Test Framework Settings
    // ==================
    framework: 'cucumber',
    reporters: ['spec'],
    
    cucumberOpts: {
        require: ['./step-definitions/**/*.js'], // Path to step definitions
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        colors: true,
        snippets: true,
        source: true,
        profile: [],
        strict: true,
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
    },

    services: ['chromedriver'],

    beforeScenario: async () => {
        await browser.maximizeWindow();
    }
};
