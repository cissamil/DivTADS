import { AuthError, User } from "@supabase/supabase-js";
import { Alert } from "react-native";
import { supabase } from "../../../utils/supabase";
import { UserData } from "../models/UserData";
import { UserLoginEntity } from "../models/UserLoginEntity";
import { UserRegistrationEntity } from "../models/UserRegistrationEntity";

export class AuthService {

  public async getCurrentSession(){
    return await supabase.auth.getSession();
  }

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

  private async signUpWithEmail(user: UserRegistrationEntity): Promise<AuthError | string | null> {
    const { data, error } = await supabase.auth.signUp({ 
      email: user.email, 
      password: user.password,
      options: {
        data: {
          name: user.name,
          phoneNumber: user.phoneNumber
        }
      }
    });

    if (error) {
      console.error(error.message);
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

    const response = await this.signUpWithEmail(userRegistrationEntity);

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

    Alert.alert("Sucesso", "Conta criada! Você já pode entrar em sua conta.");
  }

  public async signOut() : Promise<void>{
    const {error} = await supabase.auth.signOut();
    
    if (error) {
      Alert.alert("Erro ao sair", error.message);
    }
  }

  public async getUserProfile(userId: string): Promise<UserData | null>{
    const {data, error} = await supabase
    .from("users")
    .select("userId, name, email, phoneNumber")
    .eq('userId', userId)
    .single();

    if(error){
      console.error("Erro ao buscar perfil do usuário: ", error.message);
      return null;
    }

    return data;
  }
}
