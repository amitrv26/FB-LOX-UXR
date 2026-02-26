/**
 * Facebook GraphQL API Client
 * For fetching real Facebook data (Groups, Marketplace, Pages, Reels)
 */

// Facebook GraphQL endpoint
const GRAPHQL_ENDPOINT = "https://www.internalfb.com/api/graphql/";

/**
 * Groups SEO Search Query
 */
const GROUPS_SEO_QUERY = `
query GroupsSEOPostSearch(
  $input: GroupsSEOPostsQueryArgs!
  $comment_ranking: CommentOrderingMode
) {
  groups_seo_search_results(input: $input) {
    nodes {
      ...StoryFragment
      group_logged_out_related_discussions {
        nodes {
          ...StoryFragment
        }
      }
    }
  }
}

fragment AuthorFragment on Actor {
  name
  id
  profile_picture {
    uri
  }
}

fragment StoryFragment on Story {
  id
  target_group {
    name
    id
    group_member_profiles {
      count
    }
  }
  post_llm_title
  message {
    text
  }
  actors {
    ...AuthorFragment
  }
  creation_time
  attachments {
    media {
      image {
        uri
      }
      is_playable
      playable_url
    }
  }
  feedback {
    ...FeedbackFragment
    display_comments(comment_order: $comment_ranking, first: 5) {
      count
      nodes {
        id
        author {
          ...AuthorFragment
        }
        body {
          text
        }
        feedback {
          ...FeedbackFragment
        }
        created_time
        interesting_replies {
          count
          nodes {
            author {
              ...AuthorFragment
            }
            body {
              text
            }
            feedback {
              ...FeedbackFragment
            }
            interesting_replies {
              count
              nodes {
                author {
                  ...AuthorFragment
                }
                body {
                  text
                }
                feedback {
                  ...FeedbackFragment
                }
              }
            }
          }
        }
      }
    }
  }
}

fragment FeedbackFragment on Feedback {
  reaction_count
  reactions_summary {
    feedback_reaction {
      name
    }
    reactors {
      count
    }
  }
}
`;

/**
 * Execute a GraphQL query against Facebook's API
 */
async function executeQuery(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include", // Include cookies for auth on internalfb.com
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error(data.errors[0]?.message || "GraphQL query failed");
    }

    return data.data;
  } catch (error) {
    console.error("Failed to execute GraphQL query:", error);
    throw error;
  }
}

/**
 * Search Groups SEO posts
 * @param {string} queryString - Search query string (e.g., "family friendly hotels tokyo")
 */
export async function searchGroupsSEO(queryString) {
  const variables = {
    input: {
      query_string: queryString,
    },
    comment_ranking: "RANKED_THREADED",
  };

  const data = await executeQuery(GROUPS_SEO_QUERY, variables);
  
  // Transform the response to a simpler format for the UI
  const results = data?.groups_seo_search_results?.nodes || [];
  
  return results.map((story) => ({
    id: story.id,
    type: "group",
    title: story.post_llm_title || truncateText(story.message?.text, 80),
    description: story.message?.text || "",
    groupName: story.target_group?.name || "Facebook Group",
    groupId: story.target_group?.id,
    memberCount: story.target_group?.group_member_profiles?.count,
    author: {
      name: story.actors?.[0]?.name || "Unknown",
      id: story.actors?.[0]?.id,
      profilePicture: story.actors?.[0]?.profile_picture?.uri,
    },
    createdTime: story.creation_time,
    image: story.attachments?.[0]?.media?.image?.uri,
    isVideo: story.attachments?.[0]?.media?.is_playable || false,
    videoUrl: story.attachments?.[0]?.media?.playable_url,
    reactions: story.feedback?.reaction_count || 0,
    reactionsSummary: story.feedback?.reactions_summary || [],
    comments: story.feedback?.display_comments?.count || 0,
    topComments: (story.feedback?.display_comments?.nodes || []).map(comment => ({
      id: comment.id,
      author: {
        name: comment.author?.name,
        profilePicture: comment.author?.profile_picture?.uri,
      },
      text: comment.body?.text,
      createdTime: comment.created_time,
      reactions: comment.feedback?.reaction_count || 0,
      replies: comment.interesting_replies?.nodes || [],
    })),
    relatedDiscussions: (story.group_logged_out_related_discussions?.nodes || []).map((related) => ({
      id: related.id,
      title: related.post_llm_title || truncateText(related.message?.text, 60),
      groupName: related.target_group?.name,
      groupId: related.target_group?.id,
    })),
  }));
}

/**
 * Helper to truncate text
 */
function truncateText(text, maxLength) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Format member count for display
 */
export function formatMemberCount(count) {
  if (!count) return "";
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M members`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K members`;
  return `${count} members`;
}

/**
 * Search all Facebook surfaces (Groups, Marketplace, Pages, Reels)
 * TODO: Add queries for other surfaces when available
 */
export async function searchAllSurfaces(queryString) {
  const results = {
    groups: [],
    marketplace: [],
    pages: [],
    reels: [],
  };

  try {
    // Fetch Groups results
    results.groups = await searchGroupsSEO(queryString);
  } catch (error) {
    console.error("Failed to fetch groups:", error);
  }

  // TODO: Add Marketplace search when query is available
  // TODO: Add Pages search when query is available
  // TODO: Add Reels search when query is available

  return results;
}

export { GRAPHQL_ENDPOINT, GROUPS_SEO_QUERY };
