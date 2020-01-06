import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 5,
    user: [
      { name: 'Arto Hellas' }
    ]
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} >
        <div className="testDiv" />
      </Blog>
    )
  })

  it('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  it('at start renders only title and author by default', () => {

    expect(component.container).toHaveTextContent(
      'First class tests Robert C. Martin'
    )


  })

  it('renders all info by clicking', () => {

    //    component.debug()

    expect(component.container).toBeDefined()
    expect(component.container).toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
    )

  })
})