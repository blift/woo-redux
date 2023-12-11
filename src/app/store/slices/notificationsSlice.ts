import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface NotificationsState {
  message: string;
  visible: boolean;
  type: "success" | "error" | "info" | null;
  key?: number;
};

const initialState: NotificationsState = {
  message: "",
  visible: false,
  type: "success",
  key: 0,
};


const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationsState>) => {
      state.message = action.payload.message;
      state.visible = action.payload.visible;
      state.type = action.payload.type;
      state.key = action.payload.key;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;