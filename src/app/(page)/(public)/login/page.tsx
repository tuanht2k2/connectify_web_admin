"use client";

import logo from "@/app/assets/images/logo.png";
import { loadAccount } from "@/app/redux/reducers/authSlice";
import { authService } from "@/app/service/authService";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const {
    handleSubmit,
    control,
    register,
    getValues,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);

    const request: RequestInterfaces.ILoginRequest = {
      phoneNumber: getValues("phoneNumber"),
      password: getValues("password"),
    };

    authService
      .login(request)
      .then((res) => {
        const token = res.data?.data?.token;
        const account = res.data?.data?.data;
        if (!token || !account) return;
        localStorage.setItem("token", token);
        router.replace("/");
      })
      .catch(() => {
        setError("phoneNumber", {
          type: "manual",
          message: "Số điện thoại hoặc mật khẩu không chính xác",
        });
        setError("password", {
          type: "manual",
          message: "Số điện thoại hoặc mật khẩu không chính xác",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Đăng nhập vào trang quản trị
        </h2>

        <div className="flex justify-center mb-6">
          <Image
            src={logo}
            alt="Login illustration"
            width={150}
            height={150}
            className="object-cover"
          />
        </div>

        <form onSubmit={handleSubmit(login)}>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Số điện thoại
            </label>
            <input
              {...register("phoneNumber", {
                required: "Vui lòng nhập số điện thoại",
              })}
              type="text"
              id="phoneNumber"
              placeholder="Nhập số điện thoại của bạn"
              className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500 ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mật khẩu
            </label>
            <input
              {...register("password", { required: "Vui lòng nhập mật khẩu" })}
              type="password"
              id="password"
              placeholder="Nhập mật khẩu của bạn"
              className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none text-gray-700 focus:border-blue-500 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={loading}
              onClick={handleSubmit(login)}
            >
              {loading ? (
                <CircularProgress size={15} color="error" />
              ) : (
                "Đăng nhập"
              )}
            </button>
          </div>

          <div className="text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
