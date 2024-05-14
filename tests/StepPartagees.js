import selectors from "./selectors";

export class Steps {
    constructor(page,browser) {
        this.page = page;
    }

    async goToHomePage() {
// cette fonction (goToHomePage) est peut etre utilisée pour- 
// tous les cas de test sur cette page web,car on trouve dessus l'acces-
// a la page ainsi l'acceptation des coockies

        await this.page.goto('https://automationexercise.com/');
        await this.page.waitForLoadState('load');
    
    // Clique sur le bouton s'il est visible
        const acceptButton = await this.page.locator(selectors.acceptButton).first();
        if (await acceptButton.isVisible()) {
            await acceptButton.click();
        }
    }
    async goToLogInPage() {
        // l'acces a la page de connexion et de creation de compte et de connexion 
       await this.goToHomePage();
       await this.page.locator(selectors.signupLink).click();
    }
    async  loginSteps(page, _username, _password) {
        // 
        await page.fill(selectors.loginEmail, _username);
        await page.fill(selectors.loginPassword, _password);
        await page.click(selectors.loginButton);
    }
}

