import { gql } from '@apollo/client';

export const LIKED_REPOS = gql`
  query MyQuery($likedRepoIds: [ID!]!) {
    nodes(ids: $likedRepoIds) {
      ... on Repository {
        id
        name
        owner {
          login
        }
        openGraphImageUrl
      }
    }
  }
`;
