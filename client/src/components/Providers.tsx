"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import { NextAuthProvider } from "./providers/NextAuthProvider";
import { TaskProvider } from "@/context/TaskContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <NextAuthProvider>
                <TaskProvider>{children}</TaskProvider>
            </NextAuthProvider>
        </Provider>
    );
}
