"use client";

import ADForm from "@/components/Forms/Form";
import { Box, Button, Grid, styled, TableContainer } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import NSIRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import NSIInput from "@/components/Forms/Input";
import { useCreatServiceCategoriesMutation,  useDeleteServiceCategoriesMutation, useGetAllServiceCategoriesQuery,  } from "@/redux/api/serviceApi";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {  TServiceCategory } from "@/types";
import Swal from "sweetalert2";
const FormContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
}));


const FormSection = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));


type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    initialValues?: FieldValues;
};

const iconButtonStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '100%',
    padding: '0px',
    color: 'white',
    background: 'red',
    marginLeft: '2px',
    marginRight: '2px',
    '&:hover': {
        background: 'black',
        color: 'white',
    },
};
const iconStyle = { fontSize: '20px' }

const ServiceCategory = ({ open, setOpen }: TProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteCategory] = useDeleteServiceCategoriesMutation();
    const [createServiceCategory] = useCreatServiceCategoriesMutation();
    const { data: categoriesData, isLoading } = useGetAllServiceCategoriesQuery({ page: currentPage, limit: 5 });
    const handleSubmit = async (values: FieldValues) => {
        try {
            const res = await createServiceCategory(values).unwrap();

            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {

            toast.error(err?.data?.message || 'Failed to create services category !');
        }
    };
    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                popup: 'custom-swal-popup'  // Add a custom class to the popup
            }
        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    await deleteCategory(id).unwrap();

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your team has been deleted.",
                        icon: "success",
                        customClass: {
                            popup: 'custom-swal-popup' 
                        }
                    });
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        });
    };



    return (
        <>
            <NSIRightSideModal width='500px' sx={{ width: '300px' }} open={open} setOpen={setOpen} title="Create Services Categories ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit}>
                        <FormSection>
                            <Grid container spacing={2}>

                                <Grid item md={12} sm={12}>
                                    <NSIInput
                                        fullWidth
                                        name="name"
                                        label="Name"
                                        autoFocus={true}
                                    />
                                </Grid>
                            </Grid>
                            <Button sx={{ width: '200px', }} type="submit">Create Category </Button>
                        </FormSection>
                    </ADForm>
                </FormContainer>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoriesData?.data?.serviceCategories?.map((data: TServiceCategory, index: number) => (
                                <TableRow
                                    key={data._id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="center">{data.name}</TableCell>
                                    <TableCell align="center">
                                        <div className="flex justify-center gap-2 ">



                                            <IconButton
                                                sx={iconButtonStyle}
                                                onClick={() => handleDelete(data._id)}
                                                title="Delete"
                                            >
                                                <DeleteIcon sx={iconStyle} className="text-red-600" />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </NSIRightSideModal>

        </>
    );
};

export default ServiceCategory;
