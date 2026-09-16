import express from "express";
import {
    createBooksCollectionController,
    createAuthorsCollectionController,
    createCappedLogsCollectionController,
    createBooksTitleIndexController,
    addBookController,
    addBooksBatchController,
    addLogController,
    updateFutureBookController,
    findBookByTitleController,
    findBooksByYearController,
    findBooksByGenreController,
    getBooksSkipLimitController,
    findBooksWithIntegerYearController,
    findBooksExcludeGenresController,
    deleteBooksBeforeYearController,
    aggregateBooks1Controller,
    aggregateBooks2Controller,
    aggregateBooks3Controller,
    aggregateBooks4Controller
} from "./book.controller.js";

const router = express.Router();

router.post("/collection/books",createBooksCollectionController);

router.post("/collection/authors",createAuthorsCollectionController);

router.post("/collection/logs/capped",createCappedLogsCollectionController);

router.post("/collection/books/index",createBooksTitleIndexController);

router.post("/books",addBookController);

router.post("/books/batch",addBooksBatchController);

router.post("/logs",addLogController);

router.patch("/books/Future",updateFutureBookController);

router.get("/books/title",findBookByTitleController);

router.get("/books/year", findBooksByYearController);

router.get("/books/genre", findBooksByGenreController);

router.get("/books/skip-limit", getBooksSkipLimitController);

router.get("/books/year-integer", findBooksWithIntegerYearController);

router.get("/books/exclude-genres", findBooksExcludeGenresController);

router.get("/books/before-year", deleteBooksBeforeYearController);

router.get("/books/aggregate1", aggregateBooks1Controller);

router.get("/books/aggregate2", aggregateBooks2Controller);

router.get("/books/aggregate3", aggregateBooks3Controller);

router.get("/books/aggregate4", aggregateBooks4Controller);

export default router;