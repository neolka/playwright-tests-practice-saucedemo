import { test, expect } from '@playwright/test';
import { Page, Locator } from '@playwright/test';
import { getAuthData } from '../utils/utils.ts';


export class LoginPage {
    constructor(private page: Page) {}
  
    private userInput = this.page.locator('#user-name');
    private passInput = this.page.locator('#password');
    private loginBtn = this.page.locator('#login-button');
    private errorMsg = this.page.locator('[data-test="error"]');
  
    async goto() {
      await this.page.goto('/');
    }
  
    async login() {
      const authData = getAuthData();

      await this.userInput.fill(authData.username);
      await this.passInput.fill(authData.password);
      await this.loginBtn.click();
    }
  
    async getErrorText() {
      return this.errorMsg.textContent();
    }
  }
  