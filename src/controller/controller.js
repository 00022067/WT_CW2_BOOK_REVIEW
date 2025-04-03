import { readFileCustom } from "../helpers/read-helper.js";
import { writeFileCustom } from "../helpers/write-helper.js";

export default {
    MAIN_PAGE: (_, res) => {
        const allBooks = readFileCustom("books.json");
        res.render("main.ejs", { allBooks });
    },

    CREATE_BOOK: (req, res) => {
        const { title, author, genre } = req.body;
        console.log("Incoming Data:", req.body);

        if (!title || !author || !genre) {
            return res.status(400).json({ message: "All book fields are required" });
        }

        const allBooks = readFileCustom("books.json");

        if (allBooks.find((book) => book.title === title)) {
            return res.status(400).json({ message: "Book already exists" });
        } else {
            allBooks.push({
                id: (allBooks.length > 0 ? allBooks.at(-1).id + 1 : 1),  
                title,
                author,
                genre
            });

            writeFileCustom("books.json", allBooks);
            res.redirect("/api/main");
        }
    },

    UPDATE_BOOK: (req, res) => {
        const { id } = req.params;
        const { title, author, genre } = req.body;

        if (!title || !author || !genre) {
            return res.status(400).json({ message: "All book fields are required" });
        }

        const allBooks = readFileCustom("books.json");
        const bookIndex = allBooks.findIndex((book) => book.id === Number(id)); //Fixed type mismatch

        if (bookIndex === -1) {
            return res.status(404).json({ message: "Book not found" });
        } else {
            allBooks[bookIndex] = { id: Number(id), title, author, genre };
            writeFileCustom("books.json", allBooks);
            res.redirect("/api/main");
        }
    },

    DELETE_BOOK: (req, res) => {
        const { id } = req.params;
        const allBooks = readFileCustom("books.json");
        const bookIndex = allBooks.findIndex((book) => book.id === Number(id)); // ✅ Fixed type mismatch

        if (bookIndex === -1) {
            return res.status(404).json({ message: "Book not found" });
        } else {
            allBooks.splice(bookIndex, 1);
            writeFileCustom("books.json", allBooks);
            res.redirect("/api/main");
        }
    }
};
