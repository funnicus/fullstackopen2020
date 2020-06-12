import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders content', () => {

    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Juhana Kuparinen',
      url: 'homppeli.com',
      likes: 10,
      user: null
    }

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
      'Juhana Kuparinen'
    )
  })

  test('clicking the button "show more..." shows more info (sets display to none)', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Juhana Kuparinen',
      url: 'homppeli.com',
      likes: 10,
      user: null
    }

    const component = render(
      <Blog blog={blog} />
    )

    const div = component.container.querySelector('.showMore')

    expect(div).toHaveStyle('display: none')

    const button = component.getByText('show more...')
    //console.log(prettyDOM(button))
    fireEvent.click(button)

    expect(div).not.toHaveStyle('display: none')
  })

  test('Clickin like blog button twice fires the event twice...', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Juhana Kuparinen',
      url: 'homppeli.com',
      likes: 10,
      user: null
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} likeBlog={mockHandler} />
    )

    const button = component.container.querySelector('.likeBlog')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})