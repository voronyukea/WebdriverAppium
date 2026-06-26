import { $ } from '@wdio/globals'
import Screen from './screen.ts';

class FormsScreen extends Screen {
    // Локаторы основных элементов
    private get inputField() { return $('~text-input'); }
    private get inputTextResult() { return $('~input-text-result'); }
    private get switchToggle() { return $('~switch'); }
    private get switchText() { return $('~switch-text'); }
    private get dropdown() { return $('~Dropdown'); }

    // Метод для динамического выбора элемента в дропдауне по тексту роли
    private async getDropdownOption(optionText: string) {
        return $(`android=new UiSelector().text("${optionText}")`);
    }

    async waitForScreen() {
        await this.waitForPageToLoad(this.inputField);
    }

    async typeInInput(text: string) {
        await this.inputField.setValue(text);
    }

    async getInputResultText(): Promise<string> {
        return await this.inputTextResult.getText();
    }

    async toggleSwitch() {
        await this.switchToggle.click();
    }

    async getSwitchStatusText(): Promise<string> {
        return await this.switchText.getText();
    }

    async selectDropdownOption(optionText: string) {
        await this.dropdown.click();
        // Ждем появления опции в открывшемся списке и кликаем
        const option = await this.getDropdownOption(optionText);
        await option.waitForDisplayed({ timeout: 3000 });
        await option.click();
    }
}

export default new FormsScreen();