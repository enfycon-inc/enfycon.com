const API_URL = "https://enfycon.com/graphql";

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getAllBlogs() {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `
  );

  return (
    data?.posts?.nodes.map((post) => {
      const date = new Date(post.date);
      return {
        id: post.slug,
        featuredImage: post.featuredImage?.node?.sourceUrl || null,
        title: post.title,
        desc: post.excerpt,
        author: post.author?.node?.name || "enfycon",
        day: date.getDate(),
        month: date.toLocaleString("en-US", { month: "short" }),
        year: date.getFullYear(),
        category: post.categories?.nodes[0]?.name || "Technology",
      };


    }) || []
  );
}

export async function getBlogBySlug(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        id
        title
        slug
        date
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `,
    {
      variables: { id: slug },
    }
  );

  if (!data?.post) return null;

  const post = data.post;
  const date = new Date(post.date);
  return {
    id: post.slug,
    featuredImage: post.featuredImage?.node?.sourceUrl || null,
    title: post.title,
    desc: post.excerpt,
    content: post.content,
    author: post.author?.node?.name || "enfycon",
    day: date.getDate(),
    month: date.toLocaleString("en-US", { month: "short" }),
    year: date.getFullYear(),
    category: post.categories?.nodes[0]?.name || "Technology",
  };


}
