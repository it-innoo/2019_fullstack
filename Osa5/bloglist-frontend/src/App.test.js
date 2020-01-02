import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  describe('when no user logged in', () => {
    it('shows login button', async () => {
      const component = render(
        <App />
      )
      component.rerender(<App />)

      await waitForElement(
        () => component.container.querySelector('.btn-login')
      )

      // expectations here
      let button = component
        .container
        .querySelector('.btn-login')

      expect(button).toBeDefined()
    })

    it('renders no blogs', async () => {
      const component = render(
        <App />
      )
      component.rerender(<App />)

      await waitForElement(
        () => component.container.querySelector('main')
      )

      // expectations here
      let blogs = component
        .container
        .querySelector('article')

      expect(blogs).toBeNull()
    })
  })
})