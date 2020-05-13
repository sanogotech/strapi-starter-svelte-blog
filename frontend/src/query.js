import gql from "graphql-tag";

export const GET_ARTICLES = gql`
  {
    articles {
      id
      title
      content
      image {
        url
      }
      published_at
    }
  }
`;
