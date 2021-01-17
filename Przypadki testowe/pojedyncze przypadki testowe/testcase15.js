const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        // podanie url sprawdzanej strony
        await driver.get('https://lamp.ii.us.edu.pl/~mtdyd/zawody/');

        // Wpisywanie do pola imię
        await driver.findElement(By.id('inputEmail3')).sendKeys('Jan', Key.ENTER);
		
		// Wpisywanie do pola hasło
		await driver.findElement(By.id('inputPassword3')).sendKeys('Kowalski', Key.ENTER);
		
		// Wpisywanie do pola data
		await driver.findElement(By.id('dataU')).sendKeys('tekst', Key.ENTER);
		
		// Zaznaczenie pola checkbox: Zgoda rodziców
		await driver.findElement(By.id('rodzice')).click();
		
		// Zaznaczenie pola checkbox: Zaśwaidczenie od lekarza
		await driver.findElement(By.id('lekarz')).click();
		
		// Wciśnięcie przycisku wysłania formularza
		await driver.findElement(By.className("btn btn-default")).click();
		
		// Czekanie na wyświetlenie alertu
		await driver.wait(until.alertIsPresent());
		
		// Przechowanie alertu w zmiennej
		let alert = await driver.switchTo().alert();
		
		// Przechowanie alertu w zmiennej jako tekst
		let alertText = await alert.getText();
		
		// Naciśnięcie przycisku potewierdzenie alertu
		await alert.accept();
		
		// obsługa drugie alertu
		await driver.wait(until.alertIsPresent());
		await alert.accept();


		let testResult = await driver.findElement(By.id('returnSt')).getText();
		console.log('\n'+testResult+'\n');
    }
    finally{
		// Zamknięcie testu
        driver.quit();
    }
})();