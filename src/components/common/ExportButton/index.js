import React from "react";
import { Button } from "reactstrap";
import { CircularProgress } from "@material-ui/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";

export default function ExportCSV({ csvData, fileName, loading }) {
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
      color="warning"
      onClick={exportToCSV}
      disabled={loading || csvData.length === 0}
    >
      {t("surveys.export_results")}
      {loading && (
        <CircularProgress
          color="inherit"
          size={15}
          thickness={5}
          className="ml-2"
        />
      )}
    </Button>
  );
}
