import { gql } from '@apollo/client';

export const GET_REPOS = (query) => gql`
  {
    search(${query}) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            description
            owner {
              login
            }
            languages(first: 5) {
              nodes {
                name
              }
            }
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
            releases(first: 5) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
