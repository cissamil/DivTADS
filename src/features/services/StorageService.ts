import { supabase } from "@/src/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import {decode} from "base64-arraybuffer";
import { Alert } from "react-native";

export class StorageService {
  public async openCamera(groupId: string) {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à camera para tirar a foto do recibo!",
      );
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      return this.uploadImage(uri, groupId);
    }

    return null;
  }

  private async uploadImage(uri: string, groupId: string) {
    try {
      
      const base64 = await FileSystem.readAsStringAsync(uri, {encoding: 'base64'});

      const fileExt = uri.substring(uri.lastIndexOf(".") + 1);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${groupId}/${fileName}`;

      const buffer:ArrayBuffer = decode(base64);
      const contentType = `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`;

      return this.saveImage(filePath, buffer, contentType);
    } catch (error) {
      Alert.alert("Erro no upload da imagem", error as string);
      console.error("Erro no upload da imagem: ", error);
      return null;
    }
  }

  private async saveImage(filePath: string, buffer: ArrayBuffer, contentType: string) {
    try {
      const { data, error } = await supabase.storage
        .from("receipts")
        .upload(filePath, buffer, {
            contentType: contentType,
            upsert: false
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("receipts")
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Erro no upload da imagem: ", error);
      return null;
    }
  }
}
