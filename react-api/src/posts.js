const posts = [
    {
        id: 1,
        title: "Titolo del Post",
        image: '',
        categoria: "",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.",
        tags: ["html", "css"],
        published: true,
    },
    {
        id: 2,
        title: "Titolo del Post",
        image: '',
        categoria: "",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.",
        tags: ["js", "css"],
        published: true,
    },
    {
        id: 3,
        title: "Titolo del Post",
        image: '',
        categoria: "",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.",
        tags: ["js", "php"],
        published: true,
    },
    {
        id: 4,
        title: "Titolo del Post",
        image: '',
        categoria: "",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.",
        tags: ["html"],
        published: false,
    },
];

function tags() {
    let tagsList = [];
    posts.forEach((el) => {
        el.tags.forEach((tag) => {
            if (!tagsList.includes(tag)) {
                tagsList.push(tag);
            }
        });
    });
    return tagsList;
}

console.log(tags());

function filterItems(items, query) {
    query = query.toLowerCase();
    return items.filter(item =>
        item.title && item.title.toLowerCase().includes(query)
    );
}

export { posts, tags, filterItems };