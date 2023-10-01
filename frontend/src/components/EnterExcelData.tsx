import React, { useState, ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setUserVisualsAction } from "../redux/action/user";
import { toastAction } from "./common/ToastAction";
const EnterExcelData = ({ isAdvisor = false }: EnterExcelDataProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expense, setExpense] = useState<number[] | null>(null);
  const [category, setCategory] = useState<string>("general");
  const dispatch = useAppDispatch();
  const { user, customerId } = useAppSelector((state) => state.user);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      readExcelFile(file);
    }
  };

  const readExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result;
      if (data) {
        processData(data);
      }
    };
    reader.readAsBinaryString(file);
  };

  const processData = (data: string | ArrayBuffer) => {
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(sheet);
    const changeExpensedData = excelData.map((exp: any, i) => exp.Expenses);
    setExpense(changeExpensedData);
  };
  const handleDownload = () => {
    // Replace 'template.xlsx' with the actual name of your Excel template file.
    const link = document.createElement("a");
    link.href =
      "https://docs.google.com/spreadsheets/d/1CdANoVj6kBVRrARp010VJ7zkwX9fNDiG/edit?usp=sharing&ouid=104255153687666150749&rtpof=true&sd=true";
    link.download = "template.xlsx";
    link.click();
  };
  const handleSubmit = () => {
    if (expense?.length === 12) {
      if (isAdvisor && customerId) {
        dispatch(
          setUserVisualsAction({
            budgetExp: expense,
            category,
            _id: customerId,
          })
        );
      } else if (user?._id && !isAdvisor) {
        dispatch(
          setUserVisualsAction({
            expenses: expense,
            category,
            _id: user?._id,
          })
        );
      }
    }
    toastAction.success("Data Updated!");
  };
  return (
    <div className="min-h-screen -bg-transparent flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <input
          type="text"
          placeholder="enter cateogory"
          className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer bg-indigo-500 text-white rounded-md py-2 px-4 text-center block mb-4 transition duration-300 ease-in-out hover:bg-indigo-600"
        >
          Choose File {selectedFile && "(" + selectedFile.name + ")"}
        </label>

        <button
          onClick={handleDownload}
          className="bg-purple-500 text-white rounded-md py-2 px-4 text-center block w-full transition duration-300 ease-in-out hover:bg-purple-600"
        >
          Download Template
        </button>
      </div>
      <button
        className="mt-5 px-4 py-2 bg-white rounded-md shadow-md border-2 border-green-300 max-w-md transition duration-300 ease-in-out hover:bg-green-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};
type EnterExcelDataProps = {
  isAdvisor?: boolean;
};
export default EnterExcelData;
