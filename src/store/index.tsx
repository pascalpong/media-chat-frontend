import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ChatRoomService } from "../services/chatRoomService";
import { UserService } from "../services/userService";
import { MessageService } from "../services/messageService";
const store = configureStore({
  reducer: {
    [ChatRoomService.reducerPath]: ChatRoomService.reducer,
    [MessageService.reducerPath]: MessageService.reducer,
    [UserService.reducerPath]: UserService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        ChatRoomService.middleware,
        MessageService.middleware,
        UserService.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
