"use client";

import DataTableComponent from "@/app/common/DataTable";
import LoadingComponent from "@/app/common/Loading";
import { accountService } from "@/app/service/accountService";
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { accountManagementCols } from "../constant";

function AccountManagement() {
  const [loading, setLoading] = useState<boolean>(true);

  const [request, setRequest] =
    useState<RequestInterfaces.ICommonSearchRequest>({
      page: 0,
      pageSize: 50,
      keyword: "",
      sortBy: "created_at",
      sortDir: "DESC",
    });

  const getAccounts = () => {
    accountService
      .search(request)
      .then((res) => {
        const accounts = res.data?.data;
        if (accounts && accounts.length > 0) setAccounts(accounts);
      })
      .catch(() => {
        showAlert("Lỗi máy chủ", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteAccounts = (ids: string[]) => {};

  const [accounts, setAccounts] = useState<ResponseInterfaces.IAccount[]>([]);

  useEffect(() => {
    getAccounts();

    return () => {};
  }, [request]);

  const [snackbar, setSnackbar] = useState<ComponentInterfaces.ISnackbar>({
    visible: false,
    serverity: "info",
    message: "",
  });

  const showAlert = (
    message: string,
    serverity: "info" | "success" | "error" = "info"
  ) => {
    setSnackbar({
      visible: true,
      serverity: serverity,
      message: message,
    });
  };

  const hideAlert = () => {
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <div className="w-full h-full">
      <Snackbar
        open={snackbar.visible}
        autoHideDuration={6000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={hideAlert}
          severity={snackbar.serverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <div className="p-3 md:p-10">
        <DataTableComponent
          rows={accounts}
          columns={accountManagementCols}
          onDelete={deleteAccounts}
        />
      </div>
    </div>
  );
}

export default AccountManagement;
