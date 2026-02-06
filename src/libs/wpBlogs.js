import siteConfig from "@/config/siteConfig";
import GET_POSTS_QUERY, { GET_LATEST_POST_QUERY } from "@/libs/blogQueries";

const API_URL = `${siteConfig.blogApiUrl}/graphql`;

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 },
      // cache: "no-store", // Disabled to allow ISR
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch API: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error(`API Error: Received non-JSON response from ${API_URL}`);
      throw new Error(`API returned non-JSON response`);
    }

    const json = await res.json();
    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      throw new Error("Failed to fetch API");
    }
    return json.data;
  } catch (error) {
    console.error("Fetch API Internal Error:", error);
    throw error;
  }
}

export async function getAllBlogs(categoryName = null, limit = 20) {
  const safeLimit = Number.isFinite(Number(limit))
    ? Math.max(1, Math.min(50, Number(limit)))
    : 20;
  const query = categoryName
    ? `
    query AllPosts($categoryName: String, $first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC }, categoryName: $categoryName }) {
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
              slug
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
    : `
    query AllPosts($first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
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
              slug
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
    `;

  const data = await fetchAPI(query, {
    variables: categoryName ? { categoryName, first: safeLimit } : { first: safeLimit },
  });

  const posts = data?.posts?.nodes;

  return (
    posts?.map((post) => {
      const date = new Date(post.date);
      return {
        id: post.slug,
        featuredImage: post.featuredImage?.node?.sourceUrl || null,
        title: post.title || "",
        desc: post.excerpt || "",
        author: post.author?.node?.name || "enfycon",
        authorSlug: post.author?.node?.slug || "enfycon",
        day: date.getDate(),
        month: date.toLocaleString("en-US", { month: "short" }),
        year: date.getFullYear(),
        category: post.categories?.nodes[0]?.name || "Technology",
        categorySlug: post.categories?.nodes[0]?.slug || "technology",
      };
    }) || []
  );
}

export async function getBlogBySlug(slug) {
  try {
    const data = await fetchAPI(
      `
      query PostBySlug($id: ID!) {
        post(id: $id, idType: SLUG) {
          id
          title
          slug
          date
          commentCount
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
              slug
              avatar {
                url
              }
              description
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          tags {
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
      authorSlug: post.author?.node?.slug || "enfycon",
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "short" }),
      year: date.getFullYear(),
      category: post.categories?.nodes[0]?.name || "Technology",
      categorySlug: post.categories?.nodes[0]?.slug || "technology",
      tags: post.tags?.nodes?.map(tag => tag.name) || [],
      commentCount: post.commentCount || 0,
      avatar: post.author?.node?.avatar?.url || null,
      authorDesc: post.author?.node?.description || "",
    };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}




export async function getBlogPageData(category = null, author = null) {
  try {
    let query = "";
    let variables = {};

    if (category) {
      query = `
        query BlogPageData($categoryName: String) {
          latestPosts: posts(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
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
                  slug
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
          posts: posts(first: 15, after: null, where: { orderby: { field: DATE, order: DESC }, categoryName: $categoryName }) {
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
                  slug
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
      variables = { categoryName: category };
    } else if (author) {
      query = `
        query BlogPageData($authorName: String) {
          latestPosts: posts(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
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
                  slug
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
          posts: posts(first: 15, after: null, where: { orderby: { field: DATE, order: DESC }, authorName: $authorName }) {
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
                  slug
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
      variables = { authorName: author };
    } else {
      query = `
        query BlogPageData {
          latestPosts: posts(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
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
                  slug
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
          posts: posts(first: 15, after: null, where: { orderby: { field: DATE, order: DESC } }) {
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
                  slug
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
    }

    const data = await fetchAPI(query, { variables });

    const latestPost = data?.latestPosts?.nodes?.[0] || null;
    const postsData = data?.posts;

    return {
      latestPost,
      posts: postsData,
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export async function getAllAuthors() {
  try {
    const data = await fetchAPI(
      `
      query GetAllAuthors {
        users(first: 100, where: { hasPublishedPosts: POST }) {
          nodes {
            id
            name
            slug
            avatar {
              url
            }
          }
        }
      }
    `
    );

    return data?.users?.nodes || [];
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
}

export async function getCategoryCounts() {
  try {
    const data = await fetchAPI(
      `
      query CategoryCounts {
        categories(first: 100, where: { orderby: COUNT, order: DESC, hideEmpty: true }) {
          nodes {
            name
            slug
            count
          }
        }
      }
    `
    );

    return data?.categories?.nodes || [];
  } catch (error) {
    console.error("Error fetching category counts:", error);
    return [];
  }
}

export async function getRelatedPosts(category, currentSlug) {
  try {
    const data = await fetchAPI(
      `
      query RelatedPosts($categoryName: String, $notIn: [ID]) {
        posts(first: 6, where: { orderby: { field: DATE, order: DESC }, categoryName: $categoryName, notIn: $notIn }) {
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
                slug
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
    `,
      {
        variables: {
          categoryName: category,
          notIn: [currentSlug]
        },
      }
    );

    // If query fails or we decide to filter in JS:
    const posts = data?.posts?.nodes || [];
    const filtered = posts.filter(post => post.slug !== currentSlug).slice(0, 5);

    return filtered.map((post) => {
      const date = new Date(post.date);
      return {
        id: post.slug,
        featuredImage: post.featuredImage?.node?.sourceUrl || null,
        title: post.title || "",
        desc: post.excerpt || "",
        author: post.author?.node?.name || "enfycon",
        authorSlug: post.author?.node?.slug || "enfycon",
        day: date.getDate(),
        month: date.toLocaleString("en-US", { month: "short" }),
        year: date.getFullYear(),
        category: post.categories?.nodes[0]?.name || "Technology",
        categorySlug: post.categories?.nodes[0]?.slug || "technology",
      };
    });

  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}
