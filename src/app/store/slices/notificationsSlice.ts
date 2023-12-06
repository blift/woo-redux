import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface NotificationsState {
  message: string;
  visible: boolean;
  type: "success" | "error" | "info";
};

const initialState: NotificationsState = {
  message: "",
  visible: false,
  type: "success",
};


const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationsState>) => {
      state.message = action.payload.message;
      state.visible = action.payload.visible;
      state.type = action.payload.type;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;