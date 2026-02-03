import { Tabs, Tab } from "@mui/material";
import { School, Person } from "@mui/icons-material";
import { useState, useRef } from "react";
import { Form, Input, Button, message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import video from "../../assets/Video/video.mp4";

const Login = () => {
  const [role, setRole] = useState("student");
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (!captchaValue) {
      message.warning("Please verify that you are not a robot.");
      return;
    }

    const payload = {
      role,
      email: values.email,
      password: values.password,
      ...(role === "teacher" && { organizationCode: values.organizationCode }),
    };

    console.log("LOGIN PAYLOAD 👉", payload);
    recaptchaRef.current?.reset();
    setCaptchaValue(null);
    form.resetFields();
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

          {/* LEFT SECTION (hidden on mobile) */}
          <div className="hidden lg:block text-white space-y-6">
            <h1 className="text-3xl xl:text-5xl font-bold leading-tight">
              Sortiq Management Software
            </h1>

            <p className="text-lg xl:text-xl text-indigo-200">
              Integrate Technology With Modern Education
            </p>

            <p className="text-gray-200 leading-relaxed max-w-xl">
              Integrated School, College & Institute Management System that
              streamlines academics, administration, and operations using
              modern technology.
            </p>

            <div className="w-24 h-1 bg-indigo-400 rounded-full" />
          </div>

          {/* RIGHT LOGIN CARD */}
          <div className="flex justify-center">
            <div className=" card w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl px-6 sm:px-10 py-8 sm:py-10">

              <h2 className="text-xl sm:text-2xl font-bold text-center text-indigo-600">
                Login Portal
              </h2>

              <p className="text-center text-gray-500 mt-1 mb-6">
                Login as {role === "student" ? "Student" : "Teacher"}
              </p>

              <Tabs
                value={role}
                onChange={(_, val) => setRole(val)}
                centered
              >
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
                  <Form.Item
                    label="Org Code"
                    name="organizationCode"
                    rules={[
                      { required: true, message: "Organization code is required" },
                    ]}
                  >
                    <Input
                      placeholder="Enter School Code"
                      className="h-11"
                    />
                  </Form.Item>
                )}

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input className="h-11" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.Password className="h-11" />
                </Form.Item>

                <div className="flex justify-center my-4 scale-90 sm:scale-100">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="YOUR_SITE_KEY_HERE"
                    onChange={setCaptchaValue}
                  />
                </div>

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



// import { Tabs, Tab } from "@mui/material";
// import { School, Person } from "@mui/icons-material";
// import { useState, useRef } from "react";
// import { Form, Input, Button, message } from "antd";
// import ReCAPTCHA from "react-google-recaptcha";
// import "./Login.css";
// import video from "../../assets/Video/video.mp4"
// const Login = () => {
//   const [role, setRole] = useState("student");
//   const [captchaValue, setCaptchaValue] = useState(null);
//   const recaptchaRef = useRef(null);
//   const [form] = Form.useForm();

//   /* ---------------- SUBMIT ---------------- */
//   const onFinish = (values) => {
//     if (!captchaValue) {
//       message.warning("Please verify that you are not a robot.");
//       return;
//     }

//     const payload = {
//       role,
//       email: values.email,
//       password: values.password,
//       ...(role === "teacher" && { schoolCode: values.schoolCode }),
//     };

//     console.log("LOGIN PAYLOAD 👉", payload);

//     // reset
//     recaptchaRef.current?.reset();
//     setCaptchaValue(null);
//     form.resetFields();
//   };

//   return (
//    <div className="relative h-screen overflow-hidden">

//   {/* ===== BACKGROUND VIDEO ===== */}
//   <video
//     autoPlay
//     muted
//     loop
//     playsInline
//     className="absolute inset-0 w-full h-full object-cover -z-20"
//   >
//     <source src={video} type="video/mp4" />
//   </video>

//   {/* ===== DARK OVERLAY ===== */}
//   <div className="absolute inset-0 bg-black/60 -z-10" />

//   {/* ===== PAGE CONTENT ===== */}
//   <div className="relative h-screen flex justify-center items-center px-6 py-10">
//     <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-7xl pt-16 gap-20">

//       {/* ================= LEFT INFO SECTION ================= */}
//       <div className=" lg:flex flex-col max-w-xl text-white">
//         <h1 className="text-5xl font-bold leading-tight mb-6">
//           Sortiq Management Software
//         </h1>

//         <p className="text-xl font-medium mb-4 text-indigo-200">
//           Integrate Technology With Modern Education
//         </p>

//         <p className="text-gray-200 leading-relaxed">
//           Integrated School, College, Institute  Management System that offers adaptable,
//           cutting-edge, and user-friendly technology to support all your
//           school operations — from academics to administration.
//         </p>

//         <div className="w-24 h-1 bg-indigo-400 rounded-full mt-8" />
//       </div>

//       {/* ================= RIGHT LOGIN CARD ================= */}
//       <div className="card w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl px-10 py-10">

//         <h2 className="text-2xl font-bold text-center text-indigo-600">
//           Login Portal
//         </h2>

//         <p className="text-center text-gray-500 mt-1 mb-6">
//           Login as {role === "student" ? "Student" : "Teacher"}
//         </p>

//         {/* ROLE TABS */}
//         <Tabs value={role} onChange={(_, val) => setRole(val)} centered>
//           <Tab icon={<School />} label="Student" value="student" />
//           <Tab icon={<Person />} label="Teacher" value="teacher" />
//         </Tabs>

//         {/* FORM */}
//         <div className="flex justify-center">
//           <Form
//             layout="vertical"
//             form={form}
//             onFinish={onFinish}
//             className="mt-6 w-full max-w-sm"
//           >
//             {role === "teacher" && (
//               <Form.Item
//                 key={role}
//                 label="Org Code"
//                 name="organizationCode"
//                 className="animate-slide"
//                 rules={[{ required: true, message: "Organization code is required" }]}
//               >
//                 <Input
//                   placeholder="Enter Organization Code"
//                   className="h-11 animated-input"
//                 />
//               </Form.Item>
//             )}

//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[
//                 { required: true, message: "Email is required" },
//                 { type: "email", message: "Enter a valid email" },
//               ]}
//             >
//               <Input placeholder="Enter registered email" className="h-11" />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[{ required: true, message: "Password is required" }]}
//             >
//               <Input.Password placeholder="Enter password" className="h-11 text-center" />
//             </Form.Item>

//             <Form.Item className="flex justify-center">
//               <ReCAPTCHA
//                 ref={recaptchaRef}
//                 sitekey="YOUR_SITE_KEY_HERE"
//                 onChange={setCaptchaValue}
//               />
//             </Form.Item>

//             <Button
//               type="primary"
//               htmlType="submit"
//               className="w-full !bg-indigo-600 hover:!bg-indigo-700 h-11 p-10 text-base"
//             >
//               Login as {role}
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// };

// export default Login;

// import { Tabs, Tab } from "@mui/material";
// import { School, Person } from "@mui/icons-material";
// import { useState, useRef, useEffect } from "react";
// import { Form, Input, Button, message } from "antd";
// import ReCAPTCHA from "react-google-recaptcha";
// import gsap from "gsap";
// import "./Login.css";

// const Login = () => {
//   const [role, setRole] = useState("student");
//   const [captchaValue, setCaptchaValue] = useState(null);
//   const recaptchaRef = useRef(null);
//   const cardRef = useRef(null);
//   const formRef = useRef(null);
//   const [form] = Form.useForm();

//   /* ================= ENTRY ANIMATION ================= */
//   useEffect(() => {
//     gsap.fromTo(
//       cardRef.current,
//       { opacity: 0, y: 40, scale: 0.96 },
//       { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
//     );
//   }, []);

//   /* ================= TILT EFFECT ================= */
//   const handleTilt = (e) => {
//     const card = cardRef.current;
//     const rect = card.getBoundingClientRect();

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const rotateX = ((y - rect.height / 2) / rect.height) * -8;
//     const rotateY = ((x - rect.width / 2) / rect.width) * 8;

