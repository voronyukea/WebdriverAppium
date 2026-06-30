const ciAppUrl = process.env.BROWSERSTACK_APP_URL
const isInvalidCiAppUrl = !ciAppUrl || ciAppUrl === 'null' || ciAppUrl === 'undefined'
const ciDeviceName = process.env.BROWSERSTACK_DEVICE_NAME || 'Google Pixel 7'
const ciPlatformVersion = process.env.BROWSERSTACK_PLATFORM_VERSION

if (process.env.CI && isInvalidCiAppUrl) {
    throw new Error(
        'Invalid BROWSERSTACK_APP_URL for CI run. Expected bs://<app-id> or valid BrowserStack custom/shareable app id.'
    )
}

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
            ? ciAppUrl 
            : './apps/NativeDemoApp.apk', 
        
      
        ...(process.env.CI ? {
            'appium:deviceName': ciDeviceName,
            ...(ciPlatformVersion ? { 'appium:platformVersion': ciPlatformVersion } : {}),
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