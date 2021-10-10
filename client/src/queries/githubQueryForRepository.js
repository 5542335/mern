import { gql } from '@apollo/client';

export const getRepositoryQuery = (name, owner) => gql`
{
  repository(name: "${name}", owner: "${owner}") {
    id
    createdAt
    description
    watchers {
      totalCount
    }
    languages(first: 10) {
      totalCount
      totalSize
      nodes {
        name
      }
      edges {
        size
        node {
          name
        }
      }
    }
    latestRelease {
      name
    }
    primaryLanguage {
      name
    }
    homepageUrl
    licenseInfo {
      description
    }
    repositoryTopics(first: 5) {
      nodes {
        topic {
          name
          stargazerCount
        }
      }
      totalCount
    }
    diskUsage
    pushedAt
    securityPolicyUrl
    openGraphImageUrl
    stargazerCount
  }
}
`;
