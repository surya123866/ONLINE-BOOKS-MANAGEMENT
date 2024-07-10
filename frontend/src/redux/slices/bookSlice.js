import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCaller from "../../utils";
import { toast } from "react-toastify";

// Async thunk to fetch all books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await apiCaller("http://localhost:3000/api/books");
  return response;
});

// Async thunk to fetch books by search query
export const fetchBooksBySearch = createAsyncThunk(
  "books/fetchBooksBySearch",
  async (query) => {
    const response = await apiCaller(
      `http://localhost:3000/api/books/book?name=${query}`
    );
    return response;
  }
);

// Async thunk to remove a book
export const removeBook = createAsyncThunk(
  "books/removeBook",
  async (bookId) => {
    await apiCaller(
      `http://localhost:3000/api/admin/removeBook/${bookId}`,
      "DELETE"
    );
    return bookId;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        toast.success("Books fetched successfully!");
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(`Failed to fetch books: ${action.error.message}`);
      })
      .addCase(fetchBooksBySearch.pending, (state) => {
        state.status = "loading";
        toast.info("Searching books...");
      })
      .addCase(fetchBooksBySearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        toast.success("Books found successfully!");
      })
      .addCase(fetchBooksBySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(`Failed to search books: ${action.error.message}`);
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.items = state.items.filter((book) => book._id !== action.payload);
        toast.success("Book removed successfully!");
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(`Failed to remove book: ${action.error.message}`);
      });
  },
});

export const selectBooks = (state) => state.books.items;

export default bookSlice.reducer;
