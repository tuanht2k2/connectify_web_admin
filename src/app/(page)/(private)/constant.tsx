export const accountManagementCols: ComponentInterfaces.IColumn[] = [
  {
    field: "index",
    headerName: "STT",
    // width: 15,
    sortable: false,
  },
  {
    field: "fullName",
    headerName: "Họ tên",
    width: 200,
    sortable: false,
  },
  {
    field: "displayName",
    headerName: "Tên hiển thị",
    width: 200,
    sortable: false,
  },
  {
    field: "gender",
    headerName: "Giới tính",
    width: 200,
    sortable: false,
  },
  {
    field: "dob",
    headerName: "Ngày sinh",
    width: 200,
    sortable: false,
  },
  // {
  //   field: "",
  //   headerName: "",
  //   width: "",
  //   sortable: true
  // },
  // {
  //   field: "",
  //   headerName: "",
  //   width: "",
  //   sortable: true
  // },
];

export const postManagementCols: ComponentInterfaces.IColumn[] = [
  {
    field: "index",
    headerName: "STT",
    // width: 15,
    sortable: false,
  },
  {
    field: "createdBy",
    headerName: "Người đăng",
    width: 200,
    sortable: false,
  },
  {
    field: "createdAt",
    headerName: "Thời gian đăng",
    width: 200,
    sortable: false,
  },
  {
    field: "content",
    headerName: "Nội dung",
    width: 200,
    sortable: false,
  },
  {
    field: "audience",
    headerName: "Quyền riêng tư",
    width: 200,
    sortable: false,
  },
  // {
  //   field: "",
  //   headerName: "",
  //   width: "",
  //   sortable: true
  // },
  // {
  //   field: "",
  //   headerName: "",
  //   width: "",
  //   sortable: true
  // },
];
