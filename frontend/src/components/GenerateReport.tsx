import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useAppSelector } from "../hooks/redux";
import { useMutation } from "@apollo/client";
import { ADD_REPORT } from "../mutations";
import "react-quill/dist/quill.snow.css";

const GenerateReport: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const { customerId } = useAppSelector((state) => state.user);
  const [changeReport] = useMutation(ADD_REPORT);
  const formats = ["bold", "italic", "underline", "strike", "font", "size"];

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleChange = (value: string) => {
    setContent(value);
  };

  const submitReport = async () => {
    if (customerId) {
      const { data } = await changeReport({
        variables: {
          reportDetails: {
            report: content,
            customer: customerId,
          },
        },
      });
      console.log("reportdata", data);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Report Instructions:</h2>
        <ul className="list-disc pl-4">
          <li>The report should contain comments on user investments.</li>
          <li>Suggest more investments based on analysis.</li>
          <li>Analyze user goals and financial wealth.</li>
        </ul>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add content to the report:
        </label>
        <ReactQuill
          value={content}
          onChange={handleChange}
          formats={formats}
          modules={modules}
        />
      </div>
      <button onClick={submitReport}>Make Report</button>
    </div>
  );
};

export default GenerateReport;
