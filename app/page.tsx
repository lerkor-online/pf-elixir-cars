"use client";

import Header from "@/components/header/Header";
import LandingPage from "@/components/landing/LandingPage";
import Login from "@/components/login/Login";
import { useState } from "react";
export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);

  const onClickHandler = (e: any) => {
    e.preventDefault();
    setShowLogin(true);
  };

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <Header onClickHandler={onClickHandler} />
      <LandingPage />
    </>
  );
}
