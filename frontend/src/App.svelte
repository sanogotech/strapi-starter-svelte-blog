<script>
  import apolloClient from "./svelte-apollo";
  import { setClient, getClient, query } from "svelte-apollo";
  import { GET_ARTICLES } from "./query.js";
  import moment from "moment";

  let api_url = process.env.SVELTE_APP_STRAPI_API_URL;

  setClient(apolloClient);

  const client = getClient();
  const articles = query(client, { query: GET_ARTICLES });

</script>

<style>
  h1 {
    font-family: Staatliches, sans-serif;
    font-size: 5rem;
  }
  h2 {
    letter-spacing: 0.4px;
    font-size: 22px;
    font-size: 1.375rem;
    line-height: 1.13636;
  }
  img:hover {
    border: solid 1px red;
    opacity: 1;
    transition: opacity 0.25s cubic-bezier(0.39, 0.575, 0.565, 1);
  }
</style>

<h1>Strapi Blog</h1>


<div>

  {#await $articles}
    <div>Loading...</div>
  {:then result}
    {#each result.data.articles as article (article.id)}
      <div>
        <img src={api_url + article.image.url} alt="" height="100" />
        <h2>{article.title}</h2>
        <span>{article.published_at}</span>
        {moment(article.published_at).fromNow()}
      </div>
    {:else}
      <div>No articles found</div>
    {/each}
  {:catch error}
    <div>Error loading articles: {error}</div>
  {/await}
</div>
