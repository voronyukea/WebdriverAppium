import { $ } from '@wdio/globals'
import Screen from './screen.ts';

class FormsScreen extends Screen {
   
    private get inputField() { return $('~text-input'); }
    private get inputTextResult() { return $('~input-text-result'); }
    private get switchToggle() { return $('~switch'); }
    private get switchText() { return $('~switch-text'); }
    private get dropdown() { return $('~Dropdown'); }
    private get dropdownPicker() { return $('~Dropdown picker'); }

   
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
        if (!(await this.dropdown.isDisplayed()) && !(await this.dropdownPicker.isDisplayed())) {
            // On smaller screens dropdown can be below the fold, so scroll it into view.
            await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("Dropdown"))');
        }

        if (await this.dropdown.isDisplayed()) {
            await this.dropdown.click();
        } else {
            await this.dropdownPicker.waitForDisplayed({ timeout: 5000 });
            await this.dropdownPicker.click();
        }

        const option = await this.getDropdownOption(optionText);
        await option.waitForDisplayed({ timeout: 3000 });
        await option.click();
    }
}

export default new FormsScreen();