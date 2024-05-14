const { test, expect } = require('@playwright/test');
import { Steps,loginSteps } from "../tests/StepPartagees";//l'importation des fonctions partager entre les cas de tests
import selectors from "./selectors";// l'importation des xpath mis dans le fichier selectors.
const donnees = require('../jeuxDeDonnées/donnéeCreationDeCompte.json');// importation de mon jeu de donnees


test('connexion', async ({ page}) => {
    const step = new Steps(page);
    await step.goToLogInPage();
    await step.loginSteps(page,donnees.utilisateur[0].signup.email, donnees.utilisateur[0].signup.password);
    await page.waitForTimeout(5000);
    await page.close();
});