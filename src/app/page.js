"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { getCookie, setCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";

import { setAuthLogout, setAuthState } from "@/redux/features/authSlice";
import { routes } from "@/lib/routes";
import { brandNames } from "@/lib/branedNames";
import { getUserFromToken } from "@/lib/userInfo";
import Domains from "@/components/Home/Domains";
import {
  LoginModal,
  SignUpModal,
  ForgotPassModal,
  CartModal,
  VerificationModal,
} from "@/components/Modals";
import Loader from "@/components/Loader";
import shoppingCart from "@/assets/shopping-cart.png";

export default function Home() {
  const token = getCookie("token");
  const dispatch = useDispatch();
  const { authState } = useSelector((state) => state.userReducer);

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignUpModalIsOpen] = useState(false);
  const [forgotPassModalIsOpen, setForgotPassModalIsOpen] = useState(false);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const [verificationModalIsOpen, setVerificationModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [linksToRender, setLinksToRender] = useState([]); // links to render
  const [specToRender, setSpecToRender] = useState([]); // links to render
  const [linkListLength, setLinkListLength] = useState(12); //link list length
  const [userUrl, setUserUrl] = useState(""); // input url
  const [ranDigitToGen, setRanDigitToGen] = useState(null); // digit to add
  const [numToGen, setNumToGen] = useState(1); // no to add

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const openLoginModal = () => {
    setForgotPassModalIsOpen(false);
    setSignUpModalIsOpen(false);
    setLoginModalIsOpen((prev) => !prev);
  };

  const openSignUpModal = () => {
    setForgotPassModalIsOpen(false);
    setLoginModalIsOpen(false);
    setSignUpModalIsOpen((prev) => !prev);
  };

  const closeAllModal = () => {
    setLoginModalIsOpen(false);
    setSignUpModalIsOpen(false);
    setForgotPassModalIsOpen(false);
  };

  const generateLinks = useCallback(
    (url, noOfLinks, more, recall) => {
      let linkList = [];
      let ranCont = more ? ranDigitToGen : recall ? 2 : null;
      const genLink = () => {
        if (linkList.length < noOfLinks) {
          if (ranCont === null && !recall) {
            brandNames.forEach((brand) => {
              const domainId = uuid();
              const domain = url + brand;
              linkList.push({ domainId, domain });
            });
            ranCont = 0;
            genLink();
          } else if (ranCont === 0 && !recall) {
            brandNames.forEach((brand) => {
              const domainId = uuid();
              const domain = url + ranCont + brand;
              linkList.push({ domainId, domain });
            });
            ranCont = 1;
            genLink();
          } else {
            const max = Math.pow(10, ranCont) - 1;
            let numToGenC = more ? (recall ? numToGen + 2 : numToGen) : 1;
            numToGenC = recall ? numToGenC + 2 : numToGenC;
            ranCont++;
            const newTemps = (newTemp) => {
              if (numToGenC <= max && linkList.length < noOfLinks) {
                brandNames.forEach((brand) => {
                  const domainId = uuid();
                  const domain = url + numToGenC + brand;
                  linkList.push({ domainId, domain });
                });
                numToGenC++;
                setNumToGen((prev) => prev + 1);
                newTemps(newTemp + 1);
              }
            };
            setNumToGen(numToGenC);
            newTemps(numToGenC);
            return;
          }
        }
      };
      genLink();
      setRanDigitToGen(ranCont);

      return linkList;
    },

    [numToGen, ranDigitToGen]
  );

  const validateLinks = async (links) => {
    setIsLoading(true);
    try {
      let reqData = JSON.stringify(links);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.API_URL}/api/domain/checkValidity`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: reqData,
      };

      const { data } = await axios.request(config);
      return data;
    } catch (error) {
      console.log("error");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const provideAvailableLinks = useCallback(
    async (url, listLength, more) => {
      let availableLinks = [];
      const listLen = more ? listLength : 12;
      const genLink = async (listLength, recall) => {
        if (listLength <= 0) {
          return;
        } else {
          const links = generateLinks(url, listLength, more, recall);
          const validLinks = await validateLinks(links);
          setLinksToRender((prev) => [...prev, ...validLinks]);
          validLinks.forEach((link) => {
            availableLinks.push(link);
          });
          genLink(listLength - availableLinks.length, true);
        }
      };
      genLink(listLen - availableLinks.length, false);
    },
    [generateLinks]
  );

  const handleForm = async ({ url }) => {
    let consistFlag = false;
    let linkToSearch;
    brandNames.forEach((domain) => {
      if (url.includes(domain)) consistFlag = true;
    });

    if (consistFlag) {
      brandNames.forEach((domain) => {
        if (url.includes(domain)) {
          linkToSearch = url.replace(new RegExp(domain, "g"), "");
        }
      });
    } else {
      linkToSearch = url.split(".").join("");
    }

    setLinksToRender([]);
    setUserUrl(linkToSearch);
    setLinkListLength(12);
    setSpecToRender([]);
    setRanDigitToGen(null);
    setNumToGen(0);

    if (consistFlag) {
      const domainId = uuid();
      const validLinks = await validateLinks([{ domainId, domain: url }]);
      setSpecToRender((prev) => [...prev, ...validLinks]);
    }

    await provideAvailableLinks(linkToSearch, linkListLength);
  };

  useEffect(() => {
    if (userUrl.length > 0) {
      const getURL = async () => {
        await provideAvailableLinks(
          userUrl,
          linkListLength - linksToRender.length,
          true
        );
      };

      if (linkListLength > 12) {
        getURL();
      }
    }
  }, [linkListLength, userUrl, linksToRender.length]);

  useEffect(() => {
    if (authState) closeAllModal();
  }, [authState]);

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);

      try {
        const user = await getUserFromToken();
        dispatch(setAuthState({ authState: true, user: user }));
        closeAllModal();
      } catch (error) {
        console.log(error);
        dispatch(setAuthLogout());
        setCookie("token", "");
      } finally {
        setIsLoading(false);
      }
    };

    if (token && token.length) {
      getUserInfo();
    } else {
      dispatch(setAuthLogout());
    }
  }, [token, dispatch]);

  return (
    <main className="bg-[url(/braded_bg.jpg)] bg-fixed bg-cover bg-center min-h-screen  before:bg-black before:opacity-40 before:w-[100%] before:h-[100%] relative before:absolute before:top-0 before:left-0">
      <div className="container mx-auto relative">
        <nav className="flex justify-end p-6 pb-2">
          {authState ? (
            <div className="flex gap-4">
              <button
                className="bg-[#0075FF] px-3 py-2 rounded-lg hover:bg-[#0077ff9c]"
                onClick={() => setCartModalIsOpen(true)}
              >
                <Image
                  src={shoppingCart}
                  alt="shopping"
                  width={20}
                  height={20}
                />
              </button>
              <Link href={routes.DashboardHome}>
                <button className="bg-[#0075FF] px-3 py-2 rounded-lg hover:bg-[#0077ff9c]">
                  <p className="text-sm">Dashboard</p>
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                className="bg-[#0075FF] px-3 py-2 rounded-lg w-20 hover:bg-[#0077ff9c]"
                onClick={openSignUpModal}
              >
                <p className="text-sm">Sign up</p>
              </button>

              <button
                className="bg-[#0075FF] px-3 py-2 rounded-lg w-20 hover:bg-[#0077ff9c]"
                onClick={openLoginModal}
              >
                <p className="text-sm">Login</p>
              </button>
            </div>
          )}
        </nav>

        <div className="mt-4">
          <p className="text-center text-4xl">Branéd Links</p>
          <p className="text-center text-xs font-thin tracking-wide">
            Retain Your Brand Image
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <form
            className="flex flex-col lg:flex-row justify-center items-start gap-2"
            onSubmit={handleSubmit(handleForm)}
          >
            <div>
              <input
                name="url"
                type="text"
                placeholder="Type your brand name"
                className="w-96 rounded-lg branded_input bg-[#00000029] border-[1px] border-white"
                {...register("url", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "At least 3 characters required",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 characters allowed",
                  },
                  validate: {
                    space: (value) => !/\s/g.test(value) || "No space allowed",
                    specialChar: (value) =>
                      /^[a-zA-Z0-9\-_.]+$/.test(value) ||
                      "No special characters are allowed",
                  },
                })}
              />
              <div className="mt-1">
                {errors.url && (
                  <p className="text-[12px] text-red-500 ml-3 font-bold">
                    {`${errors.url.message}`}
                  </p>
                )}
                <p className="text-sm">.branéd/ .appopener/ .deet.me</p>
              </div>
            </div>
            <button
              className="bg-[#0075FF] px-3 py-2 w-24 rounded-lg hover:bg-[#0077ff9c] disabled:bg-gray-500"
              disabled={isSubmitting}
            >
              <p className="text-sm">{isSubmitting ? "Getting" : "Get it"}</p>
            </button>
          </form>
        </div>

        <Domains
          links={linksToRender}
          specToRender={specToRender}
          setLinkListLength={setLinkListLength}
          setCartModalIsOpen={setCartModalIsOpen}
        />
      </div>

      <>
        <CartModal
          setIsOpen={setCartModalIsOpen}
          modalIsOpen={cartModalIsOpen}
          openLoginModal={openLoginModal}
        />
        <SignUpModal
          setIsOpen={setSignUpModalIsOpen}
          modalIsOpen={signupModalIsOpen}
          otherModalOne={setLoginModalIsOpen}
          otherModalTwo={setForgotPassModalIsOpen}
          openValidation={setVerificationModalIsOpen}
        />
        <LoginModal
          setIsOpen={setLoginModalIsOpen}
          modalIsOpen={loginModalIsOpen}
          otherModalOne={setSignUpModalIsOpen}
          otherModalTwo={setForgotPassModalIsOpen}
        />
        <ForgotPassModal
          setIsOpen={setForgotPassModalIsOpen}
          modalIsOpen={forgotPassModalIsOpen}
          otherModalOne={setLoginModalIsOpen}
          otherModalTwo={setSignUpModalIsOpen}
          openValidation={setVerificationModalIsOpen}
        />
        <VerificationModal
          setIsOpen={setVerificationModalIsOpen}
          modalIsOpen={verificationModalIsOpen}
        />
      </>
      <Loader modalIsOpen={isLoading} />
    </main>
  );
}
