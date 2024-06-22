import React, { useEffect, useState } from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { optionStars, optionCategoryBeauty, optionSale } from "../../utils/dropdown";

const AdminBeauty = () => {
  // GET request............
  const [getData, setGetdata] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://e-commerce-nu-seven.vercel.app/api/beauty/data"
      );
      const jsonData = await res.json();
      setGetdata(jsonData);
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };
  // POST request...........
  const [product, setProduct] = useState({
    img: "",
    title: "",
    models: "",
    price: "",
    discount: "",
    stars: "",
    category: "",
    sale: "",
  });

  // Image POST Uploads...............
  const [imgUrl, setImgUrl] = useState("");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", product.img);
    formData.append("upload_preset", "e-commerse-react");
    formData.append("cloud_name", "dn2tlzn9b");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dn2tlzn9b/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (res.status === 200) {
      return await res.json();
    } else {
      return "Error";
    }
  };
  // image POST MongoDB
  const handelSubmit = async (e) => {
    e.preventDefault();
    const { secure_url } = await uploadImage();
    setImgUrl(secure_url);
    console.log(imgUrl, "ImhUrl :>>");
    const res = await fetch(
      "https://e-commerce-nu-seven.vercel.app/api/beauty/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imgUrl: secure_url,
          title: product.title,
          price: product.price,
          models: product.models,
          stars: product.stars,
          discount: product.discount,
          category: product.category,
          sale: product.sale,
        }),
      }
    );
    fetchData();
    if (res.status === 400) {
      alert("Invalid Credintial!");
    } else {
      await res.json();
    }
  };

  // Delete Products..................
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/beauty/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      fetchData();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <div className="w-full bg-stone-500 h-12 flex flex-row justify-between items-center">
        <h1 className="font-bold text-sm md:text-xl text-white px-6">Beauty</h1>
      </div>
      <div className="flex flex-col-reverse sm:flex-row gap-8 justify-around items-center">
        <div className="border shadow flex p-3 items-center w-full sm:w-[55%] md:w-[40%] lg:w-[30%]">
          <form
            className="w-full flex flex-col"
            onSubmit={(e) => handelSubmit(e)}
          >
            <Input
              type="file"
              name="image"
              className="py-4 hidden"
              onChange={(e) =>
                setProduct({ ...product, img: e.target.files[0] })
              }
              isRequired={false}
            />
            <label
              htmlFor="image"
              className="p-4 cursor-pointer border shadow w-full"
            >
              {product?.img?.name || "Upload Images"}
            </label>
            <Input
              label="Title"
              type="text"
              name="title"
              id="title"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
            <Input
              label="Price"
              type="price"
              name="price"
              id="price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <Input
              label="Discount"
              type="discount"
              name="discount"
              id="discount"
              value={product.discount}
              onChange={(e) =>
                setProduct({ ...product, discount: e.target.value })
              }
            />
            <Input
              label="Models"
              type="models"
              name="models"
              id="models"
              value={product.models}
              onChange={(e) =>
                setProduct({ ...product, models: e.target.value })
              }
            />
            <div
              className="w-full p-2 border rounded mb-3 lg:mb-4"
              id="stars"
              value={product.stars}
              onChange={(e) =>
                setProduct({ ...product, stars: e.target.value })
              }
            >
              <h1>Get select Stars</h1>
              <select className="form-select outline-none border">
                {optionStars.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div
              className="w-full p-2 border rounded mb-3 lg:mb-4"
              id="category"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              <h1>Get select Catagories</h1>
              <select className="form-select outline-none border">
                {optionCategoryBeauty.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div
              className="w-full p-2 border rounded mb-3 lg:mb-4"
              id="sale"
              value={product.sale}
              onChange={(e) => setProduct({ ...product, sale: e.target.value })}
            >
              <h1>Get select Sale</h1>
              <select className="form-select outline-none border">
                {optionSale.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <Button type="submit" label="Add Product" />
          </form>
        </div>
        {/* 0000000 */}
        <div className="border shadow flex flex-col p-3 items-center w-full sm:w-[55%] md:w-[40%] lg:w-[30%] h-[600px] overflow-y-scroll">
          {getData
            .slice()
            .reverse()
            .map((e, index) => (
              <div
                key={index}
                className="flex flex-col mb-4 justify-around items-center p-3 gap-4 border w-full bg-yellow-100"
              >
                <div className="w-full text-end">
                  <button
                    onClick={() => handleDelete(e.product.id)}
                    className="px-3 py-1 bg-emerald-100 text-red-400 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
                <img
                  src={e.product.img}
                  alt={e.product.title}
                  className="w-[200px] h-[200px] "
                />
                <div className="flex flex-col justify-between w-full">
                  <h1 className="font-bold text-sm mb-2">
                    ID:{" "}
                    <span className="text-red-500 text-xs">{e.product.id}</span>
                  </h1>
                  <h1 className="font-bold text-sm mb-2">
                    Title:{" "}
                    <span className="text-green-400 text-xs">
                      {e.product.title}
                    </span>
                  </h1>
                  <h1 className="font-bold text-sm mb-2">
                    Price:{" "}
                    <span className="text-green-400">{e.product.price}</span>
                  </h1>
                  <h1 className="font-bold text-sm mb-2">
                    Discount:{" "}
                    <span className="text-green-400">{e.product.discount}</span>
                  </h1>
                  <h1 className="font-bold text-sm mb-2">
                    Stars:{" "}
                    <span className="text-green-400">{e.product.stars}</span>
                  </h1>
                  <h1 className="font-bold text-sm mb-2">
                    Category:{" "}
                    <span className="text-green-400">{e.product.category}</span>
                  </h1>
                  <h1 className="font-bold text-sm mb-2">
                    Sale:{" "}
                    <span className="text-green-400">{e.product.sale}</span>
                  </h1>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBeauty;
