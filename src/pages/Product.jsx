import React from "react";
import { RxDotFilled } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineHeart } from "react-icons/hi2";
import Avatar from "../assets/signup-default-avatar.png";

function Product() {
  return (
    <div>
      <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center dark:bg-black ">
        <div className="flex flex-col md:flex-row w-full md:px-5">
          <div className="flex flex-col justify-center mt-8 w-full md:w-2/3 lg:w-1/2 ">
            <div className=" mx-3 md:mx-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center ">
                  <img
                    src={Avatar}
                    alt="icon"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col w-4/5 ml-2 md:w-fit ">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-semibold cursor-pointer dark:text-white">
                        jazminesocool
                      </p>

                      <RxDotFilled
                        className="hidden md:block dark:text-[#A8A8A8]"
                        size={10}
                      />
                      <AiFillPlusCircle
                        className=" cursor-pointer text-[#0095f6] md:hidden"
                        size={20}
                      />
                      <p className=" hidden text-[#0095f6] hover:text-[#00376b]  font-semibold cursor-pointer hover:dark:text-[#e0f1ff] md:block">
                        Follow
                      </p>
                    </div>
                    <p className=" text-xs  md:text-sm text-[#71767b] dark:text-[#A8A8A8]">
                      9h{/* {getCurrentTimeStamp(docs.timestamp)} */}
                    </p>
                  </div>
                </div>
                <div className="flex items-center dark:text-white">
                  <BsThreeDots />
                  {/* <p className="location text-sm text-gray-600">oregon</p> */}
                </div>
              </div>
            </div>

            <div className=" relative border dark:border-[#262626] mb-2">
              <img
                src="https://product-images-cdn.liketoknow.it/wBu48dw_wPFTswwVZDKwNt6ZXib5vDq0BqBOh.xTaLn0DqfpT0a_IOp5oToQiHrbuNibKannHW5a9hRT8yKwip7nbbNIO_U60bCymvnbEBfslQo0Q0pIQbDy7P6juPEHOcUui8bUQS2BgAIGdQewJldS752.oI.vXtVc9Ypde8PjAzc0YMB4zuD1WSc-?v=0&auto=format&fm=webp&w=450&q=80&dpr=2"
                alt="post"
                className="w-full h-[585px] object-cover"
              />
              <div className=" absolute bottom-4 right-4   bg-white/60 p-2.5 rounded-full md:p-2 ">
                <HiOutlineHeart
                  className=" stroke-black cursor-pointer hover:stroke-none hover:fill-gray-700"
                  size={22}
                />
              </div>
            </div>

            <div className="mx-3 md:mx-0">
              <div className="caption">
                <p className="dark:text-white">
                  <span className="font-semibold mr-1 dark:text-white">
                    lifewithjazz
                  </span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent et egestas est. Nunc placerat libero erat, vel
                  fringilla est ultrices nec. Phasellus hendrerit turpis orci,
                  eget luctus nibh vestibulum venenatis. 🙌🙌
                </p>
              </div>
            </div>
          </div>

          <div className="w-full  mt-8  md:mx-3">
            <div className=" mx-3 mb-4 md:mb-9">
              <h2 className=" text-base font-semibold">Shop This Post </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 p-1 justify-between mt-4 md:mt-7 md:gap-3 md:grid-cols-3 lg:grid-cols-4">
              <div className="max-w-[338px] h-48 md:h-[179px]  p-2 drop-shadow-sm rounded-md cursor-pointer  ">
                <a href="https://github.com/khalid-nur" target="_blank">
                  <img
                    className="w-full h-full object-cover rounded-md "
                    src="https://product-images-cdn.liketoknow.it/I6SpvY1ZIhjBWgeQH2MVEUUhLGURy6ReZfSecSHnukOmQKXDHuocmKyxSQh3YpRrBAYyrSrydBOiv4F7YfbNTkN7dWNpAoEmxhb4RHIkWLJwnaBvIDXtKNssyfkJWQ--?v=2&auto=format&fm=webp&q=80"
                  />
                </a>
              </div>
              <div className="max-w-[338px] h-48 md:h-[179px]  p-2 drop-shadow-sm rounded-md cursor-pointer  ">
                <a href="" target="_blank">
                  <img
                    className="w-full h-full object-cover rounded-md "
                    src="https://product-images-cdn.liketoknow.it/eHItBnRKavn6eKsH1f7Z3BFe5vLtPBfjqdMwFumdMlPvZ4G4eI9A4eIb5KrsabUOEUn2JBQ3ns0q0ncyzPpxTUCaYziWjfrnGojIlxkxa7Ow59X_kOHkcqOLdJ_m21zT_zKzWJLCC8sEvcjQyLtoizRJP0dGETQUn4wtib0sBSxwX9yXMIV2zPfAU7_7ry4A16a6G8GbPfT1QZt5PyrkpgR6DEn1._g6ry3.E7goDC90GBKS.X_gniyos0TFwcF_E2vT8sVLBg--?v=2&auto=format&fm=webp&q=80"
                  />
                </a>
              </div>
              <div className="max-w-[338px] h-48 md:h-[179px] p-2 drop-shadow-sm rounded-md cursor-pointer   ">
                <a href="" target="_blank">
                  <img
                    className="w-full h-full object-cover  rounded-md"
                    src="https://product-images-cdn.liketoknow.it/ycVymMDb01toeDLEj8VrZ8Kmos6JIzJ_i_prO9i9oBX5NKxtm9H9F0FbHGfaaZ_gif0DSi2Oswsg4DEzeGfm4bzmoXB437LjWtr7xntfeA.nCnv0vlxTWac5qoMwDZaGwZfi7EHRslcQSg11qieO6tnLflB2fwZE_NuxvPyLa_JvVPrhUsHY3p.zpdwcmsDteQSmMmAzQQFCCp3DrWiD4a5o9YhUe0P0ktgUHUUg4mFKjlQoxi9_q3hAfS.TliqrIEheRTWi?v=2&auto=format&fm=webp&q=80"
                  />
                </a>
              </div>
              <div className="max-w-[338px] h-48 md:h-[179px]  p-2 drop-shadow-sm rounded-md cursor-pointer  ">
                <a href="" target="_blank">
                  <img
                    className="w-full h-full object-cover  rounded-md"
                    src="https://product-images-cdn.liketoknow.it/QG1wKWOFHJEJBPb0p3NV8o1OOQ.saW5iZUExEW9_40gUMNacyWksgcf4jlXfZ_Sif2tyw2FTbG_TRl6b6.hWExjKSiEy422oDZ6.y1lh46CENAxniP2CWl1hmdHc36cdQEn_CNDRgUIgg5_UhnVhJNw3qVd0eUNZAKPa8J3.n_Ggv2H7tQxHnfCDrtd64n_0S2P0OwCvJNkAu_I_oKGhRdH2PIO4pl35z.tN9rGSdzhSShaJ8J8o1rar0CvpoaZo3GQ.2mPR?v=2&auto=format&fm=webp&q=80"
                  />
                </a>
              </div>
              <div className="max-w-[338px] h-48 md:h-[179px] p-2 drop-shadow-sm rounded-md cursor-pointer  ">
                <a href="" target="_blank">
                  <img
                    className="w-full h-full object-cover  rounded-md"
                    src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSEPNKKCcTtgGRL1N0zxCGAdDlJTqkoeBVSjUjrrWekjZSyAPiMtsjpIDJxWt6x3JjF4wJYdLu9WY_Qim5aClwOwDBNL3zAq9o55YzCRaLOfZ6Z6hUQTd6_RwY"
                  />
                </a>
              </div>
              <div className="max-w-[338px] h-48 md:h-[179px] p-2 drop-shadow-sm rounded-md cursor-pointer  ">
                <a href="" target="_blank">
                  <img
                    className="w-full h-full object-cover  rounded-md"
                    src="https://images.unsplash.com/photo-1692599076831-181663a5b26f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2335&q=80"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
