import { StyleSheet } from "react-native";

export const RegisterComponentStyles = StyleSheet.create({
  container: { width: '100%' },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16

  },
  button: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});