
import type { ChainablePromiseElement } from 'webdriverio'

export default class Screen {
    
    async waitForPageToLoad(element: ChainablePromiseElement) {
        await element.waitForDisplayed({ timeout: 10000 });
    }

    async navigateToTab(tabName: 'Home' | 'Webview' | 'Login' | 'Forms' | 'Swipe' | 'Drag') {
        const tabButton = await $(`~${tabName}`);
        await tabButton.click();
    }
}