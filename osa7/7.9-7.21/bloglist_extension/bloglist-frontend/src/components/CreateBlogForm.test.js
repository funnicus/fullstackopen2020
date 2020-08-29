import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm />', () => {

  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <CreateBlogForm handleCreate={mockHandler} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Create a new Blog'
    )
  })

  test('Callback function handleCreate receives correct values', () => {

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(author, {
      target: { value: 'Juhana Kuparinen' }
    })
    fireEvent.change(url, {
      target: { value: 'http://localhost:3000/' }
    })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('testing of forms could be easier')
    expect(mockHandler.mock.calls[0][0].author).toBe('Juhana Kuparinen')
    expect(mockHandler.mock.calls[0][0].url).toBe('http://localhost:3000/')
    console.log(mockHandler.mock.calls)
  })
})