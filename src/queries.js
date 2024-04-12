import { gql } from '@apollo/client';

export const queries = {
    GET_TODOS: gql`
      query {
        todos {
          data{
            id
            title
            completed
            user{
                name
            }
          }
        }
      }
    `,
    GET_TODO: gql`
      query ($id: ID!) {
        todo(id: $id) {
            id
            title
            completed
            user{
                name
            }
          }
        }
    `,

} 