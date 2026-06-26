import { expect } from '@wdio/globals'
import LoginScreen from '../pageobjects/login.screen.ts'
import FormsScreen from '../pageobjects/forms.screen.ts'
import SwipeScreen from '../pageobjects/swipe.screen.ts'

describe('Набор мобильных тестов (Все 5 сценариев POM)', () => {

    // it('Сценарий 1: Успешная авторизация с валидными данными', async () => {
    //     await LoginScreen.navigateToTab('Login');
    //     await LoginScreen.waitForScreen();
    //     await LoginScreen.login('voronyukea@gmail.com', 'supersecure123');
    //     await expect(LoginScreen.alertTitle).toBeDisplayed();
    //     await expect(LoginScreen.alertTitle).toHaveText('Success');
    //     await LoginScreen.alertOkButton.click();
    // });

    // it('Сценарий 2: Негативный тест авторизации (валидация полей)', async () => {
    //     await LoginScreen.navigateToTab('Login');
    //     await LoginScreen.waitForScreen();
    //     await LoginScreen.login('invalid-email', '123');
    //     await expect(LoginScreen.emailValidationError).toBeDisplayed();
    //     await expect(LoginScreen.passwordValidationError).toBeDisplayed();
    // });

    // it('Сценарий 3: Взаимодействие с элементами формы (Вкладка Forms)', async () => {
    //     // Переходим на вкладку Forms
    //     await FormsScreen.navigateToTab('Forms');
    //     await FormsScreen.waitForScreen();

    //     // 1. Тестируем текстовый инпут
    //     const testMessage = 'QA Automation 2026';
    //     await FormsScreen.typeInInput(testMessage);
    //     await expect(await FormsScreen.getInputResultText()).toEqual(testMessage);

    //     // 2. Тестируем Switch (по умолчанию он выключен и пишет "Click to turn on")
    //     await FormsScreen.toggleSwitch();
    //     await expect(await FormsScreen.getSwitchStatusText()).toContain('Click to turn the switch OFF');

    //     // 3. Тестируем Dropdown (выбираем пункт "webdriver.io is awesome")
    //     await FormsScreen.selectDropdownOption('webdriver.io is awesome');
    // });

    // it('Сценарий 4: Работа со свайпами и каруселью (Вкладка Swipe)', async () => {
    //     // Переходим на вкладку Swipe
    //     await SwipeScreen.navigateToTab('Swipe');
    //     await SwipeScreen.waitForScreen();

    //     // Проверяем, что первая карточка видна
    //     await expect(SwipeScreen.firstCard).toBeDisplayed();

    //     // Делаем горизонтальный жест влево
    //     await SwipeScreen.swipeLeft();

    //     // Проверяем, что на экране появилась вторая карточка
    //     await expect(SwipeScreen.secondCard).toBeDisplayed();
    // });

    it('Сценарий 5: Вертикальный скролл до скрытого элемента', async () => {
        await SwipeScreen.navigateToTab('Swipe');
        await SwipeScreen.waitForScreen();

        // Запускаем скролл
        await SwipeScreen.scrollDownToHiddenElement();

        // ВМЕСТО toBeDisplayed используем точный и стабильный точечный ассершн toExist
        await expect(SwipeScreen.hiddenText).toExist();
        await expect(SwipeScreen.hiddenLogo).toExist();
    });
});