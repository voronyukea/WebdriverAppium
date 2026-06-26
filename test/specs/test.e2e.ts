import { expect } from '@wdio/globals'
import LoginScreen from '../pageobjects/login.screen.ts'
import FormsScreen from '../pageobjects/forms.screen.ts'
import SwipeScreen from '../pageobjects/swipe.screen.ts'
import Screen from '../pageobjects/screen.ts'

const baseScreen = new Screen();

async function dismissNativeDialogIfPresent() {
    const okButton = await $('id=android:id/button1');
    if (await okButton.isExisting()) {
        await okButton.click();
        return;
    }

    const cancelButton = await $('id=android:id/button2');
    if (await cancelButton.isExisting()) {
        await cancelButton.click();
    }
}

describe('Набор мобильных тестов (Все 5 сценариев POM)', () => {

    beforeEach(async () => {
        await dismissNativeDialogIfPresent();

        await baseScreen.navigateToTab('Home');
    });

    afterEach(async () => {
        await dismissNativeDialogIfPresent();
    });

    it('Сценарий 1: Успешная авторизация с валидными данными', async () => {
        await LoginScreen.navigateToTab('Login');
        await LoginScreen.waitForScreen();
        await LoginScreen.login('voronyukea@gmail.com', 'supersecure123');
        await expect(LoginScreen.alertTitle).toBeDisplayed();
        await expect(LoginScreen.alertTitle).toHaveText('Success');
        await LoginScreen.alertOkButton.click();
    });

    it('Сценарий 2: Негативный тест авторизации (валидация полей)', async () => {
        await LoginScreen.navigateToTab('Login');
        await LoginScreen.waitForScreen();
        await LoginScreen.login('invalid-email', '123');
        await expect(LoginScreen.emailValidationError).toBeDisplayed();
        await expect(LoginScreen.passwordValidationError).toBeDisplayed();
    });

    it('Сценарий 3: Взаимодействие с элементами формы (Вкладка Forms)', async () => {       
        await FormsScreen.navigateToTab('Forms');
        await FormsScreen.waitForScreen();       
        const testMessage = 'QA Automation 2026';
        await FormsScreen.typeInInput(testMessage);
        await expect(await FormsScreen.getInputResultText()).toEqual(testMessage);       
        await FormsScreen.toggleSwitch();
        await expect(await FormsScreen.getSwitchStatusText()).toContain('Click to turn the switch OFF');       
        await FormsScreen.selectDropdownOption('webdriver.io is awesome');
    });

    it('Сценарий 4: Работа со свайпами и каруселью (Вкладка Swipe)', async () => {       
        await SwipeScreen.navigateToTab('Swipe');
        await SwipeScreen.waitForScreen();      
        await expect(SwipeScreen.firstCard).toBeDisplayed();      
        await SwipeScreen.swipeLeft();      
        await expect(SwipeScreen.secondCard).toBeDisplayed();
    });

    it('Сценарий 5: Вертикальный скролл до скрытого элемента', async () => {
        await SwipeScreen.navigateToTab('Swipe');
        await SwipeScreen.waitForScreen();      
        await SwipeScreen.scrollDownToHiddenElement();       
        await expect(await SwipeScreen.isHiddenContentFound()).toBe(true);
    });
});