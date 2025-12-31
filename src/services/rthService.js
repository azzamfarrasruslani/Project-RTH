import { supabase } from "../lib/supabaseClient";
import imageCompression from "browser-image-compression";

// Konstanta
const TABLE_NAME = "rth_points";
const BUCKET_NAME = "rth-images";

// Helper: Kompresi Gambar
const compressImage = async (imageFile) => {
  const options = {
    maxSizeMB: 1, // Max ukuran 1MB
    maxWidthOrHeight: 1920, // Max dimensi
    useWebWorker: true,
    fileType: "image/jpeg",
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};

// Helper: Upload ke Storage
const uploadImage = async (file, fileName) => {
  try {
    const compressedFile = await compressImage(file);
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, compressedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const rthService = {
  // GET ALL
  getAll: async () => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    return data;
  },

  // GET BY ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // CREATE
  create: async (rthData, imageFile, galleryFiles = []) => {
    let fotoUtamaUrl = null;

    if (imageFile) {
      const fileName = `Img-${Date.now()}-${imageFile.name}`;
      fotoUtamaUrl = await uploadImage(imageFile, fileName);
    }

    let geojsonUrl = null;
    if (rthData.geojsonFile) {
      const fileName = `Geo-${Date.now()}-${rthData.geojsonFile.name}`;
      // Reuse upload logic but skip compression for non-images if needed,
      // or create specific uploader. For now, simple upload:
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, rthData.geojsonFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

      geojsonUrl = publicUrlData.publicUrl;
    }

    // Process Gallery Files
    let galleryUrls = [];
    if (galleryFiles && galleryFiles.length > 0) {
      // Upload concurrently
      const galleryPromises = galleryFiles.map(async (file) => {
        const fileName = `Gal-${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}-${file.name}`;
        return await uploadImage(file, fileName);
      });
      galleryUrls = await Promise.all(galleryPromises);
    }

    // Clean data before insert (remove file object)
    const { geojsonFile, ...cleanData } = rthData;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          ...cleanData,
          foto_utama: fotoUtamaUrl,
          geojson_file: geojsonUrl,
          galeri: galleryUrls,
        },
      ])
      .select();

    if (error) throw error;
    return data;
  },

  // UPDATE
  update: async (id, rthData, newImageFile, newGalleryFiles = []) => {
    let updates = { ...rthData };

    if (newImageFile) {
      const fileName = `Img-${Date.now()}-${newImageFile.name}`;
      const fotoUtamaUrl = await uploadImage(newImageFile, fileName);
      updates.foto_utama = fotoUtamaUrl;
    }

    if (updates.geojsonFile) {
      const fileName = `Geo-${Date.now()}-${updates.geojsonFile.name}`;
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, updates.geojsonFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;
      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);
      updates.geojson_file = publicUrlData.publicUrl;

      updates.geojson_file = publicUrlData.publicUrl;
    }

    // Remove file object key to avoid "column not found" error
    delete updates.geojsonFile;

    // Handle Gallery
    // Current gallery logic:
    // 1. rthData.galeri (array of existing URLs) comes from UI.
    // 2. newGalleryFiles (array of new File objects) need to be uploaded.
    // 3. Merged result = rthData.galeri (filtered) + uploaded new URLs.

    if (newGalleryFiles && newGalleryFiles.length > 0) {
      const galleryPromises = newGalleryFiles.map(async (file) => {
        const fileName = `Gal-${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}-${file.name}`;
        return await uploadImage(file, fileName);
      });
      const newGalleryUrls = await Promise.all(galleryPromises);

      // Combine existing (if any) with new
      const existingGallery = Array.isArray(updates.galeri)
        ? updates.galeri
        : [];
      updates.galeri = [...existingGallery, ...newGalleryUrls];
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updates)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data;
  },

  // DELETE
  delete: async (id) => {
    const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};
