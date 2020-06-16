describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user2 = {
      name: 'Juhana Kuparinen',
      username: 'jmkupa',
      password: 'salainen666'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to Application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('.message')
        .should('contain', 'Logged in!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains('logout').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.errorMessage')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'Cypress testailua 1',
        author: 'Juhana',
        url: 'http://localhost:3001/api/testing/reset',
        likes: 1
      })
    })

    it('A blog can be created', function() {
      cy.contains('create a blog').click()
      cy.get('#title').type('Cypress testailua')
      cy.get('#author').type('Meitsi')
      cy.get('#url').type('http://localhost:3001/api/testing/reset')
      cy.get('#submit-blog').click()
      cy.contains('logout').click()
    })

    it('A blog can be liked', function() {
      cy.contains('show more...').click()
      cy.get('.likeBlog').click()
    })

    it('A blog can be removed by the author', function() {
      cy.contains('show more...').click()
      cy.get('#removeBlog').click()
    })

    it('A blog cant be removed by others than the author', function() {
      cy.contains('logout').click()
      cy.login({ username: 'jmkupa', password: 'salainen666' })
      cy.visit('http://localhost:3000')
      cy.contains('show more...').click()
      cy.get('#removeBlog').should('not.contain', 'remove blog')
    })

    it('Most liked blog is shown to on top of the page', function() {
      cy.createBlog({
        title: 'Cypress testailua 5',
        author: 'Juhana',
        url: 'http://localhost:3001/api/testing/reset',
        likes: 5
      })
      cy.createBlog({
        title: 'Cypress testailua 4',
        author: 'Juhana',
        url: 'http://localhost:3001/api/testing/reset',
        likes: 4
      })
      cy.createBlog({
        title: 'Cypress testailua 3',
        author: 'Juhana',
        url: 'http://localhost:3001/api/testing/reset',
        likes: 3
      })
      cy.createBlog({
        title: 'Cypress testailua 2',
        author: 'Juhana',
        url: 'http://localhost:3001/api/testing/reset',
        likes: 2
      })
      cy.get('.blog').then( blogs => {
        console.log('number of blogs', blogs.length)
        console.log(blogs)
        for(let i = 0; i < blogs.length; i++){
          expect(blogs[i].innerText).to.equal(`Cypress testailua ${5-i} Juhana show more...`)
        }
      })
    })
  })
})