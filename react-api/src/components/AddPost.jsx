import { useEffect, useState } from "react";
import { tags } from "../posts";
import axios from "axios";

function AddPost() {
    const nuovoPost = {
        title: '',
        image: '',
        category: '',
        content: '',
        tags: [],
        isPublished: false,
    };

    const apiUrl = "http://localhost:3000";

    const [formData, setFormData] = useState(nuovoPost);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState(null);

    // Funzione per ottenere i post dal server
    const getPosts = () => {
        axios
            .get(apiUrl + "/examples")
            .then((res) => {
                console.log(res.data);
                setPosts(res.data.data);
            })
            .catch((error) => {
                console.error('Errore nel recupero dei post:', error);
            });
    };

    // Recupera i post quando il componente viene montato
    useEffect(() => {
        getPosts();
    }, []);

    // Gestione dell'input del form
    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Gestione dei tag selezionati
    const handleTags = (e) => {
        const { value, checked } = e.target;
        setFormData((prevState) => {
            const newTags = checked
                ? [...prevState.tags, value]
                : prevState.tags.filter((tag) => tag !== value);
            return { ...prevState, tags: newTags };
        });
    };

    const tagList = tags();

    // Funzione per inviare il nuovo post al server 
    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios
            .post(apiUrl + "/examples", formData) // Invio dei dati al server
            .then((res) => {
                setPosts((prevPosts) => [...prevPosts, formData]); // Aggiungi il nuovo post alla lista locale
                setNewPost(formData); // Imposta il nuovo post per la visualizzazione
                setFormData(nuovoPost); // Reset del form
            })
            .catch((error) => {
                console.error('Errore nel salvataggio del post:', error);
            });
    };

    // Funzione per eliminare il nuovo post
    const handleDeletePost = () => {
        setNewPost(null);
    };

    return (
        <section className="my-4">
            {newPost && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h4>{newPost.title}</h4>
                        {newPost.image && <img src={newPost.image} alt={newPost.title} />}
                        <p><strong>Categoria:</strong> {newPost.category}</p>
                        <p>{newPost.content}</p>
                        <p><strong>Tags:</strong> {newPost.tags.join(", ")}</p>
                        <p><strong>Pubblicato:</strong> {newPost.isPublished ? "Sì" : "No"}</p>
                        <button onClick={handleDeletePost} className="btn btn-danger">
                            Elimina questo post
                        </button>
                    </div>
                </div>
            )}

            <h2>Aggiungi nuovo post</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Titolo
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={formData.title}
                        onChange={handleInput}
                        name="title"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Immagine
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        value={formData.image}
                        onChange={handleInput}
                        name="image"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Categoria
                    </label>
                    <select
                        className="form-control"
                        id="category"
                        value={formData.category}
                        onChange={handleInput}
                        name="category"
                    >
                        <option value="">Seleziona una categoria</option>
                        <option value="lorem">lorem</option>
                        <option value="ipsum">ipsum</option>
                        <option value="dolor">dolor</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Contenuto
                    </label>
                    <textarea
                        className="form-control"
                        id="content"
                        value={formData.content}
                        onChange={handleInput}
                        name="content"
                        rows="4"
                    />
                </div>

                <div className="card p-4">
                    <label className="form-label">Tags</label>
                    {tagList.map((tag) => (
                        <div className="mb-3 form-check" key={tag}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`tag-${tag}`}
                                name="tags"
                                onChange={handleTags}
                                value={tag}
                                checked={formData.tags.includes(tag)}
                            />
                            <label className="form-check-label" htmlFor={`tag-${tag}`}>
                                {tag}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="isPublished"
                        name="isPublished"
                        onChange={handleInput}
                        checked={formData.isPublished}
                    />
                    <label className="form-check-label" htmlFor="isPublished">
                        Pubblica l'articolo
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </section>
    );
}

export default AddPost;
