describe('Network Request', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/network-requests')
    })

    it('Get Request', () => {
        cy.intercept({
            method: 'GET',
            url: '**/comments/*', },
            {
               body:{
                   postId: 1,
                   id:1,
                   name: 'test',
                   email: 'email@example.com',
                   body: 'Hello World!'
               }
        }).as('getComments')

        cy.get('.network-btn').click()
        cy.wait('@getComments').its('response.statusCode').should('eq', 200);
    });

    it('Post Request', () => {
    cy.intercept('POST', '/comments').as('postComment');
        cy.get('.network-post').click()

        cy.wait('@postComment').should(({request, response}) => {
            expect(request.body).include('email');
            expect(response.body).to.have.property('name','Using POST in cy.intercept()');
            expect(request.headers).to.have.property('content-type');
            expect(request.headers).to.have.property('origin', 'https://example.cypress.io');
        })
    });
})