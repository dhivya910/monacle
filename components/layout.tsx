import React, { ReactNode, useState } from "react";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  HomeIcon,
  RocketLaunchIcon,
  DocumentPlusIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/home", icon: HomeIcon, current: true },
  {
    name: "My Events",
    href: "/all-events",
    icon: DocumentPlusIcon,
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  children?: ReactNode;
  pageTitle?: string;
}

export default function Layout({
  children,
  pageTitle = "Untitled Page",
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{pageTitle + " | MonaCle"}</title>
      </Head>
      <div className="bg-gray-900">
        <div className="min-h-full">
          <div className="bg-gray-900 pb-32">
            <Disclosure as="nav">
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="">
                      <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 flex items-center justify-between">
                            <h1 className="text-white text-3xl ml-3 mt-3">
                              <span className="font-bold">
                                <img src="Monacle.png" alt="Monacle" width="200" />
                              </span>
                            </h1>
                          </div>
                        </div>

                        <div>
                          <ConnectButton />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Disclosure>
            {/* <header className="py-10 mt-2">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  {pageTitle === "Home" ? "" : pageTitle}
                </h1>
              </div>
            </header> */}
          </div>

          <main className="-mt-32">
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
              <div className="rounded-lg bg-gray-900 px-5 py-6 shadow sm:px-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
