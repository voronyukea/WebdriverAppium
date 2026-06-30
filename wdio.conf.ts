export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    
   
    ...(process.env.CI ? {} : {
        hostname: '127.0.0.1',
        port: 4723,
        path: '/'
    }),
    
   
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    
    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [],
   
    maxInstances: 1, 
    
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        
      
        'appium:app': process.env.CI 
            ? process.env.BROWSERSTACK_APP_URL 
            : './apps/NativeDemoApp.apk', 
        
      
        ...(process.env.CI ? {
            'appium:platformVersion': '11.0',         // Версия Android
            'appium:deviceName': 'Google Pixel 5',     // Реальный девайс из дата-центра
            'bstack:options': {
                projectName: 'QA-Dashboard Mobile UI',
                buildName: process.env.GITHUB_RUN_NUMBER ? `Build #${process.env.GITHUB_RUN_NUMBER}` : 'Local Build',
                sessionName: 'Android Regression Test'
            }
        } : {
          
            'appium:allowTestPackages': true,
            'appium:newCommandTimeout': 240,
        })
    }],

    logLevel: 'info',    
    bail: 0,   
    waitforTimeout: 10000,   
    connectionRetryTimeout: 120000,   
    connectionRetryCount: 3,   
    
   
    services: process.env.CI
        ? ['browserstack']
        : [
            [
                'appium',
                {
                    args: {
                        address: '127.0.0.1',
                        port: 4723
                    },
                    command: 'appium'
                }
            ]
        ],   
    
    framework: 'mocha',
    reporters: ['spec'],
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000 
    }
}