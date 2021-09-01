import React from "react";
import { Button } from "reactstrap";
import { CircularProgress } from "@material-ui/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";

export default function ExportButton({ className, csvData, fileName, loading }) {
  const { t } = useTranslation();
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { "Sheet 1": ws }, SheetNames: ["Sheet 1"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      className={className}
      color="warning"
      block
      onClick={exportToCSV}
      disabled={loading || csvData.length === 0}
    >
      <i className="fa fa-download mr-2" />
      {t("surveys.export_results")}
      {loading && (
        <CircularProgress
          color="inherit"
          size={16}
          thickness={6}
          className="ml-2"
        />
      )}
    </Button>
  );
}
