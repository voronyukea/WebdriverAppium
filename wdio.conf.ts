
export const config: WebdriverIO.Config = {
   
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    
   
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    
   
    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
   
  
    maxInstances: 1,
    
    capabilities: [{
       
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        
        // Если бежим в CI, берем путь внутри Docker-контейнера budtmo, иначе — локальный
        'appium:app': process.env.CI ? '/root/tmp/NativeDemoApp.apk' : './apps/NativeDemoApp.apk', 
        
        'appium:allowTestPackages': true,
        'appium:newCommandTimeout': 240,
    }],

  
    logLevel: 'info',    
    bail: 0,   
    waitforTimeout: 10000,   
    connectionRetryTimeout: 120000,   
    connectionRetryCount: 3,   
    
    
    services: [
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