import { AuthError, User } from "@supabase/supabase-js";
import { Alert } from "react-native";
import { supabase } from "../../../utils/supabase";
import { UserLoginEntity } from "../models/UserLoginEntity";
import { UserRegistrationEntity } from "../models/UserRegistrationEntity";

export class AuthService {

  private async signInWithEmail(email: string, password: string): Promise<AuthError | User | null> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error;
    }

    if (!data || !data.user) {
      return null;
    }

    return data.user;
  }

  private async signUpWithEmail(email: string, password: string): Promise<AuthError | string | null> {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return error;
    }

    if (!data || !data.user) {
      return null;
    }

    return data.user.id;
  }

  public async authenticateUser(userLoginEntity: UserLoginEntity): Promise<User | null> {

    const response = await this.signInWithEmail(
      userLoginEntity.email,
      userLoginEntity.password,
    );

    if (response instanceof AuthError) {
      Alert.alert(
        "Erro ao gerar credencial de autenticação: ",
        response.message,
      );
      return null;
    }

    if (response === null) {
      Alert.alert("Erro desconhecido. Tente novamente");
      return null;
    }

    return response;
  }

  public async registerUser(userRegistrationEntity: UserRegistrationEntity): Promise<void> {

    const response = await this.signUpWithEmail(
      userRegistrationEntity.email,
      userRegistrationEntity.password,
    );

    if (response instanceof AuthError) {
      Alert.alert(
        "Erro ao gerar credencial de autenticação: ",
        response.message,
      );
      return;
    }

    if (response === null) {
      Alert.alert("Erro desconhecido. Tente novamente");
      return;
    }

    const userId = response;

    const { error } = await supabase.from("Usuarios").insert({
      id_usuario: userId,
      nome: userRegistrationEntity.name,
      email: userRegistrationEntity.email,
      telefone: userRegistrationEntity.phoneNumber,
      created_at: new Date(),
    });

    if (error) {
      Alert.alert("Erro ao registrar usuário: ", error.message);
      return;
    }

    Alert.alert("Sucesso", "Conta criada! Você já pode entrar em sua conta.");

  }

  public async signOut() {
    await supabase.auth.signOut();
  }
}
