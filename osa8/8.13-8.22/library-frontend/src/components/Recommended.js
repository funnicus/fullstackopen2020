import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, USER } from '../queries'

const Recommended = (props) => {
    const userResult = useQuery(USER)

    const result = useQuery(ALL_BOOKS, {
        pollInterval: 500000
    })
    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>Loading...</div>
    }

    const books = result.data.allBooks
    const favoriteGenre = userResult.data.me.favoriteGenre

    return (
        <div>
            <h2>Books recommended for you!</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {books.filter(b => b.genres.indexOf(favoriteGenre) > -1).map(b =>
                        <tr key={b.title}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended