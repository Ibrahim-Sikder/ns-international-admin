"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import { Box, Button, Grid, styled, Typography, } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import ADTextArea from "@/components/Forms/TextArea";
import { toast } from "sonner";
import ADImageUpload from "@/components/Forms/FileUpload";
import NSIRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import { useCreatlBannerMutation } from "@/redux/api/bannerApi";
import NSISelect from "@/components/Forms/Select";
import NSIInput from "@/components/Forms/Input";
import { productCategory, serviceCategory } from "@/constant/service";
import NSIEditor from "@/components/Forms/JodiEditor";
import { useCreatServiceMutation } from "@/redux/api/serviceApi";
import { useCreatProductMutation } from "@/redux/api/productApi";
import NSIAutoComplete from "@/components/Forms/AutoComplete";
import NSITextArea from "@/components/Forms/TextArea";

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


const CreateProductModel = ({ open, setOpen }: TProps) => {
    const [createProduct] = useCreatProductMutation()
    const [images, setImages] = useState<string[]>([]);
    const [imageOpen, setImageOpen] = useState(false);




    const handleSubmit = async (values: FieldValues) => {
        const modifiedValues = {
            ...values,
            images

        };

        try {
            const res = await createProduct(modifiedValues).unwrap();

            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {

            toast.error(err?.data?.message);
        }
    };




    return (
        <>
            <NSIRightSideModal sx={{ width: '500px' }} open={open} setOpen={setOpen} title="Create Product ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit}>
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
                                        autoFocus={true}
                                    />
                                </Grid>

                                <Grid item md={12} sm={12}>
                                    <NSIAutoComplete
                                        label="Category"
                                        name="category"
                                        options={serviceCategory}
                                    />

                                </Grid>


                            </Grid>
                            <Typography sx={{ marginTop: '20px' }} variant="h5" fontWeight='bold' >SEO Section </Typography>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <NSIInput
                                        fullWidth
                                        name="meta_title"
                                        label="Meta Title"
                                        placeholder="Enter Meta Title"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <NSIAutoComplete
                                        label="Meta Keywords"
                                        name="meta_keywords"
                                        options={serviceCategory}
                                    />

                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <NSITextArea
                                        name="meta_description"
                                        label="Meta Description"
                                        placeholder="Enter Meta Description"
                                    />
                                </Grid>
                            </Grid>
                            <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Add Product </Button></Box>
                        </FormSection>
                    </ADForm>
                </FormContainer>

            </NSIRightSideModal>
            <GlobalImageSelector
                open={imageOpen}
                onClose={() => setImageOpen(false)}
                setSelectedImage={setImages}
                mode="multiple"
                selectedImage={images}
            />

        </>
    );
};

export default CreateProductModel;
