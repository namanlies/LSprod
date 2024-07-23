"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
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
import { QrModal, DeleteModal, UpdateModal } from "../Modals";
import { regex } from "@/lib/urlRegex";
import { useRouter } from "next/navigation";

import QrCode from "@/assets/qrcode.png";
import { getCookie } from "cookies-next";
import Loader from "../Loader";

export default function UrlTable({ user, loadTable }) {
  const token = getCookie("token");
  const router = useRouter();
  const [links, setLinks] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [qrModalIsOpen, setQrModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [updateUrl, setUpdateUrl] = useState("");
  const [hostname, setHostname] = useState();
  const [createdMsg, setCreatedMsg] = useState({
    success: false,
    msg: "",
    link: undefined,
  });

  const handleCountUpdate = () => {
    setTimeout(() => {
      getList();
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

  const handleDelete = async () => {
    setIsLoading(true);
    let data = JSON.stringify({
      link: selectedRow.short,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/links/delete`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const { data, status } = await axios.request(config);
      setDeleteModalIsOpen(false);
      getList();
      toast.success("Link Deleted");
    } catch (error) {
      toast.error("Error, Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    if (regex.test(updateUrl)) {
      let data = JSON.stringify({
        email: user && user.email,
        newUrl: updateUrl,
        host: hostname,
        _id: selectedRow.id,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.API_URL}/api/links/update`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      try {
        const { data, status } = await axios.request(config);
        if (data.success) {
          setHostname(undefined);
          setUpdateModalIsOpen(false);
          setCreatedMsg(data);
          setUpdateUrl("");
          getList();
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

  const getList = useCallback(async () => {
    setTableLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/links/getLinks`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.request(config);
      if (data.success) {
        setLinks(data.links);
      } else {
        setLinks([]);
      }
    } catch (error) {
      setLinks([]);
    } finally {
      setTableLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (user.email?.length) getList();
  }, [loadTable, user, getList]);

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
    { field: "long", headerName: "Original Url", width: 300, sortable: false },
    {
      field: "short",
      headerName: "Short Url",
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <div onClick={() => handleCountUpdate()}>
          <Link
            href={params.row.short}
            rel="noopener noreferrer"
            target="_blank"
          >
            {params.row.short}
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
          {params.row.domain === "youtube" ||
          params.row.domain === "instagram" ||
          params.row.domain === "twitter" ? (
            <>
              {params.row.domain && params.row.domain === "youtube" && (
                <AiFillYoutube color="red" size={40} />
              )}
              {params.row.domain && params.row.domain === "instagram" && (
                <AiFillInstagram color="#C805d1" size={40} />
              )}
              {params.row.domain && params.row.domain === "twitter" && (
                <AiFillTwitterSquare color="skyBlue" size={40} />
              )}
            </>
          ) : (
            <TbWorldWww color="white" size={30} />
          )}
        </div>
      ),
    },
    { field: "click", headerName: "Clicks", width: 80 },
    { field: "created", headerName: "Created On", width: 100 },
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
          <div
            onClick={() => handleDeleteConfirm(params.row)}
            className="cursor-pointer text-red-500 hover:text-white  hover:bg-red-500 rounded-lg p-1"
          >
            <AiOutlineDelete size={20} />
          </div>
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
            rows={links}
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
        link={selectedRow.short}
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
