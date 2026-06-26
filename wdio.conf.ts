
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
        
        // Для CI передаем URL, чтобы удаленный Appium внутри контейнера сам скачал APK.
        // Локально используем файл из репозитория.
        'appium:app': process.env.CI
            ? 'https://github.com/webdriverio/native-demo-app/releases/download/v1.0.8/android.wdio.native.app.v1.0.8.apk'
            : './apps/NativeDemoApp.apk', 
        
        'appium:allowTestPackages': true,
        'appium:newCommandTimeout': 240,
    }],

  
    logLevel: 'info',    
    bail: 0,   
    waitforTimeout: 10000,   
    connectionRetryTimeout: 120000,   
    connectionRetryCount: 3,   
    
    
    // В CI Appium уже запущен в docker-контейнере, поэтому не стартуем второй локальный процесс.
    services: process.env.CI
        ? []
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