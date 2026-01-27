export const QUERY_USERS = `
  query GetUsers {
    users {
      id
      name
      orders {
        id
        totalAmount
      }
    }
  }
`;

export const QUERY_USERS_PAGINATED = `
  query GetUsersPaginated($limit: Int!, $cursor: String) {
    usersPaginated(limit: $limit, cursor: $cursor) {
      edges {
        node {
          id
          name
          orders {
            id
            totalAmount
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const MUTATION_SEED = `
  mutation SeedDatabase {
    seedDatabase
  }
`;

export const MUTATION_TOGGLE_NPLUS1 = `
  mutation ToggleNPlus1($enable: Boolean!) {
    toggleNPlus1Refactor(enable: $enable)
  }
`;

export const MUTATION_TOGGLE_INDEXING = `
  mutation ToggleIndexing($enable: Boolean!) {
    toggleIndexing(enable: $enable)
  }
`;
