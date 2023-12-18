describe("login and excute the swaglab", () => {
    let userinfo;
    beforeEach(() => {
      cy.fixture("login.json").then((data) => (userinfo = data));
    });
  
    it("login and by the items", () => {
  
      cy.visit("https://www.saucedemo.com");
      cy.url().should('includes', 'https://www.saucedemo.com'); 
      cy.get('[id="user-name"]').click();
  
      cy.intercept("GET", "/api/someData").as("getData");
      cy.get('[id="user-name"]').click();
      cy.wait(6000);
      cy.url();
      cy.get('[name="user-name"]').should("be.visible").type("standard_user");
      cy.get('[name="password"]').should("be.visible").type("secret_sauce");
      cy.get('[name="login-button"]').should("be.visible").click();
  
      cy.get('[class="product_sort_container"]').select("Name (A to Z)");
      cy.get('[class="inventory_item_name "]').then(($products) => {
        const productNames = $products
          .toArray()
          .map((product) => product.innerText);
  
        const sortedProductNames = [...productNames].sort((a, b) =>
          a.localeCompare(b)
        );
        expect(productNames).to.deep.equal(
          sortedProductNames,
          "Products are not sorted by name"
        );
      });
        cy.wait(2000); //
        const expectedProductNames = [
          'Sauce Labs Backpack',
          'Sauce Labs Bike Light',
          'Sauce Labs Bolt T-Shirt',
          'Sauce Labs Fleece Jacket',
          'Sauce Labs Onesie',
          'Test.allTheThings() T-Shirt (Red)'
        ];
              cy.get('[class="inventory_item_name "]') 
          .invoke('text')
          .then((productNamesText) => {
            const productNames = productNamesText.split(/\n/).map(name => name.trim());
                  const filteredProductNames = productNames.filter(name =>
              expectedProductNames.includes(name)
            );
            expectedProductNames.forEach((productName) => {
              cy.contains('[class="inventory_item_name "]', productName).should('be.visible');
            });
          });
  
       
  
      cy.get('[class="inventory_item_price"]').then(($prices) => {
        const productPrices = $prices
          .toArray()
          .map((price) =>
            parseFloat(price.innerText.replace("$", "").replace(",", ""))
          );
        const sortedProductPrices = [...productPrices].sort((a, b) => b - a);
        sortedProductPrices.forEach((productPrize) => {
          cy.contains('[class="inventory_item_price"]', productPrize).should('be.visible');
        });
      });
      const checkbox = cy.get('[class="btn btn_primary btn_small btn_inventory "]')
      checkbox.each(($allCheckBoxs, index) => {
          cy.wrap($allCheckBoxs).should('be.visible').click();
      })
  
  
  
  for (let i = 0; i < 6; i++) {
      cy.get(`[class="shopping_cart_link"]`).click();
    }
    cy.wait(3000); 
    cy.get('[class="shopping_cart_badge"]').should('be.visible').then(cartCountElement => {
      const cartCount = parseInt(cartCountElement.text(), 10);
      const expectedCount = 6;
      expect(cartCount).to.equal(expectedCount);
    });
    cy.get('[id="checkout"]') // Replace with the selector for the cart icon element
    .click();
  
  // Assertion to ensure navigation to the checkout page
  cy.url().should('include', '/checkout');
  // Typing into input fields
  cy.get('[id="first-name"]').type('modapuru').should('have.value', 'modapuru');
  cy.get('[id="last-name"]').type('subbarayudu').should('have.value', 'subbarayudu');
  cy.get('[id="postal-code"]').type('516501').should('have.value', '516501');
  cy.get('[id="continue"]').should('be.visible')
    .click();
      const taxRate =  10.40; 
      let totalPriceWithTax = 0;
      cy.get('[class="inventory_item_price"]').each(($price) => {
        const productPriceText = $price.text().replace('$', '').replace(',', '');
        const productPrice = parseFloat(productPriceText);
        if (!isNaN(productPrice)) {
          const productPriceWithTax = productPrice + taxRate; 
           totalPriceWithTax = productPriceWithTax; 
        }
      }).then(() => {
        
        cy.get('[class="summary_info_label summary_total_label"]').invoke('text').then((displayedTotal) => {
          const formattedDisplayedTotal = parseFloat(displayedTotal.replace('$', '').replace(',', '')); 
        });
      });
    
      cy.get('[name="finish"]').click();
      cy.get('[class="complete-header"]', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Thank you for your order!');
    
        cy.get('[id="react-burger-menu-btn"]').then(($blb1) => {
          cy.log($blb1)
          cy.wrap($blb1).click()
          function perfomanceValue(option, result) {
              option.contains(result).click()
          }
          const option2 = cy.get('[class="bm-item menu-item"]');
          const result2 = "Logout"
  
          perfomanceValue(option2, result2)
      })
  
      
    });
  });
  