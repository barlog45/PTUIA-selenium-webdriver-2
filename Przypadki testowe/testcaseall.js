const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
    
    var testcounter = 0;

    async function tastecase(name, lastname, data, parentCheck, doctorCheck, expectedResult){
        
        let driver = await new Builder().forBrowser('firefox').build();

        try {
            //licznik testów
            testcounter++;

            // podanie url sprawdzanej strony
            await driver.get('https://lamp.ii.us.edu.pl/~mtdyd/zawody/');
            //await driver.get('file:///C:/Users/pkoni/Downloads/stronka/search.html');
            
            // Wpisywanie do pola imię
            await driver.findElement(By.id('inputEmail3')).sendKeys(name, Key.ENTER);
            
            // Wpisywanie do pola hasło
            await driver.findElement(By.id('inputPassword3')).sendKeys(lastname, Key.ENTER);
            
            // Wpisywanie do pola data
            await driver.findElement(By.id('dataU')).sendKeys(data, Key.ENTER);
            
            if(parentCheck){
                // Zaznaczenie pola checkbox: Zgoda rodziców
                await driver.findElement(By.id('rodzice')).click();
            }
            
            if(doctorCheck){
                // Zaznaczenie pola checkbox: Zaśwaidczenie od lekarza
                await driver.findElement(By.id('lekarz')).click();
            }
            
            // Wciśnięcie przycisku wysłania formularza
            await driver.findElement(By.className("btn btn-default")).click();
            
            // Czekanie na wyświetlenie alertu
            await driver.wait(until.alertIsPresent());
            
            // Przechowanie alertu w zmiennej
            let alert = await driver.switchTo().alert();
            
            // Naciśnięcie przycisku potewierdzenie alertu
            await alert.accept();
            
            // obsługa drugiego alertu
            let alertText ="";
            try{
                alert = await driver.switchTo().alert();
                await alert.accept();
            }catch{
                alertText = await alert.getText();
            }
            
            //przypisanie do zmiennej wyniku formularza
            let testResult = await driver.findElement(By.id('returnSt')).getText();

            let result = "Test zakończony niepowodzeniem";
            
            //przypisanie wyniku drugiego alertu(jeżeli takowy istnieje) do rezultatu
            if(alertText != ""){
                testResult = alertText;
            }

            //sprawdzenie poprawności przypadku testowego
            if(testResult.search(expectedResult)>-1){
                result = "Test zakończony powodzeniem";
            }

            //wyświelanie komunikatów w konsoli
            console.log('Testcase '+testcounter+': '+testResult+' - '+result);
        }
        finally{
            // Zamknięcie testu
            driver.quit();
        }
    }
    
        //użycie funkcji w celu wykonania wszystkich przypadków testowych
        await tastecase("Jan", "Kowalski", "01-01-2017", true, true, "Brak kwalifikacji");
        await tastecase("Jan", "Kowalski", "01-01-2008", true, true, "Mlodzik");
        await tastecase("Jan", "Kowalski", "01-01-2008", false, true, "Brak kwalifikacji");
        await tastecase("Jan", "Kowalski", "01-01-2008", true, false, "Brak kwalifikacji");
        await tastecase("Jan", "Kowalski", "01-01-2005", true, true, "Junior");
        await tastecase("Jan", "Kowalski", "01-01-2005", false, true, "Brak kwalifikacji");
        await tastecase("Jan", "Kowalski", "01-01-2005", true, false, "Brak kwalifikacji");
        await tastecase("Jan", "Kowalski", "01-01-2001", true, false, "Dorosly");
        await tastecase("Jan", "Kowalski", "01-01-1950", true, true, "Senior");
        await tastecase("Jan", "Kowalski", "01-01-1950", true, false, "Brak kwalifikacji");
        await tastecase("", "Kowalski", "01-01-1990", true, true, "Imię musi być wypełnione");
        await tastecase("Jan", "", "01-01-1990", true, true, "Nazwisko musi byc wypelnione");
        await tastecase("Jan", "Kowalski", "", true, true, "Data urodzenia nie moze byc pusta");
        await tastecase("Jan", "Kowalski", "1990-01-01", true, true, "Blad danych");
        await tastecase("Jan", "Kowalski", "tekst", true, true, "Blad danych");
        await tastecase("Jan", "Kowalski", "!@#$%", true, true, "Blad danych");
        await tastecase("Jan", "Kowalski", "01-01-990", true, true, "Blad danych");
        await tastecase("Jan", "Kowalski", "01-01-9", true, true, "Blad danych");
        await tastecase("Jan", "Kowalski", "1,2", true, true, "Blad danych");
        await tastecase("Jan", "Kowalski", "01-01-1990,5", true, true, "Blad danych");
        await tastecase("Jan", "Kowalski", "01-01-2009", true, true, "Brak kwalifikacji");
        await tastecase("!@#$%", "Kowalski", "01-01-1990", true, true, "Blad danych");
        await tastecase("Jan", "!@#$%", "01-01-1990", true, true, "Blad danych");
        await tastecase("12345", "Kowalski", "01-01-1990", true, true, "Blad danych");
        await tastecase("Jan", "12345", "01-01-1990", true, true, "Blad danych");
        await tastecase("Ja n", "Kowalski", "01-01-1990", true, true, "Blad danych");
        await tastecase("Jan", "Kowa lski", "01-01-1990", true, true, "Blad danych"); 
    
})();