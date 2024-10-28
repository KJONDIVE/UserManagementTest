// *** NPM ***
import { Alert } from 'react-native';

// *** CONSTANTS ***
const API_URL = 'https://ipcama.ru/api/Login';

// *** TYPES ***
interface ValidationOptions {
  checkConfirmPassword?: boolean;
}

const useValidation = (username: string, login: string, password: string, confirmPassword: string, options?: ValidationOptions) => {
  
  // *** FIELD VALIDATION ***
  const validateFields = (): boolean => {
    // Check for empty fields
    if (!username || !login || !password || (options?.checkConfirmPassword && !confirmPassword)) {
      Alert.alert('Ошибка', 'Поля не могут быть пустыми');
      return false;
    }

    if (/\s/.test(username) || /\s/.test(login) || /\s/.test(password) || (options?.checkConfirmPassword && /\s/.test(confirmPassword.trim()))) {
      Alert.alert('Ошибка', 'Поля не должны содержать пробелы');
      return false;
    }

    // Check if passwords match
    if (options?.checkConfirmPassword && password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return false;
    }

    return true;
  };

  // *** SERVER VALIDATION ***
  const validateWithServer = async (): Promise<boolean> => {
    try {
      const params = new URLSearchParams();
      params.append('Login', login);
      params.append('Password', password);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const data = await response.json();

      // Check response status
      if (!response.ok) {
        handleServerError(data);
        return false;
      }

      // Validate session ID and user ID
      if (data.SessionID && data.UserID) {
        return true;
      } else {
        Alert.alert('Ошибка', 'Проверка сервера не удалась');
        return false;
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Ошибка подключения к серверу');
      return false;
    }
  };

  // *** ERROR HANDLING ***
  const handleServerError = (data: any) => {
    if (data.Error) {
      Alert.alert('Ошибка', data.Error);
    } else {
      Alert.alert('Ошибка', 'Неверный логин или пароль.');
    }
  };

  return { validateFields, validateWithServer };
};

export default useValidation;