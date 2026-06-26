import { $, driver } from '@wdio/globals'
import Screen from './screen.ts';

class SwipeScreen extends Screen {
    
    private get swipeHeader() { return $('android=new UiSelector().text("Swipe")'); }   
    public get firstCard() { return $('android=new UiSelector().text("FULLY OPEN SOURCE")'); }
    public get secondCard() { return $('android=new UiSelector().text("GREAT COMMUNITY")'); }   
    public get hiddenLogo() { return $('~WebdriverIO logo'); }
    public get hiddenText() { return $('android=new UiSelector().text("You found me!!!")'); }

    async isHiddenContentFound(): Promise<boolean> {
        return (await this.hiddenLogo.isExisting()) || (await this.hiddenText.isExisting());
    }

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
        const windowSize = await driver.getWindowSize();
        const region = {
            left: Math.round(windowSize.width * 0.05),
            top: Math.round(windowSize.height * 0.15),
            width: Math.round(windowSize.width * 0.9),
            height: Math.round(windowSize.height * 0.75),
        };

        // First pass: native Android scroll gesture is more reliable than pointer actions in CI.
        for (let attempt = 0; attempt < 12; attempt++) {
            if (await this.isHiddenContentFound()) {
                return;
            }

            const canScrollMore = await driver.execute('mobile: scrollGesture', {
                ...region,
                direction: 'down',
                percent: 0.9,
            });

            if (!canScrollMore) {
                break;
            }

            await driver.pause(250);
        }

        const x = Math.round(windowSize.width * 0.5);
        const startY = Math.round(windowSize.height * 0.85);
        const endY = Math.round(windowSize.height * 0.2);

        // Fallback for environments where scrollGesture is not enough.
        for (let attempt = 0; attempt < 6; attempt++) {
            if (await this.isHiddenContentFound()) {
                return;
            }

            await this.swipe(x, startY, x, endY);
        }

        throw new Error('Hidden swipe elements were not found after scrolling (expected WebdriverIO logo / You found me!!!).');
    }
}

export default new SwipeScreen();