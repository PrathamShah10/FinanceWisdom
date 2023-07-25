import React, { ChangeEvent } from "react";
import * as XLSX from "xlsx"; // Use named imports
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setUserVisualsAction } from "../redux/action/user";
const EnterExcelData = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
    const changedSavingsData = excelData.map((exp: any, i) => exp.Savings);
    if (
      user?._id &&
      changeExpensedData.length === 12 &&
      changedSavingsData.length === 12
    ) {
      dispatch(
        setUserVisualsAction({
          expenses: changeExpensedData,
          savings: changedSavingsData,
          _id: user?._id,
        })
      );
    }
  };
  const handleDownload = () => {
    // Replace 'template.xlsx' with the actual name of your Excel template file.
    const link = document.createElement("a");
    link.href =
      "https://docs.google.com/spreadsheets/d/1CdANoVj6kBVRrARp010VJ7zkwX9fNDiG/edit?usp=sharing&ouid=104255153687666150749&rtpof=true&sd=true";
    link.download = "template.xlsx";
    link.click();
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <input type="file" onChange={handleFileChange} />
      <div>
        <p>you can use the below template</p>
        <button onClick={handleDownload}>Download Template</button>
      </div>
    </div>
  );
};

export default EnterExcelData;
