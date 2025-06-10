import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import styles from "./page.module.css";
import { TwitterLogoIcon } from '@radix-ui/react-icons';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

type FormData = {
    size: string;
    age: string[];
};

const PhotoColor: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>("Auto");
    const defaultImage = "https://picsum.photos/id/237/100/100";
    const clearImage = "/imgs/custom/photo.png"; // 新的默认图片URL
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        axios
            .post("/your-backend-api-url", {
                size: selectedSize,
                age: data.age,
                selectedImage: selectedImage || defaultImage,
            })
            .then((response) => {
                console.log("请求成功，后端返回：", response.data);
            })
            .catch((error) => {
                console.error("请求失败：", error);
            });
    };

    // 优化：添加图标和比例值
    const sizeOptions = [
        { value: "Auto", label: "Auto", icon: "🔄", ratio: "auto" },
        { value: "1:1", label: "1:1", icon: "🟥", ratio: "1/1" },
        { value: "4:3", label: "4:3", icon: "📸", ratio: "4/3" },
        { value: "3:4", label: "3:4", icon: "🖼️", ratio: "3/4" },
        { value: "16:9", label: "16:9", icon: "🌆", ratio: "16/9" },
        { value: "9:16", label: "9:16", icon: "📱", ratio: "9/16" },
    ];

    const ageOptions = [
        { value: "1-2", label: "1-2" },
        { value: "3-4", label: "3-4" },
        { value: "5-8", label: "5-8" },
    ];

    const photoOptions = [
        {
            imageUrl: "https://picsum.photos/id/237/100/100",
            title: "Cute Puppy",
        },
        {
            imageUrl: "https://picsum.photos/id/1005/100/100",
            title: "Mountain View",
        },
        {
            imageUrl: "https://picsum.photos/id/1015/100/100",
            title: "Ocean Waves",
        },
        {
            imageUrl: "https://picsum.photos/id/1025/100/100",
            title: "Forest Path",
        },
        {
            imageUrl: "https://picsum.photos/id/1035/100/100",
            title: "Mountain Lake",
        },
        {
            imageUrl: "https://picsum.photos/id/1045/100/100",
            title: "Sunset Beach",
        },
    ];

    // 处理图片点击事件
    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    // 清除选中的图片
    const handleClear = () => {
        setSelectedImage(clearImage); // 设置为新的默认图片，而不是null
    };

    // 处理尺寸选择
    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    return (
        <div
            style={{
                display: "flex",
                width: "78vw",
                margin: "0 auto",
            }}
        >
            {/* Select Photo 区域 占比 2 */}
            <div
                className={styles.handDrawnBorder}
                style={{
                    border: "7px solid #F0E542",
                    borderRadius: "15px",
                    padding: "10px",
                    margin: "20px",
                    flex: "2",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h3 style={{ textAlign: "center", margin: "20px auto", fontSize: "34px" }}>
                    Select Photo
                </h3>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "15px",
                    }}
                >
                    {photoOptions.map((photo, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "transform 0.2s",
                                border: selectedImage === photo.imageUrl ? "2px solid blue" : "none",
                                padding: "5px",
                            }}
                            onClick={() => handleImageClick(photo.imageUrl)}
                        >
                            <div
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    marginBottom: "5px",
                                    overflow: "hidden",
                                    borderRadius: "8px",
                                }}
                            >
                                <img
                                    src={photo.imageUrl}
                                    alt={photo.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <p style={{ margin: "0", fontSize: "16px", color: "#000" }}>
                                {photo.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upload 区域 占比 3 */}
            <div
                className={styles.handDrawnBorder}
                style={{
                    border: "7px solid #F0E542",
                    borderRadius: "15px",
                    padding: "10px",
                    margin: "20px",
                    flex: "3",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "55px" }}>Upload</h3>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ flex: "1", display: "flex", flexDirection: "column" }}
                >
                    <div
                        style={{
                            width: "180px",
                            height: "160px",
                            border: "2px dashed #000",
                            borderRadius: "8px",
                            margin: "10px auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={handleClear}
                    >
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="uploaded"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <img
                                src={defaultImage}
                                alt="default"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        )}
                    </div>

                    {/* 优化后的Size选择区域，按比例绘制边框 */}
                    <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", gap: "15px" }}>
                        <label style={{ fontSize: "18px", marginBottom: "8px" }}>Size</label>
                        <div
                            style={{
                                display: "flex",
                                flexDirection:"row",
                                justifyContent:"space-between",
                                gap: "20px",
                                paddingBottom: "4px",
                                scrollbarWidth: "none",
                            }}
                            onWheel={(e) => e.preventDefault()}
                        >
                            {sizeOptions.map((option) => (
                                <div key={option.value} style={{ display: "flex", flexDirection: "column" }}>
                                    {/* 尺寸选项框，按比例绘制边框 */}
                                    <div
                                        onClick={() => handleSizeSelect(option.value)}
                                        style={{
                                            width: "40px",
                                            minHeight: "40px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            border: `2px ${selectedSize === option.value ? "solid blue" : "dashed #000"}`,
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            backgroundColor: selectedSize === option.value ? "#e6f7ff" : "transparent",
                                            transition: "all 0.2s",
                                            aspectRatio: option.ratio, // 核心：按比例设置宽高比
                                        }}
                                        data-ratio={option.ratio}
                                    >

                                    </div>
                                    <div style={{ fontSize: "20px", marginTop: "2px", textAlign: "center" }}>
                                        {option.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {errors.size && (
                            <span style={{ color: "red", fontSize: "12px", marginTop: "4px", display: "block" }}>
                Size 是必填项
              </span>
                        )}
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>Age</label>
                        {ageOptions.map((option) => (
                            <label key={option.value} style={{ marginRight: "10px", marginLeft: "25px", fontSize: "28px" }}>
                                <input
                                    type="checkbox"
                                    {...register("age", { required: true })}
                                    value={option.value}
                                />
                                {option.label}
                            </label>
                        ))}
                        {errors.age && (
                            <span style={{ color: "red", fontSize: "12px" }}>Age 是必填项</span>
                        )}
                    </div>
                    <div style={{ display: "flex", gap: "40px", marginTop: "auto", marginLeft: "20%" }}>
                        <button
                            type="button"
                            style={{
                                fontSize: "22px",
                                backgroundColor: "#D9D9D9",
                                color: "#FFF",
                                padding: "0 25px",
                                fontWeight: "bold",
                            }}
                            onClick={handleClear}
                        >
                            clear
                        </button>
                        <button
                            type="submit"
                            style={{
                                fontSize: "22px",
                                backgroundColor: "#0070C0",
                                color: "#FFF",
                                padding: "0 25px",
                                fontWeight: "bold",
                            }}
                        >
                            generate
                        </button>
                    </div>
                </form>
            </div>

            {/* Result 区域 占比 3 */}
            <div
                className={styles.handDrawnBorder}
                style={{
                    border: "7px solid #F0E542",
                    borderRadius: "15px",
                    padding: "10px",
                    margin: "20px",
                    flex: "3",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "55px" }}>Result</h3>
                <div
                    style={{
                        width: "80%",
                        height: "180px",
                        border: "2px dashed #000",
                        margin: "10px auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {selectedImage && selectedImage !== clearImage ? (
                        <img
                            src={selectedImage}
                            alt="result"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "grayscale(100%)",
                            }}
                        />
                    ) : selectedImage !== clearImage ? (
                        <img
                            src={defaultImage}
                            alt="clear-result"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "grayscale(100%)",
                            }}
                        />
                    ) : (
                        <div style={{ color: "#666", fontSize: "14px" }}>
                            选择图片后将显示处理效果
                        </div>
                    )}
                </div>
                <div style={{ display: "flex", gap: "5px", marginBottom: "10px", marginTop: "60px", marginLeft: "15px" }}>
                    <button style={{ fontSize: "14px", backgroundColor: "black", color: "#fff", padding: "8px 15px" }}>
                        Use as Reference
                    </button>
                    <button style={{ fontSize: "14px", backgroundColor: "black", color: "#fff", padding: "8px 15px" }}>
                        Download Image
                    </button>
                </div>
                <div style={{ display: "flex", flexDirection: "row", paddingTop: "30px", alignItems: "center", marginLeft: "15px" }}>
                    <span style={{ fontSize: "18px", marginBottom: "5px", marginRight: "20px" }}>Share To</span>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <TwitterLogoIcon />
                        <FaFacebookF size={24} />
                        <FaLinkedinIn size={24} />
                        <FaWhatsapp size={24} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoColor;
