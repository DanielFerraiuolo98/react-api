import { useState } from "react";

const initialBlog = {
    title: "",
    image: "",
    description: "",
};

function MyForm() {
    const [blog, setBlog] = useState(initialBlog);
    const [blogList, setBlogList] = useState([]);

    function handleInput(e) {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setBlog({ ...blog, [e.target.name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setBlogList([...blogList, blog]);
        setBlog(initialBlog); // Reset the form after submit
    }

    return (
        <section className="my-4">
            <h2>Work with htmlForms</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="blogTitle" className="form-label">
                        Titolo
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="blogTitle"
                        value={blog.title}
                        onChange={handleInput}
                        name="title"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="blogDescription" className="form-label">
                        Descrizione
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="blogDescription"
                        value={blog.description}
                        onChange={handleInput}
                        name="description"
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="userPremium"
                        name="premium"
                        onChange={handleInput}
                    />
                    <label className="form-check-label" htmlFor="userPremium">
                        Check me out
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

            <div className="mt-4">
                <h3>Lista degli Articoli</h3>
                <ul className="list-group">
                    {blogList.map((blogItem, index) => (
                        <li key={index} className="list-group-item">
                            <h5>{blogItem.title}</h5>
                            <p>{blogItem.description}</p>
                            {blogItem.premium && (
                                <span className="badge bg-success">Premium</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default MyForm;



