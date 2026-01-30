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
      next: { revalidate: 60 }
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

export async function getAllBlogs(categoryName = null) {
  const data = await fetchAPI(
    `
    query AllPosts($categoryName: String, $hasCategory: Boolean!) {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC }, categoryName: $categoryName }) @include(if: $hasCategory) {
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
      latestPosts: posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) @skip(if: $hasCategory) {
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
  `,
    {
      variables: {
        categoryName,
        hasCategory: !!categoryName
      },
    }
  );

  const posts = categoryName ? data?.posts?.nodes : data?.latestPosts?.nodes;

  return (
    posts?.map((post) => {
      const date = new Date(post.date);
      return {
        id: post.slug,
        featuredImage: post.featuredImage?.node?.sourceUrl || null,
        title: post.title || "",
        desc: post.excerpt || "",
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
              avatar {
                url
              }
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
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "short" }),
      year: date.getFullYear(),
      category: post.categories?.nodes[0]?.name || "Technology",
      tags: post.tags?.nodes?.map(tag => tag.name) || [],
      commentCount: post.commentCount || 0,
      avatar: post.author?.node?.avatar?.url || null,
    };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}




export async function getBlogPageData(category = null) {
  try {
    const data = await fetchAPI(
      `
      query BlogPageData($categoryName: String, $hasCategory: Boolean!) {
        latestPosts: posts(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
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
        posts: posts(first: 15, after: null, where: { orderby: { field: DATE, order: DESC }, categoryName: $categoryName }) @include(if: $hasCategory) {
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
          pageInfo {
            hasNextPage
            endCursor
          }
        }
        allPosts: posts(first: 15, after: null, where: { orderby: { field: DATE, order: DESC } }) @skip(if: $hasCategory) {
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
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
      {
        variables: {
          categoryName: category,
          hasCategory: !!category,
        },
      }
    );

    const latestPost = data?.latestPosts?.nodes?.[0] || null;
    const postsData = category ? data?.posts : data?.allPosts;

    return {
      latestPost,
      posts: postsData,
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
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
