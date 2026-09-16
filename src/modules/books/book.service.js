import { client } from "../../DB/connectionDB.js";
// ============= q1 ===============================
export const createBooksCollection = async () => {
    const db = client.db("assignment_7");

    const collections = await db
        .listCollections({ name: "books" })
        .toArray();

    if (collections.length > 0) {
        return {
            message: "books collection already exists"
        };
    }

    await db.createCollection("books", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title"],
                properties: {
                    title: {
                        bsonType: "string",
                        minLength: 1
                    }
                }
            }
        },
        validationLevel: "strict",
        validationAction: "error"
    });

    return {
        message: "books collection created successfully"
    };
};
// ============= q2 ===============================
export const createAuthorsCollection = async () => {
    const db = client.db("assignment_7");

    const result = await db.collection("authors").insertOne({
        name: "ahmed said"
    });

    return {
        message: "authors collection created implicitly",
        insertedId: result.insertedId
    };
};
// ============= q3 ===============================
export const createCappedLogsCollection = async () => {
    const db = client.db("assignment_7");

    const collections = await db
        .listCollections({ name: "logs" })
        .toArray();

    if (collections.length > 0) {
        return {
            message: "logs collection already exists"
        };
    }

    await db.createCollection("logs", {
        capped: true,
        size: 1024 * 1024
    });

    return {
        message: "capped logs collection created successfully"
    };
};
// ============= q4 ===============================
export const createBooksTitleIndex = async () => {
    const db = client.db("assignment_7");

    const result = await db.collection("books").createIndex({
        title: 1
    });

    return {
        message: "index created successfully",
        indexName: result
    };
};
// ============= q5 ===============================
export const addBook = async (bookData) => {
    const db = client.db("assignment_7");

    const result = await db.collection("books").insertOne(bookData);

    return result;
};
// ============= q6 ===============================
export const addBooksBatch = async (books) => {
    const db = client.db("assignment_7");

    const result = await db.collection("books").insertMany(books);

    return result;
};
// ============= q7 ===============================
export const addLog = async (logData) => {
    const db = client.db("assignment_7");

    const result = await db.collection("logs").insertOne(logData);

    return result;
};
// ============= q8 ===============================
export const updateFutureBook = async () => {
    const db = client.db("assignment_7");

    const result = await db.collection("books").updateOne(
        { title: "Future" },
        { $set: { year: 2022 } }
    );

    return result;
};
// ============= q9 ===============================
export const findBookByTitle = async (title) => {
    const db = client.db("assignment_7");

    const book = await db.collection("books").findOne({
        title: title
    });

    return book;
};
// ============= q10 ===============================
export const findBooksByYear = async (from, to) => {
    const db = client.db("assignment_7");

    const books = await db.collection("books").find({
        year: {
            $gte: Number(from),
            $lte: Number(to)
        }
    }).toArray();

    return books;
};
// ============= q11 ===============================
export const findBooksByGenre = async (genre) => {
    const db = client.db("assignment_7");

    const books = await db.collection("books").find({
        genres: genre
    }).toArray();

    return books;
};
// ============= q12 ===============================
export const getBooksSkipLimit = async () => {
    const db = client.db("assignment_7");

    const books = await db.collection("books")
        .find({})
        .sort({ year: -1 })
        .skip(2)
        .limit(3)
        .toArray();

    return books;
};
// ============= q13 ===============================
export const findBooksWithIntegerYear = async () => {
    const db = client.db("assignment_7");

    const books = await db.collection("books").find({
        year: {
            $type: "int"
        }
    }).toArray();

    return books;
};
// ============= q14 ===============================
export const findBooksExcludeGenres = async () => {
    const db = client.db("assignment_7");

    const books = await db.collection("books").find({
        genres: {
            $nin: ["Horror", "Science Fiction"]
        }
    }).toArray();

    return books;
};
// ============= q15 ===============================
export const deleteBooksBeforeYear = async (year) => {
    const db = client.db("assignment_7");

    const result = await db.collection("books").deleteMany({
        year: {
            $lt: Number(year)
        }
    });

    return result;
};
// ============= q16 ===============================
export const aggregateBooks1 = async () => {
    const db = client.db("assignment_7");

    const books = await db.collection("books").aggregate([
        {
            $match: {
                year: {
                    $gt: 2000
                }
            }
        },
        {
            $sort: {
                year: -1
            }
        }
    ]).toArray();

    return books;
};
// ============= q17 ===============================
export const aggregateBooks2 = async () => {
    const db = client.db("assignment_7");

    const books = await db.collection("books").aggregate([
        {
            $match: {
                year: {
                    $gt: 2000
                }
            }
        },
        {
            $project: {
                _id: 0,
                title: 1,
                author: 1,
                year: 1
            }
        }
    ]).toArray();

    return books;
};
// ============= q18 ===============================
export const aggregateBooks3 = async () => {
    const db = client.db("assignment_7");

    const books = await db.collection("books").aggregate([
        {
            $unwind: "$genres"
        }
    ]).toArray();

    return books;
};
// ============= q19 ===============================
export const aggregateBooks4 = async () => {
    const db = client.db("assignment_7");

    const books = await db.collection("books").aggregate([
        {
            $lookup: {
                from: "logs",
                localField: "title",
                foreignField: "bookTitle",
                as: "logs"
            }
        }
    ]).toArray();

    return books;
};