//     gsap.to(card, {
//       rotateX,
//       rotateY,
//       duration: 0.25,
//       ease: "power2.out",
//       transformPerspective: 800,
//     });
//   };

//   const resetTilt = () => {
//     gsap.to(cardRef.current, {
//       rotateX: 0,
//       rotateY: 0,
//       duration: 0.4,
//       ease: "power2.out",
//     });
//   };

//   /* ================= TAB CHANGE ANIMATION ================= */
//   useEffect(() => {
//     gsap.fromTo(
//       formRef.current,
//       { opacity: 0, y: 15 },
//       { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
//     );
//   }, [role]);

//   /* ================= SUBMIT ================= */
//   const onFinish = (values) => {
//     if (!captchaValue) {
//       message.warning("Please verify that you are not a robot.");
//       return;
//     }

//     const payload = {
//       role,
//       email: values.email,
//       password: values.password,
//       ...(role === "teacher" && { schoolCode: values.schoolCode }),
//     };

//     console.log("LOGIN PAYLOAD 👉", payload);

//     recaptchaRef.current?.reset();
//     setCaptchaValue(null);
//     form.resetFields();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
//       <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-14 items-center">

//         {/* ================= LEFT INFO ================= */}
//         <div className="flex flex-col max-w-xl text-center lg:text-left">
//           <h1 className="text-4xl lg:text-5xl font-bold text-indigo-600 mb-6">
//             School Management Software
//           </h1>

//           <p className="text-lg lg:text-xl text-gray-700 font-medium mb-4">
//             Integrate Technology With Modern Education
//           </p>

//           <p className="text-gray-600 leading-relaxed">
//             Integrated School Management System that supports academics,
//             administration, and digital transformation across institutions.
//           </p>

//           <div className="w-24 h-1 bg-indigo-500 rounded-full mt-8 mx-auto lg:mx-0" />
//         </div>

//         {/* ================= LOGIN CARD ================= */}
//         <div
//           ref={cardRef}
//           onMouseMove={handleTilt}
//           onMouseLeave={resetTilt}
//           className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10 will-change-transform"
//           style={{ transformStyle: "preserve-3d" }}
//         >
//           <h2 className="text-2xl font-bold text-center text-indigo-600">
//             School / College Portal
//           </h2>

//           <p className="text-center text-gray-500 mt-1 mb-6">
//             Login as {role === "student" ? "Student" : "Teacher"}
//           </p>

//           {/* ROLE TABS */}
//           <Tabs value={role} onChange={(_, v) => setRole(v)} centered>
//             <Tab icon={<School />} label="Student" value="student" />
//             <Tab icon={<Person />} label="Teacher" value="teacher" />
//           </Tabs>

//           {/* FORM */}
//           <Form
//             ref={formRef}
//             layout="vertical"
//             form={form}
//             onFinish={onFinish}
//             className="mt-6"
//           >
//             {role === "teacher" && (
//               <Form.Item
//                 label="School Code"
//                 name="schoolCode"
//                 rules={[{ required: true, message: "School code is required" }]}
//               >
//                 <Input className="animated-input" />
//               </Form.Item>
//             )}

//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[
//                 { required: true, message: "Email is required" },
//                 { type: "email", message: "Enter a valid email" },
//               ]}
//             >
//               <Input className="animated-input" />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[{ required: true, message: "Password is required" }]}
//             >
//               <Input.Password className="animated-input" />
//             </Form.Item>

//             {/* CAPTCHA */}
//             <div className="flex justify-center my-4">
//               <ReCAPTCHA
//                 ref={recaptchaRef}
//                 sitekey="YOUR_SITE_KEY_HERE"
//                 onChange={setCaptchaValue}
//               />
//             </div>

//             <Button
//               type="primary"
//               htmlType="submit"
//               className="w-full !bg-indigo-600 hover:!bg-indigo-700 h-11 text-base"
//             >
//               Login as {role}
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
