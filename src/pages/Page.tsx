import React from "react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <div className="flex min-h-screen w-full bg-login-page-bg-1 bg-cover bg-center bg-no-repeat p-3 sm:p-5 md:p-10">
      <div className="m-auto flex h-auto w-11/12 flex-col rounded-2xl bg-white px-8 py-12 sm:w-9/12 md:w-8/12 lg:m-0 lg:mr-auto lg:w-1/2 xl:w-5/12 2xl:w-1/3">
        {children}
      </div>
    </div>
  );
}
