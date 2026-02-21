export const client = {
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  
  // Fetch all posts
  async getPosts() {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      content
    }`;
    
    const url = `https://${this.projectId}.api.sanity.io/v1/data/query/${this.dataset}?query=${encodeURIComponent(query)}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.SANITY_TOKEN}`,
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    return data.result || [];
  },
  
  // Fetch a single post by slug
  async getPostBySlug(slug: string) {
    const query = `*[_type == "post" && slug.current == "${slug}"][0]`;
    
    const url = `https://${this.projectId}.api.sanity.io/v1/data/query/${this.dataset}?query=${encodeURIComponent(query)}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.SANITY_TOKEN}`,
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    return data.result;
  }
};
