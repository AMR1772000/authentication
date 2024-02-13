import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// login user
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (userData,thunkAPI) =>{
//     const {rejectWithValue} = thunkAPI;
//     try {
//       const response = await fetch("http://localhost:3002/person", {
//         method: "POST",
//         body: JSON.stringify(userData),
//         headers: { "Content-Type": "application/json" },
//       });
//       console.log("Response:", response);
//       if(!response.ok){
//         const errorData = await response.json();
//         return rejectWithValue(errorData.message);
//       }
//       const {token} = await response.json();
//       localStorage.setItem("token", token);
//       console.log("Token:", token); 
//       return token;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// )

//Insert User
export const insertUser = createAsyncThunk(
  "auth/insertUser",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const existingUsersResponse = await fetch("http://localhost:3002/person");
      const existingUsers = await existingUsersResponse.json();
      if (existingUsers.some((user) => user.email === userData.email)) {
        return rejectWithValue("This Email is already exists");
      }
      const res = await fetch("http://localhost:3002/person", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Get Users
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { email, password } = userData;
      // Fetch the list of existing users
      const existingUsersResponse = await fetch("http://localhost:3002/person");
      const existingUsers = await existingUsersResponse.json();
      // Find the user with the provided email
      const user = existingUsers.find((user) => user.email === email);
      if (user && user.password === password) {
        return "Successful login";
      } else {
        return rejectWithValue(
          "This Email doesn't exist or password is incorrect"
        );
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: { user: [], error: null , register :null , token: null },
  extraReducers: (builder) => {
    builder
      .addCase(insertUser.pending, (state, action) => {
        state.error = null;
      })
      .addCase(insertUser.fulfilled, (state, action) => {
        state.user.push(action.payload);
      })
      .addCase(insertUser.rejected, (state, action) => {
        state.error = action.payload;
      }) 
      .addCase(getUsers.pending, (state, action) => {
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.register = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload;
      })
      // .addCase(loginUser.pending, (state, action) => {
      //   state.error = null;
      // })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.token = action.payload;
      // })
      // .addCase(loginUser.rejected, (state, action) => {
      //   state.error = action.payload;
      // });
  },
  },
);

export default AuthSlice.reducer;
