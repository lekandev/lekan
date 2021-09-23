console.log("Lekan is Live");

// Sidebar toggle
const sideNav = document.querySelector(".fa-bars");
const submitBtn = document.querySelector(".submit");
const thankYou = document.querySelector(".thank-you-msg");

sideNav.addEventListener("click", () => {
    sideNav.classList.toggle("fa-times");
});

// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
   navigator.serviceWorker.register('../sw.js').then( () => {
    console.log('Service Worker Registered')
   })
 })
}
// Blog Posts section functionality
const blogPostContainer = document.querySelector(".blog-posts__container");

const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "lekandev") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                }
            }
        }
    }
`;

async function gql(query, variables={}) {
    const data = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return data.json();
}

gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        const articles = result.data.user.publication.posts;

        // console.log(articles);

        // for (i = 0; i < article.length; i++) { console.log(article[i]); }
        // let blogPost = document.createElement('div');
        // blogPost.classList.add("blog-posts__post")

        articles.slice(0, 6).forEach(article => {
            let blogPost = document.createElement('div')
            blogPost.classList.add('blog-posts__post')

            blogPostContainer.appendChild(blogPost)

            let blogPostTitle = document.createElement('h2');
            blogPostTitle.classList.add("blog-posts__post--title")
            blogPostTitle.innerText = article.title;

            let blogPostBrief = document.createElement('p');
            blogPostBrief.classList.add("blog-posts__post--brief")
            blogPostBrief.innerText = article.brief;

            let blogPostLink = document.createElement('a');
            blogPostLink.classList.add("blog-posts__post--link")
            blogPostLink.innerText = 'View';
            blogPostLink.href = `https://lekandev.hashnode.dev/${article.slug}`;

            blogPost.appendChild(blogPostTitle);
            blogPost.appendChild(blogPostBrief);
            blogPost.appendChild(blogPostLink);
        })
});

// Load more Projects functionality
const loadMore;