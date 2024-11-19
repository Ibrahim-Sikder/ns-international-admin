"use client";

import ADForm from "@/components/Forms/Form";
import { Box, Button, Grid, styled, Typography, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import { toast } from "sonner";
import NSIRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import ADImageUpload from "@/components/Forms/FileUpload";
import NSIInput from "@/components/Forms/Input";
import { useGetSingleProductQuery, useUpdateProductMutation } from "@/redux/api/productApi";
import NSIEditor from "@/components/Forms/JodiEditor";
import NSIAutoComplete from "@/components/Forms/AutoComplete";
import NSITextArea from "@/components/Forms/TextArea";
import { tags } from "@/constant/common";
import { useGetSingleAboutQuery, useUpdateAboutMutation } from "@/redux/api/aboutApi";
import { useGetSingleMissionQuery, useUpdateMissionMutation } from "@/redux/api/missionApi";
import { useGetSingleBrandQuery, useUpdateBrandMutation } from "@/redux/api/brandApi";


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
    id: string | null,
};


const UpdateBrandModal = ({ open, setOpen, id }: TProps) => {
    const [images, setImages] = useState<string[]>([]);
    const [imageOpen, setImageOpen] = useState(false);


    const [updateBrand] = useUpdateBrandMutation()
    const { data, isLoading } = useGetSingleBrandQuery(id)

    const handleSubmit = async (data: FieldValues) => {
        data.images = images;

        if (Array.isArray(data.meta_keywords)) {
            data.meta_keywords = data.meta_keywords.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.meta_keywords : key)
            );
        }
        try {
            const res = await updateBrand({ ...data, id }).unwrap();

            toast.success(res?.message);

            setOpen(false);
        } catch (err: any) {

            toast.error(err?.message);
        }
    };

    const singleData = data?.data;

    useEffect(() => {
        if (singleData) {
            setImages(singleData?.images || []);
        }
    }, [singleData]);
    if (isLoading) {
        return <p>Loading............</p>
    }

    const defaultValues = {
        title: singleData?.title || '',
        description: singleData?.description || "",




    };


    return (
        <>
            {
                isLoading ? (
                    <p>Loading........</p>
                ) : (
                    <NSIRightSideModal open={open} setOpen={setOpen} title="Update Brand ">
                        <FormContainer>
                            <ADForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                                <FormSection>
                                    <Grid container spacing={2}>
                                        <Grid item md={12} sm={12}>
                                            <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                                <ADImageUpload
                                                    name="images"
                                                    setImageUrls={setImages}
                                                    imageUrls={images}
                                                    label="Select Images"
                                                    onClick={() => setImageOpen(true)}
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid item md={12} sm={12}>
                                            <NSIInput
                                                fullWidth
                                                name="title"
                                                label="Title"
                                                placeholder="Enter Title"
                                            />
                                        </Grid>



                                    </Grid>

                                    <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Update Brand </Button></Box>
                                </FormSection>
                            </ADForm>
                        </FormContainer>
                        <GlobalImageSelector
                            open={imageOpen}
                            onClose={() => setImageOpen(false)}
                            setSelectedImage={setImages}
                            mode="multiple"
                            selectedImage={images}
                        />
                    </NSIRightSideModal>
                )
            }

        </>
    );
};

export default UpdateBrandModal;
