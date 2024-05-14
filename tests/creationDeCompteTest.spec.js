const { test, expect } = require('@playwright/test');
import { Steps,loginSteps } from "./StepPartagees";//l'importation des fonctions partager entre les cas de tests
import selectors from "./selectors";// l'importation des xpath mis dans le fichier selectors.
const donnees = require('../jeuxDeDonnées/donnéeCreationDeCompte.json');// importation de mon jeu de donnees


test('création de compte', async ({ page}) => {
    const step = new Steps(page);

    await step.goToLogInPage();// aller vers la page de creation de compte via la fonction gotologinpage

    await page.locator(selectors.signupNameInput).fill(donnees.utilisateur[0].signup.name);
    // selectors.signupNameInput, recuperation de l' xpath vers le premier champs name
    // donnees.utilisateur[0].signup.name, recupera de la donnée name du fichier json .
    // et ainsi pour tous les champs et les modules 
    
    await page.locator(selectors.signupEmailInput).fill(donnees.utilisateur[0].signup.email);
    await page.locator(selectors.signupButton).click();
    
    expect(await page.locator(selectors.accountInfoTitle).textContent()).toBe('Enter Account Information');
    await page.locator(selectors.genderInput).click();
    expect(await page.locator(selectors.nameInput).inputValue()).toEqual(donnees.utilisateur[0].signup.name);
    expect(await page.locator(selectors.emailInput).inputValue()).toEqual(donnees.utilisateur[0].signup.email);
    await page.locator(selectors.passwordInput).fill(donnees.utilisateur[0].signup.password);
    await page.locator(selectors.daysSelect).selectOption(donnees.utilisateur[0].signup.birthdate.day);
    await page.locator(selectors.monthsSelect).selectOption(donnees.utilisateur[0].signup.birthdate.month);
    await page.locator(selectors.yearsSelect).selectOption(donnees.utilisateur[0].signup.birthdate.year);
    if (donnees.utilisateur[0].signup.newsletter == true) {
        await page.locator(selectors.newsletterCheckbox).check();
    }
    if (donnees.utilisateur[0].signup.agreement == true) {
        await page.locator(selectors.agreementCheckbox).check();
    }
    expect(await page.locator(selectors.addressInfoTitle).textContent()).toEqual('Address Information');
    await page.locator(selectors.firstNameInput).fill(donnees.utilisateur[0].signup.firstName);
    await page.locator(selectors.lastNameInput).fill(donnees.utilisateur[0].signup.lastName);
    await page.locator(selectors.addressInput).fill(donnees.utilisateur[0].signup.address.streetAddress);
    await page.locator(selectors.countrySelect).selectOption(donnees.utilisateur[0].signup.address.country);
    await page.locator(selectors.stateInput).fill(donnees.utilisateur[0].signup.address.state);
    await page.locator(selectors.cityInput).fill(donnees.utilisateur[0].signup.address.city);
    await page.locator(selectors.zipcodeInput).fill(donnees.utilisateur[0].signup.address.zipcode);
    await page.locator(selectors.mobileNumberInput).fill(donnees.utilisateur[0].signup.mobileNumber);
    await page.waitForTimeout(5000);
    await page.close();
    // await page.locator("//button[@data-qa='create-account']").click();
});
