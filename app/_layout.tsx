import React from "react"
import "./../global.css"
import { Slot, Stack } from "expo-router"
import { AuthProvider } from "@/context/AuthContext"
import { LoaderProvider } from "@/context/LoaderContext"
import Toast from "react-native-toast-message";


const RootLayout = () => {
  return (
    <LoaderProvider>
      <AuthProvider>
        <Slot />
        <Toast />
      </AuthProvider>
    </LoaderProvider>
  )
}

export default RootLayout
