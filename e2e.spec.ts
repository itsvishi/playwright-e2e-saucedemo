import {test, expect} from "@playwright/test";

test("E2E: User completes purchase successfully", async ({page}) => {
    const testwebsite = "https://www.saucedemo.com/";
    await page.goto(testwebsite);
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('text=Swag Labs')).toBeVisible();

    //add to cart
    await expect(page.locator("text=Sauce Labs Backpack")).toBeVisible();
    await page.locator("//div[text()='Sauce Labs Backpack']/../../..//button[text()='Add to cart']").click();
    //validate add to cart one product
    await expect(page.locator("//span[text()='1']")).toBeVisible();
    
    //Go to cart
    const value = await page.locator('(//div[@class="inventory_item_price"])[1]').innerText();
    await page.locator("//div[text()='Swag Labs']/../..//div[contains(@id,'shopping')]").click();
    await expect(page.locator("//button[text()='Remove']")).toBeVisible();
    await expect(page.locator('//div[@class="inventory_item_price"]')).toHaveText(value);

    //checkout 
    await expect(page.locator("//button[text()='Checkout']")).toBeVisible();
    await page.locator("//button[text()='Checkout']").click();
    await expect(page.locator("//span[text()='Checkout: Your Information']")).toBeVisible();
    await page.locator("//input[@placeholder='First Name']").fill('Vishal');
    await page.locator("//input[@placeholder='Last Name']").fill('kumar');
    await page.locator("//input[contains(@placeholder,'Postal Code')]").fill('60130');
    await page.locator("//input[@name='continue']").scrollIntoViewIfNeeded();
    await page.locator("//input[@name='continue']").click();

    //finsh and continue shoping 
    await expect(page.locator("//div[@class='summary_total_label']")).toBeVisible();
    await expect(page.locator("//button[text()='Finish']")).toBeVisible();
    await page.locator("//button[text()='Finish']").click();

    //back to menu
    await expect(page.locator("//h2[text()='Thank you for your order!']")).toBeVisible();
    await expect(page.locator("//button[@id='back-to-products']")).toBeVisible();
    await page.locator("//button[@id='back-to-products']").click();
    await expect(page.locator("//button[text()='Open Menu']")).toBeVisible();

    //logout
    await page.locator("//button[text()='Open Menu']").click();
    await expect(page.locator("//a[text()='Logout']")).toBeVisible();
    await page.locator("//a[text()='Logout']").click();
    await expect(page.locator('#login-button')).toBeVisible();


  

 }); 