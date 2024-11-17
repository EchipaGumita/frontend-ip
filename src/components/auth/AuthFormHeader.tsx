import React from "react";

type Props = {
    introduction: string;
    message: string;
  };
  
  export default function AuthFormHeader({ introduction, message }: Props) {
    return (
      <>
        <img
          src="/assets/assist-academy-logo.png"
          alt="Assist Academy Logo"
          className="max-w-[25%] mb-12"
        />
        <h1 className="font-semibold mb-2 text-textPrimary text-3xl sm:text-4xl">
          {introduction}
        </h1>
        <p className="text-textGray">{message}</p>
      </>
    );
  }
  