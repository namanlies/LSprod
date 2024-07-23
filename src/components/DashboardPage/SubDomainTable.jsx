"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillInstagram,
  AiOutlineDelete,
} from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineModeEditOutline } from "react-icons/md";
import toast from "react-hot-toast";

import Loader from "../Loader";
import { DeleteModal, QrModal, UpdateModal } from "../Modals";
import { regex } from "@/lib/urlRegex";
import QrCode from "@/assets/qrcode.png";

export default function SubDomainTable({ selectedDomain, getDomains }) {
  const token = getCookie("token");
  const [tableLoading, setTableLoading] = useState(false);
  const [subDomains, setSubDomains] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [qrModalIsOpen, setQrModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateUrl, setUpdateUrl] = useState("");
  const [hostname, setHostname] = useState();
  const [createdMsg, setCreatedMsg] = useState({
    success: false,
    msg: "",
    link: undefined,
  });

  const handleCountUpdate = () => {
    setTimeout(() => {
      getSubDomains();
    }, 1000);
  };

  const handleEdit = (data) => {
    setSelectedRow(data);
    setUpdateModalIsOpen((prev) => !prev);
  };

  const handelOpenQr = (data) => {
    setSelectedRow(data);
    setQrModalIsOpen((prev) => !prev);
  };

  const handleDeleteConfirm = (data) => {
    setSelectedRow(data);
    setDeleteModalIsOpen(true);
  };

  const addDomainData = useCallback(() => {
    setSubDomains([
      {
        id: selectedDomain._id,
        link: `https://${selectedDomain.domain}`,
        orgUrl: selectedDomain.link,
        platform: selectedDomain.host,
        clicks: selectedDomain.count,
        createdOn: new Date(selectedDomain.createdAt).toLocaleString("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        userId: selectedDomain.userId,
      },
    ]);
  }, [
    selectedDomain._id,
    selectedDomain.domain,
    selectedDomain.link,
    selectedDomain.host,
    selectedDomain.count,
    selectedDomain.createdAt,
    selectedDomain.userId,
  ]);

  const handleDelete = async () => {
    setIsLoading(true);
    let data = JSON.stringify({
      id: selectedRow.id,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/subdomain/delete`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const { data, status } = await axios.request(config);
      setDeleteModalIsOpen(false);
      getSubDomains();
      toast.success("Link Deleted");
    } catch (error) {
      toast.error("Error, Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (regex.test(updateUrl)) {
      setIsLoading(true);
      setTableLoading(true);
      let url;
      if (selectedRow.userId) {
        url = `${process.env.API_URL}/api/domain/update`;
      } else {
        url = `${process.env.API_URL}/api/subdomain/update`;
      }

      const reqData = JSON.stringify({
        newUrl: updateUrl,
        host: hostname,
        _id: selectedRow.id,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: reqData,
      };

      try {
        const { data, status } = await axios.request(config);

        if (data.success) {
          setHostname(undefined);
          setUpdateModalIsOpen(false);
          setCreatedMsg(data);
          setUpdateUrl("");
          setSubDomains([]);
          addDomainData();
          getSubDomains();
          getDomains();
          toast.success("Link updated");
        } else {
          toast.error("something went wrong... Please try again!");
          setCreatedMsg({
            success: false,
            msg: "something went wrong...",
          });
        }
      } catch (error) {
        toast.error("something went wrong... Please try again!");
        setCreatedMsg({
          success: false,
          msg: "something went wrong... !",
        });
      } finally {
        setTableLoading(false);
        setIsLoading(false);
      }
    } else {
      toast.error("Invalid link... Please check and try again!");
      setCreatedMsg({
        success: false,
        msg: "Invalid link...",
      });
    }
  };

  const getSubDomains = useCallback(async () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/subdomain/getSubDomains`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { domainId: selectedDomain._id },
    };

    try {
      const { data } = await axios.request(config);
      if (data.success) {
        const mappedData = data.data.map((element) => ({
          id: element._id,
          link: element.subDomain,
          orgUrl: element.link,
          platform: element.host,
          clicks: element.count,
          createdOn: new Date(element.purchasedOn).toLocaleString("en-IN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        }));

        if (subDomains.length > 1) {
          const updatedList = mappedData.filter(
            (el) => !subDomains.some((el2) => el.id === el2.id)
          );
          setSubDomains((prev) => [...prev, ...updatedList]);
        } else {
          setSubDomains((prev) => [...prev, ...mappedData]);
        }
      }
    } catch (error) {
      setSubDomains([]);
    }
  }, [selectedDomain._id, token, subDomains]);

  useEffect(() => {
    if (selectedDomain._id) {
      addDomainData();
      getSubDomains();
    } else {
      setSubDomains([]);
    }
  }, [selectedDomain._id, selectedDomain.link, addDomainData]);

  useEffect(() => {
    const getHostname = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.API_URL}/api/links/host?uri=${updateUrl}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data, status } = await axios.request(config);
        if (data.success && data.hostname != "www") {
          setHostname(data.hostname);
        } else {
          setHostname(undefined);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (updateUrl.length) {
      getHostname();
    } else {
      setHostname(undefined);
    }
  }, [updateUrl]);

  const columns = [
    {
      field: "orgUrl",
      headerName: "Original Url",
      width: 300,
      sortable: false,
    },
    {
      field: "link",
      headerName: "Link",
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <div onClick={() => handleCountUpdate()}>
          <Link href={params.row.link} passHref target="_blank">
            {params.row.link}
          </Link>
        </div>
      ),
    },
    {
      field: "platform",
      headerName: "Platform",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <div>
          {params.row.platform === "youtube" ||
          params.row.platform === "instagram" ||
          params.row.platform === "twitter" ? (
            <>
              {params.row.platform && params.row.platform === "youtube" && (
                <AiFillYoutube color="red" size={40} />
              )}
              {params.row.platform && params.row.platform === "instagram" && (
                <AiFillInstagram color="#C805d1" size={40} />
              )}
              {params.row.platform && params.row.platform === "twitter" && (
                <AiFillTwitterSquare color="skyBlue" size={40} />
              )}
            </>
          ) : (
            <TbWorldWww color="white" size={30} />
          )}
        </div>
      ),
    },
    { field: "clicks", headerName: "Clicks", width: 80 },
    { field: "createdOn", headerName: "Created On", width: 100 },
    {
      field: "qrCode",
      headerName: "QR Code",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <div
          onClick={() => handelOpenQr(params.row)}
          className="cursor-pointer"
        >
          <Image src={QrCode} alt="QrCode" width={30} height={30} />
        </div>
      ),
    },
    {
      field: "Edit",
      headerName: "Edit",
      sortable: false,
      width: 80,
      renderCell: (params) => (
        <div className="flex gap-1">
          <div
            onClick={() => handleEdit(params.row)}
            className="cursor-pointer text-blue-500 hover:text-white hover:bg-blue-500 rounded-lg p-1"
          >
            <MdOutlineModeEditOutline size={20} />
          </div>
          {params.row.userId ? null : (
            <div
              onClick={() => handleDeleteConfirm(params.row)}
              className="cursor-pointer text-red-500 hover:text-white  hover:bg-red-500 rounded-lg p-1"
            >
              <AiOutlineDelete size={20} />
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="text-white  max-h-[400px] h-[350px] w-[100%]">
          <DataGrid
            className="w-[100%]"
            rows={subDomains}
            columns={columns}
            loading={tableLoading}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              sorting: {
                sortModel: [{ field: "created", sort: "desc" }],
              },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            disableColumnMenu
            disableRowSelectionOnClick
          />
        </div>
      </div>

      <QrModal
        modalIsOpen={qrModalIsOpen}
        setIsOpen={setQrModalIsOpen}
        link={selectedRow.link}
      />

      <DeleteModal
        modalIsOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        title="Confirm to Delete"
        onConfirm={handleDelete}
      />

      <UpdateModal
        modalIsOpen={updateModalIsOpen}
        setIsOpen={setUpdateModalIsOpen}
        updateUrl={updateUrl}
        setUpdateUrl={setUpdateUrl}
        onConfirm={handleUpdate}
        hostname={hostname}
        createdMsg={createdMsg}
      />
      <Loader modalIsOpen={isLoading} />
    </>
  );
}
