console.log("Lekan is Live");
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

        for (i = 0; i < article.length; i++) { console.log(article[i]); }
        // let container = document.createElement('div');

        // articles.forEach(article => {
        //     let title = document.createElement('h2');
        //     title.innerText = article.title;

        //     let brief = document.createElement('p');
        //     brief.innerText = article.brief;

        //     let link = document.createElement('a');
        //     link.innerText = 'Read more...';
        //     link.href = `https://catalins.tech/${article.slug}`;

        //     container.appendChild(title);
        //     container.appendChild(brief);
        //     container.appendChild(link);
        // })

        // document.querySelector('.app').appendChild(container);
});