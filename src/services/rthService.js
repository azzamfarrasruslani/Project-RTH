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
  create: async (rthData, imageFile) => {
    let fotoUtamaUrl = null;

    if (imageFile) {
      const fileName = `Img-${Date.now()}-${imageFile.name}`;
      fotoUtamaUrl = await uploadImage(imageFile, fileName);
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([{ ...rthData, foto_utama: fotoUtamaUrl }])
      .select();

    if (error) throw error;
    return data;
  },

  // UPDATE
  update: async (id, rthData, newImageFile) => {
    let updates = { ...rthData };

    if (newImageFile) {
      const fileName = `Img-${Date.now()}-${newImageFile.name}`;
      const fotoUtamaUrl = await uploadImage(newImageFile, fileName);
      updates.foto_utama = fotoUtamaUrl;
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
