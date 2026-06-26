import { $, driver } from '@wdio/globals'
import Screen from './screen.ts';

class SwipeScreen extends Screen {
    
    private get swipeHeader() { return $('android=new UiSelector().text("Swipe")'); }   
    public get firstCard() { return $('android=new UiSelector().text("FULLY OPEN SOURCE")'); }
    public get secondCard() { return $('android=new UiSelector().text("GREAT COMMUNITY")'); }   
    public get hiddenLogo() { return $('~WebdriverIO logo'); }
    public get hiddenText() { return $('android=new UiSelector().text("You found me!!!")'); }

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
        // Primary strategy: ScrollView + accessibility id is the most stable on Android emulators.
        try {
            await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("WebdriverIO logo"))');
            if (await this.hiddenLogo.isExisting()) {
                return;
            }
        } catch {
            // Fallback to gesture-based scrolling below.
        }

        const windowSize = await driver.getWindowSize();
        const x = Math.round(windowSize.width * 0.5);
        const startY = Math.round(windowSize.height * 0.8);
        const endY = Math.round(windowSize.height * 0.3);

        for (let attempt = 0; attempt < 6; attempt++) {
            if ((await this.hiddenLogo.isExisting()) || (await this.hiddenText.isExisting())) {
                return;
            }

            await this.swipe(x, startY, x, endY);
        }

        throw new Error('Hidden swipe elements were not found after scrolling (expected WebdriverIO logo / You found me!!!).');
    }
}

export default new SwipeScreen();