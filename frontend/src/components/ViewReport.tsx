import React from "react";
import ReactQuill from "react-quill";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "../hooks/redux";
import { GET_REPORT } from "../queries";
const ViewReport = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useQuery(GET_REPORT, {
    variables: {
      id: user?._id,
    },
    fetchPolicy: "network-only",
  });
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Report</h1>
      <div className="border rounded-md p-4">
        <ReactQuill
          modules={{
            toolbar: false,
          }}
          value={data?.getReport}
          readOnly={true}
          className="bg-white p-4 rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default ViewReport;
