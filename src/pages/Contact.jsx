import React from "react";
import { TextInput } from "../components";

function Contact() {
  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold">Contact</h1>

      <div className="flex  flex-col lg:flex-row gap-10 ">
        <div className="mt-6 space-y-6 lg:w-1/2 border rounded p-10 shadow-lg  text-white">
          <h2 className="text-2xl font-bold text-[#57a460]">Get in Touch</h2>
          <p className="text-lg">
            We'd love to hear from you! Whether you have questions about our job
            search application or need assistance, please don't hesitate to
            reach out.
          </p>
          <form className="space-y-4">
            <TextInput label="Name" placeHolder="Name" />
            <TextInput label="Email" placeHolder="Email" type="email" />
            <TextInput label="Message" placeHolder="Message" textarea />
            <button
              type="submit"
              className="px-4 py-2 bg-[#57a460] text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#57a460]">Contact Information</h3>
          <p className="mt-2">Email: 5maurosivamani@gmail.com</p>
          <p>Phone: +91 8098668053</p>
          <p>Address: Chennai, Tamil Nadu, India</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
