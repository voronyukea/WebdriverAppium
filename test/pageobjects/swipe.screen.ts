import { $, driver } from '@wdio/globals'
import Screen from './screen.ts';

class SwipeScreen extends Screen {
    // New static locator for the screen title, now used by waitForScreen
    private get swipeHeader() { return $('android=new UiSelector().text("Swipe")'); }

    // Carousel card locators (remains unchanged)
    public get firstCard() { return $('android=new UiSelector().text("FULLY OPEN SOURCE")'); }
    public get secondCard() { return $('android=new UiSelector().text("GREAT COMMUNITY")'); }
    
    // Hidden elements locators (now using Accessibility IDs, remains unchanged)
    public get hiddenLogo() { return $('~WebdriverIO logo'); }
    public get hiddenText() { return $('//android.widget.TextView[@text="You found me!!!"]'); }

    /**
     * Waits for the screen to load by looking for the static title element.
     */
    async waitForScreen() {
        await this.waitForPageToLoad(this.swipeHeader);
    }

    /**
     * Custom method for dynamic swipe based on coordinates (retains if needed)
     */
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

    /**
     * Horizontally swipes left to navigate the carousel.
     */
    async swipeLeft() {
        const windowSize = await driver.getWindowSize();
        const y = Math.round(windowSize.height * 0.5); 
        const startX = Math.round(windowSize.width * 0.8); 
        const endX = Math.round(windowSize.width * 0.2);   
        
        await this.swipe(startX, y, endX, y);
    }

    /**
     * SIGNIFICANTLY SIMPLIFIED: Vertically scrolls until the element is displayed.
     * Replaces the custom while loop with a single native command.
     */
    async scrollDownToHiddenElement() {
        await driver.execute('mobile: scroll', {
            strategy: 'accessibility id',
            selector: 'you-found-me',
            toVisible: true // Указывает UiAutomator2, что элемент нужно полностью вытолкнуть в видимую зону
        });
        
        // На случай, если элемент все равно застрял на границе, 
        // делаем микро-свайп вверх, чтобы гарантированно поднять его к центру
        const windowSize = await driver.getWindowSize();
        const x = Math.round(windowSize.width * 0.5);
        const startY = Math.round(windowSize.height * 0.7);
        const endY = Math.round(windowSize.height * 0.5);
        
        // Вызываем наш базовый метод свайпа, если элемент еще не полностью Displayed
        if (!(await this.hiddenText.isDisplayed())) {
            await this.swipe(x, startY, x, endY);
        }
    }
}

export default new SwipeScreen();