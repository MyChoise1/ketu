
export const put = async (filename, data, options) => {
    const token = process.env.NEXT_PUBLIC_STORAGE_TOKEN || options.token;
    if (!token) {
        throw new Error("Upload token is required");
    }
    try {
        const formData = new FormData();
        formData.append("file", data, filename);

        return await fetch(
            "https://dantivirus.com/ketu-ecommerce/file_upload.php",
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            }
        );
    } catch (error) {
        console.log("Error uploading file", error);
        throw new Error(error.message || "File Uploading Error");
    }
};

export const del = async (filename, options) => {
    const token = process.env.NEXT_PUBLIC_STORAGE_TOKEN || options.token;
    if (!token) {
        throw new Error("Upload token is required");
    }
    try {
        const res = await fetch(
            `https://dantivirus.com/ketu-ecommerce/file_upload.php?file_name=${filename}`,
            { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (error) {
        console.log("Error deleting file", error);
        throw new Error(error.message || "File Deletion Error");
    }
};
export const list = async (options) => {
    const token = process.env.NEXT_PUBLIC_STORAGE_TOKEN || options.token;
    if (!token) {
        throw new Error("Upload token is required");
    }
    try {
        const res = await fetch(
            "https://dantivirus.com/ketu-ecommerce/file_upload.php",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error listing files", error);
        throw new Error(error.message || "File Listing Error");
    }
};
