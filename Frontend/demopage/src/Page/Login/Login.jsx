import { Tabs, Tab } from "@mui/material";
import { School, Person } from "@mui/icons-material";
import { useState } from "react";
import { Form, Input, Button, message, DatePicker } from "antd";
import video from "../../assets/Video/video.mp4";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const payload = {
      role,
      email: values.email,
      password: values.password,
      dob: values.dob,
      registerNumber: values.registerNumber,
      ...(role === "teacher" && {
        organizationCode: values.organizationCode,
      }),
    };

    console.log("LOGIN PAYLOAD 👉", payload);

    message.success("Login data captured successfully");
    form.resetFields();

    navigate("/StudentDash"); // change based on role later if needed
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT SECTION */}
          <div className="hidden lg:block text-white space-y-6">
            <h1 className="text-3xl xl:text-5xl font-bold">
              Sortiq Management Software
            </h1>
            <p className="text-lg xl:text-xl text-indigo-200">
              Integrate Technology With Modern Education
            </p>
            <p className="text-gray-200 max-w-xl">
              Integrated School, College & Institute Management System that
              streamlines academics and administration.
            </p>
            <div className="w-24 h-1 bg-indigo-400 rounded-full" />
          </div>

          {/* LOGIN CARD */}
          <div className="flex justify-center">
            <div className=" card w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl px-6 sm:px-10 py-8 sm:py-10">

              <h2 className="text-xl sm:text-2xl font-bold text-center text-indigo-600">
                Login Portal
              </h2>

              <p className="text-center text-gray-500 mt-1 mb-6">
                Login as {role === "student" ? "Student" : "Teacher"}
              </p>

              <Tabs value={role} onChange={(_, val) => setRole(val)} centered>
                <Tab icon={<School />} label="Student" value="student" />
                <Tab icon={<Person />} label="Teacher" value="teacher" />
              </Tabs>

              <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                className="mt-6"
              >
                {role === "teacher" && (
                  <Form.Item  className="h-15" 
                    label="Organization Code"
                    name="organizationCode"
                    rules={[
                      { required: true, message: "Organization code is required" },
                    ]}
                  >
                    <Input className="h-8" />
                  </Form.Item>
                )}

                {/* REGISTER NUMBER */}
                <Form.Item
                  label={role === "student" ? "Register Number" : "Employee Number"}
                  name="registerNumber"
                  rules={[
                    { required: true, message: "Register number is required" },
                  ]}
                >
                  <Input className="h-8" />
                </Form.Item>

                {/* DATE OF BIRTH */}
                <Form.Item  className="h-15" 
                  label="Date of Birth"
                  name="dob"
                  rules={[
                    { required: true, message: "Date of birth is required" },
                  ]}
                >
                  <DatePicker className="w-full h-8" />
                </Form.Item>

                {/* EMAIL */}
                <Form.Item  className="h-15" 
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input className="h-8" />
                </Form.Item>

                {/* PASSWORD */}
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Password is required" },
                  ]}
                >
                  <Input.Password className="h-8" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full !bg-indigo-600 hover:!bg-indigo-700 h-11 text-base"
                >
                  Login as {role}
                </Button>
              </Form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
