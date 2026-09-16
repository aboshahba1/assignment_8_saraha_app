import {
    createBooksCollection,
    createAuthorsCollection,
    createCappedLogsCollection,
    createBooksTitleIndex,
    addBook,
    addBooksBatch,
    addLog,
    updateFutureBook,
    findBookByTitle,
    findBooksByYear,
    findBooksByGenre,
    getBooksSkipLimit,
    findBooksWithIntegerYear,
    findBooksExcludeGenres,
    deleteBooksBeforeYear,
    aggregateBooks1,
    aggregateBooks2,
    aggregateBooks3,
    aggregateBooks4
} from "./book.service.js";
// ============= q1 ===============================
export const createBooksCollectionController = async (req, res, next) => {
    try {
        const result = await createBooksCollection();

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q2 ===============================
export const createAuthorsCollectionController = async (req, res) => {
    try {
        const result = await createAuthorsCollection();

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q3 ===============================
export const createCappedLogsCollectionController = async (req, res) => {
    try {
        const result = await createCappedLogsCollection();

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q4 ===============================
export const createBooksTitleIndexController = async (req, res) => {
    try {
        const result = await createBooksTitleIndex();

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q5 ===============================
export const addBookController = async (req, res) => {
    try {
        const result = await addBook(req.body);

        res.status(201).json({
            message: "Book added successfully",
            insertedId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q6 ===============================
export const addBooksBatchController = async (req, res) => {
    try {
        const result = await addBooksBatch(req.body);

        res.status(201).json({
            message: "Books added successfully",
            insertedIds: result.insertedIds
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q7 ===============================
export const addLogController = async (req, res) => {
    try {
        const result = await addLog(req.body);

        res.status(201).json({
            message: "Log added successfully",
            insertedId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q8 ===============================
export const updateFutureBookController = async (req, res) => {
    try {
        const result = await updateFutureBook();

        res.status(200).json({
            message: "Future book updated successfully",
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q9 ===============================
export const findBookByTitleController = async (req, res) => {
    try {
        const { title } = req.query;

        const book = await findBookByTitle(title);

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q10 ===============================
export const findBooksByYearController = async (req, res) => {
    try {
        const { from, to } = req.query;

        const books = await findBooksByYear(from, to);

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q11 ===============================
export const findBooksByGenreController = async (req, res) => {
    try {
        const { genre } = req.query;

        const books = await findBooksByGenre(genre);

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q12 ===============================
export const getBooksSkipLimitController = async (req, res) => {
    try {
        const books = await getBooksSkipLimit();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q13 ===============================
export const findBooksWithIntegerYearController = async (req, res) => {
    try {
        const books = await findBooksWithIntegerYear();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q14 ===============================
export const findBooksExcludeGenresController = async (req, res) => {
    try {
        const books = await findBooksExcludeGenres();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q15 ===============================
export const deleteBooksBeforeYearController = async (req, res) => {
    try {
        const { year } = req.query;

        const result = await deleteBooksBeforeYear(year);

        res.status(200).json({
            message: "Books deleted successfully",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q16 ===============================
export const aggregateBooks1Controller = async (req, res) => {
    try {
        const books = await aggregateBooks1();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q17 ===============================
export const aggregateBooks2Controller = async (req, res) => {
    try {
        const books = await aggregateBooks2();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q18 ===============================
export const aggregateBooks3Controller = async (req, res) => {
    try {
        const books = await aggregateBooks3();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// ============= q19 ===============================
export const aggregateBooks4Controller = async (req, res) => {
    try {
        const books = await aggregateBooks4();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};