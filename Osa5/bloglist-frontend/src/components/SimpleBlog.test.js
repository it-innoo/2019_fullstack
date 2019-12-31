import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

//afterEach(cleanup)

test('renders title, author and likes', () => {
  const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    likes: 5
  }

  const component = render(
    <SimpleBlog
      blog={blog}
    />
  )

  component.debug()
  expect(component.container).toHaveTextContent(
    'First class tests Robert C. Martin'
  )

  expect(component.container).toHaveTextContent(
    'Robert C. Martin'
  )
  const element = component.getByText(
    'First class tests Robert C. Martin'
  )
  expect(element).toBeDefined()

  expect(component.container).toHaveTextContent(
    'blog has 5 likes'
  )
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    '5'
  )
})

test(
  'clicking like like button twice calls event handler twice',
  async () => {

    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 0
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })

