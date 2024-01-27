import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BookService from "./BookService";
const initialState = {
  books: [],
  uploadedBooks: [],
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const userBooks = createAsyncThunk(
  "books/getUserBooks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(1);
      return BookService.getUserBooks(token);
    } catch (err) {
      const message =
        err.message ||
        err.toString() ||
        (err.response && err.response.data && err.response.data.message);
      thunkAPI.rejectWithValue(message);
    }
  }
);
export const uploadBooks = createAsyncThunk(
  "books/uploadBook",
  async (book, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return BookService.uploadBook(book, token);
    } catch (err) {
      const message =
        err.message ||
        err.toString() ||
        (err.response && err.response.data && err.response.data.message);
      thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteBook = createAsyncThunk(
  "books/deleteBooks",
  async (bookId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return BookService.deleteBook(bookId, token);
    } catch (err) {
      const message =
        err.message ||
        err.toString() ||
        (err.response && err.response.data && err.response.data.message);
      thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllBooks = createAsyncThunk(
  "books/getBooks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return BookService.getAllBooks(token);
    } catch (err) {
      const message =
        err.message ||
        err.toString() ||
        (err.response && err.response.data && err.response.data.message);
      thunkAPI.rejectWithValue(message);
    }
  }
);
const bookSlice = createSlice({
  initialState,
  name: "books",
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.books = [];
      })
      .addCase(uploadBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.isSuccess = true;
        state.books = [...state.books, action.payload];
      })
      .addCase(uploadBooks.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(userBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(userBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.isSuccess = true;
        state.uploadedBooks = action.payload;
      })
      .addCase(userBooks.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.isSuccess = true;
        state.uploadedBooks = state.uploadedBooks.filter(
          (book) => book._id !== action.payload.id
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});
export default bookSlice.reducer;
export const { reset } = bookSlice.actions;
