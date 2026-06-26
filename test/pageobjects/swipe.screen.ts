import { $, driver } from '@wdio/globals'
import Screen from './screen.ts';

class SwipeScreen extends Screen {
    
    private get swipeHeader() { return $('android=new UiSelector().text("Swipe")'); }   
    public get firstCard() { return $('android=new UiSelector().text("FULLY OPEN SOURCE")'); }
    public get secondCard() { return $('android=new UiSelector().text("GREAT COMMUNITY")'); }   
    public get hiddenLogo() { return $('~WebdriverIO logo'); }
    public get hiddenText() { return $('//android.widget.TextView[@text="You found me!!!"]'); }

    async waitForScreen() {
        await this.waitForPageToLoad(this.swipeHeader);
    }

    
    async swipe(startX: number, startY: number, endX: number, endY: number) {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'mouse' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 600, x: endX, y: endY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.pause(1000); // Allow animation to complete
    }

    
    async swipeLeft() {
        const windowSize = await driver.getWindowSize();
        const y = Math.round(windowSize.height * 0.5); 
        const startX = Math.round(windowSize.width * 0.8); 
        const endX = Math.round(windowSize.width * 0.2);   
        
        await this.swipe(startX, y, endX, y);
    }

    async scrollDownToHiddenElement() {
        await driver.execute('mobile: scroll', {
            strategy: 'accessibility id',
            selector: 'you-found-me',
            toVisible: true 
        });
       
        const windowSize = await driver.getWindowSize();
        const x = Math.round(windowSize.width * 0.5);
        const startY = Math.round(windowSize.height * 0.7);
        const endY = Math.round(windowSize.height * 0.5);
        
        
        if (!(await this.hiddenText.isDisplayed())) {
            await this.swipe(x, startY, x, endY);
        }
    }
}

export default new SwipeScreen();