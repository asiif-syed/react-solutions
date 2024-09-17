export const fetchPaginatedPosts = async (limit, skip) => {
    const url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
    const response = await fetch(url)
    const data = await response.json()
    return data;
}