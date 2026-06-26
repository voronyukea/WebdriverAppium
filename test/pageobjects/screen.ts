
import type { ChainablePromiseElement } from 'webdriverio'

export default class Screen {
    
    async waitForPageToLoad(element: ChainablePromiseElement) {
        await element.waitForDisplayed({ timeout: 10000 });
    }

    async navigateToTab(tabName: 'Home' | 'Webview' | 'Login' | 'Forms' | 'Swipe' | 'Drag') {
        const accessibilityTabButton = await $(`~${tabName}`);

        if (await accessibilityTabButton.isDisplayed()) {
            await accessibilityTabButton.click();
            return;
        }

        // Fallback to visible text selector for cases where accessibility id is missing.
        const textTabButton = await $(`android=new UiSelector().text("${tabName}")`);
        await textTabButton.waitForDisplayed({ timeout: 10000 });
        await textTabButton.click();
    }
}