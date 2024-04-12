import { gql } from '@apollo/client';

export const mutations = {
    ADD_TODO: gql`
        mutation ($title: String!, $completed: Boolean!) {
            createTodo(input:{title: $title, completed: $completed}) {
                id
                title
                completed
                user {
                    name
                }
            }
        }
    `,
    UPDATE_TODO: gql`
        mutation ($id: ID!, $title: String!, $completed: Boolean!) {
            updateTodo(id: $id, input:{title: $title, completed: $completed}) {
                id
                title
                completed
                user {
                    name
                }
            }
        }
    `,
    DEL_TODO: gql`
        mutation ($id: ID!) {
            deleteTodo(id: $id) 
        }
    `,

}