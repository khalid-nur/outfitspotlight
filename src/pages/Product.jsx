import { useEffect, useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import DefaultAvatar from "../assets/signup-default-avatar.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import SkeletonProduct from "../components/Skeleton/SkeletonProduct";
import { getCurrentTimeStamp } from "../helpers/useMoment";
import LikeButton from "../components/LikeButton/LikeButton";
import { useAuthContext } from "../hooks/useAuthContext";
import FollowButton from "../components/FollowButton/FollowButton";

function Product() {
  // Getting the 'id' parameter from the URL
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const { documents, isPending } = useCollection("posts");
  const { user } = useAuthContext();

  console.log(id);
  console.log(documents);
  console.log(currentProduct);
  console.log(currentProduct?.product);
  useEffect(() => {
    // Filter the posts documents to find the product with the matching id
    const selectedProduct = documents?.filter(
      (currentProduct) => currentProduct?.id === id
    );

    // Update the state with the selected product
    setCurrentProduct(selectedProduct?.[0]);
    return () => {};
  }, [documents, id]);

  // Display a skeleton layout while the page is loading
  if (isPending) {
    return <SkeletonProduct />;
  }

  return (
    <div>
      <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center dark:bg-black ">
        <div className="flex flex-col md:flex-row w-full md:px-5">
          <div className="flex flex-col justify-center mt-8 w-full md:w-2/3 lg:w-1/2 ">
            <div className=" mx-3 md:mx-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center ">
                  <img
                    src={currentProduct?.photoURL ?? DefaultAvatar}
                    alt="icon"
                    className="w-12 h-12 rounded-full bg-[#efefef]"
                  />
                  <div className="flex flex-col w-4/5 ml-2 md:w-fit ">
                    <div className="flex items-center justify-between">
                      <Link to={`/profile/${currentProduct?.userId}`}>
                        <p className="text-base font-semibold cursor-pointer dark:text-white">
                          {currentProduct?.username}
                        </p>
                      </Link>

                      {currentProduct?.userId !== user.uid && (
                        <>
                          <RxDotFilled
                            className="hidden md:block dark:text-[#A8A8A8]"
                            size={10}
                          />
                          <FollowButton postUserId={currentProduct?.userId} />
                        </>
                      )}
                    </div>
                    <p className=" text-xs  md:text-sm text-[#71767b] dark:text-[#A8A8A8]">
                      {getCurrentTimeStamp(currentProduct?.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center dark:text-white"></div>
              </div>
            </div>

            <div className=" relative  bg-[#efefef] dark:border-[#262626] mb-2">
              <img
                src={currentProduct?.postImg}
                // alt="post"
                className="w-full h-[585px] object-cover"
              />
              <LikeButton postId={currentProduct?.id} />
            </div>

            <div className="mx-3 md:mx-0">
              <div className="caption">
                <p className="dark:text-white">
                  <span className="font-semibold mr-1 dark:text-white">
                    {currentProduct?.username}
                  </span>
                  {currentProduct?.status}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full  mt-8  md:mx-3">
            <div className=" ml-3 mb-4 md:mb-9">
              <h2 className=" text-base font-semibold">Shop This Post </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 p-1 justify-between mt-4 md:gap-3 md:grid-cols-3 lg:grid-cols-4 ">
              {currentProduct?.product.map((productItem, index) => (
                <div
                  key={index}
                  className="max-w-[338px] h-48 md:h-[179px]  p-2 drop-shadow-sm rounded-md cursor-pointer  "
                >
                  <a href={productItem.nestedInputText} target="_blank">
                    <img
                      className="w-full h-full object-cover bg-[#efefef] rounded-md "
                      src={productItem?.nestedInputFileUrl}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
