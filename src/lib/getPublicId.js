export function getPublicIdFromUrl(url) {
    try {
        // Split after /upload/
        const parts = url.split("/upload/");
        if (parts.length < 2) return null;

        // Remove version (v12345/) if it exists
        let publicIdWithExt = parts[1].replace(/^v[0-9]+\//, "");

        // Strip extension (.jpg, .png, etc.)
        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");

        return publicId;
    } catch (err) {
        console.error("Failed to extract public_id:", err);
        return null;
    }
}
