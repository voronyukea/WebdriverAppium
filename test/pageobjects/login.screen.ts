import { $ } from '@wdio/globals'
import Screen from './screen.ts';

class LoginScreen extends Screen {
    // 1. Описываем геттеры для элементов (Локаторы)
    private get emailInput() { return $('~input-email'); }
    private get passwordInput() { return $('~input-password'); }
    private get loginButton() { return $('~button-LOGIN'); }
    
    // Системные элементы алерта Android (используем ID ресурсов)
    public get alertTitle() {return $('id=com.wdiodemoapp:id/alert_title'); }

    public get alertOkButton() {return $('id=android:id/button1'); }

    // Текстовые сообщения об ошибках валидации
    public get emailValidationError() { return $('android=new UiSelector().text("Please enter a valid email address")'); }
    public get passwordValidationError() { return $('android=new UiSelector().text("Please enter at least 8 characters")'); }

    
    async waitForScreen() {
        await this.waitForPageToLoad(await this.emailInput);
    }

    /**
     * Бизнес-метод: выполнение авторизации
     */
    async login(email: string, password: string) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

// Экспортируем сразу экземпляр класса (Singleton паттерн), чтобы не делать new в тестах
export default new LoginScreen();